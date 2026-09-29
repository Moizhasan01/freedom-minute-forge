import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/components/site/Home";
import { siteConfig } from "@/config/site.config";
const title = "12 Minutes to Freedom by Todd Shevlin | A Techno-Thriller";
const description = "An IT manager framed for murder, a corrupt police department, and an online gaming crew who show up to help. Read Chapter One free.";
export const Route = createFileRoute("/")({
  head: () => ({ meta: [ { title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "/" } ], links: [{ rel: "canonical", href: "/" }], scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", name: "12 Minutes to Freedom", url: "/" },
    { "@type": "Organization", name: "Collingwood Press" },
    { "@type": "Person", name: "Todd Shevlin", sameAs: siteConfig.goodreads.authorUrl },
    { "@type": "Book", name: "12 Minutes to Freedom", author: { "@type": "Person", name: "Todd Shevlin" }, publisher: { "@type": "Organization", name: "Collingwood Press" }, inLanguage: "en-US", genre: "Thriller", workExample: [
      { "@type": "Book", bookFormat: "Hardcover", isbn: "9798951043184", datePublished: "2026-08-12", numberOfPages: 278, potentialAction: { "@type": "BuyAction", target: siteConfig.retailers.amazon.hardcover } },
      { "@type": "Book", bookFormat: "Paperback", isbn: "9798951043177", datePublished: "2026-08-12", numberOfPages: 278, potentialAction: { "@type": "BuyAction", target: siteConfig.retailers.amazon.paperback } },
      { "@type": "Book", bookFormat: "EBook", isbn: "9798951043160", datePublished: "2026-08-14", potentialAction: { "@type": "BuyAction", target: siteConfig.retailers.amazon.kindle } },
    ] },
  ] }) }] }), component: Home,
});
