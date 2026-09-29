<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep this author site frontend-only on TanStack Start routes, since the runtime is fixed and future WordPress portability requires isolated TypeScript content and config.
- Store all editable copy in src/content and links or feature settings in src/config/site.config.ts, so the copywriter can update text without touching layouts.
- Use CDN pointers for the eight client-supplied photographs, since uploaded media must not be committed as binaries.
