import { createFileRoute } from "@tanstack/react-router";
import { ShellPage } from "@/components/site/ShellPage";
import { siteCopy } from "@/content/site";
const title = "Cookie Policy | 12 Minutes to Freedom";
const description = siteCopy.shells.cookies.intro;
export const Route = createFileRoute("/cookies")({ head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/cookies" }], links: [{ rel: "canonical", href: "/cookies" }] }), component: () => <ShellPage page="cookies"/> });
