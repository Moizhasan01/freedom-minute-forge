import { siteConfig } from "@/config/site.config";

declare global { interface Window { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void } }
export function pushEvent(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
export function updateConsent(analytics: boolean, marketing: boolean) {
  if (typeof window === "undefined") return;
  const choice = { ad_storage: marketing ? "granted" : "denied", analytics_storage: analytics ? "granted" : "denied", ad_user_data: marketing ? "granted" : "denied", ad_personalization: marketing ? "granted" : "denied" };
  window.gtag?.("consent", "update", choice);
}
export function initializeTracking() {
  if (!siteConfig.gtmId || typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = (...args) => { window.dataLayer?.push({ gtag: args }); };
  window.gtag("consent", "default", { ad_storage: "denied", analytics_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(siteConfig.gtmId)}`;
  document.head.appendChild(script);
}
