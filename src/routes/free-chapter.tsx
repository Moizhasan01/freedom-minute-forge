import { createFileRoute } from "@tanstack/react-router";
import { ShellPage } from "@/components/site/ShellPage";
import { siteCopy } from "@/content/site";
const title = "Free Chapter | 12 Minutes to Freedom";
const description = siteCopy.shells.chapter.intro;
export const Route = createFileRoute("/free-chapter")({ head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/free-chapter" }], links: [{ rel: "canonical", href: "/free-chapter" }] }), component: () => <ShellPage page="chapter"/> });
