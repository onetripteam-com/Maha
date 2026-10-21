import {readFileSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';

const root=dirname(dirname(fileURLToPath(import.meta.url)));
const read=path=>readFileSync(join(root,path),'utf8');
const html=read('index.html');
const javascript=['js/app.js','js/train.js','js/personal.js','js/play.js','js/finish.js','sw.js'];
const sceneNames=['hug','flowers','platform','train','station','hub','chaiRoom','postRoom','quietRoom','vlogRoom','arcadeRoom'];

test('JavaScript modules compile',()=>{
 for(const path of javascript)assert.doesNotThrow(()=>new vm.Script(read(path),{filename:path}),path);
});

test('all named scenes exist exactly once',()=>{
 for(const id of sceneNames){
  const found=[...html.matchAll(new RegExp('id="'+id+'"','g'))];
  assert.equal(found.length,1,id);
 }
});

test('selectors referenced by scripts have matching IDs',()=>{
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 for(const path of javascript){for(const match of read(path).matchAll(/\$\("#([\w-]+)(?:"|\s)/g))assert.ok(ids.has(match[1]),path+' missing #'+match[1]);}
});

test('editable content counts and surgery notes',()=>{
 const n=JSON.parse(read('content/notes.json'));
 for(const mood of ['great','okay','tired','heavy','missing_home'])assert.equal(n.moods[mood].length,15,mood);
 for(const phase of ['before','day','recovering'])assert.ok(n.surgery[phase].length>=4&&n.surgery[phase].length<=6,phase);
 assert.equal(JSON.parse(read('content/flowers.json')).length,7);
 assert.equal(JSON.parse(read('content/stations.json')).length,6);
 assert.equal(JSON.parse(read('content/letters.json')).length>=6,true);
 assert.equal(JSON.parse(read('content/postcards.json')).length>=8,true);
});
test('metadata and configuration',()=>{
 const cfg=JSON.parse(read('content/config.json'));
 assert.equal(cfg.SURGERY_DATE,null,'Surgery messages default to disabled');
 const manifest=JSON.parse(read('manifest.webmanifest'));
 assert.equal(manifest.start_url,'./');
 assert.ok(html.includes('name="robots" content="noindex'));
 assert.ok(html.includes('rel="manifest"'));
});

test('route and sound safety guards',()=>{
 const app=read('js/app.js');
 for(const id of sceneNames)assert.ok(app.includes('"'+id+'"'),'missing scene route '+id);
 const train=read('js/train.js');
 for(const name of ['vlogRoom','arcadeRoom','postRoom','chaiRoom','quietRoom'])assert.ok(train.includes(name),'missing station room '+name);
 const audio=read('js/finish.js');
 assert.match(audio,/enabled=false/);
 assert.match(audio,/soundToggle/);
 assert.doesNotMatch(html,/autoplay(?!\s*=\s*["']?false)/i);
});

test('offline shell covers existing local files',()=>{
 const sw=read('sw.js');
 for(const required of ['content/notes.json','js/personal.js','js/play.js','css/finish.css','assets/icon.svg'])assert.ok(sw.includes(required));
 assert.ok(read('manifest.webmanifest').includes('assets/icon.svg'));
});

console.log('MAHA smoke checks loaded. Run with: node --test tests/smoke.mjs');
