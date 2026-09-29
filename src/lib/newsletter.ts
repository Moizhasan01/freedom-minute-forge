import { siteConfig } from "@/config/site.config";
export async function subscribe(email: string, source: string) {
  const { provider, formId } = siteConfig.newsletter;
  if (provider !== "kit" || !formId) {
    if (import.meta.env.DEV) console.warn("Newsletter provider is not configured.");
    return false;
  }
  const body = new URLSearchParams({ email_address: email, "tags[]": source });
  await fetch(`https://app.kit.com/forms/${encodeURIComponent(formId)}/subscriptions`, { method: "POST", mode: "no-cors", body });
  return true;
}
