import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { siteConfig, routes } from "@/config/site.config";
import { siteCopy } from "@/content/site";
import { MagneticButton, NewsletterForm } from "./Shared";
import { initializeTracking, pushEvent, updateConsent } from "@/lib/analytics";

const formats = ["Hardcover", "Paperback", "Kindle", "Audiobook"] as const;
type Format = typeof formats[number];
function ClockIcon() { return <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><circle cx="16" cy="16" r="13" stroke="currentColor"/><path d="M16 5v11l7 5" stroke="currentColor"/><path d="M16 1v5M16 26v5M1 16h5M26 16h5" stroke="currentColor"/></svg>; }
export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [placement, setPlacement] = useState("header");
  const [format, setFormat] = useState<Format>("Hardcover");
  const [step, setStep] = useState(1);
  const [consentOpen, setConsentOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [heroPast, setHeroPast] = useState(false);
  useEffect(() => {
    initializeTracking();
    try { const saved = localStorage.getItem("cookie-consent"); if (!saved) setConsentOpen(true); else { const choice = JSON.parse(saved); updateConsent(Boolean(choice.analytics), Boolean(choice.marketing)); } } catch { setConsentOpen(true); }
  }, []);
  useEffect(() => {
    const update = () => { setScrolled(window.scrollY > 40); const hero = document.querySelector(".hero-section"); setHeroPast(hero ? hero.getBoundingClientRect().bottom < 0 : true); };
    update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update);
  }, [pathname]);
  useEffect(() => { setMenu(false); window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  useEffect(() => { document.body.style.overflow = menu ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menu]);
  function openBuy(from: string) { setPlacement(from); setStep(1); try { const stored = localStorage.getItem("book-format"); if (formats.includes(stored as Format)) setFormat(stored as Format); } catch {} setModal(true); pushEvent({ event: "retailer_modal_open", placement: from }); }
  function choose(formatChoice: Format) { setFormat(formatChoice); setStep(2); try { localStorage.setItem("book-format", formatChoice); } catch {} }
  function saveConsent(a: boolean, m: boolean) { setAnalytics(a); setMarketing(m); updateConsent(a, m); try { localStorage.setItem("cookie-consent", JSON.stringify({ analytics: a, marketing: m })); } catch {} setConsentOpen(false); }
  const retailers = format === "Audiobook" ? [] : Object.entries(siteConfig.retailers).flatMap(([name, urls]) => { const url = urls[format.toLowerCase() as "hardcover" | "paperback" | "kindle" as keyof typeof urls]; return typeof url === "string" && url ? [{ name, url }] : []; });
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className={`site-header ${scrolled || pathname !== "/" ? "is-scrolled" : ""}`}>
      <Link to="/" className="brand" aria-label="12 Minutes to Freedom home"><ClockIcon /><span>{siteCopy.brand}</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{routes.map((r, i) => <Link key={r.to} to={r.to} className="nav-link"><small>{String(i+1).padStart(2,"0")}</small><span>{r.label}</span></Link>)}</nav>
      <div className="header-actions"><MagneticButton className="header-buy" onClick={() => openBuy("header")}>{siteCopy.buy}</MagneticButton><Button variant="ghost" size="icon" className="menu-toggle" aria-label={menu ? siteCopy.nav.close : siteCopy.nav.menu} aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</Button></div>
    </header>
    {menu && <nav className="mobile-menu" aria-label="Mobile navigation">{routes.map((r,i) => <Link key={r.to} to={r.to} onClick={() => setMenu(false)}><small>{String(i+1).padStart(2,"0")}</small>{r.label}</Link>)}<MagneticButton onClick={() => { setMenu(false); openBuy("mobile-menu"); }}>{siteCopy.buy}</MagneticButton></nav>}
    <main id="main" key={pathname} className="page-enter">{children}</main>
    <footer className="site-footer"><div className="footer-watermark" aria-hidden="true">12:00</div><div className="section-inner footer-grid"><div><Link to="/" className="brand"><ClockIcon /><span>{siteCopy.brand}</span></Link><p>{siteCopy.footerIntro}</p><p className="footer-publisher">{siteCopy.publisher}</p></div><div><h2>EXPLORE</h2>{routes.map(r => <Link key={r.to} to={r.to}>{r.label}</Link>)}</div><div><h2>STAY IN THE LOOP</h2><NewsletterForm source="footer"/><div className="footer-socials">{Object.entries(siteConfig.socials).map(([name,url]) => url && <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name}>{name === "instagram" ? <Instagram/> : name === "facebook" ? <Facebook/> : name === "linkedin" ? <Linkedin/> : <Youtube/>}</a>)}</div></div><div><h2>FIND THE BOOK</h2><a href={siteConfig.retailers.amazon.hardcover} target="_blank" rel="noopener noreferrer">Amazon</a><a href={siteConfig.goodreads.authorUrl} target="_blank" rel="noopener noreferrer">Goodreads</a></div></div><div className="section-inner footer-bottom"><span>© {new Date().getFullYear()} {siteCopy.copyright}</span><div><Link to="/privacy">{siteCopy.privacy}</Link><Link to="/cookies">{siteCopy.cookies}</Link><Button variant="ghost" onClick={() => setConsentOpen(true)}>{siteCopy.cookieSettings}</Button></div></div></footer>
    {heroPast && <div className="mobile-buy-bar"><span>12 Minutes to Freedom</span><MagneticButton onClick={() => openBuy("mobile-sticky")}>Buy</MagneticButton></div>}
    <Dialog open={modal} onOpenChange={setModal}><DialogContent className="retailer-dialog"><DialogHeader><DialogTitle>{siteCopy.modal.title}</DialogTitle><DialogDescription>{siteCopy.modal.description}</DialogDescription></DialogHeader><div className="dialog-step">{step === 2 && <Button variant="ghost" onClick={() => setStep(1)}>← Formats</Button>}<span>0{step} / 02</span></div>{step === 1 ? <div className="format-list">{formats.map(f => <Button key={f} variant="outline" onClick={() => choose(f)}>{f}<span>↗</span></Button>)}</div> : format === "Audiobook" ? <div className="audio-dialog"><p>{siteCopy.modal.unavailable}</p><NewsletterForm source="audiobook-waitlist" buttonLabel="Tell Me When It's Out"/></div> : <div className="format-list">{retailers.map(({name,url}) => <Button key={name} asChild variant="outline"><a href={url} target="_blank" rel="noopener noreferrer" onClick={() => pushEvent({ event: "buy_click", retailer: name, format, placement })}>Buy on {name === "barnesAndNoble" ? "Barnes and Noble" : name === "bookshop" ? "Bookshop.org" : name === "appleBooks" ? "Apple Books" : name === "googlePlay" ? "Google Play Books" : name.charAt(0).toUpperCase()+name.slice(1)} ↗</a></Button>)}</div>}</DialogContent></Dialog>
    {consentOpen && <div className="consent-banner" role="dialog" aria-label={siteCopy.consent.title}><div><strong>{siteCopy.consent.title}</strong><p>{siteCopy.consent.body}</p>{customize && <div className="consent-toggles"><label><input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)}/>{siteCopy.consent.analytics}</label><label><input type="checkbox" checked={marketing} onChange={e => setMarketing(e.target.checked)}/>{siteCopy.consent.marketing}</label></div>}</div><div className="consent-actions"><Button variant="outline" onClick={() => saveConsent(false,false)}>{siteCopy.consent.reject}</Button><Button variant="outline" onClick={() => customize ? saveConsent(analytics,marketing) : setCustomize(true)}>{customize ? siteCopy.consent.save : siteCopy.consent.customize}</Button><Button onClick={() => saveConsent(true,true)}>{siteCopy.consent.accept}</Button></div></div>}
  </>;
}
export function openRetailerModal(placement: string) { window.dispatchEvent(new CustomEvent("open-retailer", { detail: placement })); }
