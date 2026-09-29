import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";
import { homeCopy as c } from "@/content/home";
import { blogPosts } from "@/content/blog";
import { siteConfig } from "@/config/site.config";
import { ActionLink, BookObject, CinematicImage, MagneticButton, NewsletterForm, ReviewCarousel, images } from "./Shared";
import { openRetailerModal } from "./SiteShell";
import { pushEvent } from "@/lib/analytics";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function SectionLabel({ children }: { children: string }) { return <p className="section-label"><span className="label-line" />{children}</p>; }
function Intro() {
  const [show, setShow] = useState(false);
  const [stage, setStage] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    try { if (sessionStorage.getItem("intro-seen")) return; sessionStorage.setItem("intro-seen", "true"); } catch { return; }
    setShow(true);
    const timers = [setTimeout(() => setStage(1), 310), setTimeout(() => setStage(2), 650), setTimeout(() => setStage(3), 960), setTimeout(() => setShow(false), 1550)];
    const skip = () => setShow(false);
    window.addEventListener("keydown", skip); window.addEventListener("pointerdown", skip);
    return () => { timers.forEach(clearTimeout); window.removeEventListener("keydown",skip); window.removeEventListener("pointerdown",skip); };
  }, []);
  if (!show) return null;
  return <div className={`intro-screen intro-stage-${stage}`} aria-live="off"><div className="intro-shards" aria-hidden="true">{Array.from({length: 7},(_,i) => <span key={i}/>)}</div><div className="intro-panel"><span>EXPERICORP / MAIN GATE</span><span>BADGE READ ...</span><strong>● {stage >= 2 ? "ACCESS DENIED" : "VERIFYING"}</strong></div><Button variant="ghost" className="intro-skip" onClick={() => setShow(false)}>Skip</Button></div>;
}
function Rain() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    if (!el || reduced()) return;
    const ctx = el.getContext("2d"); if (!ctx) return;
    let active = true, visible = true, frame = 0;
    const observer = new IntersectionObserver(([entry]) => { visible = Boolean(entry?.isIntersecting); }); observer.observe(el);
    const drops = Array.from({length: innerWidth < 700 ? 45 : 110}, () => ({x: Math.random(),y:Math.random(),speed: .002+Math.random()*.005}));
    const draw = () => { frame = requestAnimationFrame(draw); if (!active || !visible || document.hidden) return; const w=el.width=el.clientWidth, h=el.height=el.clientHeight; ctx.clearRect(0,0,w,h); ctx.strokeStyle="rgba(200,225,235,.24)"; ctx.lineWidth=1; drops.forEach(d => { ctx.beginPath();ctx.moveTo(d.x*w,d.y*h);ctx.lineTo(d.x*w-8,d.y*h+24);ctx.stroke();d.y+=d.speed;if(d.y>1)d.y=0; }); };
    draw(); return () => { active=false; cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);
  return <canvas className="rain-canvas" ref={canvas} aria-hidden="true" />;
}
function ClockRing({ progress }: { progress: number }) {
  const seconds = Math.max(0,Math.round(720*(1-progress)));
  const display = `${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;
  return <div className={`clock-ring ${progress>.9 ? "clock-danger" : ""}`}><svg viewBox="0 0 300 300" aria-hidden="true"><circle cx="150" cy="150" r="130" fill="none" stroke="currentColor" strokeOpacity=".25" strokeWidth="1"/>{Array.from({length:60},(_,i) => <line key={i} x1="150" y1="8" x2="150" y2={i%5===0?"22":"16"} transform={`rotate(${i*6} 150 150)`} stroke="currentColor" strokeOpacity={i/60 < 1-progress ? .8 : .12} strokeWidth={i%5===0?2:1}/>)}</svg><span>{display}</span></div>;
}
function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [progress,setProgress] = useState(0);
  useGSAP(() => {
    if (!ref.current || reduced()) return;
    const title = ref.current.querySelector(".hero-title");
    if (title) { const split = new SplitText(title,{ type:"chars" }); gsap.from(split.chars,{y:55,filter:"blur(12px)",opacity:0,stagger:.022,duration:.75,delay:.25,ease:"power3.out"}); }
    const st = ScrollTrigger.create({trigger:ref.current,start:"top top",end:"+=150%",pin:window.innerWidth>767,scrub:true,onUpdate:self => setProgress(self.progress)});
    gsap.to(".hero-image-layer",{scale:1.12, yPercent:8,ease:"none",scrollTrigger:{trigger:ref.current,start:"top top",end:"bottom top",scrub:true}});
    gsap.to(".book-stage",{rotateY:25,ease:"none",scrollTrigger:{trigger:ref.current,start:"top top",end:"bottom top",scrub:true}});
    return () => st.kill();
  },{scope:ref});
  useEffect(() => { if (!reduced()) return; const listener=()=>{if(!ref.current)return;const r=ref.current.getBoundingClientRect();setProgress(Math.max(0,Math.min(1,-r.top/r.height)));}; window.addEventListener("scroll",listener,{passive:true});return()=>window.removeEventListener("scroll",listener);},[]);
  return <section ref={ref} className="hero-section"><div className="hero-visual" aria-hidden="true"><div className="hero-image-layer hero-layer-sky" style={{backgroundImage:`url(${images.hero})`}}/><div className="hero-image-layer hero-layer-mid" style={{backgroundImage:`url(${images.hero})`}}/><div className="hero-image-layer hero-layer-road" style={{backgroundImage:`url(${images.hero})`}}/><div className="hero-police"/><div className="hero-scrim"/><Rain/></div><div className="section-inner hero-inner"><div className="hero-copy"><SectionLabel>{c.hero.kicker}</SectionLabel><h1 className="hero-title"><span>{c.hero.titleFirst}</span><span className="title-to"><i/>{c.hero.titleMiddle}<i/></span><span className="title-freedom">{c.hero.titleLast}</span><span className="sr-only">: a thriller by Todd Shevlin</span></h1><p className="hero-quote">“{c.hero.quote}”</p><p className="hero-description">{c.hero.body}</p><div className="hero-actions"><MagneticButton onClick={() => openRetailerModal("hero")}>{siteConfig ? "Buy the Book" : "Buy the Book"} <span>↗</span></MagneticButton><ActionLink to="/free-chapter">{c.hero.read}</ActionLink></div><div className="hero-proof">{siteConfig.amazonRating.value && <span className="rating-proof"><span className="stars">★★★★★</span>{`Rated ${siteConfig.amazonRating.value.toFixed(1)} of 5 on Amazon (${siteConfig.amazonRating.count} ratings)`}</span>}<span className="proof-dot">•</span><span>{c.hero.human}</span></div></div><div className="hero-book-wrap"><ClockRing progress={progress}/><BookObject onClick={() => openRetailerModal("hero-book")}/></div></div><div className="scroll-cue">{c.hero.scroll}<span/></div></section>;
}
function Premise() { return <section className="premise-section section-space"><div className="premise-tower"><CinematicImage image="tower" alt="Warm lights glowing inside a dark glass office tower" /></div><div className="section-inner premise-content"><SectionLabel>{c.premise.kicker}</SectionLabel><h2 className="section-title reveal-title">{c.premise.title}</h2><div className="premise-copy">{c.premise.paragraphs.map(p=><p key={p}>{p}</p>)}</div><div className="tag-list">{c.premise.tags.map(t=><span key={t}>{t}</span>)}</div><div className="fact-strip">{c.premise.facts.map(t=><span key={t}>{t}</span>)}</div><ActionLink to="/the-book">{c.premise.action}</ActionLink></div></section>; }
function Evidence() {
  const ref=useRef<HTMLElement>(null);
  useGSAP(() => { if (!ref.current || reduced() || window.innerWidth<768) return; const track=ref.current.querySelector(".evidence-track");if(!track)return; const distance=Math.max(0,track.scrollWidth-window.innerWidth+80);gsap.to(track,{x:-distance,ease:"none",scrollTrigger:{trigger:ref.current,start:"top top",end:()=>`+=${distance+450}`,pin:true,scrub:1,invalidateOnRefresh:true}}); },{scope:ref});
  return <section ref={ref} className="evidence-section section-space"><div className="section-inner"><SectionLabel>{c.evidence.kicker}</SectionLabel><h2 className="section-title">{c.evidence.title}</h2></div><div className="evidence-track"><svg className="evidence-string" viewBox="0 0 1400 200" preserveAspectRatio="none" aria-hidden="true"><path d="M75 100 L400 90 L740 110 L1100 80 L1370 100" fill="none" stroke="currentColor" strokeWidth="2"/></svg>{c.evidence.cards.map((card,i)=><article className="evidence-card" key={card.label}><span className="evidence-pin"/><span className="evidence-number">EXHIBIT {String.fromCharCode(65+i)}</span><span className="evidence-code">EVIDENCE / 0{i+1}</span><h3>{card.label}</h3><p>{card.text}</p><span className="evidence-footer">CASE FILE / LEDGER</span></article>)}</div><div className="section-inner evidence-note"><em>“{c.evidence.note}”</em><span>{c.evidence.attribution}</span></div></section>;
}
function Squad() {
  const [flipped,setFlipped]=useState<number[]>([]);
  return <section className="squad-section section-space"><div className="section-inner"><SectionLabel>{c.squad.kicker}</SectionLabel><h2 className="section-title">{c.squad.title}</h2><p className="section-intro">{c.squad.intro}</p><div className="squad-grid">{c.squad.players.map((p,i)=><Button variant="ghost" key={p.handle} className={`player-card ${flipped.includes(i)?"is-flipped":""}`} onClick={()=>setFlipped(list=>list.includes(i)?list.filter(n=>n!==i):[...list,i])} aria-label={`${p.handle}, ${p.name}. Flip card`} aria-pressed={flipped.includes(i)}><span className="player-inner"><span className="player-front"><span className="player-top">PLAYER {String(i+1).padStart(2,"0")} / 07 {"remote" in p && <b>REMOTE</b>}</span><strong>{p.handle}</strong><span className="player-level"><i/></span><span className="player-name">{p.name}</span><span className="player-role">{p.role}</span><span className="player-bottom">STRATOFORTRESS / ACTIVE</span></span><span className="player-back"><span>PLAYER {String(i+1).padStart(2,"0")}</span><em>“{p.quote}”</em><span>{p.handle}</span></span></span></Button>)}</div><blockquote className="squad-quote">“{c.squad.quote}” <cite>{c.squad.credit}</cite></blockquote><ActionLink to="/the-book" className="squad-link">Meet the squad</ActionLink></div></section>;
}
function ClockBand() {
  const ref=useRef<HTMLElement>(null); const [time,setTime]=useState("12:00");
  useGSAP(()=>{if(!ref.current||reduced())return;ScrollTrigger.create({trigger:ref.current,start:"top bottom",end:"bottom top",onUpdate:self=>{const seconds=Math.round(720*(1-self.progress));setTime(`${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`);}});},{scope:ref});
  return <section ref={ref} className="clock-band section-space"><CinematicImage image="sky" alt="Stormy fractured night sky" className="clock-sky"/><div className="clock-watermark" aria-hidden="true">{time}</div><div className="section-inner clock-content"><SectionLabel>{c.clock.kicker}</SectionLabel><h2 className="section-title">{c.clock.title}</h2><p>{c.clock.body}</p><MagneticButton onClick={()=>openRetailerModal("clock-band")}>Buy the Book ↗</MagneticButton></div></section>;
}
function ChapterBand() { return <section className="chapter-section section-space"><div className="section-inner chapter-grid"><div className="chapter-cover"><CinematicImage image="cover" alt="Cover of 12 Minutes to Freedom by Todd Shevlin"/></div><div><SectionLabel>{c.chapter.kicker}</SectionLabel><h2 className="section-title">{c.chapter.title}</h2><p>{c.chapter.body}</p><ActionLink to="/free-chapter">{c.chapter.action}</ActionLink><NewsletterForm source="home-band"/></div></div></section>; }
function Author() { return <section className="author-section section-space"><div className="section-inner author-grid"><div className="author-photo"><CinematicImage image="authorSide" alt="Todd Shevlin standing against a pale wall, looking to the side" variant="cctv"/><span>{c.author.caption}</span></div><div><SectionLabel>{c.author.kicker}</SectionLabel><h2 className="section-title">{c.author.title}</h2><p>{c.author.body}</p><p>{c.author.second}</p><ActionLink to="/about">{c.author.action}</ActionLink></div></div></section>; }
function Reviews() { const rating=siteConfig.amazonRating; return <section className="reviews-section section-space"><div className="section-inner"><SectionLabel>READER RESPONSE</SectionLabel><h2 className="section-title">{c.reviews.title}</h2><div className="reviews-grid"><div className="rating-block"><span className="stars">★★★★★</span><strong>{rating.value.toFixed(1)}</strong><p>{c.reviews.lead} {rating.count} {c.reviews.tail}</p><small>{c.reviews.note} {rating.asOf}</small></div><div className="review-empty"><span>OPEN CASE FILE / REVIEWS</span><p>{c.reviews.empty}</p><div><Button asChild variant="outline"><a href={siteConfig.retailers.amazon.reviewUrl} target="_blank" rel="noopener noreferrer">{c.reviews.amazon} ↗</a></Button>{siteConfig.goodreads.bookUrl && <Button asChild variant="outline"><a href={siteConfig.goodreads.bookUrl} target="_blank" rel="noopener noreferrer">{c.reviews.goodreads} ↗</a></Button>}</div></div></div><ReviewCarousel/></div></section>; }
function WhereToBuy() { const [format,setFormat]=useState<"hardcover"|"paperback"|"kindle"|"audiobook">("hardcover");const options=["hardcover","paperback","kindle","audiobook"] as const;return <section className="buy-section section-space"><div className="section-inner"><SectionLabel>AVAILABLE EDITIONS</SectionLabel><h2 className="section-title">{c.buy.title}</h2><div className="format-tabs" role="tablist" aria-label="Book formats">{options.map(f=><Button key={f} variant="ghost" role="tab" aria-selected={format===f} className={format===f?"active":""} onClick={()=>setFormat(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</Button>)}</div><div className="format-panel" role="tabpanel">{format==="audiobook"?<><p>{c.buy.audio}</p><NewsletterForm source="audiobook-waitlist" buttonLabel={c.buy.audioButton}/></>:<div className="retailer-links">{Object.entries(siteConfig.retailers).map(([retailer,urls])=>{const url=(urls as Record<string,string>)[format];return url?<Button key={retailer} asChild variant="outline"><a href={url} target="_blank" rel="noopener noreferrer" onClick={()=>pushEvent({event:"buy_click",retailer,format,placement:"formats"})}>{retailer==="amazon"?"Amazon":retailer} ↗</a></Button>:null;})}</div>}</div><p className="library-note">{c.buy.library}</p></div></section>; }
function BlogPreview() { return <section className="blog-section section-space"><div className="section-inner"><SectionLabel>{c.blog.kicker}</SectionLabel><h2 className="section-title">{c.blog.title}</h2><div className="blog-grid">{blogPosts.map((post,i)=><Link key={post.slug} to="/blog/$slug" params={{slug:post.slug}} className="blog-card"><span>ARTICLE / 0{i+1}</span><h3>{post.title}</h3><p>{post.excerpt}</p><b>READ ARTICLE ↗</b></Link>)}</div><ActionLink to="/blog">{c.blog.action}</ActionLink></div></section>; }
export function Home() {
  useEffect(()=>{if(reduced())return;const lenis=new Lenis({duration:1.15});let raf=0;const tick=(t:number)=>{lenis.raf(t);ScrollTrigger.update();raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);return()=>{cancelAnimationFrame(raf);lenis.destroy();};},[]);
  useGSAP(()=>{if(reduced())return;gsap.utils.toArray<HTMLElement>(".section-title, .section-label, .evidence-card, .player-card, .blog-card").forEach(el=>{gsap.from(el,{opacity:0,y:36,duration:.8,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 90%",once:true}})});});
  return <><Intro/><Hero/><Premise/><Evidence/><Squad/><ClockBand/><ChapterBand/><Author/><Reviews/><WhereToBuy/><BlogPreview/></>;
}
