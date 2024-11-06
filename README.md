# Cock Down Shooter  
### Deployed at https://cds.7f454c46.xyz/

## About

Cock Down Shooter is a simple game where your
goal is to shoot down as many chickens as possible in a minute. Your score will be saved into a database if logged in.

### Technical Information

This project uses following tech stack:
- Next.js(with React Spring for animations)
- Tailwind
- Supabase for backend

## Contributing

You're always free to open issue/pr :)

### How to setup?

- Clone the repo
- Link your Supabase by adding following 2 environment variables:
  - `NEXT_PUBLIC_SUPABASE_URL` - the URL to the Supabase
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - the anonymous key for access
  - It is recommended to add these variables into `.env.local` file
- Run `bun run dev` or `npm run dev`, depending on your package manager


*Please give us good mark thx*