# personal-web-portfolio

My portfolio site. I wanted it to feel like an ops console instead of the usual template, so it has a boot screen, a network map in the hero you can click to ping, a terminal you can open with `` ` ``, and my experience laid out like a ticket log.

Built with Next.js, React, Tailwind and TypeScript. No animation libraries, the effects are all canvas/CSS.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build` for a production build.

## Updating content

Everything on the page comes from `lib/data.ts` (skills, experience, projects, certs etc). PDFs live in `public/docs/`.

Deployed on Vercel.
