import { createFileRoute } from "@tanstack/react-router";
import { ShellPage } from "@/components/site/ShellPage";
import { siteCopy } from "@/content/site";
const title = "Press | 12 Minutes to Freedom";
const description = siteCopy.shells.press.intro;
export const Route = createFileRoute("/press")({ head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/press" }], links: [{ rel: "canonical", href: "/press" }] }), component: () => <ShellPage page="press"/> });
