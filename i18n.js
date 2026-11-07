'use strict';
// Translations only affect display text; package IDs and download names stay unchanged.
const staticSpanish = {
 'header strong span':'/ COLECCIÓN DE CURSORES',
 'nav a[href="#explore"]':'Explorar',
 'nav a[href="#install"]':'Instalar',
 'nav a[href="LICENSE"]':'Licencia MIT',
 '.intro .eyebrow':'Cursores originales de charlexdew · v1.0.0',
 'h1':'Cursores V para<br>KDE Plasma',
 '.intro p':'24 temas en 8 colores y 3 acabados.<br>Los cursores se mantienen nítidos al ampliarlos. Cada descarga incluye también una versión para aplicaciones que no admiten cursores escalables.',
 'aside .label:nth-of-type(1)':'01 / Color',
 'aside .label:nth-of-type(2)':'02 / Acabado',
 '#download':'Descargar este tema ↓',
 'aside p.small':'Archivo .tar.gz de un solo tema · Licencia MIT<br><a href="SHA256SUMS">Comprobar la integridad del archivo (SHA-256)</a>',
 '.specimen:not(.actual) span':'AMPLIADO / 144 PX',
 '.specimen.actual span':'TAMAÑO REAL / 48 PX',
 '.stage-note':'Mueve el puntero aquí para probar este cursor',
 '.footnote':'Esta página muestra el diseño real de los cursores, pero reproduce las animaciones en el navegador. KDE puede mostrarlas de forma distinta. El cursor que pruebas al pasar el puntero no se anima.',
 '#install h2':'Instalación',
 '#install li:nth-child(1)':'Elige un color y un acabado y pulsa <strong>Descargar este tema</strong>.',
 '#install li:nth-child(2)':'Abre <strong>Preferencias del sistema → Colores y temas → Cursores</strong>.',
 '#install li:nth-child(3)':'Elige <strong>Instalar desde archivo</strong> y selecciona el .tar.gz que descargaste. No necesitas descomprimirlo.',
 '#install li:nth-child(4)':'Selecciona el nuevo tema y pulsa <strong>Aplicar</strong>. Si una aplicación sigue mostrando el cursor anterior, ciérrala y ábrela de nuevo.',
 '#install p':'Los cursores escalables necesitan Plasma 6.2 o posterior. Esta versión se probó con KWin 6.8.2 en Wayland. Descargar el archivo no cambia tu cursor actual.',
 '.details section:nth-child(2) h2':'Compatibilidad y limitaciones',
 '.details section:nth-child(2) p:nth-of-type(1)':'Algunos cambios de cursor se animan una vez y luego se quedan quietos. Esto es <strong>experimental</strong>: funcionó en KWin 6.8.2, pero usa un comportamiento fuera de las reglas de animación de KDE. Una futura actualización de KDE podría cambiar o dejar de mostrar estas animaciones.',
 '.details section:nth-child(2) p:nth-of-type(2)':'Si una aplicación usa la versión XCursor incluida, esos cambios son instantáneos, sin animación. Los indicadores de enlace y de actividad siguen animados. El resultado puede variar entre aplicaciones y escritorios. Vidrio es parcialmente transparente; no desenfoca el fondo.',
 '.details section:nth-child(2) p:nth-of-type(3)':'La vista previa no se mueve hasta que pulses <strong>Reproducir animación</strong>. Si tu sistema está configurado para reducir el movimiento, la reproducción permanece desactivada.',
 'footer span:nth-child(1)':'V Cursor Collection · Diseño © charlexdew · <a href="LICENSE">MIT</a>'
};
const staticEnglish = Object.fromEntries(Object.keys(staticSpanish).map(selector => {
 const element=document.querySelector(selector);
 if(!element) throw new Error(`Missing translation target: ${selector}`);
 return [selector,element.innerHTML];
}));
const words = {
 en:{title:'V — Cursor Collection',description:'24 V-shaped cursor themes for KDE Plasma. 8 colors, 3 finishes, scalable SVG and XCursor downloads.',colors:{Violet:'Violet',Terracotta:'Terracotta',Black:'Black',White:'White',Teal:'Teal',IceBlue:'Ice Blue',Sage:'Sage',Amber:'Amber'},finishes:{Outline:'Outline',Glass:'Glass',Frost:'Frost'},states:{default:'Default pointer',pointer:'Link',text:'Text',wait:'Wait',progress:'Progress',openhand:'Open hand',fleur:'Move',size_hor:'Resize horizontal',size_ver:'Resize vertical',crosshair:'Crosshair',help:'Help','not-allowed':'Not allowed'},background:'Background',backgrounds:['Dark','Light','Checker'],play:'Play animation',pause:'Pause animation',reduced:'Reduced motion enabled',download:'Download',explorer:'Cursor explorer',large:'Enlarged selected cursor',actual:'Selected cursor at 48 pixels',unavailable:'Preview unavailable',loadError:'Could not load collection'},
 es:{title:'V — Colección de cursores',description:'24 temas de cursores en V para KDE Plasma. 8 colores, 3 acabados y descargas SVG escalables y XCursor.',colors:{Violet:'Violeta',Terracotta:'Terracota',Black:'Negro',White:'Blanco',Teal:'Verde azulado',IceBlue:'Azul hielo',Sage:'Salvia',Amber:'Ámbar'},finishes:{Outline:'Contorno',Glass:'Vidrio',Frost:'Escarchado'},states:{default:'Puntero predeterminado',pointer:'Enlace',text:'Texto',wait:'Espera',progress:'Progreso',openhand:'Mano abierta',fleur:'Mover',size_hor:'Cambiar ancho',size_ver:'Cambiar alto',crosshair:'Cruz',help:'Ayuda','not-allowed':'No permitido'},background:'Fondo',backgrounds:['Oscuro','Claro','Cuadrícula'],play:'Reproducir animación',pause:'Pausar animación',reduced:'Movimiento reducido activado',download:'Descargar',explorer:'Explorador de cursores',large:'Cursor seleccionado ampliado',actual:'Cursor seleccionado a 48 píxeles',unavailable:'Vista previa no disponible',loadError:'No se pudo cargar la colección'}
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
