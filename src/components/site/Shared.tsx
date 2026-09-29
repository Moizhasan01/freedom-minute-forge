import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site.config";
import { siteCopy } from "@/content/site";
import { pushEvent } from "@/lib/analytics";
import { subscribe } from "@/lib/newsletter";
import hero from "@/assets/hero-runner-police-street.webp.asset.json";
import cover from "@/assets/12-minutes-to-freedom-cover.webp.asset.json";
import coverSmall from "@/assets/12-minutes-to-freedom-cover-600.webp.asset.json";
import tower from "@/assets/texture-lit-tower.webp.asset.json";
import sky from "@/assets/texture-shattered-sky.webp.asset.json";
import authorSide from "@/assets/todd-shevlin-author-side.webp.asset.json";
import authorPortrait from "@/assets/todd-shevlin-author-portrait.webp.asset.json";
import authorSmile from "@/assets/todd-shevlin-author-smile.webp.asset.json";

export const images = { hero: hero.url, cover: cover.url, coverSmall: coverSmall.url, tower: tower.url, sky: sky.url, authorSide: authorSide.url, authorPortrait: authorPortrait.url, authorSmile: authorSmile.url };
export const imageSizes = { hero: [1323,610], cover: [1323,2000], coverSmall: [600,907], tower: [330,1500], sky: [443,820], authorSide: [900,1125], authorPortrait: [900,1125], authorSmile: [900,1125] } as const;

export function CinematicImage({ image, alt, variant, className = "", priority = false }: { image: keyof typeof images; alt: string; variant?: "cctv" | "evidence" | "rgb-split"; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry?.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  function move(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - .5;
    const y = (e.clientY - rect.top) / rect.height - .5;
    ref.current.style.setProperty("--tilt-x", `${y * -8}deg`);
    ref.current.style.setProperty("--tilt-y", `${x * 8}deg`);
  }
  return <div ref={ref} className={`cinematic-image ${visible ? "is-visible" : ""} ${image.startsWith("author") ? "cinematic-warm" : ""} ${variant ? `cinematic-${variant}` : ""} ${className}`} onMouseMove={move} onMouseLeave={() => { ref.current?.style.removeProperty("--tilt-x"); ref.current?.style.removeProperty("--tilt-y"); }} data-cursor="VIEW">
    <img src={images[image]} width={imageSizes[image][0]} height={imageSizes[image][1]} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} alt={alt} />
    <span className="image-glint" aria-hidden="true" />
    {variant === "cctv" && <span className="image-overlay" aria-hidden="true">● REC &nbsp; 00:12:00</span>}
    {variant === "evidence" && <span className="image-overlay" aria-hidden="true">EVIDENCE / 01</span>}
  </div>;
}

export function MagneticButton({ children, className = "", variant = "default", onClick, type = "button" }: { children: ReactNode; className?: string; variant?: "default" | "outline" | "ghost"; onClick?: () => void; type?: "button" | "submit" }) {
  const ref = useRef<HTMLButtonElement>(null);
  return <Button ref={ref} type={type} variant={variant} className={`magnetic-button ${className}`} onClick={onClick} onMouseMove={(e) => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.13}px, ${(e.clientY-r.top-r.height/2)*.13}px)`;
  }} onMouseLeave={() => { if (ref.current) ref.current.style.transform = ""; }}>{children}</Button>;
}
export function ActionLink({ to, children, className = "" }: { to: string; children: ReactNode; className?: string }) {
  return <Button asChild variant="outline" className={`magnetic-button ${className}`}><Link to={to}>{children}<ArrowUpRight size={16} /></Link></Button>;
}

export function NewsletterForm({ source, buttonLabel }: { source: string; buttonLabel?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "unavailable" | "error">("idle");
  const [email, setEmail] = useState("");
  return <form className="newsletter-form" onSubmit={async e => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if ((form.elements.namedItem("website") as HTMLInputElement)?.value) return;
    setStatus("loading");
    try { const ok = await subscribe(email, source); setStatus(ok ? "success" : "unavailable"); if (ok) pushEvent({ event: "newsletter_signup", source, magnet: "first-chapters" }); }
    catch { setStatus("error"); }
  }}>
    <label htmlFor={`email-${source}`}>{siteCopy.signup.label}</label>
    <div className="newsletter-fields"><input id={`email-${source}`} type="email" required maxLength={254} placeholder={siteCopy.signup.placeholder} value={email} onChange={e => setEmail(e.target.value)} /><MagneticButton type="submit" className="newsletter-submit">{status === "loading" ? "Sending..." : buttonLabel || siteCopy.signup.send}</MagneticButton></div>
    <input name="website" className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <p className="form-note">{siteCopy.signup.consent} <Link to="/privacy">{siteCopy.privacy}</Link></p>
    <p className="form-status" role="status">{status === "success" ? siteCopy.signup.success : status === "unavailable" || status === "error" ? siteCopy.signup.unavailable : ""}</p>
  </form>;
}

export function BookObject({ onClick, className = "" }: { onClick: () => void; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return <div className={`book-stage ${className}`} onMouseMove={e => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--book-y", `${((e.clientX-r.left)/r.width-.5)*25}deg`);
    ref.current.style.setProperty("--book-x", `${((e.clientY-r.top)/r.height-.5)*-12}deg`);
  }} onMouseLeave={() => { ref.current?.style.removeProperty("--book-x"); ref.current?.style.removeProperty("--book-y"); }} ref={ref}>
    <Button variant="ghost" className="book-object" onClick={onClick} aria-label="Choose an edition of 12 Minutes to Freedom" data-cursor="BUY">
      <span className="book-spine">12 MINUTES TO FREEDOM</span><span className="book-pages" /><CinematicImage image="cover" alt="12 Minutes to Freedom book cover by Todd Shevlin" className="book-face" priority />
    </Button><span className="book-reflection" aria-hidden="true" />
  </div>;
}

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reviews = siteConfig.reviews;
  useEffect(() => { if (paused || reviews.length < 2) return; const timer = setInterval(() => setIndex(i => (i + 1) % reviews.length), 7000); return () => clearInterval(timer); }, [paused, reviews.length]);
  if (!reviews.length) return null;
  return <div className="review-carousel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onKeyDown={e => { if (e.key === "ArrowRight") setIndex(i => (i+1)%reviews.length); if (e.key === "ArrowLeft") setIndex(i => (i-1+reviews.length)%reviews.length); }} tabIndex={0} aria-label="Reader reviews"><blockquote>{reviews[index]?.quote}</blockquote><p>{reviews[index]?.name} / {reviews[index]?.source}</p><div><Button variant="ghost" onClick={() => setIndex(i => (i-1+reviews.length)%reviews.length)} aria-label="Previous review">←</Button><Button variant="ghost" onClick={() => setIndex(i => (i+1)%reviews.length)} aria-label="Next review">→</Button></div></div>;
}
