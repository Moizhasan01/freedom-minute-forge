import { createFileRoute } from "@tanstack/react-router";
import { ShellPage } from "@/components/site/ShellPage";
import { siteCopy } from "@/content/site";
const title = "The Book | 12 Minutes to Freedom";
const description = siteCopy.shells.book.intro;
export const Route = createFileRoute("/the-book")({ head: () => ({ meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/the-book" }], links: [{ rel: "canonical", href: "/the-book" }] }), component: () => <ShellPage page="book"/> });
