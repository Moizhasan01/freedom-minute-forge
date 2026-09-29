import { Link } from "@tanstack/react-router";
import { siteCopy } from "@/content/site";
import { blogPosts } from "@/content/blog";
export function ShellPage({ page }: { page: keyof typeof siteCopy.shells }) {
  const copy = siteCopy.shells[page];
  return <section className="shell-page"><div className="section-inner"><p className="section-label">12 MINUTES TO FREEDOM / {page.toUpperCase()}</p><h1>{copy.title}</h1><p>{copy.intro}</p><div className="shell-line"/>{page === "blog" && <div className="shell-posts">{blogPosts.map(post => <Link key={post.slug} to="/blog/$slug" params={{slug:post.slug}}>{post.title} ↗</Link>)}</div>}</div></section>;
}
