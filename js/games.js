window.ElsewhereGames = (() => {
  const $ = id => document.getElementById(id);
  let activeGame = 'catch';
  /* Flower Dash: a true canvas game with touch, mouse and keyboard controls. */
  const c = {running:false,raf:0,last:0,spawn:0,objects:[],score:0,misses:0,basketX:360,keys:{left:false,right:false}};
  const canvas = () => $('catch-canvas');
  const ctx = () => canvas().getContext('2d');
  function flower(c2,x,y,r,col){
    c2.save();c2.translate(x,y);for(let i=0;i<6;i++){c2.rotate(Math.PI/3);c2.beginPath();c2.ellipse(0,-r*.75,r*.56,r*.81,0,0,Math.PI*2);c2.fillStyle=col;c2.fill();}c2.beginPath();c2.arc(0,0,r*.38,0,Math.PI*2);c2.fillStyle='#f5d17d';c2.fill();c2.restore();
  }
  function renderCatch(){
    const g=ctx(),w=720,h=340;g.clearRect(0,0,w,h);
    const bg=g.createLinearGradient(0,0,0,h);bg.addColorStop(0,'#bfdfd6');bg.addColorStop(1,'#e2ead3');g.fillStyle=bg;g.fillRect(0,0,w,h);
    g.fillStyle='#d7e7d1';g.beginPath();g.ellipse(205,350,310,85,0,0,7);g.ellipse(625,358,230,79,0,0,7);g.fill();
    g.fillStyle='#f5e5bd';g.beginPath();g.arc(619,75,42,0,7);g.fill();
    for(let i=0;i<12;i++){const x=(i*97+32)%720,y=310+(i%3)*10;g.strokeStyle='#6e9a7c';g.lineWidth=2;g.beginPath();g.moveTo(x,y+14);g.lineTo(x,y);g.stroke();flower(g,x,y,4,i%2?'#eec0c0':'#fff8d8');}
    c.objects.forEach(o=>{if(o.type==='flower')flower(g,o.x,o.y,16,o.col);else{g.fillStyle='#7a9295';g.beginPath();g.arc(o.x-10,o.y+2,14,0,7);g.arc(o.x+9,o.y-3,18,0,7);g.arc(o.x+27,o.y+5,12,0,7);g.fill();}});
    // Woven basket with handles.
    const x=c.basketX;
    g.lineWidth=6;g.strokeStyle='#7c644e';g.beginPath();g.arc(x,297,36,Math.PI,Math.PI*2);g.stroke();
    g.fillStyle='#bd9166';g.beginPath();g.moveTo(x-48,289);g.lineTo(x+48,289);g.lineTo(x+35,336);g.lineTo(x-34,336);g.closePath();g.fill();
    g.strokeStyle='#997452';g.lineWidth=3;for(let row=0;row<4;row++){g.beginPath();g.moveTo(x-45+row*3,296+row*10);g.lineTo(x+45-row*3,296+row*10);g.stroke();}
    g.fillStyle='#a87c5c';g.fillRect(x-50,286,100,10);
  }
  function updateHud(){$('catch-score').textContent=c.score;$('catch-lives').textContent=`☁ MISSES: ${c.misses} / 5`;}
  function endCatch(win){c.running=false;cancelAnimationFrame(c.raf);$('catch-overlay').hidden=false;$('catch-overlay-text').textContent=win?'Florist of the year. No competition. 🌸':`You caught ${c.score} flowers. Another round?`;$('catch-start').textContent=win?'↶ Play another round':'↶ Try again';$('catch-status').textContent=win?'A magnificent bouquet of reflexes.':`Try to catch 12 flowers before you miss five.`;if(win){window.Elsewhere?.award('flower-game');window.Elsewhere?.confetti(28);window.ElsewhereAudio?.effect('win');}}
  function tickCatch(ts){if(!c.running)return;
    let dt=Math.min((ts-(c.last||ts))/1000,.046);c.last=ts;c.spawn+=dt;
    if(c.keys.left)c.basketX-=360*dt;if(c.keys.right)c.basketX+=360*dt;c.basketX=Math.max(50,Math.min(670,c.basketX));
    if(c.spawn>.57){c.spawn=0;c.objects.push({x:35+Math.random()*650,y:-22,vy:110+Math.random()*70,type:Math.random()<.13?'cloud':'flower',col:['#eaa3b5','#f7e4bb','#f4a58c','#b1bbe4'][Math.floor(Math.random()*4)]});}
    for(let i=c.objects.length-1;i>=0;i--){const o=c.objects[i];o.y+=o.vy*dt;
      if(o.y>274&&o.y<326&&Math.abs(o.x-c.basketX)<53){if(o.type==='flower'){c.score++;window.ElsewhereAudio?.effect('tap');}else{c.misses++;c.score=Math.max(0,c.score-1);}c.objects.splice(i,1);updateHud();continue;}
      if(o.y>355){if(o.type==='flower')c.misses++;c.objects.splice(i,1);updateHud();}}
    renderCatch();if(c.score>=12){endCatch(true);return;}if(c.misses>=5){endCatch(false);return;}c.raf=requestAnimationFrame(tickCatch);
  }
  function startCatch(){cancelAnimationFrame(c.raf);Object.assign(c,{running:true,last:0,spawn:0,objects:[],score:0,misses:0,basketX:360});updateHud();$('catch-overlay').hidden=true;$('catch-status').textContent='Collect 12 flowers. Keep an eye on the clouds!';c.raf=requestAnimationFrame(tickCatch);}
  function stopCatch(){if(c.running){c.running=false;cancelAnimationFrame(c.raf);$('catch-overlay').hidden=false;$('catch-overlay-text').textContent='Taking a little break?';$('catch-start').textContent='▶ Start again';}}
  function initCatch(){renderCatch();$('catch-start').addEventListener('click',startCatch);$('catch-reset').addEventListener('click',startCatch);
    const move=e=>{if(!c.running)return;const rect=canvas().getBoundingClientRect();if(e.cancelable&&e.type==='pointermove'&&e.buttons)e.preventDefault();c.basketX=Math.max(50,Math.min(670,(e.clientX-rect.left)*720/rect.width));};
    canvas().addEventListener('pointerdown',e=>{canvas().setPointerCapture?.(e.pointerId);move(e);});canvas().addEventListener('pointermove',move);
    window.addEventListener('keydown',e=>{if(activeGame!=='catch'||$('scene-arcade').hidden)return;if(e.key==='ArrowLeft'||e.key==='ArrowRight'){c.keys[e.key==='ArrowLeft'?'left':'right']=true;e.preventDefault();}});
    window.addEventListener('keyup',e=>{if(e.key==='ArrowLeft')c.keys.left=false;if(e.key==='ArrowRight')c.keys.right=false;});
  }
  /* Postcard Pairs: 6 pairs, click or keyboard activated; no peeking during the lock. */
  const memoryIcons=['✿','✉','☼','✧','⌘','♣'];let memoryDeck=[],open=[],matched=0,moves=0,memoryLock=false,memoryTimer=null;
  function freshMemory(){clearTimeout(memoryTimer);open=[];matched=0;moves=0;memoryLock=false;$('memory-moves').textContent='0';$('memory-status').textContent='Turn over two cards to find a match.';
    memoryDeck=memoryIcons.flatMap((glyph,i)=>[{id:`${i}-a`,pair:i,glyph},{id:`${i}-b`,pair:i,glyph}]);for(let i=memoryDeck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[memoryDeck[i],memoryDeck[j]]=[memoryDeck[j],memoryDeck[i]];}
    const board=$('memory-board');board.innerHTML='';memoryDeck.forEach((item,idx)=>{const b=document.createElement('button');b.type='button';b.className='memory-tile';b.setAttribute('aria-label',`Card ${idx+1}, face down`);b.innerHTML=`<span class="memory-back" aria-hidden="true">✦</span><span class="memory-front" aria-hidden="true">${item.glyph}</span>`;b.addEventListener('click',()=>turnMemory(idx,b));board.append(b);});
  }
  function turnMemory(idx,b){if(memoryLock||b.classList.contains('is-open')||b.classList.contains('is-matched'))return;
    b.classList.add('is-open');b.setAttribute('aria-label',`Card ${idx+1}, ${memoryDeck[idx].glyph}`);open.push({idx,b});window.ElsewhereAudio?.effect('page');if(open.length!==2)return;
    moves++;$('memory-moves').textContent=moves;const [a,d]=open;
    if(memoryDeck[a.idx].pair===memoryDeck[d.idx].pair){a.b.classList.add('is-matched');d.b.classList.add('is-matched');a.b.disabled=true;d.b.disabled=true;matched++;open=[];$('memory-status').textContent=`${matched} of 6 pairs found.`;
      if(matched===6){$('memory-status').textContent=`All six pairs in ${moves} moves! The postmaster approves.`;window.Elsewhere?.award('memory');window.Elsewhere?.confetti(24);window.ElsewhereAudio?.effect('win');}}
    else{memoryLock=true;$('memory-status').textContent='Close! Those two belong to different postcards.';memoryTimer=setTimeout(()=>{a.b.classList.remove('is-open');d.b.classList.remove('is-open');a.b.setAttribute('aria-label',`Card ${a.idx+1}, face down`);d.b.setAttribute('aria-label',`Card ${d.idx+1}, face down`);open=[];memoryLock=false;},820);}
  }
  /* Pack & Go: three varied destinations, three appropriate items each. */
  const trips=[
    {name:'Foggy mountain morning',icon:'△',desc:'Mist on the trail. A cool breeze. You have room for exactly three useful things.',items:[['Warm socks','♨',true],['Thermos','◉',true],['Rain jacket','☂',true],['Beach ball','◌',false],['Flip-flops','⌇',false],['Pool float','◎',false],['Party confetti','✷',false],['Sun hat','⌢',false]]},
    {name:'A day beside the sea',icon:'≈',desc:'Warm sand, a little sun and nowhere urgent to be. Pack three sensible things.',items:[['Sunscreen','☼',true],['Water bottle','◍',true],['Beach towel','▤',true],['Snow chains','✻',false],['Winter gloves','♧',false],['Skis','⌁',false],['Heavy boots','⌂',false],['Wool blanket','▧',false]]},
    {name:'A city photo walk',icon:'▥',desc:'A day of wandering, finding cafés, and filming a few nice corners. Choose three essentials.',items:[['Phone / camera','▣',true],['Walking shoes','♧',true],['Charged power bank','ϟ',true],['Diving fins','≈',false],['Camping stove','☷',false],['Snow shovel','✴',false],['Kayak paddle','╳',false],['Tent pegs','⌁',false]]}
  ];let tripIdx=-1,packChosen=new Set();
  function nextTrip(){tripIdx=(tripIdx+1)%trips.length;packChosen.clear();const t=trips[tripIdx];$('pack-destination').innerHTML=`<span class="pack-emoji">${t.icon}</span><h4>${t.name}</h4><p>${t.desc}</p>`;$('pack-items').innerHTML='';t.items.forEach((item,i)=>{const b=document.createElement('button');b.type='button';b.className='pack-item';b.setAttribute('aria-pressed','false');b.innerHTML=`<span aria-hidden="true">${item[1]}</span><b>${item[0]}</b>`;b.addEventListener('click',()=>{if(packChosen.has(i))packChosen.delete(i);else if(packChosen.size<3)packChosen.add(i);else{window.Elsewhere?.toast('Suitcase is full! Remove something first.');return;}b.classList.toggle('selected',packChosen.has(i));b.setAttribute('aria-pressed',String(packChosen.has(i)));$('pack-score').textContent=`${packChosen.size} / 3`;});$('pack-items').append(b);});$('pack-score').textContent='0 / 3';$('pack-message').textContent='Three items. One trip. What makes the cut?';}
  function checkPack(){if(packChosen.size!==3){$('pack-message').textContent='Exactly three things, please. These airlines are very strict.';return;}const t=trips[tripIdx];const win=[...packChosen].every(i=>t.items[i][2]);if(win){$('pack-message').textContent='Packed perfectly. Boarding pass stamped. Off you go!';window.Elsewhere?.award('packing');window.Elsewhere?.confetti(23);window.ElsewhereAudio?.effect('win');}else{$('pack-message').textContent='Hmm. Something in that suitcase is for an entirely different climate. Try swapping an item.';window.ElsewhereAudio?.effect('page');}}
  function init(){initCatch();freshMemory();nextTrip();$('memory-restart').addEventListener('click',freshMemory);$('pack-check').addEventListener('click',checkPack);$('pack-next').addEventListener('click',nextTrip);
    document.querySelectorAll('[data-game-tab]').forEach(tab=>tab.addEventListener('click',()=>{activeGame=tab.dataset.gameTab;document.querySelectorAll('[data-game-tab]').forEach(t=>{const current=t===tab;t.classList.toggle('active',current);t.setAttribute('aria-selected',String(current));});document.querySelectorAll('.game-panel').forEach(p=>p.hidden=p.id!==`game-${activeGame}`);if(activeGame!=='catch')stopCatch();}));
  }
  return {init,stop:stopCatch};
})();
