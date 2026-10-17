/* Original generative sound. No external music, files, uploads or tracking. */
window.ElsewhereAudio = (() => {
  let context = null, enabled = false, clock = null, melodyIndex = 0;
  const melody = [349.23,440,523.25,440,392,349.23,293.66,349.23,440,587.33,523.25,392,349.23,293.66,261.63,293.66];
  function getContext(){if(!context){const AudioContext = window.AudioContext || window.webkitAudioContext;if(!AudioContext)return null;context=new AudioContext();}return context;}
  function note(freq, duration=.35, volume=.019, kind='sine'){
    if(!enabled || document.hidden)return;
    const ctx=getContext();if(!ctx || ctx.state!=='running')return;
    const osc=ctx.createOscillator(),env=ctx.createGain();osc.type=kind;osc.frequency.value=freq;
    env.gain.setValueAtTime(.0001,ctx.currentTime);
    env.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),ctx.currentTime+.03);
    env.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);
    osc.connect(env);env.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+duration+.03);
  }
  async function toggle(){
    const ctx=getContext();if(!ctx)return false;
    if(enabled){enabled=false;clearInterval(clock);clock=null;return false;}
    try{await ctx.resume();}catch(_){return false;}
    enabled=true;melodyIndex=0;tick();clock=setInterval(tick,690);return true;
  }
  function tick(){if(!enabled||document.hidden)return;const freq=melody[melodyIndex%melody.length];note(freq,.68,.012);if(melodyIndex%4===0)note(freq/2,1.8,.007);melodyIndex++;}
  function effect(type='tap'){
    if(!enabled)return;
    if(type==='win'){[523.25,659.25,783.99,1046.5].forEach((f,i)=>setTimeout(()=>note(f,.48,.03,'triangle'),i*105));}
    else if(type==='shutter'){note(350,.055,.034,'square');setTimeout(()=>note(180,.07,.016,'triangle'),55);}
    else if(type==='page'){note(440,.07,.01);setTimeout(()=>note(520,.07,.009),45);}
    else{note(560,.09,.011,'sine');}
  }
  return {toggle,effect,isEnabled:()=>enabled};
})();
