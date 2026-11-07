'use strict';
let data,color='Violet',finish='Glass',state='default',playing=false,timer=null,frameIndex=0,bg=0;
const $=id=>document.getElementById(id);
const theme=()=>`${color}V${finish}`;
function source(s,f){return `assets/${theme()}/${s}/${f.filename}`;}
function showFrame(f){const url=source(state,f);$('large').src=url;$('actual').src=url;}
function playback(){
 const frames=data.themes[theme()][state];
 showFrame(frames[frameIndex]);
 const delay=frames[frameIndex].delay;
 if(delay===0){stop();return;}
 frameIndex=(frameIndex+1)%frames.length;
 timer=setTimeout(playback,delay||100);
}
function stop(){clearTimeout(timer);playing=false;$('motion').textContent=t().play;$('motion').setAttribute('aria-pressed','false');}
function updateBackground(){
 $('stage').className='stage '+['','light','checker'][bg];
 $('background').textContent=`${t().background}: ${t().backgrounds[bg]}`;
}
function render(){
 stop();
 updateBackground();
 const frames=data.themes[theme()][state],final=frames.at(-1);
 showFrame(final);
 $('chosen').textContent=`${t().colors[color]} / ${t().finishes[finish]}`;
 $('state-title').textContent=t().states[state];
 $('download').href=`downloads/${theme()}-${data.version}.tar.gz`;
 $('download').setAttribute('aria-label',`${t().download} ${theme()} ${data.version}`);
 document.querySelectorAll('.color').forEach(b=>{
  b.setAttribute('aria-pressed',String(b.dataset.color===color));
  b.title=t().colors[b.dataset.color];
  b.setAttribute('aria-label',b.title);
 });
 document.querySelectorAll('.finish').forEach(b=>{
  b.setAttribute('aria-pressed',String(b.dataset.finish===finish));
  b.textContent=t().finishes[b.dataset.finish];
 });
 $('states').replaceChildren();
 for(const s of data.states){
  const b=document.createElement('button');
  b.type='button';b.className='state';b.dataset.state=s;
  b.setAttribute('aria-pressed',String(s===state));
  const image=document.createElement('img');
  image.src=source(s,data.themes[theme()][s].at(-1));image.alt='';
  b.append(image,document.createTextNode(t().states[s]));
  b.onclick=()=>{state=s;render();};
  $('states').append(b);
 }
 const size=48/final.nominal_size;
 const hotspot=`${Math.round(final.hotspot_x*size)} ${Math.round(final.hotspot_y*size)}`;
 $('stage').style.cursor=`url("${source(state,final)}") ${hotspot}, auto`;
 fetch(source(state,final)).then(r=>{if(!r.ok)throw new Error('Cursor unavailable');return r.text();}).then(svg=>{
  if(final!==data.themes[theme()][state].at(-1))return;
  const doc=new DOMParser().parseFromString(svg,'image/svg+xml');
  doc.documentElement.setAttribute('width','48');doc.documentElement.setAttribute('height','48');
  svg=new XMLSerializer().serializeToString(doc.documentElement);
  $('stage').style.cursor=`url("data:image/svg+xml,${encodeURIComponent(svg)}") ${hotspot}, auto`;
 }).catch(()=>{});
}
$('background').onclick=()=>{bg=(bg+1)%3;updateBackground();};
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
reducedMotion.addEventListener('change',()=>{if(reducedMotion.matches&&playing)stop();});
$('motion').onclick=()=>{
 if(!data)return;
 if(playing){stop();render();return;}
 if(reducedMotion.matches){$('motion').textContent=t().reduced;return;}
 playing=true;frameIndex=0;$('motion').textContent=t().pause;
 $('motion').setAttribute('aria-pressed','true');playback();
};
$('language').onchange=()=>{
 language=$('language').value;
 try{localStorage.setItem('v-cursor-language',language);}catch{}
 const url=new URL(location.href);url.searchParams.set('lang',language);
 history.replaceState(null,'',url);
 applyLanguage();
 if(data)render();
};
fetch('data.json').then(r=>{if(!r.ok)throw Error(t().loadError);return r.json();}).then(d=>{
 data=d;
 for(const c of d.colors){
  const b=document.createElement('button');b.type='button';b.className='color';
  b.dataset.color=c.id;b.style.setProperty('--swatch',c.hex);
  b.onclick=()=>{color=c.id;render();};$('colors').append(b);
 }
 for(const f of d.finishes){
  const b=document.createElement('button');b.type='button';b.className='finish';b.dataset.finish=f;
  b.onclick=()=>{finish=f;render();};$('finishes').append(b);
 }
 render();
}).catch(e=>{$('chosen').textContent=t().unavailable;$('state-title').textContent=e.message;});
