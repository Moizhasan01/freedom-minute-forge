import { createFileRoute, notFound } from "@tanstack/react-router";
import { blogPosts } from "@/content/blog";
export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => { const post = blogPosts.find(p => p.slug === params.slug); if (!post) throw notFound(); return post; },
  head: ({ loaderData, params }) => { const title = `${loaderData?.title || "Article"} | 12 Minutes to Freedom`; const description = loaderData?.excerpt || "Notes from Todd Shevlin."; return { meta: [{ title }, { name: "description", content: description }, { property: "og:title", content: title }, { property: "og:description", content: description }, { property: "og:type", content: "article" }, { property: "og:url", content: `/blog/${params.slug}` }], links: [{ rel: "canonical", href: `/blog/${params.slug}` }] }; },
  component: Post,
});
function Post() { const post = Route.useLoaderData(); return <article className="shell-page"><div className="section-inner"><p className="section-label">FIELD NOTES / ARTICLE</p><h1>{post.title}</h1><p>{post.excerpt}</p><div className="shell-line"/></div></article>; }
