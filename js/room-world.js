/* MAHA — Six homes, six genuinely different spaces. Entirely local vector artwork. */
(function () {
  'use strict';
  var shell = document.getElementById('room-shell');
  var art = document.getElementById('room-art');
  var home = document.getElementById('scene-home');
  if (!shell || !art || !home) return;

  var themes = [
    {id:'monsoon',name:'The Monsoon House',little:'Kerala · rain on the windows',note:'The kettle is on. The rain can wait.',ink:'#274b43',accent:'#d69c5b'},
    {id:'dusk',name:'The Dusk Apartment',little:'Kuwait · the last golden hour',note:'The city slows down for a moment.',ink:'#6b4039',accent:'#cb785e'},
    {id:'sunday',name:'The Sunday Studio',little:'Bright · slightly chaotic',note:'A little colour never asked permission.',ink:'#46553c',accent:'#eb8d72'},
    {id:'coast',name:'The Blue House',little:'By the sea · windows wide open',note:'Somewhere, the waves are unbothered.',ink:'#28637b',accent:'#ebad70'},
    {id:'library',name:'The Midnight Library',little:'Books · a lamp left on',note:'One more chapter is always allowed.',ink:'#ddc2a2',accent:'#c49d68'},
    {id:'cabin',name:'The Mountain Cabin',little:'Pine trees · warm socks',note:'You can stay until the snow stops.',ink:'#3a5342',accent:'#ca825a'}
  ];
  var spaces = {
    monsoon:{garden:[170,560],mail:[795,555],cinema:[615,277],travel:[1056,615],arcade:[405,619],weather:[1040,283],curiosities:[1117,485]},
    dusk:{garden:[935,570],mail:[470,565],cinema:[633,286],travel:[1090,608],arcade:[348,614],weather:[155,279],curiosities:[1065,457]},
    sunday:{garden:[193,557],mail:[795,562],cinema:[587,274],travel:[1051,607],arcade:[393,620],weather:[1030,276],curiosities:[1100,454]},
    coast:{garden:[195,561],mail:[802,559],cinema:[570,287],travel:[1071,613],arcade:[380,617],weather:[1028,277],curiosities:[1103,470]},
    library:{garden:[165,553],mail:[758,562],cinema:[573,287],travel:[1065,606],arcade:[379,613],weather:[1050,290],curiosities:[1096,457]},
    cabin:{garden:[187,566],mail:[810,558],cinema:[578,278],travel:[1064,620],arcade:[386,613],weather:[1040,282],curiosities:[1100,470]}
  };
  var labels = {garden:'Flowers',mail:'Letters',cinema:'Cinema',travel:'Travel',arcade:'Games',weather:'Moods',curiosities:'Secrets'};
  function R(x,y,w,h,fill,rx,more){return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+(rx||0)+'" fill="'+fill+'" '+(more||'')+'/>';}
  function P(d,fill,stroke,width){return '<path d="'+d+'" fill="'+(fill||'none')+'" stroke="'+(stroke||'none')+'" stroke-width="'+(width||1)+'"/>';}
  function E(x,y,rx,ry,fill,more){return '<ellipse cx="'+x+'" cy="'+y+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" '+(more||'')+'/>';}
  function C(x,y,r,fill,more){return '<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" '+(more||'')+'/>';}
  function G(x,y,s,body,rotate){return '<g transform="translate('+x+' '+y+') rotate('+(rotate||0)+') scale('+(s||1)+')">'+body+'</g>';}
  function L(x1,y1,x2,y2,colour,width,more){return '<path d="M'+x1+' '+y1+'L'+x2+' '+y2+'" stroke="'+colour+'" stroke-width="'+(width||1)+'" '+(more||'')+'/>';}
  function D(){return '<defs>'+
    '<linearGradient id="wall" x2="0.9" y2="1"><stop stop-color="#f7ead7"/><stop offset="1" stop-color="#b9d5c5"/></linearGradient>'+
    '<linearGradient id="warm" x2="0" y2="1"><stop stop-color="#fff5df"/><stop offset="1" stop-color="#eac4a7"/></linearGradient>'+
    '<linearGradient id="pink" x2="1" y2="1"><stop stop-color="#fae7d7"/><stop offset="1" stop-color="#d58e81"/></linearGradient>'+
    '<linearGradient id="sea" x2="0" y2="1"><stop stop-color="#7eb8c8"/><stop offset=".6" stop-color="#b9e0d9"/><stop offset=".61" stop-color="#4b92a9"/><stop offset="1" stop-color="#27819b"/></linearGradient>'+
    '<linearGradient id="night" x2="0" y2="1"><stop stop-color="#17253c"/><stop offset="1" stop-color="#564f73"/></linearGradient>'+
    '<linearGradient id="wood" x2="0" y2="1"><stop stop-color="#c48d59"/><stop offset="1" stop-color="#704b36"/></linearGradient>'+
    '<linearGradient id="snow" x2="0" y2="1"><stop stop-color="#93b6c7"/><stop offset="1" stop-color="#f9f6e9"/></linearGradient>'+
    '<radialGradient id="sun"><stop stop-color="#fff0ba" stop-opacity=".9"/><stop offset="1" stop-color="#ffe4aa" stop-opacity="0"/></radialGradient>'+
    '<filter id="soft"><feGaussianBlur stdDeviation="15"/></filter>'+
    '<filter id="shade"><feDropShadow dx="0" dy="13" stdDeviation="14" flood-opacity=".18"/></filter>'+
    '<pattern id="tile" width="76" height="52" patternUnits="userSpaceOnUse">'+L(0,50,76,50,'#ffffff50',2)+L(0,0,0,52,'#ffffff25',1)+'</pattern>'+
    '<pattern id="grain" width="82" height="70" patternUnits="userSpaceOnUse">'+C(21,19,.7,'#ffffff66')+C(48,54,.8,'#493a3033')+C(73,33,.6,'#ffffff52')+'</pattern>'+
    '</defs>';}
  function bouquet(colour){
    return P('M0 30Q-6-8-36-56 M0 30Q4-30 19-78 M0 30Q20-9 46-48 M0 30Q-30-14-14-87','none','#527c59',4)+
      P('M-12-20Q-50-38-45-12Q-23 2-12-20 M12-24Q45-38 36-13Q17 4 12-24','#7da487')+
      [[-36,-56],[19,-78],[46,-48],[-14,-87]].map(function(p,i){return G(p[0],p[1],.8,C(0,0,15,colour)+E(-8,-7,10,17,colour,'transform="rotate(-38 -8 -7)"')+E(9,-8,10,17,colour,'transform="rotate(38 9 -8)"')+C(0,0,6,'#dbad62'));}).join('');
  }
  function object(type,colour){
    if(type==='garden')return E(0,37,49,12,'#241b1740')+bouquet(colour)+P('M-42 6L-29 53Q0 63 29 53L42 6Z','url(#wood)')+E(0,7,42,10,'#e2b180')+R(-25,17,50,5,'#ffffff44',3);
    if(type==='mail')return E(0,24,63,12,'#241b1737')+G(0,0,1,R(-59,-36,118,68,'#e9d2a9',7,'stroke="#b98e6d" stroke-width="3"')+P('M-57-34L0 8L57-34','none','#ba926e',3)+P('M-57 29L-9-7 M57 29L9-7','none','#cfad89',2)+C(0,5,10,'#be715d')+C(0,5,4,'#e8ba9d'),-8);
    if(type==='cinema')return E(0,69,109,13,'#27201f2e')+R(-115,-85,230,150,'#382d27',16,'filter="url(#shade)"')+R(-103,-73,206,126,'#eee1bf',9)+P('M-98 36Q-29-21 14 16T103-20V53H-103Z','#789a88')+C(68,-34,28,'#f8cc86')+P('M-69 55L-48 70H56L78 55','none','#715848',7)+C(-83,-54,5,'#fff5e2');
    if(type==='travel')return E(0,62,68,15,'#1d25253b')+R(-57,-64,114,121,colour,18,'stroke="#352f35" stroke-width="4" filter="url(#shade)"')+R(-15,-81,30,20,'none',7,'stroke="#403c32" stroke-width="6"')+L(-26,-57,-26,53,'#eed4af',6)+L(27,-57,27,53,'#eed4af',6)+R(-7,-15,32,20,'#fae5bb',3,'transform="rotate(-13)"')+C(46,-55,5,'#fff5dc');
    if(type==='arcade')return E(0,51,60,13,'#24212240')+R(-51,-57,102,110,'#e6d2a2',16,'stroke="#8f705d" stroke-width="5"')+R(-37,-41,74,62,'#314d55',7)+R(-27,-31,54,42,'#80afb4',5)+C(12,-8,11,'#fbdf95')+P('M-22 9L-4-6L12 3','none','#ddab82',4)+L(-30,36,-10,36,'#65584d',5)+L(-20,25,-20,46,'#65584d',5)+C(16,33,7,'#d67f76')+C(34,39,5,'#8aa596');
    if(type==='weather')return E(0,51,64,12,'#2118153d')+L(0,-100,0,46,'#9b7c55',8)+P('M-49-55L-28-113H28L50-55Z',colour,'#f7dbb2',2)+E(0,-55,49,7,'#b87956')+C(0,-52,15,'#f7d084')+E(0,-60,98,95,'url(#sun)')+R(-40,43,80,7,'#846047',3);
    if(type==='curiosities')return E(0,66,66,13,'#1c191b3b')+R(-56,-73,112,138,'url(#wood)',8,'stroke="#5c3d33" stroke-width="5"')+[-50,-8,34].map(function(y){return R(-45,y,90,33,'#bd8c61',3,'stroke="#705139" stroke-width="2"')+C(0,y+16,5,'#ecd2a3')}).join('')+R(-45,-66,90,10,'#dbc294',2);
    return '';
  }
  function commonObjects(id){
    var map=spaces[id],colour=id==='library'?'#caa16f':id==='coast'?'#4f90a9':id==='sunday'?'#ea9079':id==='cabin'?'#bc7e60':id==='dusk'?'#b97867':'#a36559';
    var list=['cinema','weather','curiosities','garden','arcade','mail','travel'];
    return list.map(function(type){
      var point=map[type], tint=type==='garden'?(id==='library'?'#e2a76a':id==='coast'?'#edb7ab':'#e4a5a8'):colour;
      return G(point[0],point[1],type==='cinema'?.82:type==='curiosities'?.78:1,object(type,tint),type==='travel'?-7:0);
    }).join('');
  }
  function clouds(y,colour){
    return '<g class="room-cloud">'+E(330,y,84,23,colour)+E(378,y-17,53,33,colour)+E(290,y-8,60,30,colour)+'</g>';
  }
  function bookcase(x,y,w,h){
    var s=R(x,y,w,h,'#53392f',8,'stroke="#b18455" stroke-width="8"');
    for(var row=0;row<4;row++){
      var yy=y+16+row*64;s+=R(x+12,yy+46,w-24,7,'#b48960',2);
      for(var i=0;i<12;i++){var col=['#c78f65','#749085','#b66f66','#d2b57c','#8e80a1','#ded2a2'][((i*7+row*3)%6)];
        var xx=x+16+i*((w-35)/12); s+=R(xx,yy+5,9+(i%3),38-(i%3)*4,col,1);
      }
    }
    return s;
  }
  function frame(inner){return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 760" role="presentation" aria-hidden="true">'+D()+inner+R(0,0,1200,760,'url(#grain)',0,'opacity=".28"')+'</svg>';}
  function monsoon(){
    var a=R(0,0,1200,760,'url(#wall)')+P('M0 0H1200V65L980 96 210 96 0 63Z','#f5d8b0')+R(0,519,1200,241,'#b06b4c')+R(0,519,1200,241,'url(#tile)')+P('M0 528H1200','none','#e5ac83',9);
    a+=P('M0 100L1200 100 M75 0L75 527 M1150 0L1150 526','none','#92694b',15);
    for(var i=0;i<5;i++)a+=L(i*300-40,55,i*300+220,103,'#775036',18);
    a+=R(238,119,712,366,'#755f51',20)+R(255,136,677,333,'#8fb5b8',12);
    a+=R(255,136,677,333,'url(#sea)',12);
    a+=C(802,215,71,'#f1d6b1','opacity=".8"')+clouds(209,'#e3efdf');
    a+=P('M255 403Q410 298 572 387T932 362V469H255Z','#5c8a7a')+P('M255 443Q422 365 610 432T932 419V469H255Z','#3c726c');
    for(var j=0;j<17;j++){var x=275+j*37;a+=L(x,161,x-25,414,'#deedf1a0',2,'class="room-rain"');}
    a+=R(580,136,17,333,'#76583f')+L(260,310,925,310,'#91664d',8);
    a+=R(140,480,520,150,'#6b513f',45,'filter="url(#shade)"')+R(167,463,469,81,'#b59f83',32)+R(169,499,440,66,'#b9ad8d',21)+R(205,475,89,61,'#e7b58f',17)+R(524,474,77,61,'#6e9185',17);
    a+=E(595,669,337,63,'#b98968')+E(595,662,306,48,'#f1cc9c')+P('M495 570Q595 530 699 570L680 627H510Z','#a77b5a')+E(595,566,108,26,'#d9aa73');
    a+=R(14,282,84,260,'#8c6c55',7)+R(23,313,65,18,'#e7c4a0')+R(23,380,65,18,'#e7c4a0')+G(61,265,.7,bouquet('#efc18b'));
    return frame(a+commonObjects('monsoon'));
  }
  function dusk(){
    var a=R(0,0,1200,760,'url(#pink)')+R(0,536,1200,224,'#c5a49a')+R(0,536,1200,224,'url(#tile)',0,'opacity=".42"');
    a+=P('M220 70Q220 22 278 22H942Q1000 22 1000 70V501H220Z','#fff5e6');
    a+=P('M257 76Q257 56 295 56H920Q963 56 963 76V473H257Z','#f3b29c');
    a+=C(822,269,132,'url(#sun)')+C(822,285,78,'#f4c488')+clouds(180,'#fee0c0');
    a+=P('M257 455V401H299V336H323V390H374V323H393V379H419V284H460V394H509V350H550V407H607V297H638V389H694V336H731V412H780V343H823V400H858V328H901V449Z','#9d7775')+R(256,453,708,19,'#fff4dc');
    a+=L(611,57,611,473,'#fff2df',18)+L(260,243,961,243,'#fff2df',14);
    a+=P('M0 140H185Q220 140 220 177V520H0Z','#dbae9b')+P('M1002 134H1200V517H1002Q965 510 965 470V175Q965 133 1002 134Z','#e1b6a1');
    a+=R(108,478,520,155,'#a66d5f',42,'filter="url(#shade)"')+R(138,457,465,87,'#e1baab',32)+R(138,521,450,64,'#d2a491',20)+R(177,477,96,70,'#f7e6cb',18)+R(507,475,80,69,'#a3a99e',16);
    a+=E(639,669,340,68,'#b9695b')+E(636,660,321,50,'#d39979')+R(656,539,177,36,'#a87c60',14)+L(688,564,679,626,'#896448',8)+L(800,566,809,625,'#896448',8);
    a+=R(34,90,107,178,'#efd6bc',17,'stroke="#bd9079" stroke-width="9"')+C(86,171,33,'#eea36d')+R(63,222,44,13,'#c69077',6);
    return frame(a+commonObjects('dusk'));
  }
  function sunday(){
    var a=R(0,0,1200,760,'#e9e8c8')+P('M0 0H1200V510L0 539Z','#e8e7bd')+R(0,531,1200,229,'#fbebd9');
    for(var row=0;row<5;row++)for(var col=0;col<12;col++)if((col+row)%2===0)a+=R(col*100,534+row*46,100,47,'#e4c9a9',0,'opacity=".5"');
    a+=P('M80 140Q80 35 195 35H344Q460 35 460 140V430H80Z','#e99b7e')+P('M101 141Q101 60 201 60H342Q440 60 440 141V407H101Z','#7fb8c7');
    a+=C(341,165,57,'#ffe6a6')+P('M100 347Q223 286 439 338V409H101Z','#8fbd9a')+clouds(195,'#e6f4f1');
    a+=P('M680-15Q560 140 739 245T1070 379L1200 330V0Z','#d2d5ac')+C(898,200,99,'#f2bfaa','opacity=".76"');
    a+=R(525,136,228,298,'#f3dfc6',15,'stroke="#c19682" stroke-width="12"')+C(638,234,73,'#dfbd8d')+P('M578 358Q637 287 692 359Z','#b57880');
    a+=R(120,485,493,147,'#d6877b',50,'filter="url(#shade)"')+R(153,465,435,92,'#f6bdab',31)+R(148,522,433,65,'#eea292',22)+R(194,480,86,56,'#ffd8b5',12);
    a+=E(628,665,339,64,'#8fa58b')+E(626,656,304,48,'#d3e2bb')+R(626,538,183,36,'#8d9882',17)+L(656,560,643,632,'#546f59',9)+L(780,560,788,630,'#546f59',9);
    a+=P('M1000 20Q1034 58 1124 20L1146 140L1024 154Z','#f6bd92')+C(1086,84,28,'#e4e1ac');
    return frame(a+commonObjects('sunday'));
  }
  function coast(){
    var a=R(0,0,1200,760,'#f8f0df')+P('M0 0H1200V507H0Z','#f0ebdd')+R(0,521,1200,239,'#e6d4b8')+R(0,521,1200,239,'url(#tile)');
    a+=P('M195 470V190Q195 22 387 22H764Q957 22 957 190V470Z','#e8d9bc');
    a+=P('M227 455V189Q227 60 395 60H750Q925 60 925 189V455Z','url(#sea)');
    a+=C(773,177,77,'#fae9b5')+P('M229 361Q370 329 502 361T924 369V456H229Z','#67adbd')+P('M229 422Q410 383 586 416T923 410V456H229Z','#2f8ca4');
    a+=P('M226 451H929','none','#fff7e8',13)+P('M584 63V458','none','#efe8d7',11);
    a+=P('M0 0H152V515H0Z','#dce4dd')+P('M984 0H1200V520H984Z','#d6e3df')+P('M0 22H1200','none','#c8d7d1',12);
    a+=E(490,665,420,73,'#d6b69c')+E(490,658,396,59,'#faf0da');
    a+=R(94,494,541,126,'#8fbbbc',49,'filter="url(#shade)"')+R(127,466,470,82,'#f1eee0',31)+R(140,517,451,61,'#d4e1d7',24)+R(172,477,94,64,'#b2c9c4',16)+R(501,475,75,66,'#d9b49a',16);
    a+=R(660,534,171,36,'#8ab9ad',14)+L(700,567,672,627,'#a5a792',8)+L(799,568,818,625,'#a5a792',8);
    a+=P('M980 62Q1040 15 1096 62L1120 126H960Z','#d2b68b')+L(1040,0,1040,65,'#ad9173',5)+E(1041,124,90,11,'#bf9a6f');
    return frame(a+commonObjects('coast'));
  }
  function library(){
    var a=R(0,0,1200,760,'url(#night)')+R(0,518,1200,242,'#543c39')+R(0,518,1200,242,'url(#tile)',0,'opacity=".18"');
    a+=bookcase(10,65,268,430)+bookcase(908,62,265,432);
    a+=R(303,76,589,397,'#6c5b5b',14,'stroke="#b29b7a" stroke-width="18"')+R(320,93,555,362,'#192a45',9);
    a+=C(717,208,63,'#e4dcc6')+C(738,193,60,'#192a45')+clouds(290,'#465273');
    a+=P('M321 421Q521 350 682 403T875 382V458H321Z','#384556')+L(597,94,597,455,'#b79e7b',10);
    a+=R(135,480,520,155,'#663f43',41,'filter="url(#shade)"')+R(172,462,443,87,'#93675f',27)+R(175,525,438,66,'#774d4b',22);
    for(var i=0;i<7;i++)a+=C(213+i*58,550,4,'#caa17b');
    a+=R(180,486,80,54,'#b08b69',15)+R(523,482,75,54,'#5d7073',15);
    a+=E(619,673,333,59,'#a88b75')+E(615,663,291,43,'#7f5d62')+R(680,539,157,30,'#956e52',15)+L(700,566,683,635,'#6e4a39',8)+L(813,566,830,635,'#6e4a39',8);
    a+=E(825,262,150,140,'url(#sun)', 'opacity=".25"')+R(0,37,1200,18,'#bb976d');
    return frame(a+commonObjects('library'));
  }
  function cabin(){
    var a=R(0,0,1200,760,'#d4bd9c')+R(0,521,1200,239,'#8c654b')+R(0,521,1200,239,'url(#tile)',0,'opacity=".2"');
    for(var i=0;i<15;i++)a+=L(0,i*41,1200,i*41,'#a78260',3,'opacity=".35"');
    a+=P('M0 210L600-120L1200 210','none','#694b37',42)+P('M0 210L600-105L1200 210','none','#c3966c',15);
    a+=P('M334 469V174Q334 85 441 85H777Q875 85 875 174V469Z','#6c5141')+P('M354 450V173Q354 106 449 106H764Q855 106 855 173V450Z','url(#snow)');
    a+=C(727,170,55,'#fff1db')+P('M355 396L486 222 552 314 643 201 774 374 853 304V453H355Z','#f5f3ed')+P('M357 440L451 329 548 420 645 305 745 429 855 342V452H355Z','#8fa8a0');
    for(var j=0;j<9;j++){var xx=382+j*52; a+=P('M'+xx+' 432L'+(xx+24)+' 331L'+(xx+48)+' 432Z','#52756e');}
    a+=L(607,107,607,451,'#795741',12);
    a+=R(65,332,213,202,'#9c7558',11,'stroke="#5b463a" stroke-width="12"')+R(83,348,180,162,'#6a4e3f',8)+P('M103 481H242V433H103Z','#3d3c37');
    a+=P('M152 479Q111 441 161 402Q170 440 194 416Q227 452 197 482Z','#e9a05f')+P('M161 477Q148 451 172 432Q183 455 185 475Z','#f9d58a')+R(103,494,143,12,'#cba176');
    a+=R(320,481,337,151,'#6e786b',43,'filter="url(#shade)"')+R(340,460,304,87,'#9eaa94',31)+R(346,521,299,64,'#7e8978',22)+R(366,478,64,62,'#e1b8a3',14)+R(557,479,69,61,'#ddc5a0',13);
    a+=E(616,668,355,66,'#9c775b')+E(616,661,316,50,'#d4ae87')+R(687,537,151,31,'#9d7858',16)+L(707,566,694,624,'#7d573e',8)+L(813,566,826,623,'#7d573e',8);
    return frame(a+commonObjects('cabin'));
  }
  var drawers={monsoon:monsoon,dusk:dusk,sunday:sunday,coast:coast,library:library,cabin:cabin};
  function safeGet(){
    try{var saved=localStorage.getItem('maha-room-theme-v1');return drawers[saved]?saved:'monsoon';}catch(e){return 'monsoon';}
  }
  function select(id){
    if(!drawers[id])return;
    var info=themes.filter(function(item){return item.id===id;})[0];
    home.setAttribute('data-room-theme',id);
    shell.setAttribute('data-room-theme',id);
    art.innerHTML=drawers[id]();
    art.setAttribute('aria-label',info.name+': a richly illustrated home with interactive flowers, letters, cinema, travel case, games, lamp and drawers.');
    var name=document.getElementById('room-name'),note=document.getElementById('room-note');
    if(name)name.textContent=info.name;
    if(note)note.textContent=info.note;
    document.querySelectorAll('[data-room]').forEach(function(button){
      var chosen=button.dataset.room===id;
      button.setAttribute('aria-pressed',chosen?'true':'false');
      button.classList.toggle('selected',chosen);
    });
    document.querySelectorAll('.room-object').forEach(function(button){
      var point=spaces[id][button.dataset.object];
      if(!point)return;
      button.style.left=(point[0]/12)+'%';
      button.style.top=(point[1]/7.6)+'%';
    });
    try{localStorage.setItem('maha-room-theme-v1',id);}catch(e){}
  }
  var current=safeGet();
  select(current);
  document.querySelectorAll('[data-room]').forEach(function(button){
    button.addEventListener('click',function(){
      if(current===button.dataset.room)return;
      current=button.dataset.room;
      shell.classList.remove('room-changing');
      void shell.offsetWidth;
      shell.classList.add('room-changing');
      select(current);
      window.setTimeout(function(){shell.classList.remove('room-changing');},430);
    });
  });
  if(window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
     !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var scene=document.getElementById('room-scene'),raf=0;
    scene.addEventListener('pointermove',function(event){
      var bounds=scene.getBoundingClientRect();
      var dx=(event.clientX-bounds.left)/bounds.width-.5;
      var dy=(event.clientY-bounds.top)/bounds.height-.5;
      window.cancelAnimationFrame(raf);
      raf=window.requestAnimationFrame(function(){
        scene.style.setProperty('--room-parallax-x',(-dx*9).toFixed(2)+'px');
        scene.style.setProperty('--room-parallax-y',(-dy*7).toFixed(2)+'px');
      });
    },{passive:true});
    scene.addEventListener('pointerleave',function(){
      window.cancelAnimationFrame(raf);
      scene.style.setProperty('--room-parallax-x','0px');
      scene.style.setProperty('--room-parallax-y','0px');
    });
  }
})();
