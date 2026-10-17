/* Maha's Little Elsewhere: all-original static application, no trackers, no backend. */
(() => {
  'use strict';
  const DATA=window.MAHA_CONTENT;
  const $=id=>document.getElementById(id);
  const key='maha-little-elsewhere-v1';
  const empty=()=>({visits:0,stamps:[],postcards:[],letters:[],bouquet:[],drawerIds:[],lastDoor:-1,capsule:''});
  function load(){try{const v=JSON.parse(localStorage.getItem(key)||'null');if(!v||typeof v!=='object')return empty();const s={...empty(),...v};['stamps','postcards','letters','bouquet','drawerIds'].forEach(k=>{if(!Array.isArray(s[k]))s[k]=[];});if(typeof s.capsule!=='string')s.capsule='';return s;}catch(_){return empty();}}
  let state=load(),current='home',toastTimer=null,studioTimer=null,studioSelections=[],moodCounter=0,previousBouquetCount=state.bouquet.length;
  const reduce=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches||false;
  const stamps=[
    ['flower','First flower','✿','Pick a stem'],['bouquet','Flowerkeeper','❀','Save a bouquet'],['weather','Window seat','☼','Explore a mood'],['postcard','Postmarked','✉','Flip a postcard'],['letter','Letter opener','✎','Read a letter'],['cinema','Film critic','▣','Finish the little film'],['studio','Director','◉','Make a travel film'],['flower-game','Flower catcher','✷','Win Flower Dash'],['memory','Matchmaker','✧','Match every pair'],['packing','Well packed','△','Pack a suitcase'],['drawer','Finder','⌁','Open a cabinet drawer'],['secret','Door explorer','?','Try the unlabelled door']
  ];
  function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch(_){} }
  function toast(message){const t=$('toast');t.textContent=message;t.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.hidden=true,2900);}
  function confetti(amount=30){if(reduce)return;const layer=$('confetti-layer');const palette=['#dfa2a3','#f0d7a3','#9bc6bb','#b4a7d5','#f3b486'];for(let i=0;i<amount;i++){const p=document.createElement('span');p.className='confetti';p.style.cssText=`left:${Math.random()*100}vw;--duration:${2+Math.random()*1.6}s;--drift:${(Math.random()-.5)*160}px;--rot:${Math.random()*360}deg;--color:${palette[i%palette.length]}`;layer.appendChild(p);setTimeout(()=>p.remove(),4200);}}
  function award(id){if(state.stamps.includes(id))return;state.stamps.push(id);save();updateMuseum();}
  window.Elsewhere={award,toast,confetti};
  function go(scene,push=true){
    const target=$(`scene-${scene}`);if(!target)return;
    if(current==='cinema'&&scene!=='cinema')window.ElsewhereCinema?.pause();
    if(current==='arcade'&&scene!=='arcade')window.ElsewhereGames?.stop();
    if(current==='travel'&&scene!=='travel')stopStudio();
    window.ElsewhereMotion?.closeExplore(false);
    const change=()=>{
      document.querySelectorAll('.scene').forEach(el=>el.hidden=el!==target);
      current=scene;
      document.querySelectorAll('.dock-item[data-go]').forEach(btn=>{
        const selected=btn.dataset.go===scene;
        btn.classList.toggle('active',selected);
        if(selected)btn.setAttribute('aria-current','page');
        else btn.removeAttribute('aria-current');
      });
      const more=$('explore-toggle');
      const isExtra=!['home','garden','weather','mail'].includes(scene);
      more.classList.toggle('active',isExtra);
      if(isExtra)more.setAttribute('aria-current','page');else more.removeAttribute('aria-current');
      window.scrollTo({top:0,behavior:'instant'});
      const heading=target.querySelector('h1,h2');
      if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
    };
    if(scene!==current&&window.ElsewhereMotion)window.ElsewhereMotion.navigate(change);
    else change();
    if(push){
      const url=scene==='home'?location.pathname+location.search:`#${scene}`;
      try{history.pushState({scene},'',url);}catch(_){/* about:blank and other restricted previews may disallow history writes. */}
    }
  }
  function flowerHead(id,x,y,scale=1,rotation=0,fresh=false){const f=DATA.flowers.find(q=>q.id===id)||DATA.flowers[0];let petals='';
    if(id==='tulip')petals=`<path d="M-19 12Q-35-24-21-41L-8-31 0-47 12-31 25-42Q40-8 17 17Q0 34-19 12Z" fill="${f.colour}" stroke="#ce9b69" stroke-width="2"/><path d="M0-39V21" stroke="#d39a6d" stroke-width="2" opacity=".5"/>`;
    else if(id==='lavender'){petals=Array.from({length:10},(_,i)=>`<ellipse cx="${i%2?-9:9}" cy="${-48+i*7}" rx="10" ry="7" transform="rotate(${i%2?-25:25} ${i%2?-9:9} ${-48+i*7})" fill="${f.colour}"/>`).join('');petals+=`<path d="M0 35V-48" stroke="#6d947d" stroke-width="4"/>`;}
    else {const count=id==='daisy'?10:id==='cosmos'?8:id==='blue'?5:6;const rad=id==='daisy'?31:id==='blue'?23:25;for(let i=0;i<count;i++){const a=i*360/count;petals+=`<ellipse cx="0" cy="-${rad}" rx="${id==='daisy'?9:15}" ry="${id==='poppy'?24:20}" transform="rotate(${a})" fill="${f.colour}" stroke="${id==='daisy'?'#dfd7b8':'#ffffff28'}" stroke-width="1.2"/>`;}petals+='<circle r="13" fill="#f3ca79"/><circle r="5" fill="#a17e58"/>';}
    return `<g class="${fresh?'fresh-flower':'bouquet-flower'}" transform="translate(${x} ${y}) rotate(${rotation}) scale(${scale})"><g class="petal-head">${petals}</g></g>`;
  }
  function flowerThumbnail(id){return `<svg viewBox="0 0 100 115" aria-hidden="true"><path d="M50 105Q45 60 50 48" stroke="#6c9881" stroke-width="4" fill="none"/><path d="M48 85q-24-31-25-9q12 19 25 9zM50 95q24-27 30-15q-8 20-30 15" fill="#8bb99a"/>${flowerHead(id,50,47,.64)}</svg>`;}
  function drawBouquet(){const picked=state.bouquet.slice(0,7);const isAdding=picked.length>previousBouquetCount;previousBouquetCount=picked.length;let svg=`<svg viewBox="0 0 470 520" role="img" aria-label="An arranged bouquet of ${picked.length} flowers"><defs><linearGradient id="wrap" x2="1" y2="1"><stop stop-color="#f6dcbf"/><stop offset="1" stop-color="#dbba9e"/></linearGradient></defs><ellipse cx="234" cy="475" rx="102" ry="16" fill="#a48f80" opacity=".13"/>`;
    const pos=[[223,140,-12],[168,191,-24],[301,192,18],[260,113,12],[143,262,-18],[320,257,23],[223,224,1]];
    picked.forEach((id,i)=>{const [x,y]=pos[i];svg+=`<path class="${isAdding&&i===picked.length-1?'fresh-stem':''}" d="M${x} ${y+5}Q${x+((i%2)?27:-25)} 285 235 402" stroke="#6d9b78" stroke-width="${4+i%2}" fill="none" stroke-linecap="round"/><path d="M${x+(235-x)*.34} ${y+(402-y)*.35}q-34-33-35-8q9 21 35 8" fill="#8bb393"/><path d="M${x+(235-x)*.6} ${y+(402-y)*.6}q30-29 33-4q-13 18-33 4" fill="#82ad91"/>`;});
    svg+='<path d="M110 265Q242 309 359 261L306 447Q238 490 166 449Z" fill="url(#wrap)" stroke="#c6a58b" stroke-width="3"/><path d="M110 265L232 353 359 261 306 447 232 353 166 449Z" fill="none" stroke="#e9cbaf" stroke-width="3"/><path d="M170 446L235 360 302 447" fill="none" stroke="#d0ac93" stroke-width="2"/>';
    picked.forEach((id,i)=>{const [x,y,r]=pos[i];svg+=flowerHead(id,x,y,1.02+(i%3)*.12,r,isAdding&&i===picked.length-1);});
    svg+='<path d="M191 413Q237 429 278 409L252 442 221 435Z" fill="#c98589"/><path d="M233 421Q194 389 170 419Q195 449 233 421ZM233 421Q277 389 297 419Q275 449 233 421Z" fill="#e4a1a2" stroke="#c78489" stroke-width="2"/><circle cx="234" cy="421" r="11" fill="#d0848c"/><path d="M230 433L215 470M240 433L259 468" stroke="#cf888e" stroke-width="7" stroke-linecap="round"/>';
    if(!picked.length)svg+='<text x="235" y="200" font-family="Georgia" font-size="20" font-style="italic" fill="#ba9991" text-anchor="middle">a few stems will be lovely here</text>';
    svg+='</svg>';$('bouquet-stage').innerHTML=svg;$('stem-count').textContent=`${picked.length} / 7`;$('bouquet-undo').disabled=!picked.length;$('bouquet-save').disabled=!picked.length;
    const last=DATA.flowers.find(x=>x.id===picked.at(-1));$('bouquet-message').textContent=last?last.tag:'This bunch is waiting for a little colour.';
    document.querySelectorAll('.flower-option').forEach(btn=>btn.disabled=picked.length>=7);
  }
  function initFlowers(){const opts=$('flower-options');DATA.flowers.forEach(f=>{const b=document.createElement('button');b.className='flower-option';b.type='button';b.innerHTML=flowerThumbnail(f.id)+`<b>${f.name}</b><small>+ Add to bouquet</small>`;b.addEventListener('click',()=>{if(state.bouquet.length>=7)return;state.bouquet.push(f.id);save();award('flower');drawBouquet();window.ElsewhereMotion?.bloom(b,f.colour);window.ElsewhereAudio?.effect('page');});opts.append(b);});
    $('bouquet-undo').addEventListener('click',()=>{state.bouquet.pop();save();drawBouquet();});
    $('bouquet-reset').addEventListener('click',()=>{state.bouquet=[];save();drawBouquet();});
    $('bouquet-save').addEventListener('click',()=>{if(!state.bouquet.length)return;award('bouquet');confetti(30);toast('Your bouquet is kept for next time, right here on this device.');window.ElsewhereAudio?.effect('win');});drawBouquet();
  }
  const weatherLabels=[['sun','A good day','☼'],['heavy','A lot today','☁'],['silly','Need nonsense','✷'],['homesick','A bit nostalgic','⌂'],['curious','New horizons','✧'],['quiet','Just a minute','☾']];
  const silly=['Invent a new holiday. It must involve snacks and no speeches. Name it in seven seconds.','Try to think of the most dramatic title for a video about making tea.','Pick an object near you. Give it the most unnecessarily posh name possible.','Challenge: think of a worse name for a travel agency than “Maybe Airlines”.','You have won one imaginary KitKat. Please do not argue with the judges.'];
  const nostalgia=['A little bit of Bangalore: a tree-lined corner after rain, and the traffic doing what traffic does.','A little bit of Kerala: green everywhere, rain on the roof, and a leisurely afternoon that refuses to rush.','A little bit of Kuwait: desert light turning everything golden just before evening.'];
  const dream=['A small bookshop on a street you took by accident.','A place with an ocean view and a breakfast that lasts an hour.','An afternoon where the only appointment is a sunset.','A train journey with a window seat and absolutely no emails.'];
  function moodHtml(id){const moods={
    sun:`<div class="mood-scene mood-sun"><span class="mood-illustration">☼</span><p class="eyebrow">THE SUN IS DOING VERY WELL</p><h3>Good! Then let the day be good.</h3><p>No need to find a meaningful reason. Sometimes the tea is nice, the weather behaves, or something unexpectedly works out. Enough said.</p><button class="primary-btn weather-action" data-weather-action="joy">Throw a tiny celebration ✦</button></div>`,
    heavy:`<div class="mood-scene mood-heavy"><span class="mood-illustration">☁</span><p class="eyebrow">YOU ARE ALLOWED AN UNIMPRESSIVE DAY</p><h3>That sounds like a lot, actually.</h3><p>Don't worry about finding the bright side immediately. You can sit here for a moment. Nothing needs to be solved by this website.</p><div class="breathing-dot" aria-hidden="true"></div><button class="outline-btn weather-action" data-weather-action="rest">Pause the little breathing circle</button></div>`,
    silly:`<div class="mood-scene mood-silly"><span class="mood-illustration">✷</span><p class="eyebrow">DEPARTMENT OF RIDICULOUS REQUESTS</p><h3>A highly unnecessary challenge.</h3><p id="silly-challenge">${silly[moodCounter%silly.length]}</p><button class="primary-btn weather-action" data-weather-action="silly">Give me another ridiculous task</button></div>`,
    homesick:`<div class="mood-scene mood-homesick"><span class="mood-illustration">⌂</span><p class="eyebrow">A POSTCARD WITH NO DATE</p><h3>A little familiar place.</h3><p id="nostalgia-line">${nostalgia[moodCounter%nostalgia.length]}</p><p>Not every memory has to be a big one. Sometimes you just remember the way a place feels.</p><button class="outline-btn weather-action" data-weather-action="home">Another little window →</button></div>`,
    curious:`<div class="mood-scene mood-curious"><span class="mood-illustration">✧</span><p class="eyebrow">POSSIBLE FUTURE ADVENTURES</p><h3>Imagine, for just a second…</h3><p id="dream-line">${dream[moodCounter%dream.length]}</p><p>You don't need to book it. It's nice to wonder, that's all.</p><button class="primary-btn weather-action" data-weather-action="dream">Where else could we go? ↗</button></div>`,
    quiet:`<div class="mood-scene mood-quiet"><span class="mood-illustration">☾</span><p class="eyebrow">ABSOLUTELY NOTHING URGENT</p><h3>Here's one quiet minute, whenever you need it.</h3><p>Unclench your jaw, if you like. Look away from the screen for a second. The world will still be here when you look back.</p><div id="quiet-ripple" class="quiet-ripple" aria-hidden="true"><span></span><span></span><span></span></div><button class="outline-btn weather-action" data-weather-action="quiet">Make a tiny ripple ◎</button></div>`};return moods[id]||moods.sun;}
  function initWeather(){weatherLabels.forEach(([id,label,icon])=>{const b=document.createElement('button');b.type='button';b.className='weather-choice';b.dataset.weather=id;b.innerHTML=`<span aria-hidden="true">${icon}</span><b>${label}</b>`;b.addEventListener('click',()=>{document.querySelectorAll('.weather-choice').forEach(x=>x.classList.toggle('active',x===b));$('weather-experience').innerHTML=moodHtml(id);award('weather');window.ElsewhereAudio?.effect('page');});$('weather-choices').append(b);});
    $('weather-experience').addEventListener('click',e=>{const b=e.target.closest('[data-weather-action]');if(!b)return;const action=b.dataset.weatherAction;
      if(action==='joy'){confetti(45);toast('Official permission to enjoy this exact moment.');window.ElsewhereAudio?.effect('win');}
      if(action==='rest'){const d=$('weather-experience').querySelector('.breathing-dot');const paused=d.classList.toggle('paused');b.textContent=paused?'Let it breathe again':'Pause the little breathing circle';}
      if(action==='silly'){$('silly-challenge').textContent=silly[(++moodCounter)%silly.length];window.ElsewhereAudio?.effect();}
      if(action==='home'){$('nostalgia-line').textContent=nostalgia[(++moodCounter)%nostalgia.length];}
      if(action==='dream'){$('dream-line').textContent=dream[(++moodCounter)%dream.length];}
      if(action==='quiet'){const el=$('quiet-ripple');el.classList.remove('is-rippling');void el.offsetWidth;el.classList.add('is-rippling');}
    });
  }
  const pcSymbols={coast:'≈',city:'▥',desert:'⌁',tram:'▰',mountain:'△',island:'♣',garden:'✿',sunset:'✧'};
  function pcArt(type){return window.ElsewhereArt(type);}
  function initMail(){const pcGrid=$('postcards-grid');DATA.postcards.forEach(card=>{const b=document.createElement('button');b.type='button';b.className='postcard';b.setAttribute('aria-label',`Postcard from ${card.place}, turn to read`);b.setAttribute('aria-pressed','false');b.innerHTML=`<span class="postcard-inner"><span class="pc-front">${pcArt(card.type)}<span class="pc-place">${card.place}</span><span class="pc-subtitle">${card.subtitle}</span></span><span class="pc-back"><span class="pc-postmark">✉</span><small>POSTCARDS FROM ELSEWHERE</small><p>${card.message}</p><small>TO MAHA · WITH NO RETURN ADDRESS</small></span></span>`;
      b.addEventListener('click',()=>{const flipped=b.classList.toggle('is-flipped');b.setAttribute('aria-pressed',String(flipped));b.setAttribute('aria-label',`Postcard from ${card.place}, ${flipped?'show illustration':'turn to read'}`);if(flipped){if(!state.postcards.includes(card.id)){state.postcards.push(card.id);save();}award('postcard');$('postcard-count').textContent=state.postcards.length;window.ElsewhereAudio?.effect('page');}});pcGrid.append(b);});$('postcard-count').textContent=state.postcards.length;
    const dialog=$('letter-dialog');let oldFocus=null;
    DATA.letters.forEach(letter=>{const b=document.createElement('button');b.type='button';b.className='envelope-btn';b.innerHTML=`<span class="envelope-graphic" aria-hidden="true"></span><span class="envelope-seal">${letter.seal}</span><strong>${letter.label}</strong><small>OPEN THE ENVELOPE ↗</small>`;b.addEventListener('click',()=>{oldFocus=b;$('letter-kicker').textContent=letter.kicker;$('letter-dialog-title').textContent=letter.title;const holder=$('letter-body');holder.replaceChildren();letter.body.forEach(par=>{const p=document.createElement('p');p.textContent=par;holder.append(p);});if(typeof dialog.showModal==='function')dialog.showModal();else dialog.setAttribute('open','');document.body.classList.add('modal-open');$('letter-close').focus();if(!state.letters.includes(letter.id)){state.letters.push(letter.id);save();}award('letter');window.ElsewhereAudio?.effect('page');});$('letters-grid').append(b);});
    const close=()=>{if(typeof dialog.close==='function')dialog.close();else dialog.removeAttribute('open');document.body.classList.remove('modal-open');oldFocus?.focus();};
    $('letter-close').addEventListener('click',close);dialog.addEventListener('close',()=>{document.body.classList.remove('modal-open');oldFocus?.focus();});dialog.addEventListener('click',e=>{if(e.target===dialog)close();});
    document.querySelectorAll('[data-mail-tab]').forEach(tab=>tab.addEventListener('click',()=>{const post=tab.dataset.mailTab==='postcards';$('postcards-panel').hidden=!post;$('letters-panel').hidden=post;document.querySelectorAll('[data-mail-tab]').forEach(t=>{const selected=t===tab;t.classList.toggle('active',selected);t.setAttribute('aria-selected',String(selected));});window.ElsewhereAudio?.effect('page');}));
  }
  function stopStudio(){clearTimeout(studioTimer);studioTimer=null;}
  function renderStudioSlots(){const slots=$('studio-slots');slots.innerHTML='';for(let i=0;i<3;i++){const id=studioSelections[i];const shot=DATA.shots.find(s=>s.id===id);const b=document.createElement('button');b.type='button';b.className='studio-slot'+(shot?' filled':'');b.disabled=!shot;b.innerHTML=`<span>SHOT 0${i+1}</span>${shot?shot.title:'Add a shot'}`;b.title=shot?'Remove this shot':'';b.addEventListener('click',()=>{studioSelections.splice(i,1);renderStudioSlots();});slots.append(b);}$('studio-play').disabled=studioSelections.length!==3;$('studio-progress').textContent=`SHOT ${studioSelections.length} / 3`;
    document.querySelectorAll('.shot-card').forEach(b=>{b.disabled=studioSelections.includes(b.dataset.shot)||studioSelections.length>=3;});
  }
  function runStudio(i=0){if(current!=='travel')return;if(i>=studioSelections.length){$('studio-progress').textContent='THAT’S A WRAP · DIRECTED BY MAHA';award('studio');confetti(22);window.ElsewhereAudio?.effect('win');studioTimer=null;return;}
    const shot=DATA.shots.find(x=>x.id===studioSelections[i]);$('studio-preview').innerHTML=pcArt(shot.type)+`<div class="studio-caption">${shot.caption}</div>`;$('studio-progress').textContent=`SCENE ${i+1} / 3 · ${shot.title.toUpperCase()}`;window.ElsewhereAudio?.effect('shutter');studioTimer=setTimeout(()=>runStudio(i+1),2900);
  }
  function initTravel(){const choices=$('studio-shots');DATA.shots.forEach(shot=>{const b=document.createElement('button');b.type='button';b.className='shot-card';b.dataset.shot=shot.id;b.innerHTML=pcArt(shot.type)+`<span><b>${shot.title}</b><small>${shot.sub}</small></span>`;b.addEventListener('click',()=>{if(studioSelections.length>=3||studioSelections.includes(shot.id))return;studioSelections.push(shot.id);renderStudioSlots();window.ElsewhereAudio?.effect('page');});choices.append(b);});renderStudioSlots();
    $('studio-play').addEventListener('click',()=>{stopStudio();if(studioSelections.length===3)runStudio();});$('studio-clear').addEventListener('click',()=>{stopStudio();studioSelections=[];$('studio-preview').innerHTML='<div class="studio-placeholder"><span>◉</span><h3>Your next little adventure.</h3><p>Choose three shots and press play.</p></div>';renderStudioSlots();});
  }
  function updateMuseum(){$('stamp-total').textContent=stamps.length;$('stamp-count').textContent=state.stamps.length;const grid=$('stamp-grid');grid.innerHTML='';stamps.forEach(([id,label,icon,desc])=>{const earned=state.stamps.includes(id);const div=document.createElement('div');div.className='stamp'+(earned?' earned':'');div.innerHTML=`<span class="stamp-icon" aria-hidden="true">${earned?icon:'?'}</span><b>${label}</b><small>${earned?'FOUND · KEPT':desc}</small>`;grid.append(div);});}
  function initOddities(){const drawers=$('cabinet-drawers');DATA.drawers.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.className='cabinet-drawer';b.innerHTML=`<b>${item.label}</b><span class="drawer-pull" aria-hidden="true"></span>`;b.addEventListener('click',()=>{document.querySelectorAll('.cabinet-drawer').forEach(x=>x.classList.toggle('is-open',x===b));$('cabinet-message').textContent=item.found;if(!state.drawerIds.includes(i)){state.drawerIds.push(i);save();}award('drawer');window.ElsewhereAudio?.effect('page');});drawers.append(b);});
    const door=()=>{let index=Math.floor(Math.random()*DATA.doorSurprises.length);if(index===state.lastDoor)index=(index+1)%DATA.doorSurprises.length;state.lastDoor=index;save();$('secret-message').textContent=DATA.doorSurprises[index];$('secret-door').classList.add('open');setTimeout(()=>$('secret-door').classList.remove('open'),700);award('secret');window.ElsewhereAudio?.effect('page');};$('secret-door').addEventListener('click',door);$('secret-open').addEventListener('click',door);
    $('capsule-save').addEventListener('click',()=>{const value=$('capsule-input').value.trim();if(!value){$('capsule-feedback').textContent='Write a line first. Even a tiny one will do.';return;}state.capsule=value.slice(0,400);save();$('capsule-input').value='';$('capsule-feedback').textContent='Sealed. Saved on this browser and device only.';window.ElsewhereAudio?.effect('page');});
    $('capsule-open').addEventListener('click',()=>{$('capsule-feedback').textContent=state.capsule?`Your saved note: “${state.capsule}”`:'Nothing here yet. Write yourself a line, if you like.';});
    $('capsule-delete').addEventListener('click',()=>{if(!state.capsule){$('capsule-feedback').textContent='There is no saved note to erase.';return;}if(!confirm('Erase your saved note from this browser? This cannot be undone.'))return;state.capsule='';save();$('capsule-input').value='';$('capsule-feedback').textContent='Your saved note has been erased from this browser.';});
    $('progress-reset').addEventListener('click',()=>{if(!confirm('Clear stamps, opened-card progress and your saved bouquet? Your future note will stay.'))return;const capsule=state.capsule,visits=state.visits;state={...empty(),capsule,visits};save();drawBouquet();document.querySelectorAll('.postcard.is-flipped').forEach(b=>{b.classList.remove('is-flipped');b.setAttribute('aria-pressed','false');const place=b.querySelector('.pc-place')?.textContent||'Elsewhere';b.setAttribute('aria-label',`Postcard from ${place}, turn to read`);});document.querySelectorAll('.cabinet-drawer.is-open').forEach(b=>b.classList.remove('is-open'));$('cabinet-message').textContent='The drawers are waiting. One of them definitely squeaks.';$('postcard-count').textContent='0';updateMuseum();toast('Stamps cleared. Your saved future note is still here.');});updateMuseum();
  }
  function initEntrance(){state.visits=(state.visits||0)+1;save();const en=$('entrance');if(state.visits>1||location.hash)return;en.hidden=false;en.setAttribute('role','dialog');en.setAttribute('aria-modal','true');en.setAttribute('aria-label','A little world for Maha');$('main').inert=true;document.body.classList.add('modal-open');const btn=$('enter-world');btn.focus();const enter=()=>{en.classList.add('opening');window.ElsewhereAudio?.effect('page');setTimeout(()=>{en.classList.add('leaving');setTimeout(()=>{en.hidden=true;$('main').inert=false;document.body.classList.remove('modal-open');$('home-title').setAttribute('tabindex','-1');$('home-title').focus({preventScroll:true});},reduce?10:440);},reduce?10:730);};btn.addEventListener('click',enter,{once:true});en.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();btn.click();}});}
  function init(){document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(b.dataset.go)));window.addEventListener('popstate',()=>go(location.hash.slice(1)||'home',false));
    document.addEventListener('visibilitychange',()=>{if(document.hidden){window.ElsewhereCinema?.pause();window.ElsewhereGames?.stop();stopStudio();}});
    $('sound-toggle').addEventListener('click',async()=>{const on=await window.ElsewhereAudio.toggle();$('sound-toggle').setAttribute('aria-pressed',String(on));$('sound-toggle').setAttribute('aria-label',on?'Turn off gentle sound':'Turn on gentle sound');$('sound-toggle').querySelector('.sound-word').textContent=on?'Sound on':'Sound off';if(!on&& !window.AudioContext && !window.webkitAudioContext)toast('This browser does not support Web Audio. Everything else works muted.');});
    initFlowers();initWeather();initMail();initTravel();initOddities();window.ElsewhereCinema.init();window.ElsewhereGames.init();window.ElsewhereMotion?.init();
    const initial=location.hash.slice(1);if(initial&&$(`scene-${initial}`))go(initial,false);initEntrance();
    if('serviceWorker' in navigator && location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./service-worker.js').catch(()=>{}));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
