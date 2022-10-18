let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");
let mapid = document.getElementById('mapid');

let bg = document.getElementById("bg");
let title = document.getElementById("title");
let currentPP = document.getElementById("currentPP");
let ifFC = document.getElementById("ifFC");
let state = document.getElementById("state");
let hun = document.getElementById("100");
let fifty = document.getElementById("50");
let miss = document.getElementById("miss");
let cs = document.getElementById("cs");
let ar = document.getElementById("ar");
let od = document.getElementById("od");
let hp = document.getElementById("hp");
let mods = document.getElementById("mods");
let star = document.getElementById("star");
let mapper = document.getElementById("mapper");
let dl = document.getElementById("dl");
let time = document.getElementById("time");
let SSS = document.getElementById("status");
const modsImgs = {
    'ez': './static/easy.png',
    'nf': './static/nofail.png',
    'ht': './static/halftime.png',
    'hr': './static/hardrock.png',
    'sd': './static/suddendeath.png',
    'pf': './static/perfect.png',
    'dt': './static/doubletime.png',
    'nc': './static/nightcore.png',
    'hd': './static/hidden.png',
    'fl': './static/flashlight.png',
    'rx': './static/relax.png',
    'ap': './static/autopilot.png',
    'so': './static/spunout.png',
    'at': './static/autoplay.png',
    'cn': './static/cinema.png',
    'v2': './static/v2.png',
}

socket.onopen = () => {
    console.log("Successfully Connected");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!")
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};
let tempMapid;
let tempImg;
let tempCs;
let tempAr;
let tempOd;
let tempHp;
let tempTitle;
let tempMods;
let gameState;
let tempStatus;
let tempStar;
let tempMapper;
let tempDl;
let timeCMs;
let timeCSec;
let timeCMin;
let timeCHour;
let timeCRem;
let timeCRes;
let timeFMs;
let timeFSec;
let timeFMin;
let timeFHour;
let timeFRem;
let timeFRes;
let result;
let tempTime;

socket.onmessage = event => {
    let data = JSON.parse(event.data);
    if(tempImg !== data.menu.bm.path.full){
        tempImg = data.menu.bm.path.full
        let img = data.menu.bm.path.full.replace(/#/g,'%23').replace(/%/g,'%25')
        bg.setAttribute('src',`http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`)
    }
    if(gameState !== data.menu.state){
        gameState = data.menu.state
        if(gameState === 2 || gameState === 7 || gameState === 14){
            state.style.transform = "translateY(0)"
        }else{
            state.style.transform = "translateY(-50px)"
        }
    }
    if(tempStatus !== data.menu.state){
        tempStatus = data.menu.state
        if(tempStatus === 3){SSS.innerHTML = "too is Now Offline"}else{SSS.innerHTML = tempStatus}
        if(tempStatus === 0 || tempStatus === 4 || tempStatus === 5){SSS.innerHTML = "too is Now Online"}
        if(tempStatus === 2 || tempStatus === 7 || tempStatus === 14){SSS.innerHTML = "too is Now Playing"}
        if(tempStatus === 1){SSS.innerHTML = "too is Now Mapping"}
    }
    if(tempTime !== data.menu.bm.time.current){
        timeCMs = data.menu.bm.time.current
        timeCSec = timeCMs/1000;
        timeCMin = Math.floor(timeCSec % 3600 / 60);
        timeCHour = Math.floor(timeCSec / 3600);
        timeCRem = Math.floor(timeCSec % 60);
        timeCRes = timeCHour + ':' + timeCMin + ':' + timeCRem;
        timeFMs = data.menu.bm.time.mp3
        timeFSec = timeFMs/1000;
        timeFMin = Math.floor(timeFSec % 3600 / 60);
        timeFHour = Math.floor(timeFSec / 3600);
        timeFRem = Math.floor(timeFSec % 60);
        timeFRes = timeFHour + ':' + timeFMin + ':' + timeFRem;
        result = timeCRes + ' / ' + timeFRes;
        tempTime = data.menu.bm.time.current
        time.innerHTML = result
    }
    if(tempMapper !== data.menu.bm.metadata.mapper + "'s Mapset / " + data.menu.bm.metadata.difficulty){
        tempMapper = data.menu.bm.metadata.mapper + "'s Mapset / " + data.menu.bm.metadata.difficulty;
        mapper.innerHTML = tempMapper
    }
    if(tempStar !== data.menu.bm.stats.fullSR + '*'){
        tempStar = data.menu.bm.stats.fullSR + '*';
        star.innerHTML = tempStar
    }
    if(tempDl !== 'Download: https://osu.ppy.sh/b/' + data.menu.bm.set){
        tempDl = 'Download: https://osu.ppy.sh/b/' + data.menu.bm.set;
        dl.innerHTML = tempDl
    }
    if(tempTitle !== data.menu.bm.metadata.artist + ' - ' + data.menu.bm.metadata.title){
        tempTitle = data.menu.bm.metadata.artist + ' - ' + data.menu.bm.metadata.title;
        title.innerHTML = tempTitle
    }
    if(data.menu.bm.stats.CS != tempCs){
        tempCs = data.menu.bm.stats.CS
        cs.innerHTML= `CS: ${Math.round(tempCs * 10) / 10} <hr>`
    }
    if(data.menu.bm.stats.AR != tempAr){
        tempAr = data.menu.bm.stats.AR
        ar.innerHTML= `AR: ${Math.round(tempAr * 10) / 10} <hr>`
    }
    if(data.menu.bm.stats.OD != tempOd){
        tempOd = data.menu.bm.stats.OD
        od.innerHTML= `OD: ${Math.round(tempOd * 10) / 10} <hr>`
    }
    if(data.menu.bm.stats.HP != tempHp){
        tempHp = data.menu.bm.stats.HP
        hp.innerHTML= `HP: ${Math.round(tempHp * 10) / 10} <hr>`
    }
    if(data.gameplay.pp.current != ''){
        let ppData = data.gameplay.pp.current 
        currentPP.innerHTML = Math.round(ppData)
    }else{
        currentPP.innerHTML = 0
    }
    if(data.gameplay.pp.fc != ''){
        let ppData = data.gameplay.pp.fc
        ifFC.innerHTML = Math.round(ppData)
    }else{
        ifFC.innerHTML = 0
    }
    if(data.gameplay.hits[100] > 0){
        hun.innerHTML = data.gameplay.hits[100]
    }else{
        hun.innerHTML = 0
    }
    if(data.gameplay.hits[50] > 0){
        fifty.innerHTML = data.gameplay.hits[50]
    }else{
        fifty.innerHTML = 0
    }
    if(data.gameplay.hits[0] > 0){
        miss.innerHTML = data.gameplay.hits[0]
    }else{
        miss.innerHTML = 0
    }
    if(tempMods != data.menu.mods.str){
        tempMods = data.menu.mods.str
        if (tempMods == "" || tempMods == "NM"){
            mods.innerHTML = '';
        }
        else{
            mods.innerHTML = '';
            let modsApplied = tempMods.toLowerCase();
            
            if(modsApplied.indexOf('nc') != -1){
                modsApplied = modsApplied.replace('dt','')
            }
            if(modsApplied.indexOf('pf') != -1){
                modsApplied = modsApplied.replace('sd','')
            }
            let modsArr = modsApplied.match(/.{1,2}/g);
            for(let i = 0; i < modsArr.length; i++){
                let mod = document.createElement('div');
                mod.setAttribute('class','mod');
                let modImg = document.createElement('img');
                modImg.setAttribute('src', modsImgs[modsArr[i]]);
                mod.appendChild(modImg);
                mods.appendChild(mod);
            }
        }
    }
}
