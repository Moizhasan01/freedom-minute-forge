import { createFileRoute } from "@tanstack/react-router";
import { ShellPage } from "@/components/site/ShellPage";
import { siteCopy } from "@/content/site";
const title = "About Todd | 12 Minutes to Freedom";
const description = siteCopy.shells.about.intro;
export const Route = createFileRoute("/about")({ head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/about" }], links: [{ rel: "canonical", href: "/about" }] }), component: () => <ShellPage page="about"/> });
