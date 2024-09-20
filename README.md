# Vince Coscia's Portfolio

This is a modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. It showcases my professional experience, projects, and skills as a Senior Fullstack Engineer.

## Features

- **Dynamic Content**: Experience, projects, and technologies are dynamically loaded from a database.
- **Responsive Design**: Looks great on desktop and mobile devices.
- **Dark Mode**: Toggle between light and dark themes for comfortable viewing.
- **Admin Dashboard**: Manage content easily through a secure admin interface.
- **Contact Form**: Allow visitors to send messages directly from the site.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: tRPC, Prisma ORM
- **Database**: MySQL
- **Authentication**: NextAuth.js
- **Deployment**: Self Hosted


## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up your environment variables (see `.env.example`)
4. Run the development server: `npm run dev`

## Deployment

This project is set up for easy deployment on Vercel or Netlify with a few caveats
- Make sure you set your `DATABASE_URL` to persist data
- For email, I'm using SendGrid, but feel free to use whatever you like
- For `LOGIN_WHITELIST` I use a specific ID I assigned myself to sign in, but I recommend using email instead of ID. That code can be found under `src/server/auth.ts` under the signIn callback

## Contributing

While this is a personal portfolio project, I'm open to suggestions and improvements. Feel free to open an issue or submit a pull request.

## License

This project is open-source and available under the MIT License.