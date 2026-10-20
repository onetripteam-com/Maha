const $=s=>document.querySelector(s);
const storageKey="maha-escape-phase1-v1";
const store={get(k){try{return JSON.parse(localStorage.getItem(storageKey)||"{}")[k]}catch{return undefined}},set(k,v){try{const obj=JSON.parse(localStorage.getItem(storageKey)||"{}");obj[k]=v;localStorage.setItem(storageKey,JSON.stringify(obj))}catch{}}};
const fallback=[
{id:"vlog",name:"Vlog Platform",number:"01",place:"KERALA BACKWATERS",subtitle:"Camera ready. Confidence optional.",description:"Your tiny filming platform.",hint:"OPENING IN PHASE 4",symbol:"◫"},
{id:"arcade",name:"Arcade Carriage",number:"02",place:"BANGALORE AFTER RAIN",subtitle:"Terrible prizes. Excellent nonsense.",description:"A carriage full of games.",hint:"GAMES ARRIVE IN PHASE 4",symbol:"♠"},
{id:"post",name:"Post Office",number:"03",place:"KUWAIT GOLDEN HOUR",subtitle:"Some things travel better on paper.",description:"Letters, stamps, postcards.",hint:"LETTERS ARRIVE IN PHASE 3",symbol:"✉"},
{id:"chai",name:"Chai Stall",number:"04",place:"MOUNTAIN MIST",subtitle:"Any kind of day is welcome.",description:"No compulsory good moods.",hint:"MOOD NOTES ARRIVE IN PHASE 3",symbol:"☕"},
{id:"quiet",name:"Quiet Carriage",number:"05",place:"RAIN ON GLASS",subtitle:"No timetable. No expectations.",description:"A window and a little quiet.",hint:"REST ROOM ARRIVES IN PHASE 3",symbol:"☂"},
{id:"last",name:"Last Station",number:"06",place:"SOMEWHERE NICE",subtitle:"The destination was never the point.",description:"This place doesn't expire.",hint:"WELCOME BACK, ANYTIME",symbol:"✳"}];
let stations=fallback,activeIndex=0,pending=false;
const reduced=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches||document.documentElement.classList.contains("manual-reduce");
const escapeHTML=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const navi=id=>window.mahaNavigate?.(id);
function gotoStation(id){
 const s=stations.find(x=>x.id===id);if(!s)return;
 const panel=$("#station");$("#stationEyebrow").textContent="STOP "+s.number+" / "+s.place;
 $("#stationName").textContent=s.name;$("#stationSubtitle").textContent=s.subtitle;
 $("#stationDescription").textContent=s.description;$("#stationHint").textContent=s.hint;
 $("#stationSymbol").textContent=s.symbol;
 $("#stationLast").hidden=s.id!=="last";$("#stationFuture").hidden=s.id==="last";$("#stationFinish").hidden=s.id!=="last";
 panel.dataset.station=id;
 store.set("lastStation",id);navi("station");
}
function initCards(){
 $("#trainStops").innerHTML=stations.map((s,i)=>`<article class="stop-card" data-stop="${escapeHTML(s.id)}" style="--i:${i}"><span class="stop-index">PLATFORM ${s.number} — ${escapeHTML(s.place)}</span><div class="stop-card-row"><span class="stop-icon" aria-hidden="true">${escapeHTML(s.symbol)}</span><h3>${escapeHTML(s.name)}</h3></div><p>${escapeHTML(s.subtitle)}</p><button class="button button-green" data-open-stop="${escapeHTML(s.id)}" type="button">Step off here <span aria-hidden="true">↗</span></button></article>`).join("");
 $("#hubDoors").innerHTML=stations.map(s=>`<button type="button" class="hub-door" data-open-stop="${escapeHTML(s.id)}"><span>${s.number} / ${escapeHTML(s.place)}</span><strong>${escapeHTML(s.name)}</strong><small>${escapeHTML(s.subtitle)} →</small></button>`).join("");
}
function updateKuwait(){
 try{const now=new Date();const fmt=new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kuwait",weekday:"long",hour:"numeric",minute:"2-digit",hour12:false});const str=fmt.format(now);$("#kuwaitClock").textContent=str+" · KUWAIT";const hour=Number(new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Kuwait",hour:"numeric",hour12:false}).format(now))%24;$("#todayCopy").textContent=hour<11?"Good morning, Dr. Maha. Management has no important announcements.":hour<17?"Today's timetable: absolutely no compulsory activities.":hour<21?"Evening service: tea, tiny detours and terrible jokes.":"Late-night departures are optional. The station is still yours."}catch{$("#kuwaitClock").textContent="KUWAIT STATION"}}
function landscape(){
 const journey=$("#train");if(journey.hidden||!journey.isConnected)return;
 const rect=$("#trainRoute").getBoundingClientRect();
 const height=Math.max(1,$("#trainRoute").offsetHeight-window.innerHeight);
 const p=Math.max(0,Math.min(1,-rect.top/height));
 const idx=Math.min(5,Math.floor(p*6));
 const scenes=["backwaters","raincity","goldenhour","mountains","rainwindow","clouds"];
 const windowEl=$("#landscape");windowEl.dataset.landscape=scenes[idx];
 $("#landscapeName").textContent=stations[idx].place;
 $("#mileMarker").textContent=String(Math.round(p*100)).padStart(2,"0")+"% OF THE WAY";
 $("#trainProgress").style.width=(p*100).toFixed(2)+"%";
 $("#trainProgressControl").setAttribute("aria-valuenow",String(Math.round(p*100)));
 const layers=journey.querySelectorAll(".parallax");
 if(!reduced())layers.forEach((layer,i)=>layer.style.transform=`translate3d(${(-p*([18,35,75][i]||32)).toFixed(1)}px,0,0)`);
 else layers.forEach(layer=>layer.style.transform="none");
 if(idx!==activeIndex){activeIndex=idx;$("#stopAnnouncement").textContent="Approaching "+stations[idx].name}
}
function requestUpdate(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;landscape()})}
function openTrain(){navi("train");requestAnimationFrame(landscape)}
function hub(){store.set("visited",true);navi("hub");updateKuwait()}
async function start(){
 try{const r=await fetch("./content/stations.json");if(r.ok){const data=await r.json();if(Array.isArray(data)&&data.length===6)stations=data}}catch{}
 initCards();updateKuwait();
 $("#boardTrain").addEventListener("click",openTrain);
 $("#boardHub").addEventListener("click",hub);
 $("#hubJourney").addEventListener("click",openTrain);
 $("#hubFlowers").addEventListener("click",()=>navi("flowers"));
 $("#trainHome").addEventListener("click",hub);
 $("#stationBack").addEventListener("click",()=>{navi("train");requestAnimationFrame(landscape)});
 $("#stationHub").addEventListener("click",hub);
 $("#stationFinish").addEventListener("click",hub);
 $("#ticketRide").addEventListener("click",openTrain);
 $("#trainStops").addEventListener("click",e=>{const b=e.target.closest("[data-open-stop]");if(b)gotoStation(b.dataset.openStop)});
 $("#hubDoors").addEventListener("click",e=>{const b=e.target.closest("[data-open-stop]");if(b)gotoStation(b.dataset.openStop)});
 window.addEventListener("scroll",requestUpdate,{passive:true});window.addEventListener("resize",requestUpdate,{passive:true});
 if(store.get("visited"))hub();
}
start();
