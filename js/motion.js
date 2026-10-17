/* Little Elsewhere: material motion and destination sheet. No dependencies or tracking. */
window.ElsewhereMotion = (() => {
  'use strict';
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const $ = id => document.getElementById(id);
  let menuReturnFocus = null;
  function canMove(){return !reduce.matches && !document.hidden;}

  function navigate(update){
    if (!canMove() || typeof document.startViewTransition !== 'function') {
      update(); return;
    }
    try {
      const transition = document.startViewTransition(update);
      transition.finished.catch(()=>{});
    } catch (_) { update(); }
  }
  function closeExplore(restore = false){
    const sheet = $('explore-sheet');
    if(sheet?.open) sheet.close();
    $('explore-toggle')?.setAttribute('aria-expanded','false');
    if(restore) menuReturnFocus?.focus();
  }
  function bloom(button, colour='#e997a8'){
    if(!canMove() || !button)return;
    const r=button.getBoundingClientRect();
    const x=r.left+r.width/2, y=r.top+r.height*.42;
    for(let i=0;i<8;i++){
      const petal=document.createElement('span');petal.className='flower-petal';
      petal.style.left=`${x}px`;petal.style.top=`${y}px`;
      petal.style.background=colour;
      const angle=(i/8)*Math.PI*2;
      petal.style.setProperty('--dx',`${Math.cos(angle)*(32+Math.random()*55)}px`);
      petal.style.setProperty('--dy',`${Math.sin(angle)*31+42+Math.random()*35}px`);
      petal.style.setProperty('--rot',`${(i%2?-1:1)*(150+Math.random()*200)}deg`);
      petal.style.setProperty('--time',`${820+Math.random()*450}ms`);
      document.body.append(petal);
      setTimeout(()=>petal.remove(),1400);
    }
  }
  function init(){
    const sheet=$('explore-sheet'), opener=$('explore-toggle');
    if(sheet && opener){
      opener.addEventListener('click',()=>{
        if(sheet.open){closeExplore(true);return;}
        menuReturnFocus=document.activeElement;
        sheet.showModal();opener.setAttribute('aria-expanded','true');
        $('explore-close').focus();
      });
      $('explore-close').addEventListener('click',()=>closeExplore(true));
      sheet.addEventListener('close',()=>opener.setAttribute('aria-expanded','false'));
      sheet.addEventListener('click',e=>{if(e.target===sheet)closeExplore(true);});
    }
    const surprise=$('surprise-me');
    if(surprise){
      const destinations=['garden','weather','mail','cinema','travel','arcade','curiosities'];
      let previous='';
      surprise.addEventListener('click',()=>{
        const others=destinations.filter(n=>n!==previous);
        const pick=others[Math.floor(Math.random()*others.length)];previous=pick;
        document.querySelector(`.sheet-grid [data-go="${pick}"]`)?.click();
      });
    }
    const map=$('.map-frame');
    if(map && matchMedia('(hover:hover) and (pointer:fine)').matches){
      let raf=0;
      map.addEventListener('pointermove',event=>{
        const r=map.getBoundingClientRect();
        const px=(event.clientX-r.left)/r.width-.5;
        const py=(event.clientY-r.top)/r.height-.5;
        cancelAnimationFrame(raf);
        raf=requestAnimationFrame(()=>{
          map.style.setProperty('--tiltX',`${(-py*3).toFixed(2)}deg`);
          map.style.setProperty('--tiltY',`${(px*3).toFixed(2)}deg`);
        });
      },{passive:true});
      map.addEventListener('pointerleave',()=>{
        cancelAnimationFrame(raf);map.style.setProperty('--tiltX','0deg');map.style.setProperty('--tiltY','0deg');
      });
    }
  }
  return {init,navigate,closeExplore,bloom};
})();
