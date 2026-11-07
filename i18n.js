'use strict';
// Translations only affect display text; package IDs and download names stay unchanged.
const staticSpanish = {
 'header strong span':'/ COLECCIÓN DE CURSORES',
 'nav a[href="#explore"]':'Explorar',
 'nav a[href="#install"]':'Instalar',
 'nav a[href="LICENSE"]':'Licencia MIT',
 '.intro .eyebrow':'Cursores originales de charlexdew · v1.0.0',
 'h1':'Un pequeño detalle.<br>Una sensación distinta.',
 '.intro p':'Ocho colores. Tres acabados. Una V precisa.<br>Explora cursores escalables originales para KDE Plasma, con versiones de compatibilidad XCursor incluidas.',
 'aside .label:nth-of-type(1)':'01 / Color',
 'aside .label:nth-of-type(2)':'02 / Acabado',
 '#download':'Descargar este tema ↓',
 'aside p.small':'Archivo .tar.gz de un solo tema · Licencia MIT<br><a href="SHA256SUMS">Verificar las sumas de comprobación</a>',
 '.specimen:not(.actual) span':'AMPLIADO / 144 PX',
 '.specimen.actual span':'TAMAÑO REAL / 48 PX',
 '.stage-note':'Pasa el puntero por aquí para probar el cursor estático del navegador',
 '.footnote':'La vista previa utiliza los SVG originales. La reproducción de fotogramas es una demostración, no una grabación nativa de KDE. Al pasar el puntero se muestra el fotograma final estático.',
 '#install .eyebrow':'Llévalo a tu escritorio',
 '#install h2':'Elige uno. Hazlo tuyo.',
 '#install li:nth-child(1)':'Elige un color y un acabado y descarga el archivo.',
 '#install li:nth-child(2)':'Abre <strong>Preferencias del sistema → Colores y temas → Cursores</strong>.',
 '#install li:nth-child(3)':'Elige <strong>Instalar desde archivo</strong> y selecciona el .tar.gz.',
 '#install li:nth-child(4)':'Selecciona el tema instalado y aplica los cambios. Reinicia las aplicaciones que conserven los cursores anteriores en caché.',
 '#install p':'El soporte nativo para SVG comienza en Plasma 6.2. Esta versión se probó con KWin 6.8.2 en Wayland. La descarga no cambia por sí sola el tema activo.',
 '.details section:nth-child(2) .eyebrow':'Lee esto antes de instalar',
 '.details section:nth-child(2) h2':'Elegante. Y experimental.',
 '.details section:nth-child(2) p:nth-of-type(1)':'Las transiciones que se reproducen una sola vez usan un <strong>fotograma final con retardo cero</strong> para mantener la imagen. La versión de KWin probada lo acepta, pero no cumple el esquema de animación publicado por KDE. Su comportamiento podría cambiar en versiones futuras.',
 '.details section:nth-child(2) p:nth-of-type(2)':'En XCursor, los estados que mantienen una imagen usan fotogramas finales estáticos. Los estados de enlace, espera y progreso siguen animados. Otros escritorios y las aplicaciones que gestionan sus propios cursores pueden mostrarlos de forma distinta. El acabado Vidrio es una ilustración translúcida, no un desenfoque real del fondo.',
 '.details section:nth-child(2) p:nth-of-type(3)':'¿Prefieres menos movimiento? Deja la reproducción en pausa. Se respeta tu preferencia de movimiento reducido.',
 'footer span:nth-child(1)':'V Cursor Collection · Diseño © charlexdew · <a href="LICENSE">MIT</a>'
};
const staticEnglish = Object.fromEntries(Object.keys(staticSpanish).map(selector => {
 const element=document.querySelector(selector);
 if(!element) throw new Error(`Missing translation target: ${selector}`);
 return [selector,element.innerHTML];
}));
const words = {
 en:{title:'V — Cursor Collection',description:'Explore V Cursor Collection: eight colors, three finishes, original scalable cursor artwork for KDE Plasma.',colors:{Violet:'Violet',Terracotta:'Terracotta',Black:'Black',White:'White',Teal:'Teal',IceBlue:'Ice Blue',Sage:'Sage',Amber:'Amber'},finishes:{Outline:'Outline',Glass:'Glass',Frost:'Frost'},states:{default:'Default pointer',pointer:'Link / axial turn',text:'Text / morph hold',wait:'Wait',progress:'Progress',openhand:'Open hand',fleur:'Move',size_hor:'Resize horizontal',size_ver:'Resize vertical',crosshair:'Crosshair',help:'Help','not-allowed':'Not allowed'},background:'Background',backgrounds:['Dark','Light','Checker'],play:'Play source frames',pause:'Pause playback',reduced:'Reduced motion enabled',download:'Download',explorer:'Cursor explorer',large:'Enlarged selected cursor',actual:'Selected cursor at 48 pixels',unavailable:'Preview unavailable',loadError:'Could not load collection'},
 es:{title:'V — Colección de cursores',description:'Explora V Cursor Collection: ocho colores, tres acabados y cursores escalables originales para KDE Plasma.',colors:{Violet:'Violeta',Terracotta:'Terracota',Black:'Negro',White:'Blanco',Teal:'Verde azulado',IceBlue:'Azul hielo',Sage:'Salvia',Amber:'Ámbar'},finishes:{Outline:'Contorno',Glass:'Vidrio',Frost:'Escarchado'},states:{default:'Puntero predeterminado',pointer:'Enlace / giro axial',text:'Texto / transición y pausa',wait:'Espera',progress:'Progreso',openhand:'Mano abierta',fleur:'Mover',size_hor:'Cambiar ancho',size_ver:'Cambiar alto',crosshair:'Cruz',help:'Ayuda','not-allowed':'No permitido'},background:'Fondo',backgrounds:['Oscuro','Claro','Cuadrícula'],play:'Reproducir fotogramas',pause:'Pausar reproducción',reduced:'Movimiento reducido activado',download:'Descargar',explorer:'Explorador de cursores',large:'Cursor seleccionado ampliado',actual:'Cursor seleccionado a 48 píxeles',unavailable:'Vista previa no disponible',loadError:'No se pudo cargar la colección'}
};
let savedLanguage;
try {savedLanguage=localStorage.getItem('v-cursor-language');}catch{}
const requestedLanguage=new URLSearchParams(location.search).get('lang');
let language=[requestedLanguage,savedLanguage,(navigator.language||'en').split('-')[0],'en'].find(value=>value==='en'||value==='es');
const t=()=>words[language];
function applyLanguage(){
 document.documentElement.lang=language;
 document.title=t().title;
 document.querySelector('meta[name="description"]').content=t().description;
 for(const [selector,html] of Object.entries(language==='es'?staticSpanish:staticEnglish)) document.querySelector(selector).innerHTML=html;
 document.getElementById('language').value=language;
 document.getElementById('explore').setAttribute('aria-label',t().explorer);
 document.getElementById('large').alt=t().large;
 document.getElementById('actual').alt=t().actual;
}
applyLanguage();
