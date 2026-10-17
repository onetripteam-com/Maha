/* Five original hand-drawn SVG frames for the little cinema. */
window.ElsewhereCinema = (()=>{
  const base = (inner,sky='#a7c9be')=>`<svg viewBox="0 0 960 540" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true"><defs><linearGradient id="fs" x2="0" y2="1"><stop stop-color="${sky}"/><stop offset="1" stop-color="#f6d8b4"/></linearGradient></defs><rect width="960" height="540" fill="url(#fs)"/>${inner}</svg>`;
  const hills=`<path d="M0 400Q180 220 376 357T800 323Q885 300 960 355V540H0" fill="#88b7a3"/><path d="M0 456Q230 325 460 453T960 393V540H0" fill="#577f74"/>`;
  const stars=(n=14)=>`<g class="film-night-stars">`+Array.from({length:n},(_,i)=>`<circle cx="${63+(i*137)%840}" cy="${45+(i*73)%200}" r="${i%3+2}" fill="#fff7da" opacity=".85"/>`).join('');
  const person=`<g class="film-traveller" transform="translate(493 318)"><path d="M0 0v95" stroke="#314f4a" stroke-width="26" stroke-linecap="round"/><circle cx="0" cy="-33" r="27" fill="#d39383"/><path d="M-29-38q6-43 47-28q30 17 12 50l-17-20z" fill="#51444a"/><path d="M-9 82l-22 70M14 82l27 68" stroke="#354a48" stroke-width="17" stroke-linecap="round"/><path d="M-21 17l-48 49" stroke="#d39383" stroke-width="14" stroke-linecap="round"/><path d="M20 17l33 47" stroke="#d39383" stroke-width="14" stroke-linecap="round"/><rect x="45" y="65" width="47" height="58" rx="7" fill="#d3a06d" stroke="#7d675d" stroke-width="5"/><path d="M58 65v-14q13-15 23 0v14" stroke="#7d675d" stroke-width="5" fill="none"/></g>`;
  const art=[
    base(`${stars(4)}<circle cx="760" cy="130" r="65" fill="#f5cf93"/>${hills}<path d="M70 480Q250 390 460 482T940 463" fill="none" stroke="#e5cd9f" stroke-width="36"/>${person}<path d="M130 260l9-44 9 44-9-8z" fill="#fff7de"/><g fill="#e8bdd0"><circle cx="151" cy="470" r="8"/><circle cx="175" cy="468" r="7"/><circle cx="780" cy="450" r="8"/></g>`),
    base(`<path d="M0 415Q200 294 454 385T960 358V540H0" fill="#9bbba8"/><path d="M0 474Q240 389 480 470T960 428V540H0" fill="#729f8c"/><path d="M90 540C180 380 350 430 438 300S715 258 940 50" fill="none" stroke="#f9e6bf" stroke-width="64"/><path d="M90 540C180 380 350 430 438 300S715 258 940 50" fill="none" stroke="#d8ba92" stroke-dasharray="6 15" stroke-width="3"/><g transform="translate(590 155) rotate(12)"><path d="M0 0h163v118H0z" fill="#fff6d9" stroke="#977969" stroke-width="7"/><path d="M23 25l45 16-19 47 38-36 55 23" fill="none" stroke="#a9c9bb" stroke-width="8" stroke-linecap="round"/><path d="M126 14l12 22-24-8z" fill="#bd8982"/></g><g transform="translate(360 345)" fill="#f7d69e"><path d="M0 0l36-84 36 84z"/><path d="M15 5v-40h46v40" fill="#ca918a"/></g>`,'#accac2'),
    base(`<circle cx="770" cy="110" r="48" fill="#f8d69e"/><g class="film-clouds" fill="#fff9e6"><ellipse cx="210" cy="293" rx="155" ry="53"/><ellipse cx="330" cy="255" rx="174" ry="74"/><ellipse cx="670" cy="312" rx="231" ry="80"/><ellipse cx="806" cy="273" rx="115" ry="55"/></g><g transform="translate(365 160)"><path d="M50 250V55l156-76 144 76v195" fill="#e3b9a8" stroke="#7d7183" stroke-width="7"/><path d="M0 63l206-125 202 125" fill="#b77c79" stroke="#7d7183" stroke-width="8"/><rect x="155" y="93" width="101" height="144" rx="44" fill="#f8e8c7" stroke="#8c737b" stroke-width="7"/><rect x="40" y="88" width="66" height="85" rx="30" fill="#bcd4d0" stroke="#8c737b" stroke-width="7"/><rect x="284" y="88" width="65" height="85" rx="30" fill="#bcd4d0" stroke="#8c737b" stroke-width="7"/><path d="M98 5h226" stroke="#f4d69a" stroke-width="22"/><text x="210" y="13" text-anchor="middle" fill="#7d596a" font-family="Georgia" font-size="17">CLOUD CAFÉ</text></g><path d="M0 423Q230 372 450 442T960 397V540H0" fill="#f1d7c6"/>`,'#d1c9de'),
    base(`<path d="M0 350Q300 250 600 310T960 290V540H0" fill="#a7c6ae"/><path d="M0 455Q350 352 560 438T960 400V540H0" fill="#779d8b"/><g transform="translate(200 110) rotate(-8)"><rect x="0" y="0" width="265" height="286" fill="#fff8e9" stroke="#e7d7bd" stroke-width="11"/><rect x="19" y="18" width="225" height="210" fill="#b9d7d4"/><circle cx="193" cy="64" r="31" fill="#fbdfad"/><path d="M18 170Q92 90 161 158T245 146V228H18" fill="#8eafa4"/><text x="131" y="259" font-family="Georgia" font-size="20" text-anchor="middle" fill="#9e7476">first light</text></g><g transform="translate(532 70) rotate(9)"><rect x="0" y="0" width="266" height="300" fill="#fff9e9" stroke="#e7d7bd" stroke-width="11"/><rect x="19" y="18" width="226" height="220" fill="#dfc3c3"/><path d="M19 210l90-102 62 69 45-47 29 51v56H19" fill="#a1b5a6"/><circle cx="200" cy="77" r="30" fill="#f9dbac"/><text x="131" y="271" font-family="Georgia" font-size="20" text-anchor="middle" fill="#9e7476">somewhere new</text></g>`,'#cbd9d2'),
    base(`<rect width="960" height="540" fill="#283f56"/>${stars(37)}<circle cx="740" cy="150" r="57" fill="#efdfb8"/><path d="M0 415Q160 347 330 409T662 386Q820 339 960 404V540H0" fill="#537275"/><path d="M0 463Q190 383 390 470T960 446V540H0" fill="#354f5b"/><g transform="translate(415 285)"><path d="M0 127v-135" stroke="#587b6b" stroke-width="9"/><path d="M0 15C-20-38-66-30-70 0c-4 33 42 53 70 15z" fill="#dba7b5"/><path d="M0 15C20-38 66-30 70 0c4 33-42 53-70 15z" fill="#e5bec3"/><path d="M0 15C-45 15-32 75 0 55 32 75 45 15 0 15z" fill="#f4d3b7"/><circle cx="0" cy="18" r="14" fill="#eebf75"/></g>`,'#354965')
  ];
  const captions=[
    'Once there was someone who liked the feeling of a first time. A new street. A different sky. A tiny detour.',
    'One day a map appeared. Its instructions were spectacularly unhelpful: “Try the interesting road.”',
    'That road led to a café above the clouds. The vanilla there tasted suspiciously like… another cloud.',
    'She saved the little moments. Some on camera. Some only in her head. Both kinds counted.',
    'There is so much world left. Happily, there is absolutely no deadline. To be continued, whenever you fancy.'
  ];
  let idx=0,playing=false,started=false,finished=false,timer=null,remaining=7200,tickStart=0;
  const $=id=>document.getElementById(id);
  const shell=()=>$('film-screen').closest('.movie-shell');
  function render(){
    const el=$('film-art');
    el.dataset.shot=String(idx);
    el.innerHTML=art[idx];
    el.classList.remove('scene-switch');void el.offsetWidth;el.classList.add('scene-switch');
    $('film-caption').textContent=captions[idx];
    $('film-counter').textContent=`SCENE ${String(idx+1).padStart(2,'0')} / 05`;
    $('film-progress').style.width=`${((idx+1)/art.length)*100}%`;
  }
  function clear(){clearTimeout(timer);timer=null;}
  function schedule(){clear();if(playing){tickStart=performance.now();timer=setTimeout(next,remaining);}}
  function next(){
    clear();remaining=7200;
    if(idx>=art.length-1){
      playing=false;finished=true;
      $('film-play').textContent='▶ Watch it again';
      $('film-next').disabled=true;
      window.Elsewhere?.award('cinema');window.ElsewhereAudio?.effect('win');return;
    }
    idx++;render();window.ElsewhereAudio?.effect('page');schedule();
  }
  function play(){
    if(playing){pause();return;}
    if(finished){idx=0;finished=false;started=true;remaining=7200;render();}
    if(!started){started=true;idx=0;remaining=7200;shell().classList.add('is-open');render();}
    shell().classList.remove('is-paused');
    playing=true;
    $('film-play').textContent='Ⅱ Pause the film';
    $('film-next').disabled=false;schedule();
  }
  function replay(){
    clear();idx=0;started=true;playing=true;finished=false;remaining=7200;
    shell().classList.add('is-open');shell().classList.remove('is-paused');render();
    $('film-play').textContent='Ⅱ Pause the film';$('film-next').disabled=false;schedule();
  }
  function pause(){
    if(playing){
      playing=false;
      remaining=Math.max(120,remaining-(performance.now()-tickStart));
      clear();shell().classList.add('is-paused');
      $('film-play').textContent='▶ Continue the film';
    }
  }
  function init(){
    render();$('film-progress').style.width='0';
    $('film-counter').textContent='SCENE 00 / 05';
    $('film-caption').textContent='The Girl Who Collected Firsts';
    $('film-play').addEventListener('click',play);
    $('film-replay').addEventListener('click',replay);
    $('film-next').addEventListener('click',()=>{if(!started)return;playing=true;shell().classList.remove('is-paused');next();});
  }
  return {init,pause};
})();
