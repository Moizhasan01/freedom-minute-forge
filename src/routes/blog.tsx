import { createFileRoute } from "@tanstack/react-router";
import { ShellPage } from "@/components/site/ShellPage";
import { siteCopy } from "@/content/site";
const title = "Blog | 12 Minutes to Freedom";
const description = siteCopy.shells.blog.intro;
export const Route = createFileRoute("/blog")({ head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/blog" }], links: [{ rel: "canonical", href: "/blog" }] }), component: () => <ShellPage page="blog"/> });
