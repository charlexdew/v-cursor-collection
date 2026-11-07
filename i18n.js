'use strict';
// Translations only affect display text; package IDs and download names stay unchanged.
const staticSpanish = {
 'header strong span':'/ COLECCIÓN DE CURSORES',
 'nav a[href="#explore"]':'Explorar',
 'nav a[href="#install"]':'Instalar',
 'nav a[href="LICENSE"]':'Licencia MIT',
 '.intro .eyebrow':'Cursores originales de charlexdew · v1.0.0',
 'h1':'Cursores V para<br>KDE Plasma',
 '.intro p':'24 temas en 8 colores y 3 acabados.<br>Cursores SVG escalables con versiones XCursor para compatibilidad.',
 'aside .label:nth-of-type(1)':'01 / Color',
 'aside .label:nth-of-type(2)':'02 / Acabado',
 '#download':'Descargar este tema ↓',
 'aside p.small':'Archivo .tar.gz de un solo tema · Licencia MIT<br><a href="SHA256SUMS">Verificar las sumas de comprobación</a>',
 '.specimen:not(.actual) span':'AMPLIADO / 144 PX',
 '.specimen.actual span':'TAMAÑO REAL / 48 PX',
 '.stage-note':'Pasa el puntero por aquí para probar el cursor estático',
 '.footnote':'La vista previa usa los archivos SVG del tema. La animación se simula en el navegador; no es una grabación de KDE. El cursor al pasar el puntero es estático.',
 '#install h2':'Instalación',
 '#install li:nth-child(1)':'Elige un color y un acabado y descarga el archivo.',
 '#install li:nth-child(2)':'Abre <strong>Preferencias del sistema → Colores y temas → Cursores</strong>.',
 '#install li:nth-child(3)':'Elige <strong>Instalar desde archivo</strong> y selecciona el .tar.gz.',
 '#install li:nth-child(4)':'Selecciona el tema instalado y aplica los cambios. Reinicia las aplicaciones que conserven los cursores anteriores en caché.',
 '#install p':'Los cursores SVG requieren Plasma 6.2 o posterior. Probados con KWin 6.8.2 en Wayland. Descargar un tema no lo instala ni lo activa.',
 '.details section:nth-child(2) h2':'Compatibilidad y limitaciones',
 '.details section:nth-child(2) p:nth-of-type(1)':'Algunas animaciones se reproducen una vez y se detienen en la imagen final. Usan un <strong>fotograma final con retardo cero</strong>, que funciona en la versión de KWin probada, pero no cumple la especificación de animación de KDE. Su comportamiento podría cambiar en futuras versiones de KWin.',
 '.details section:nth-child(2) p:nth-of-type(2)':'Las versiones XCursor usan imágenes estáticas para esas transiciones. Los estados de enlace, espera y progreso siguen animados. Otros escritorios y aplicaciones pueden comportarse de forma distinta. Vidrio usa transparencia, no desenfoque del fondo.',
 '.details section:nth-child(2) p:nth-of-type(3)':'La animación de la vista previa está desactivada al inicio y respeta tu preferencia de movimiento reducido.',
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
