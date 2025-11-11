// Potato Clicker — Vanilla JS
});


potato.addEventListener('click', (e) => {
if (state.current === null) return alert('سجّل دخولك أولاً');
// animate potato
potato.classList.add('bounce');
setTimeout(() => potato.classList.remove('bounce'), 120);


// increment points
state.players[state.current].points += 1;
save();
updateUI();


// create particles
spawnParticles(e.clientX, e.clientY);


// optional: move potato slightly
wigglePotato();
});


function spawnParticles(x, y){
// create few emoji particles near the potato
const wrap = document.querySelector('.potato-wrap');
const rect = wrap.getBoundingClientRect();
const localX = x - rect.left; const localY = y - rect.top;
const emojis = ['✨','💥','🍟','⭐','🔥'];
for (let i=0;i<6;i++){
const el = document.createElement('span');
el.className = 'particle';
el.style.left = (localX + (Math.random()*60-30)) + 'px';
el.style.top = (localY + (Math.random()*40-20)) + 'px';
el.innerText = emojis[Math.floor(Math.random()*emojis.length)];
wrap.appendChild(el);
// trigger animation
requestAnimationFrame(()=>{
el.style.opacity = 1;
el.style.transform = `translateY(${ -120 - Math.random()*80 }px) scale(${1 + Math.random()}) rotate(${Math.random()*60-30}deg)`;
el.style.transition = `transform ${700 + Math.random()*300}ms cubic-bezier(.2,.9,.2,1), opacity ${700 + Math.random()*300}ms`;
});
// cleanup
setTimeout(()=> el.remove(), 1200 + Math.random()*400);
}
}


function wigglePotato(){
const wrap = document.querySelector('.potato-wrap');
// small random translate
const tx = (Math.random()*20 - 10);
const ty = (Math.random()*10 - 5);
wrap.style.transition = 'transform 300ms ease';
wrap.style.transform = `translate(${tx}px, ${ty}px)`;
setTimeout(()=>{ wrap.style.transform = ''; }, 300);
}


addBotBtn.addEventListener('click', () => {
const sample = ['محمد','ليلى','علي','سارة','حسين'];
sample.forEach(n => {
if (!state.players.find(p => p.name === n)) state.players.push({name: n, points: Math.floor(Math.random()*6)});
});
save(); updateUI();
});


resetBtn.addEventListener('click', () => {
if (!confirm('هل تريد حذف جميع البيانات وإعادة الضبط؟')) return;
state = { players: [], current: null };
save(); updateUI();
});


// initial load
load();
// if no players, create a placeholder
if (!state.players || state.players.length === 0) state.players = [];
updateUI();
})();
