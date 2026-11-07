"""Generate display-only animation envelopes. Requires Pillow and rsvg-convert.

Render every original frame at 4x and union ALL nonzero-alpha pixels, including
antialiasing/strokes. Union themes as well: color/finish changes must not shift
the specimen. Source artwork, sizes, cursor hotspots and archives are untouched.
Run: python build_preview_bounds.py [--check]
"""
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
import hashlib
import json
from pathlib import Path
import subprocess
import sys
from PIL import Image

ROOT = Path(__file__).resolve().parent
SCALE = 4


def measure(item):
    state, path = item
    png = subprocess.run(['rsvg-convert', '-w', '256', '-h', '256', str(path)],
                         check=True, capture_output=True).stdout
    with Image.open(BytesIO(png)) as image:
        box = image.getchannel('A').getbbox()
    # Edge-on flip frames intentionally collapse to zero visible pixels.
    return state, [value / SCALE for value in box] if box else None


def generate():
    raw = (ROOT / 'data.json').read_bytes()
    data = json.loads(raw)
    digest = hashlib.sha256(raw)
    items = []
    for theme, states in data['themes'].items():
        for state, frames in states.items():
            for frame in frames:
                path = ROOT / 'assets' / theme / state / frame['filename']
                digest.update(path.read_bytes())
                items.append((state, path))
    bounds = {}
    with ThreadPoolExecutor(max_workers=8) as pool:
        for state, box in pool.map(measure, items):
            if box is None:
                continue
            if state in bounds:
                old = bounds[state]
                box = [min(old[0], box[0]), min(old[1], box[1]),
                       max(old[2], box[2]), max(old[3], box[3])]
            bounds[state] = box
    return {'method': 'rendered-alpha-union', 'render_scale': SCALE,
            'source_sha256': digest.hexdigest(), 'frames': len(items), 'states': bounds}


if __name__ == '__main__':
    result = generate()
    target = ROOT / 'preview-bounds.json'
    if '--check' in sys.argv:
        assert result == json.loads(target.read_text()), 'Preview bounds are stale'
        print(f"PASS: rendered alpha envelopes verified for {result['frames']} frames")
    else:
        target.write_text(json.dumps(result, indent=2) + '\n')
        print(f"Generated {len(result['states'])} shared state envelopes from {result['frames']} frames")
