const qs=(s)=>document.querySelector(s);
const STORE="maha-escape-phase1-v1";
const prefersReduced=window.matchMedia("(prefers-reduced-motion: reduce)");
const safe={get(k){try{return JSON.parse(localStorage.getItem(STORE)||"{}")[k]}catch{return undefined}},set(k,v){try{const o=JSON.parse(localStorage.getItem(STORE)||"{}");o[k]=v;localStorage.setItem(STORE,JSON.stringify(o))}catch{}}};
const sceneIds=["hug","flowers","platform","train","station","hub","chaiRoom","postRoom","quietRoom","vlogRoom","arcadeRoom"];
function showScene(id){if(!sceneIds.includes(id))return;const swap=()=>{for(const name of sceneIds)qs("#"+name).hidden=name!==id;window.scrollTo({top:0,behavior:"instant"});safe.set("lastScene",id);const title=qs("#"+id+" h1,#"+id+" h2");if(title){title.setAttribute("tabindex","-1");title.focus({preventScroll:true})}};if(document.startViewTransition&&!prefersReduced.matches&&!document.documentElement.classList.contains("manual-reduce")){try{document.startViewTransition(swap)}catch{swap()}}else swap()}
window.mahaNavigate=showScene;
const reducedToggle=qs("#motionToggle");const savedReduce=!!safe.get("reduceMotion");document.documentElement.classList.toggle("manual-reduce",savedReduce);reducedToggle.setAttribute("aria-pressed",String(savedReduce));reducedToggle.addEventListener("click",()=>{const next=!document.documentElement.classList.contains("manual-reduce");document.documentElement.classList.toggle("manual-reduce",next);safe.set("reduceMotion",next);reducedToggle.setAttribute("aria-pressed",String(next));reducedToggle.textContent=next?"Full motion":"Reduce motion"});
const noLines=[
"Okay. Understood. I know you don't want hugs from me. Get them from your friends. Bye.",
"Rejected twice. The hug department has been informed.",
"Fine. I'm converting this hug into a formal handshake.",
"Handshake rejected too? Tough crowd, Maha.",
"At this point, even the cartoon arms have resigned.",
"Okay, okay. No physical affection. Flowers? Those don't have arms."
];
let nos=Number(safe.get("noCount")||0);let goodbyeTimer;
function finishHug(accepted){
 clearTimeout(goodbyeTimer);
 qs("#hugActions").hidden=true;
 qs("#hugResult").hidden=false;
 qs("#embrace").hidden=!accepted;
 qs("#hugReceipt").hidden=!accepted;
 qs("#tryAgain").hidden=false;
 if(accepted){qs("#reaction").textContent="Delivered. Squeeze level: maximum. Don't tell anyone.";qs("#toFlowers").textContent="There's something else for you →";return}
 nos=Math.min(nos+1,6);safe.set("noCount",nos);
 qs("#reaction").textContent=noLines[nos-1];
 qs("#toFlowers").textContent="Fine. Show me the flowers →";
 if(nos===1){
   qs("#toFlowers").hidden=true;
   qs("#tryAgain").hidden=true;
   goodbyeTimer=setTimeout(()=>{qs("#reaction").textContent="…Wait. Before you go, I have something for you.";qs("#toFlowers").hidden=false;qs("#tryAgain").hidden=false},reducedMotion()?700:2200);
 }else{qs("#toFlowers").hidden=false}
}
function reducedMotion(){return prefersReduced.matches||document.documentElement.classList.contains("manual-reduce")}
qs("#yesHug").addEventListener("click",()=>finishHug(true));
qs("#noHug").addEventListener("click",()=>finishHug(false));
qs("#tryAgain").addEventListener("click",()=>{clearTimeout(goodbyeTimer);qs("#hugResult").hidden=true;qs("#hugActions").hidden=false});
qs("#toFlowers").addEventListener("click",()=>{showScene("flowers");renderFlowers()});
qs("#returnHug").addEventListener("click",()=>showScene("hug"));
qs("#visitBouquet").addEventListener("click",()=>showScene("flowers"));
let flowers=[],count=0;
const ns="http://www.w3.org/2000/svg";
function svg(tag,props={},children=[]){const el=document.createElementNS(ns,tag);for(const [k,v] of Object.entries(props))el.setAttribute(k,String(v));for(const c of children)el.appendChild(c);return el}
function itemGroup(f,i){
 const slots=[[-120,-75],[-60,-110],[7,-92],[76,-112],[131,-68],[-37,-163],[40,-169]];
 const [x,y]=slots[i];const gx=260+x,gy=221+y;
 const group=svg("g",{"class":"bloom-item",style:"transform-origin:"+gx+"px "+gy+"px"});
 const stem=svg("path",{d:"M "+gx+" "+gy+" Q "+(gx-12)+" "+(gy+135)+" 260 431",stroke:"#58755b","stroke-width":7,fill:"none","stroke-linecap":"round"});
 group.appendChild(stem);
 group.appendChild(svg("path",{d:"M "+(gx-7)+" "+(gy+82)+" q -43 -43 -60 -8 q 32 24 60 8",fill:"#72885d"}));
 group.appendChild(svg("path",{d:"M "+(gx+6)+" "+(gy+100)+" q 46 -45 59 -6 q -32 27 -59 6",fill:"#4e785b"}));
 const head=svg("g",{transform:"translate("+gx+" "+gy+")"});
 const petals=f.petals;
 for(let p=0;p<petals;p++){
  const angle=p*360/petals;
  const small=f.id==="jasmine"?17:f.id==="hibiscus"?32:23;
  const radius=f.id==="sunflower"?22:18;
  head.appendChild(svg("ellipse",{cx:0,cy:-radius,rx:small*.62,ry:small,fill:f.color,stroke:"#725e4b","stroke-opacity":".1","stroke-width":"1.5",transform:"rotate("+angle+")"}));
 }
 head.appendChild(svg("circle",{r:f.id==="sunflower"?21:13,fill:f.inner,stroke:"#765d43","stroke-width":"1.5","stroke-opacity":".3"}));
 head.appendChild(svg("circle",{cx:-4,cy:-3,r:3,fill:"#fff4da","fill-opacity":".54"}));
 group.appendChild(head);return group
}
function wrapping(){
 const g=svg("g",{id:"bouquetWrapper"});
 g.appendChild(svg("path",{d:"M 107 278 Q 170 330 253 451 Q 340 355 417 280 L 355 482 Q 260 523 168 481 Z",fill:"#d1aa82",stroke:"#aa8365","stroke-width":2}));
 g.appendChild(svg("path",{d:"M 111 288 Q 205 347 253 453 L 162 469 Z",fill:"#e6c6a0"}));
 g.appendChild(svg("path",{d:"M 412 287 Q 326 346 253 453 L 352 473 Z",fill:"#edd4af"}));
 g.appendChild(svg("path",{d:"M 211 446 Q 260 462 315 444",fill:"none",stroke:"#b55d50","stroke-width":19,"stroke-linecap":"round"}));
 g.appendChild(svg("path",{d:"M 260 452 C 195 405 200 484 260 452 C 330 411 323 491 260 452",fill:"none",stroke:"#b95f4d","stroke-width":12}));
 g.appendChild(svg("path",{d:"M 260 456 L 235 502 M 260 456 L 290 501",stroke:"#b95f4d","stroke-width":9,"stroke-linecap":"round"}));
 const tag=svg("g",{transform:"translate(310 425) rotate(11)"});
 tag.appendChild(svg("rect",{width:99,height:33,rx:2,fill:"#f6ebd6",stroke:"#c4ad91"}));
 const text=svg("text",{x:8,y:21,"font-family":"Georgia,serif","font-size":12,fill:"#425a46"});text.textContent="For Dr. Maha";tag.appendChild(text);g.appendChild(tag);return g
}
function renderFlowers(){
 const art=qs("#bouquetArtwork");art.replaceChildren();
 if(count===0){const prompt=svg("text",{x:260,y:255,"text-anchor":"middle","font-family":"Georgia,serif","font-size":"20",fill:"#9a8875"});prompt.textContent="A bouquet, waiting to happen.";art.appendChild(prompt)}
 flowers.slice(0,count).forEach((f,i)=>art.appendChild(itemGroup(f,i)));
 if(count===7)art.appendChild(wrapping());
 const next=flowers[count];
 qs("#flowerCount").textContent=count+" / 7";qs("#progress").setAttribute("aria-valuenow",String(count));qs("#progressFill").style.width=(count/7*100)+"%";
 qs("#giveFlower").hidden=count===7;qs("#downloadBouquet").hidden=count!==7;qs("#replayFlowers").hidden=count!==7;
 qs("#flowerNumber").innerHTML=count===7?"07 <small>/ 07</small>":String(count+1).padStart(2,"0")+" <small>/ 07</small>";
 qs("#flowerCategory").textContent=count===7?"DELIVERY COMPLETE":"UP NEXT · FLOWER "+(count+1);
 qs("#flowerName").textContent=count===7?"All yours.":next?.name||"";
 qs("#flowerMeaning").textContent=count===7?"Seven flowers, zero obligations. Keep them for any kind of day.":next?.meaning||"";
 qs("#flowerHint").textContent=count===7?"Bouquet complete. You can download it, or make another.":"No floristry qualifications required.";
}
function drift(){
 if(reducedMotion())return;
 const box=qs("#petals");box.replaceChildren();
 for(let i=0;i<9;i++){const p=document.createElement("span");p.className="petal";p.style.left=(30+Math.random()*43)+"%";p.style.top=(27+Math.random()*30)+"%";p.style.background=["#e8b34c","#e1a49b","#efddc7"][i%3];p.style.setProperty("--dx",(Math.random()*220-110)+"px");p.style.setProperty("--dy",(150+Math.random()*140)+"px");p.style.animationDelay=(i*.07)+"s";box.append(p)}
 setTimeout(()=>box.replaceChildren(),3200)
}
qs("#giveFlower").addEventListener("click",()=>{
 if(count>=7)return;count++;safe.set("bouquetCount",count);renderFlowers();drift();
 if(count===7){safe.set("bouquetComplete",true);setTimeout(()=>showScene("platform"),reducedMotion()?700:3200)}
});
qs("#replayFlowers").addEventListener("click",()=>{count=0;safe.set("bouquetCount",0);renderFlowers()});
qs("#downloadBouquet").addEventListener("click",async()=>{
 const original=qs("#bouquetSvg"),clone=original.cloneNode(true);
 clone.setAttribute("xmlns",ns);clone.setAttribute("width","1040");clone.setAttribute("height","1060");
 clone.setAttribute("viewBox","0 0 520 530");
 const bg=svg("rect",{width:520,height:530,fill:"#eee3cd"});clone.insertBefore(bg,clone.firstChild);
 const xml=new XMLSerializer().serializeToString(clone);const url=URL.createObjectURL(new Blob([xml],{type:"image/svg+xml;charset=utf-8"}));
 const canvas=document.createElement("canvas");canvas.width=1040;canvas.height=1060;
 const img=new Image();img.onload=()=>{const ctx=canvas.getContext("2d");ctx.drawImage(img,0,0,canvas.width,canvas.height);URL.revokeObjectURL(url);canvas.toBlob(blob=>{if(!blob){alert("Image export unavailable in this browser.");return}const png=URL.createObjectURL(blob);const a=document.createElement("a");a.href=png;a.download="for-dr-maha-bouquet.png";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(png),3000)},"image/png")};
 img.onerror=()=>{URL.revokeObjectURL(url);alert("Could not create bouquet image.")};img.src=url
});
async function init(){
 try{const res=await fetch("./content/flowers.json");if(!res.ok)throw Error("Flower data missing");flowers=await res.json()}catch{flowers=[{name:"Daisy",color:"#f7f0d5",inner:"#e9ac46",petals:11,meaning:"A little flower for Maha."}];qs("#flowerHint").textContent="Some flower content could not be loaded. Try refreshing online."}
 count=Math.min(Number(safe.get("bouquetCount")||0),flowers.length);
 if(flowers.length!==7){qs("#giveFlower").disabled=true;return}
 renderFlowers();
 // Returning visitors enter through the station lobby (handled by train.js).
}
init();
