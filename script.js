// Custom cursor
(function(){
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || window.matchMedia('(max-width: 968px)').matches) return;
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`});
  function loop(){rx+=(mx-rx)*.18;ry+=(my-ry)*.18;ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(loop)}
  loop();
  document.querySelectorAll('a,button,summary,.level-card,.fcard,.qcard,details').forEach(el=>{
    el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
  });
})();

// Reading progress
(function(){
  const bar = document.getElementById('readProg');
  function upd(){
    const h = document.documentElement;
    const pct = (h.scrollTop)/(h.scrollHeight-h.clientHeight)*100;
    bar.style.width = Math.min(100,Math.max(0,pct))+'%';
  }
  document.addEventListener('scroll',upd,{passive:true});upd();
})();

// Reveal on scroll
(function(){
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -60px 0px'});
  els.forEach(el=>io.observe(el));
})();

// Number counters
(function(){
  const cells = document.querySelectorAll('[data-count]');
  const easeOut = t => 1 - Math.pow(1-t,4);
  cells.forEach(el=>{
    const target = +el.dataset.count;
    const suffix = el.dataset.suffix || '';
    const io = new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const dur = 1200, t0 = performance.now();
          function tick(t){
            const k = Math.min(1,(t-t0)/dur);
            const v = Math.round(target*easeOut(k));
            el.textContent = v + suffix;
            if(k<1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
          io.unobserve(en.target);
        }
      });
    },{threshold:.5});
    io.observe(el);
  });
})();

// Audio waveform bars
(function(){
  const wave = document.getElementById('wave');
  if (!wave) return;
  const heights = [8,16,24,12,28,18,8,22,14,28,20,10,16,24,30,14,8,18,26,16,12,22,10,18,26,14,8,20,16,24,12,18,8,22];
  heights.forEach(h=>{
    const s = document.createElement('span');
    s.style.height = h+'px';
    wave.appendChild(s);
  });
})();

// Event tooltip on rhythm chart
(function(){
  const tip = document.getElementById('evtTip');
  document.querySelectorAll('#chaosEvents circle').forEach(c=>{
    c.style.cursor='none';
    c.addEventListener('mouseenter', e => {
      tip.textContent = c.dataset.label;
      tip.style.opacity = 1;
    });
    c.addEventListener('mousemove', e => {
      tip.style.left = e.clientX + 'px';
      tip.style.top = (e.clientY - 8) + 'px';
    });
    c.addEventListener('mouseleave', () => tip.style.opacity = 0);
  });
})();

// Process line draw on scroll
(function(){
  const proc = document.getElementById('process');
  const line = document.getElementById('processLine');
  const steps = proc ? proc.querySelectorAll('.pstep') : [];
  if (!proc) return;
  function upd(){
    const r = proc.getBoundingClientRect();
    const winH = window.innerHeight;
    const start = winH * 0.7;
    const total = r.height;
    const seen = Math.max(0, Math.min(total, start - r.top));
    line.style.height = seen + 'px';
    steps.forEach(st=>{
      const sr = st.getBoundingClientRect();
      if (sr.top < winH*0.65) st.classList.add('lit');
    });
  }
  document.addEventListener('scroll',upd,{passive:true});upd();
})();
