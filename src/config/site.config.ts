export const siteConfig = {
  amazonRating: { value: 5.0, count: 4, asOf: "September 2026" },
  retailers: {
    amazon: {
      hardcover: "https://www.amazon.com/dp/B0HFB2VCX1",
      paperback: "https://www.amazon.com/dp/B0HFBMGG3G",
      kindle: "https://www.amazon.com/dp/B0HFBKL3LD",
      reviewUrl: "https://www.amazon.com/dp/B0HFB2VCX1#customerReviews",
    },
    barnesAndNoble: { hardcover: "", paperback: "", kindle: "" },
    bookshop: { hardcover: "", paperback: "" },
    appleBooks: { kindle: "" },
    kobo: { kindle: "" },
    googlePlay: { kindle: "" },
  },
  goodreads: { bookUrl: "", authorUrl: "https://www.goodreads.com/author/show/71789789.Todd_Shevlin" },
  socials: { instagram: "", facebook: "", linkedin: "", youtube: "" },
  newsletter: { provider: "kit" as "kit" | "mailmunch" | "mailerlite" | "none", formId: "" },
  gtmId: "",
  reviews: [] as { name: string; quote: string; source: string }[],
} as const;

export const routes = [
  { to: "/the-book", label: "The Book" },
  { to: "/free-chapter", label: "Free Chapter" },
  { to: "/about", label: "About Todd" },
  { to: "/press", label: "Press" },
  { to: "/blog", label: "Blog" },
] as const;
