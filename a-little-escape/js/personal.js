/* MAHA | Phase 3. Local-first content rooms; no accounts, no telemetry. */
const $=selector=>document.querySelector(selector);
const storageKey="maha-escape-personal-v1";
const getState=()=>{try{return JSON.parse(localStorage.getItem(storageKey)||"{}")}catch{return {}}};
let volatile={};
function read(key,otherwise){const s={...getState(),...volatile};return s[key]??otherwise}
function remember(key,value){volatile[key]=value;try{const s=getState();s[key]=value;localStorage.setItem(storageKey,JSON.stringify(s))}catch{}}
const esc=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let notes={moods:{},surgery:{}},letters=[],postcards=[],config={surgeryDate:null,contactEmail:null};
let currentMood="okay",openedCard=null;
const zones={great:"Great",okay:"Okay",tired:"Tired",heavy:"Heavy",missing_home:"Missing home"};
async function json(file,fallback){try{const response=await fetch("./content/"+file);if(!response.ok)throw new Error(file);return await response.json()}catch{return fallback}}
function period(){const h=Number(new Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Kuwait",hour:"numeric",hour12:false}).format(new Date()))%24;return h<11?"morning":h<17?"afternoon":h<21?"evening":"night"}
const introductions={morning:"A little note for this morning.",afternoon:"For this part of the day.",evening:"One for the evening.",night:"A quiet one for tonight."};
function shuffle(items){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function nextNote(mood){const all=notes.moods[mood]||[];if(!all.length)return "The note counter is having a tea break.";let queue=read("queue-"+mood,[]).filter(i=>Number.isInteger(i)&&i>=0&&i<all.length);
if(queue.length===0){const last=read("last-"+mood,null);queue=shuffle(all.map((_,i)=>i));if(queue.length>1&&queue[0]===last){[queue[0],queue[1]]=[queue[1],queue[0]]}}
const index=queue.shift();remember("queue-"+mood,queue);remember("last-"+mood,index);return all[index]}
function drawNote(){const p=period();$("#noteTime").textContent=introductions[p];$("#noteText").textContent=nextNote(currentMood);$("#moodSeen").textContent=(15-(read("queue-"+currentMood,[]).length))+" / 15 IN THIS ROUND";$("#notesTitle").textContent=zones[currentMood]||"How's today?";document.querySelectorAll("[data-mood]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.mood===currentMood)))}
function enter(room){window.mahaNavigate?.(room)}
function stamp(id){const list=read("stamps",[]);if(!list.includes(id)){remember("stamps",[...list,id]);renderSaved()}}
function renderLetters(){const grid=$("#lettersGrid");grid.innerHTML=letters.map(l=>'<button type="button" class="paper-letter" data-letter="'+esc(l.id)+'"><span>'+esc(l.stamp)+'</span><strong>'+esc(l.title)+'</strong><small>OPEN LETTER ↗</small></button>').join("")}
function openLetter(id){const l=letters.find(v=>v.id===id);if(!l)return;$("#openLetter").hidden=false;$("#letterName").textContent=l.title;$("#letterStamp").textContent=l.stamp;const paragraphs=$("#letterBody");paragraphs.replaceChildren(...l.body.map(t=>{const p=document.createElement("p");p.textContent=t;return p}));stamp("letter-"+id);$("#openLetter").scrollIntoView({block:"nearest",behavior:"auto"});$("#letterClose").focus()}
function renderCards(){const rack=$("#postcardRack");rack.innerHTML=postcards.map(p=>'<button class="postcard-thumb" type="button" data-card="'+esc(p.id)+'" style="--card-color:'+esc(p.color)+'"><span>POSTCARD / '+esc(p.place.toUpperCase())+'</span><strong>'+esc(p.place)+'</strong><small>'+esc(p.caption)+'</small></button>').join("")}
function openCard(id){const p=postcards.find(v=>v.id===id);if(!p)return;openedCard=id;$("#cardFace").hidden=false;$("#cardPlace").textContent=p.place;$("#cardCaption").textContent=p.caption;$("#cardMessage").textContent=p.message;$("#cardFace").style.setProperty("--card-color",p.color);$("#savePostcard").textContent=read("keptCards",[]).includes(id)?"Kept in your rack ✓":"Keep this postcard ♡";stamp("postcard-"+id);$("#cardFace").scrollIntoView({block:"nearest",behavior:"auto"});}
function renderSaved(){const saved=read("keptCards",[]),stamps=read("stamps",[]);$("#keptCount").textContent=saved.length+" postcards kept";$("#stampCount").textContent=stamps.length+" stamps collected";$("#collectionList").textContent=saved.length?"Saved postcards: "+saved.map(id=>postcards.find(p=>p.id===id)?.place||id).join(" · "):"No postcards kept yet. Choose any you like."}
function kuwaitDay(date){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kuwait",year:"numeric",month:"2-digit",day:"2-digit"}).format(date)}
function dayNumber(value){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(value||"");if(!m)return null;const d=Date.UTC(+m[1],+m[2]-1,+m[3]);const actual=new Date(d);if(actual.getUTCFullYear()!==+m[1]||actual.getUTCMonth()!==+m[2]-1||actual.getUTCDate()!==+m[3])return null;return Math.floor(d/86400000)}
function showSurgery(){const scheduled=dayNumber(config.surgeryDate);const today=dayNumber(kuwaitDay(new Date()));const d=scheduled===null?null:today-scheduled;let phase=null;
if(d!==null){if(d>=-7&&d<0)phase="before";else if(d===0)phase="day";else if(d>=1&&d<=14)phase="recovering"}
const area=$("#quietSpecial");area.hidden=!phase;if(!phase)return;
const entries=notes.surgery[phase]||[];$("#specialTitle").textContent={before:"A little note for this week",day:"A quiet note for today",recovering:"For the days after"}[phase];
const seed=String(kuwaitDay(new Date())).split("-").reduce((x,y)=>x+Number(y),0);$("#specialBody").textContent=entries.length?entries[seed%entries.length]:"A quiet place, with no expectations."}
function saveFuture(){const txt=$("#futureText").value.slice(0,3000);remember("futureNote",txt);$("#futureStatus").textContent=txt?"Saved on this device. Export a backup if it matters to you.":"Your note is cleared."}
function exportFuture(){const b=new Blob([$("#futureText").value],{type:"text/plain;charset=utf-8"});const url=URL.createObjectURL(b);const a=document.createElement("a");a.href=url;a.download="maha-note-to-future-me.txt";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
function sendMessage(){const text=$("#letterToMe").value.trim();if(!text){$("#sendStatus").textContent="Write a little something first.";return}
const email=config.contactEmail;if(email&&/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){window.location.href="mailto:"+encodeURIComponent(email)+"?subject="+encodeURIComponent("A postcard from Maha")+"&body="+encodeURIComponent(text);$("#sendStatus").textContent="An email draft should open. Nothing was sent automatically."}else{navigator.clipboard?.writeText(text).then(()=>$("#sendStatus").textContent="Copied. Paste it into your message to me.").catch(()=>$("#sendStatus").textContent="Please copy this note to send it; no recipient address is configured.");if(!navigator.clipboard)$("#sendStatus").textContent="Please copy this note to send it; no recipient address is configured."}}
function initEvents(){
window.addEventListener("maha:scene",e=>{const room=e.detail?.id;if(room==="chaiRoom")drawNote();if(room==="quietRoom")showSurgery();if(room==="postRoom")renderSaved()});
document.querySelectorAll("[data-room-hub]").forEach(b=>b.addEventListener("click",()=>window.mahaNavigate?.("hub")));
$("#moods").addEventListener("click",e=>{const b=e.target.closest("[data-mood]");if(!b)return;currentMood=b.dataset.mood;remember("mood",currentMood);drawNote();stamp("mood-"+currentMood)});
$("#anotherNote").addEventListener("click",drawNote);
$("#lettersGrid").addEventListener("click",e=>{const b=e.target.closest("[data-letter]");if(b)openLetter(b.dataset.letter)});
$("#letterClose").addEventListener("click",()=>{$("#openLetter").hidden=true;$("#lettersGrid").querySelector("button")?.focus()});
$("#postcardRack").addEventListener("click",e=>{const b=e.target.closest("[data-card]");if(b)openCard(b.dataset.card)});
$("#savePostcard").addEventListener("click",()=>{if(!openedCard)return;const l=read("keptCards",[]);if(!l.includes(openedCard))remember("keptCards",[...l,openedCard]);openCard(openedCard);renderSaved()});
$("#saveFuture").addEventListener("click",saveFuture);$("#exportFuture").addEventListener("click",exportFuture);
$("#sendToMe").addEventListener("click",sendMessage);
$("#rainToggle").addEventListener("click",()=>{const v=$("#rainToggle").getAttribute("aria-pressed")!=="true";$("#rainToggle").setAttribute("aria-pressed",String(v));$("#rainToggle").textContent=v?"Pause rain motion":"Watch rain on glass";$("#restWindow").classList.toggle("rain-active",v)});
$("#breathToggle").addEventListener("click",()=>{const v=$("#breathToggle").getAttribute("aria-pressed")!=="true";$("#breathToggle").setAttribute("aria-pressed",String(v));$("#breathToggle").textContent=v?"Pause breathing visual":"Start breathing visual";$("#breathCircle").classList.toggle("breath-active",v)});
$("#tinyBored").addEventListener("click",()=>{const a=["Look for something in the room that's the same colour as a flower.","Invent the least convincing name for a railway company.","Decide which snack deserves its own national holiday.","Name three places you'd photograph just for yourself.","Pretend this is a serious game. Congratulations, you won."];$("#boredResult").textContent=a[Math.floor(Math.random()*a.length)];stamp("bored")});
$("#hubExtrasPhase3").addEventListener("click",e=>{const b=e.target.closest("[data-special-room]");if(b)enter(b.dataset.specialRoom)});
}
async function init(){[notes,letters,postcards,config]=await Promise.all([json("notes.json",{moods:{},surgery:{}}),json("letters.json",[]),json("postcards.json",[]),json("config.json",{surgeryDate:null})]);currentMood=read("mood","okay");if(!zones[currentMood])currentMood="okay";
renderLetters();renderCards();renderSaved();$("#futureText").value=read("futureNote","");
initEvents();
}
init();
