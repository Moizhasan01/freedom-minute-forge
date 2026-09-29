import { createFileRoute } from "@tanstack/react-router";
import { ShellPage } from "@/components/site/ShellPage";
import { siteCopy } from "@/content/site";
const title = "Privacy Policy | 12 Minutes to Freedom";
const description = siteCopy.shells.privacy.intro;
export const Route = createFileRoute("/privacy")({ head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/privacy" }], links: [{ rel: "canonical", href: "/privacy" }] }), component: () => <ShellPage page="privacy"/> });
