/* Browser/device viewport regression tests. Requires playwright and Chromium.
   Run: node tests/room-world-visual.cjs
*/
'use strict';
const {chromium} = require('playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname,'..');
const out=path.join(root,'tests','screenshots');
fs.mkdirSync(out,{recursive:true});
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.webmanifest':'application/manifest+json'};
const server = http.createServer((req,res)=>{
  const url = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const normalized = path.normalize(url).replace(/^[/\\]+/,'');
  const requested=path.resolve(root,normalized||'index.html');
  if(!requested.startsWith(root+path.sep) && requested!==root){res.writeHead(403);res.end();return;}
  fs.readFile(requested,(err,buffer)=>{
    if(err){res.writeHead(404);res.end();return;}
    res.writeHead(200,{'Content-Type':types[path.extname(requested)]||'application/octet-stream'});
    res.end(buffer);
  });
});
async function run(){
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const port=server.address().port,url='http://127.0.0.1:'+port+'/';
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    for(const size of [{width:360,height:740},{width:393,height:852},{width:402,height:874},{width:768,height:1024},{width:1440,height:900},{width:1920,height:1080}]){
      const context=await browser.newContext({viewport:size,deviceScaleFactor:1,reducedMotion:'reduce'});
      const page=await context.newPage(),errors=[];
      page.on('pageerror',error=>errors.push(error.message));
      await page.addInitScript(()=>{
        try{localStorage.setItem('maha-little-elsewhere-v1',JSON.stringify({visits:2}));}catch(_){}
      });
      await page.goto(url,{waitUntil:'networkidle'});
      await page.waitForSelector('#room-art svg');
      const dims=await page.evaluate(()=>({width:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,svg:document.querySelectorAll('#room-art svg').length}));
      assert.ok(dims.width <= dims.client+2,size.width+'px overflow: '+JSON.stringify(dims));
      assert.equal(dims.svg,1,'room illustration should be loaded');
      assert.equal(errors.length,0,'JavaScript errors '+size.width+': '+errors.join(' | '));
      for(const room of ['monsoon','dusk','sunday','coast','library','cabin']){
        await page.locator('[data-room="'+room+'"]').click();
        assert.equal(await page.locator('#scene-home').getAttribute('data-room-theme'),room);
        assert.equal(await page.locator('[data-room="'+room+'"]').getAttribute('aria-pressed'),'true');
      }
      await page.locator('[data-room="monsoon"]').click();
      const file=path.join(out,'home-'+size.width+'.png');
      await page.screenshot({path:file,fullPage:size.width<=402});
      if(size.width<=402){
        const mobile=page.locator('.room-mobile-door[data-go="garden"]');
        assert.equal(await mobile.isVisible(),true);
        await mobile.click();
        assert.equal(await page.locator('#scene-garden').isVisible(),true);
        await page.locator('#scene-garden .back-link').click();
        assert.equal(await page.locator('#scene-home').isVisible(),true);
      }else if(size.width>=1440){
        await page.locator('.room-object[data-go="mail"]').click();
        assert.equal(await page.locator('#scene-mail').isVisible(),true);
        await page.locator('#scene-mail .back-link').click();
        assert.equal(await page.locator('#scene-home').isVisible(),true);
        await page.locator('[data-room="library"]').click();
        await page.screenshot({path:path.join(out,'home-library-'+size.width+'.png')});
      }
      console.log('PASS '+size.width+'x'+size.height+' — six homes, overflow, navigation, no JS errors');
      await context.close();
    }
  }finally{await browser.close();}
}
run().then(()=>server.close(),error=>{console.error(error);server.close();process.exitCode=1;});
