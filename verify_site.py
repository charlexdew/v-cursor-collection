"""Verify the static collection without third-party packages."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parent
data = json.loads((root / 'data.json').read_text())
assert len(data['colors']) == 8
assert len(data['finishes']) == 3
assert len(data['themes']) == 24
checksums = dict(line.split(None, 1)[::-1] for line in (root / 'SHA256SUMS').read_text().splitlines())
assert len(checksums) == 24
for filename, expected in checksums.items():
    assert hashlib.sha256((root / filename).read_bytes()).hexdigest() == expected, filename
frames = 0
for theme, states in data['themes'].items():
    assert set(states) == set(data['states'])
    assert (root / 'downloads' / f"{theme}-{data['version']}.tar.gz").is_file()
    for state, metadata in states.items():
        for frame in metadata:
            ET.parse(root / 'assets' / theme / state / frame['filename'])
            frames += 1
for name in ['app.js', 'i18n.js']:
    assert (root / name).is_file()
    if shutil.which('node'):
        subprocess.run(['node', '--check', str(root / name)], check=True)
assert (root / '.nojekyll').exists()
print(json.dumps({'themes':24,'checksums_verified':len(checksums),'svg_frames_parsed':frames,'status':'PASS'}, indent=2))
