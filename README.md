# V Cursor Collection

Original V-shaped cursor artwork by **charlexdew**, released under the MIT license.

**[Website](https://charlexdew.github.io/v-cursor-collection/)** · **[Español](https://charlexdew.github.io/v-cursor-collection/?lang=es)**

Eight colors × three finishes = 24 downloadable KDE cursor themes. This repository contains the static showcase, original SVG preview frames, and the prebuilt single-theme 1.0.0 archives. Full theme artwork and MIT license are inside each archive; the original generator/build workspace is not included in this website repository.

## Languages

English and Spanish, selected through the header's **English / Español** menu. First visits use the browser language when supported; a manual selection is remembered locally. Share `?lang=en` or `?lang=es` to request a specific language. Package names and IDs stay unchanged.

## Run locally

```sh
python3 -m http.server 8765 --bind 127.0.0.1 --directory .
# Open http://127.0.0.1:8765/
python3 verify_site.py
```

Plain HTML/CSS/JavaScript. No framework, build step, external fonts, analytics or paid services. GitHub Pages deploys from the root of `main`.

## Install a cursor theme

Choose a variant on the website, download its `.tar.gz`, then use KDE System Settings → Colors & Themes → Cursors → Install from File. Select the installed theme and apply it. Each archive has exactly one root theme directory. Nothing is installed by visiting the website.

Verify downloads from a checkout with `sha256sum -c SHA256SUMS`.

## Compatibility and experimental animation

Native SVG support begins with Plasma 6.2. This release was tested on KWin 6.8.2 Wayland, not every desktop/application. One-shot morph holds use a zero-delay final frame, accepted by the tested KWin version but outside KDE's published animation schema. Future versions may behave differently. XCursor holding states use static final images; link, wait and progress remain animated. Glass is translucent artwork, not real background blur.

Website playback uses the actual source SVG frames and metadata delays. It is not a recording or verification of native KDE behavior. The hover preview is a static final-frame cursor, and playback respects reduced-motion preferences.

## Español

Colección de cursores originales en forma de V: ocho colores y tres acabados. Usa el selector **Español** de la web para ver los controles, las instrucciones de instalación y los avisos de compatibilidad traducidos. Los nombres de los archivos no cambian. Las animaciones que mantienen el fotograma final son experimentales; consulta el aviso de la web antes de instalar.

MIT © charlexdew. See [LICENSE](LICENSE).
