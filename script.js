(() => {
  const nameInput = document.getElementById('nameInput');
  const loginBtn = document.getElementById('loginBtn');
  const potato = document.getElementById('potato');
  const playerNameEl = document.getElementById('playerName');
  const playerScoreEl = document.getElementById('playerScore');
  const lbList = document.getElementById('leaderboardList');

  const STORAGE_KEY = 'potato_clicker_v2';
  let state = {players:[], current:null};

  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function load(){ 
    const raw = localStorage.getItem(STORAGE_KEY);
    if(raw){ try{ state = JSON.parse(raw); } catch(e){ state={players:[],current:null}; } }
  }

  function renderLeaderboard(){
    const arr = [...state.players];
    arr.sort((a,b)=>b.points-a.points || a.name.localeCompare(b.name));
    lbList.innerHTML='';
    arr.forEach((p,idx)=>{
      const li=document.createElement('li');
      if(idx===0) li.classList.add('top');
      li.innerHTML=`<span>${p.name}</span><span>${p.points}</span>`;
      lbList.appendChild(li);
    });
  }

  function updateUI(){
    if(state.current===null){
      playerNameEl.innerText='—'; playerScoreEl.innerText='0';
    } else {
      const p = state.players[state.current];
      playerNameEl.innerText=p.name;
      playerScoreEl.innerText=p.points;
    }
    renderLeaderboard();
  }

  loginBtn.addEventListener('click',()=>{
    const name = nameInput.value.trim();
    if(!name) return alert('اكتب اسمك أولاً');
    let idx = state.players.findIndex(p=>p.name.toLowerCase()===name.toLowerCase());
    if(idx===-1){ state.players.push({name,points:0}); idx=state.players.length-1; }
    state.current=idx; save(); updateUI();
  });

  potato.addEventListener('click',(e)=>{
    if(state.current===null) return alert('سجّل دخولك أولاً');
    potato.classList.add('bounce'); setTimeout(()=>potato.classList.remove('bounce'),120);
    state.players[state.current].points+=1;
    save(); updateUI();
    spawnParticles(e.clientX,e.clientY);
  });

  function spawnParticles(x,y){
    const wrap = document.querySelector('.potato-wrap');
    const rect = wrap.getBoundingClientRect();
    const localX = x-rect.left, localY = y-rect.top;
    const emojis=['✨','💥','🍟','⭐','🔥'];
    for(let i=0;i<6;i++){
      const el=document.createElement('span'); el.className='particle';
      el.style.left=(localX+(Math.random()*60-30))+'px';
      el.style.top=(localY+(Math.random()*40-20))+'px';
      el.innerText=emojis[Math.floor(Math.random()*emojis.length)];
      wrap.appendChild(el);
      requestAnimationFrame(()=>{
        el.style.opacity=1;
        el.style.transform=`translateY(${-120-Math.random()*80}px) scale(${1+Math.random()}) rotate(${Math.random()*60-30}deg)`;
      });
      setTimeout(()=>el.remove(),1200+Math.random()*400);
    }
  }

  load(); updateUI();
})();
