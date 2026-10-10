(function(){
  var target=new Date("2026-11-01T05:00:00+08:00");window._target=target; // Placeholder: replace with the final race start
  var el=document.getElementById("cd");
  function pad(n){return String(n).padStart(2,"0")}
  function tick(){
    var ms=target-new Date();
    if(ms<=0){el.innerHTML="<b>It's race month</b>";var l=document.getElementById("cdl");if(l)l.textContent="Exact gunstart date coming soon.";return}
    var d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4);var sc=Math.floor(ms%6e4/1e3);
    var bm=(window._lm!==undefined&&window._lm!==m)?" class='bump'":"";window._lm=m;
    el.innerHTML="<b>"+d+"</b><span class='u'>days</span><b>"+pad(h)+"</b><span class='u'>hours</span><b"+bm+">"+pad(m)+"</b><span class='u'>minutes</span><b>"+pad(sc)+"</b><span class='u'>seconds</span>";
  }
  tick();setInterval(tick,1000);
})();
;
(function(){
  var rm=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(rm){var a=document.querySelector("#runner animateMotion");if(a)a.remove();var r=document.getElementById("runner");if(r){r.setAttribute("cx",1000);r.setAttribute("cy",120)}return}
  if(!("IntersectionObserver" in window))return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.15});
  document.querySelectorAll(".race,.grid>div,.sched tr,details,.reg .wrap,.br-gear,.br-purpose,.br-awards,.kit,.prog").forEach(function(el,i){
    el.classList.add("rv");el.style.setProperty("--d",((i%4)*0.08)+"s");io.observe(el)});
})();
;
(function(){
  var bar=document.querySelector(".bar");
  function st(){bar.classList.toggle("stuck",window.scrollY>60)}
  st();window.addEventListener("scroll",st,{passive:true});
  if(!("IntersectionObserver" in window))return;
  var items=[].slice.call(document.querySelectorAll(".hero,main>section"));
  var links={};[].forEach.call(document.querySelectorAll("nav ul a"),function(a){links[a.getAttribute("href").slice(1)]=a});
  document.body.classList.add("spot");
  function setActive(el){
    items.forEach(function(i){i.classList.toggle("focus",i===el)});
    for(var k in links)links[k].removeAttribute("aria-current");
    if(el.id&&links[el.id])links[el.id].setAttribute("aria-current","true");
  }
  function atEnd(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-4}
  function pick(){
    var y=window.innerHeight*.5,best=items[0];
    if(atEnd())best=items[items.length-1];
    else items.forEach(function(i){var r=i.getBoundingClientRect();if(r.height&&r.top<=y)best=i});
    setActive(best);
  }
  var busy=false;
  function onS(){if(!busy){busy=true;requestAnimationFrame(function(){busy=false;pick()})}}
  window.addEventListener("scroll",onS,{passive:true});
  window.addEventListener("resize",onS);
  window.addEventListener("hashchange",onS);
  pick();
})();
;
(function(){
  var main=document.querySelector("main#top"),gp=document.getElementById("gallery-page"),mas=document.getElementById("mas"),mas2=document.getElementById("mas2"),homeTitle=document.title;
  var G=[{"src": "images/gallery-shirt-front-back.webp", "alt": "Benguet Marathon event shirt, front and back", "r": 0.8, "bg": "#1b2a22", "k": "photo"}, {"src": "images/gallery-runner-shirt.webp", "alt": "Runner wearing the Benguet Marathon event shirt", "r": 0.6666666666666666, "bg": "#1b2a22", "k": "photo"}, {"src": "images/gallery-benguet-marathon-logo.webp", "alt": "Benguet Marathon logo", "r": 0.9937888198757764, "bg": "#0f1a15", "k": "logo"}, {"src": "images/gallery-print-taraki-logo.webp", "alt": "Print Taraki logo", "r": 1.1363636363636365, "bg": "#f1efe9", "k": "logo"}, {"src": "images/gallery-team-malaya-logo.webp", "alt": "Team Malaya logo", "r": 2.092050209205021, "bg": "#101a15", "k": "logo"}, {"src": "images/gallery-waynasdi-photo-logo.webp", "alt": "Waynasdi Photo logo", "r": 1.0, "bg": "#000", "k": "logo"}];
  var ORD=["Runner wearing","Benguet Marathon event shirt","Benguet Marathon logo","Team Malaya","Print Taraki","Waynasdi"];
  function rk(g){for(var i=0;i<ORD.length;i++)if(g.alt.indexOf(ORD[i])===0)return i;return 99}
  G.forEach(function(g){g.z=(g.k==="logo"&&g.alt.indexOf("Benguet Marathon")!==0)?1:0});G.sort(function(a,b){return (a.z-b.z)||rk(a)-rk(b)});
  function tile(g,i){
    var f=document.createElement("button");f.type="button";f.className="ph "+g.k;
    f.style.setProperty("--r",g.r);f.style.setProperty("--i",i);f.style.background=g.bg;
    f.setAttribute("aria-label","Open photo: "+g.alt);
    var im=new Image();im.src=g.src;im.alt="";im.loading="lazy";im.decoding="async";f.appendChild(im);return f}
  G.forEach(function(g,i){var t=tile(g,i);t.onclick=function(){open(i)};(g.z?mas2:mas).appendChild(t)});
  var lb=document.getElementById("lb"),lbc=document.getElementById("lbc");
  function open(i){var g=G[i];lbc.innerHTML="";var d=document.createElement("div");d.className="lbimg "+g.k+(g.z?" zb":" zt");d.style.background=g.bg;
    var im=new Image();im.src=g.src;im.alt=g.alt;d.appendChild(im);lbc.appendChild(d);lb.showModal()}
  lb.querySelector(".x").onclick=function(){lb.close()};
  lb.addEventListener("click",function(e){if(e.target===lb)lb.close()});
  function route(){
    var g=location.hash==="#/gallery";
    document.body.classList.toggle("view-gallery",g);
    main.hidden=g;gp.hidden=!g;
    document.title=g?"Pines & Miles – Benguet Marathon":homeTitle;
    if(g){window.scrollTo(0,0)}
    else{var id=location.hash.slice(1),t=id&&document.getElementById(id);if(t)t.scrollIntoView();else window.scrollTo(0,0)}
  }
  window.addEventListener("hashchange",route);
  if(location.hash==="#/gallery")route();
})();
;
(function(){
  var m=document.getElementById("menu"),b=document.getElementById("burger");
  b.onclick=function(){m.showModal()};
  m.querySelector(".mx").onclick=function(){m.close()};
  m.addEventListener("click",function(e){if(e.target===m||e.target.closest("a"))m.close()});
})();
;
(function(){
  var t=document.getElementById("totop"),rm=window.matchMedia("(prefers-reduced-motion: reduce)");
  function v(){t.classList.toggle("show",window.scrollY>500)}
  window.addEventListener("scroll",v,{passive:true});v();
  t.onclick=function(){window.scrollTo({top:0,behavior:rm.matches?"auto":"smooth"})};
})();
;
(function(){
  var sc=document.querySelector(".scene"),t=document.querySelector(".tilt");
  if(!sc||!t||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  sc.addEventListener("pointermove",function(e){var r=sc.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;t.style.setProperty("--ry",(x*18).toFixed(1)+"deg");t.style.setProperty("--rx",(-y*12).toFixed(1)+"deg")});
  sc.addEventListener("pointerleave",function(){t.style.setProperty("--ry","0deg");t.style.setProperty("--rx","0deg")});
})();
;
(function(){
  var bar=document.querySelector(".bar"),last=window.scrollY,busy=false;
  function f(){
    busy=false;var y=window.scrollY,d=y-last;
    if(y<120)bar.classList.remove("hide");
    else if(d>6)bar.classList.add("hide");
    else if(d<-6)bar.classList.remove("hide");
    if(Math.abs(d)>6||y<120)last=y;
  }
  window.addEventListener("scroll",function(){if(!busy){busy=true;requestAnimationFrame(f)}},{passive:true});
})();
;
(function(){
  /* Placeholder course data: replace with your real numbers */
  var EMIN=1200,EMAX=2400,KM=21;
  var P=[[0,170],[60,150],[120,160],[190,110],[250,120],[320,60],[380,80],[440,40],[500,90],[560,130],[620,70],[690,100],[760,50],[830,95],[900,140],[1000,120]];
  var svg=document.querySelector(".profile"),wrap=document.querySelector(".pwrap"),dot=document.getElementById("runner"),
      tip=document.getElementById("ptip"),g=document.getElementById("pguide"),pk=document.getElementById("pk");
  if(!svg||!dot)return;
  var cur=0,drag=false,stopped=false;
  function yAt(x){for(var i=0;i<P.length-1;i++){if(x<=P[i+1][0]){var a=P[i],b=P[i+1];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}}return P[P.length-1][1]}
  function set(x){
    x=Math.max(0,Math.min(1000,x));cur=x;var y=yAt(x);
    var e=Math.round((EMIN+(170-y)/130*(EMAX-EMIN))/5)*5,km=(x/1000*KM).toFixed(1);
    dot.setAttribute("cx",x);dot.setAttribute("cy",y);
    g.setAttribute("x1",x);g.setAttribute("x2",x);g.setAttribute("y1",y);
    tip.innerHTML="<b>"+e.toLocaleString("en-US")+" m</b><span>km "+km+"</span>";
    var r=svg.getBoundingClientRect(),w=wrap.getBoundingClientRect();
    tip.style.left=Math.max(60,Math.min(r.width-60,x/1000*r.width))+"px";
    tip.style.top=(r.top-w.top+y/220*r.height)+"px";
    dot.setAttribute("aria-valuenow",km);dot.setAttribute("aria-valuetext","km "+km+", elevation "+e+" metres");
    if(pk)pk.style.opacity=Math.abs(x-440)<100?0:1;
  }
  function X(ev){var r=svg.getBoundingClientRect();return(ev.clientX-r.left)/r.width*1000}
  function take(){stopped=true;tip.classList.add("on")}
  svg.addEventListener("pointerdown",function(ev){take();drag=true;wrap.classList.add("dragging");try{svg.setPointerCapture(ev.pointerId)}catch(e){}set(X(ev))});
  svg.addEventListener("pointermove",function(ev){
    if(ev.pointerType==="mouse"){if(!stopped)take();set(X(ev))}else if(drag)set(X(ev));
  });
  svg.addEventListener("pointerenter",function(ev){if(ev.pointerType==="mouse"){take();wrap.classList.add("hov");set(X(ev))}});
  svg.addEventListener("pointerleave",function(ev){if(ev.pointerType==="mouse")wrap.classList.remove("hov")});
  function end(){drag=false;wrap.classList.remove("dragging")}
  svg.addEventListener("pointerup",end);svg.addEventListener("pointercancel",end);
  dot.addEventListener("keydown",function(ev){
    var st=ev.shiftKey?50:10,k=ev.key,n=null;
    if(k==="ArrowRight"||k==="ArrowUp")n=cur+st;else if(k==="ArrowLeft"||k==="ArrowDown")n=cur-st;else if(k==="Home")n=0;else if(k==="End")n=1000;
    if(n!==null){ev.preventDefault();take();set(n)}
  });
  window.addEventListener("resize",function(){set(cur)});
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){set(1000);tip.classList.add("on");return}
  set(0);var t0=null;
  function step(ts){if(stopped)return;if(!t0)t0=ts;var t=Math.min((ts-t0)/2600,1);set(1000*(1-Math.pow(1-t,2)));if(t<1)requestAnimationFrame(step);else tip.classList.add("on")}
  requestAnimationFrame(step);
})();
;
(function(){
  var f=document.getElementById("ftimer"),v=document.getElementById("ftv"),c=document.querySelector(".count"),T=window._target,busy=false;
  function pad(n){return String(n).padStart(2,"0")}
  function render(){
    var ms=T-new Date();if(ms<=0){v.innerHTML="<b>Race month</b>";return}
    var d=Math.floor(ms/864e5),h=Math.floor(ms%864e5/36e5),m=Math.floor(ms%36e5/6e4),s=Math.floor(ms%6e4/1e3);
    v.innerHTML="<b>"+d+"</b><i>d</i><b>"+pad(h)+"</b><i>h</i><b>"+pad(m)+"</b><i>m</i><b>"+pad(s)+"</b><i>s</i>";
  }
  function vis(){busy=false;var on=c.getBoundingClientRect().bottom<0;f.classList.toggle("show",on);document.body.classList.toggle("tf",on)}
  render();setInterval(render,1000);
  window.addEventListener("scroll",function(){if(!busy){busy=true;requestAnimationFrame(vis)}},{passive:true});
  window.addEventListener("hashchange",function(){requestAnimationFrame(vis)});
  vis();
})();
;
(function(){
  var bar=document.querySelector(".bar");
  function u(){document.body.classList.toggle("hh",bar.classList.contains("hide"))}
  new MutationObserver(u).observe(bar,{attributes:true,attributeFilter:["class"]});u();
})();
;
(function(){
  if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle("tk",e.isIntersecting)})},{threshold:.4});
  document.querySelectorAll(".br-gear,.br-purpose,.br-awards").forEach(function(el){el.classList.add("tkjs");io.observe(el)});
})();
;
(function(){
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches||!document.body.animate)return;
  var w=document.getElementById("wipe"),busy=false;
  document.addEventListener("click",function(e){
    var a=e.target.closest&&e.target.closest("a.gbtn");
    if(!a||busy||e.button||e.metaKey||e.ctrlKey||e.shiftKey)return;
    e.preventDefault();busy=true;
    var r=a.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2,W=window.innerWidth,H=window.innerHeight,rad=Math.hypot(Math.max(x,W-x),Math.max(y,H-y));
    w.style.backgroundImage="linear-gradient(rgba(14,22,17,.62),rgba(14,22,17,.82)),"+getComputedStyle(document.querySelector(".gt")).backgroundImage;
    w.hidden=false;
    var grow=w.animate([{clipPath:"circle(0px at "+x+"px "+y+"px)"},{clipPath:"circle("+rad+"px at "+x+"px "+y+"px)"}],{duration:650,easing:"cubic-bezier(.6,0,.3,1)",fill:"forwards"});
    grow.onfinish=function(){
      location.hash="#/gallery";
      setTimeout(function(){
        var f=w.animate([{opacity:1},{opacity:0}],{duration:600,easing:"ease",fill:"forwards"});
        f.onfinish=function(){w.hidden=true;w.getAnimations().forEach(function(n){n.cancel()});busy=false};
      },80);
    };
  },true);
})();
