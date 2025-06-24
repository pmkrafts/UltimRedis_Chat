This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Chat App

A modern real-time chat application built with Next.js, React, TypeScript, and a rich set of UI and backend tools.

## Features

- **Authentication:** Kinde Auth for secure user login and session management
- **Real-time Messaging:** Powered by Pusher and Upstash Redis
- **Rich UI:** Built with Next.js, Tailwind CSS, Radix UI, Framer Motion, and Lucide Icons
- **Emoji Support:** Emoji picker with @emoji-mart/react and @emoji-mart/data
- **Image Uploads:** Integrated with Cloudinary for image sharing
- **Sound Effects:** use-sound for interactive audio feedback
- **State Management:** Zustand for global state
- **Theming:** next-themes for light/dark mode
- **Resizable Panels:** react-resizable-panels for flexible layouts
- **Testing & Linting:** TypeScript, ESLint, and Tailwind CSS

## Tech Stack

- **Frontend:**  
  - [Next.js](https://nextjs.org/) (v15)
  - [React](https://react.dev/) (v18)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Radix UI](https://www.radix-ui.com/)
  - [Lucide React](https://lucide.dev/)
  - [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)
  - [next-themes](https://github.com/pacocoursey/next-themes)
  - [clsx](https://github.com/lukeed/clsx)
  - [class-variance-authority](https://cva.style/)

- **State & Data:**  
  - [Zustand](https://zustand-demo.pmnd.rs/)
  - [@tanstack/react-query](https://tanstack.com/query/latest)
  - [Upstash Redis](https://upstash.com/)

- **Authentication:**  
  - [Kinde Auth Next.js](https://kinde.com/)

- **Real-time & Media:**  
  - [Pusher](https://pusher.com/)
  - [Cloudinary](https://cloudinary.com/)
  - [use-sound](https://github.com/joshwcomeau/use-sound)
  - [@emoji-mart/react](https://github.com/missive/emoji-mart)
  - [@emoji-mart/data](https://github.com/missive/emoji-mart)

- **Utilities:**  
  - [eslint](https://eslint.org/)
  - [tw-animate-css](https://github.com/justinmahar/tw-animate-css)

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/chat-app.git
   cd chat-app
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   - Copy `._env.example` to `.env.local` and fill in your credentials for Kinde, Upstash Redis, Pusher, and Cloudinary.

4. **Run the development server:**
   ```sh
   npm run dev
   ```

5. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

## Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build the app for production
- `npm start` – Start the production server
- `npm run lint` – Run ESLint

## License

MIT

---

**Happy chatting!

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
