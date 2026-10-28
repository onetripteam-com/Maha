/* Root MAHA six-home QA. Run: node --test tests/room-world-smoke.cjs */
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const cp = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const html = read('index.html');
const js = read('js/room-world.js');
const css = read('room-world.css');
const themes = ['monsoon','dusk','sunday','coast','library','cabin'];
const destinations = ['garden','mail','cinema','travel','arcade','weather','curiosities'];
function mock(){
  function element(dataset){
    const classes = new Set();
    return {
      dataset:dataset||{},attributes:{},handlers:{},style:{},
      classList:{add(x){classes.add(x)},remove(x){classes.delete(x)},toggle(x,v){if(v)classes.add(x);else classes.delete(x)}},
      setAttribute(k,v){this.attributes[k]=v},
      addEventListener(k,fn){this.handlers[k]=fn},
      getBoundingClientRect(){return {left:0,top:0,width:1200,height:760}},
      textContent:'',innerHTML:'',offsetWidth:1200
    };
  }
  const ids = ['room-shell','room-art','scene-home','room-name','room-note','room-scene'];
  const elements = Object.fromEntries(ids.map(id => [id,element()]));
  const options = themes.map(room=>element({room}));
  const objects = destinations.map(object=>element({object}));
  let store = {};
  const fakeDocument = {
    getElementById(id){return elements[id]||null},
    querySelectorAll(selector){return selector==='[data-room]'?options:selector==='.room-object'?objects:[]}
  };
  const fakeWindow = {
    matchMedia(){return {matches:false}},
    setTimeout(fn){fn()},
    cancelAnimationFrame(){},
    requestAnimationFrame(fn){fn();return 1}
  };
  const localStorage = {getItem(key){return store[key]??null},setItem(key,value){store[key]=value}};
  vm.runInNewContext(js,{document:fakeDocument,window:fakeWindow,localStorage,console}, {filename:'room-world.js',timeout:5000});
  return {elements,options,objects,localStorage};
}
test('every original interactive destination and scene remains present',()=>{
  const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  for(const destination of destinations){
    assert.ok(ids.has('scene-'+destination),'missing scene: '+destination);
    assert.match(html,new RegExp('data-go="'+destination+'"'));
  }
  assert.ok(ids.has('surprise-me'),'surprise-me binding must be kept');
  assert.equal([...html.matchAll(/id="scene-home"/g)].length,1);
  assert.equal([...html.matchAll(/id="room-shell"/g)].length,1);
});
test('six selectable homes are distinct, semantic, local SVGs with valid XML',()=>{
  const m=mock(),svg=[];
  for(let i=0;i<themes.length;i++){
    m.options[i].handlers.click();
    const current=m.elements['room-art'].innerHTML;
    assert.ok(current.length>6500,'room artwork too thin for '+themes[i]);
    assert.match(current,/viewBox="0 0 1200 760"/);
    assert.match(current,/<svg/);
    assert.match(current,/linearGradient/);
    assert.doesNotMatch(current,/<script|<image[^>]+href="https?:/i);
    cp.execFileSync('python3',['-c','import sys, xml.etree.ElementTree as ET; ET.fromstring(sys.stdin.read())'],
       {input:current,timeout:5000});
    assert.equal(m.elements['scene-home'].attributes['data-room-theme'],themes[i]);
    assert.equal(m.options[i].attributes['aria-pressed'],'true');
    svg.push(current);
    for(const object of m.objects){
      const left=parseFloat(object.style.left),top=parseFloat(object.style.top);
      assert.ok(left>=5&&left<=100,'horizontal hotspot out of bounds');
      assert.ok(top>=10&&top<=92,'vertical hotspot out of bounds');
    }
  }
  assert.equal(new Set(svg).size,6,'home artwork must not be colour variations of one scene');
  assert.equal(m.localStorage.getItem('maha-room-theme-v1'),'cabin');
});
test('home chooser keeps keyboard controls, mobile actions and motion accessibility',()=>{
  for(const name of themes)assert.match(html,new RegExp('data-room="'+name+'"'));
  assert.match(html,/role="group" aria-label="Choose which home/);
  for(const name of destinations){
    const occurrence=[...html.matchAll(new RegExp('data-go="'+name+'"','g'))].length;
    assert.ok(occurrence>=2,name+' requires desktop and mobile access');
  }
  assert.match(css,/@media\(max-width:750px\)/);
  assert.match(css,/\.room-objects-mobile\{display:grid/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(html,/room-world\.css/);
  assert.match(html,/room-world\.js/);
});
test('all root JavaScript files compile',()=>{
  for(const file of fs.readdirSync(path.join(root,'js')).filter(x=>x.endsWith('.js'))){
    assert.doesNotThrow(()=>new vm.Script(read('js/'+file),{filename:file}),file);
  }
});
test('service worker pre-caches new room resources',()=>{
  const sw=read('service-worker.js');
  for(const item of ['room-world.css','js/room-world.js'])assert.ok(sw.includes(item),item);
});
