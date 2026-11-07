"""Preview geometry regression tests; no browser or third-party test runner needed."""
import hashlib
import json
from pathlib import Path
import subprocess
import unittest

ROOT = Path(__file__).resolve().parent


class PreviewTests(unittest.TestCase):
    def test_every_state_has_one_shared_rendered_animation_envelope(self):
        path = ROOT / 'preview-bounds.json'
        self.assertTrue(path.exists(), 'Missing rendered-alpha preview bounds')
        bounds = json.loads(path.read_text())
        data = json.loads((ROOT / 'data.json').read_text())
        self.assertEqual(set(bounds['states']), set(data['states']))
        self.assertEqual(bounds['method'], 'rendered-alpha-union')
        self.assertEqual(bounds['frames'], sum(len(fs) for states in data['themes'].values() for fs in states.values()))
        for state, box in bounds['states'].items():
            x0, y0, x1, y1 = box
            self.assertTrue(0 <= x0 < x1 <= 64, state)
            self.assertTrue(0 <= y0 < y1 <= 64, state)
        # The tilted V must translate right, unlike the centered crosshair.
        v = bounds['states']['default']
        cross = bounds['states']['crosshair']
        self.assertLess((v[0] + v[2]) / 2, 30)
        self.assertAlmostEqual((cross[0] + cross[2]) / 2, 32, delta=1)

    def test_bounds_match_original_sources(self):
        raw = (ROOT / 'data.json').read_bytes()
        data = json.loads(raw)
        digest = hashlib.sha256(raw)
        for theme, states in data['themes'].items():
            for state, frames in states.items():
                for frame in frames:
                    digest.update((ROOT / 'assets' / theme / state / frame['filename']).read_bytes())
        bounds = json.loads((ROOT / 'preview-bounds.json').read_text())
        self.assertEqual(bounds['source_sha256'], digest.hexdigest(),
                         'Artwork changed; regenerate alpha bounds')

    def test_display_translation_centers_full_envelope_without_resizing_or_wobble(self):
        result = subprocess.run(['node', '-e', r'''
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const script=fs.readFileSync('app.js','utf8');
assert.ok(script.includes('function centerPreview('), 'Missing shared preview centering');
const elements={};
const element=()=>({style:{},setAttribute(){},addEventListener(){}});
const context={document:{getElementById(id){return elements[id]??=element();}},
 matchMedia:()=>element(),fetch:()=>new Promise(()=>{})};
vm.createContext(context);vm.runInContext(script,context);
const bounds=JSON.parse(fs.readFileSync('preview-bounds.json','utf8'));
vm.runInContext('previewBounds='+JSON.stringify(bounds),context);
for(const [state,box] of Object.entries(bounds.states)) {
 const image=element();context.centerPreview(image,state);
 const values=image.style.transform.match(/-?[\d.]+/g).map(Number);
 for(const pixels of [144,48,40]) {
   const x=pixels/2+values[0]/100*pixels, y=pixels/2+values[1]/100*pixels;
   assert.ok(Math.abs(x+(box[0]+box[2])/2*pixels/64-pixels/2)<1e-6);
   assert.ok(Math.abs(y+(box[1]+box[3])/2*pixels/64-pixels/2)<1e-6);
   assert.ok(x+box[0]*pixels/64>=0 && x+box[2]*pixels/64<=pixels);
   assert.ok(y+box[1]*pixels/64>=0 && y+box[3]*pixels/64<=pixels);
 }
}
vm.runInContext("data={themes:{VioletVGlass:{default:[{filename:'a.svg'},{filename:'b.svg'}]}}};state='default';showFrame({filename:'a.svg'});",context);
const before=elements.large.style.transform;
vm.runInContext("showFrame({filename:'b.svg'})",context);
assert.equal(elements.large.style.transform,before);
assert.equal(elements.actual.style.transform,before);
assert.ok(script.includes('centerPreview(image,s)'), 'Thumbnails must use the same geometry');
console.log('PASS: 12 states × 3 sizes; centered envelope, no clipping, fixed animation translation');
'''], cwd=ROOT, text=True, capture_output=True)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)


if __name__ == '__main__':
    unittest.main()
