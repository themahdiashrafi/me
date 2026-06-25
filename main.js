
/* ── Mobile menu ─────────────────────────── */
function toggleMenu(){
  const m=document.getElementById('mmenu');
  const s=document.querySelectorAll('#burger span');
  const o=m.classList.toggle('open');
  s[0].style.transform=o?'translateY(6px) rotate(45deg)':'';
  s[1].style.opacity  =o?'0':'';
  s[2].style.transform=o?'translateY(-6px) rotate(-45deg)':'';
}
function closeMenu(){
  document.getElementById('mmenu').classList.remove('open');
  document.querySelectorAll('#burger span').forEach(s=>{s.style.transform='';s.style.opacity='';});
}
document.addEventListener('click',e=>{
  const m=document.getElementById('mmenu'),b=document.getElementById('burger');
  if(m.classList.contains('open')&&!m.contains(e.target)&&!b.contains(e.target))closeMenu();
});

/* ── Nav shadow ──────────────────────────── */
window.addEventListener('scroll',()=>{
  document.getElementById('mnav').classList.toggle('scrolled',window.scrollY>8);
},{passive:true});

/* ── Dot matrix canvas ───────────────────── */
function drawDots(id,cfg){
  const c=document.getElementById(id);
  if(!c)return;
  const W=c.parentElement.offsetWidth;
  const H=c.parentElement.offsetHeight;
  c.width=W;c.height=H;
  const ctx=c.getContext('2d');
  ctx.clearRect(0,0,W,H);
  const sp=cfg.sp||22,r=cfg.r||1.0,dark=cfg.dark||false;
  for(let x=sp;x<W;x+=sp){
    for(let y=sp;y<H;y+=sp){
      const fR=Math.min(1,x/(W*0.5));
      const fT=Math.min(1,y/(H*0.2));
      const fB=Math.max(0,1-(y/H-.65)*5);
      const a=(dark?.2:.09)*fR*Math.min(fT,fB);
      if(a<.004)continue;
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle=dark?`rgba(255,255,255,${a})`:`rgba(200,200,195,${a})`;
      ctx.fill();
    }
  }
}
function allDots(){
  drawDots('dc-hero', {sp:20,r:.9,dark:true});
  drawDots('dc-about',{sp:22,r:.9,dark:true});
  drawDots('dc-build',{sp:22,r:.9,dark:true});
  drawDots('dc-contact',{sp:22,r:.9,dark:true});
}
window.addEventListener('load',allDots);
window.addEventListener('resize',allDots,{passive:true});

/* ── Parallax tilt — desktop only ────────── */
const hero=document.querySelector('.hero');
const aimg=document.querySelector('.hero-av-ring img');
if(hero&&aimg&&window.matchMedia('(hover:hover)and(pointer:fine)').matches){
  hero.addEventListener('mousemove',e=>{
    const{left,top,width,height}=hero.getBoundingClientRect();
    const cx=(e.clientX-left)/width-.5;
    const cy=(e.clientY-top)/height-.5;
    aimg.parentElement.style.transform=`rotateY(${cx*8}deg) rotateX(${cy*-4}deg) translateY(${cy*-6}px)`;
  });
  hero.addEventListener('mouseleave',()=>{aimg.parentElement.style.transform='';});
}

/* ── Intersection fade-up ────────────────── */
const io=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('vis'),i*55);
      io.unobserve(e.target);
    }
  });
},{threshold:.08});
document.querySelectorAll('.fu').forEach((el,i)=>{
  el.style.transitionDelay=`${(i%5)*.07}s`;
  io.observe(el);
});
