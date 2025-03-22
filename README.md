<div align="center">
  <br />
    <a href="https://podlyai.vercel.app/" target="_blank">
      <img src="https://github.com/laxmanrathod69/Podly/blob/main/public/banner/podly_banner_image.png" alt="Project Banner">
    </a>
  <br />
  <div>
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwindcss" />
    <img src="https://shields.io/badge/supabase-black?logo=supabase&style=for-the-badge" alt="supabase" />
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="prisma" />
  
  </div>
  <h3 align="center">Podly - Where Every Voice Finds Its Audience</h3>

   <div align="center">
        A dynamic podcast hub connecting creators and listeners, offering intuitive publishing tools and personalized content discovery in one vibrant audio ecosystem.
    </div>
    
</div>

## 📋 Table of Contents

1. 🍁 [Introduction](#-introduction)
2. ⚙️ [Tech Stack](#️-tech-stack)
3. 🤖 [Key AI-powered features include](#-key-ai-powered-features-include)
4. 🕸️ [Features](#️-features)
5. 🤸 [Quick Start](#-getting-started)
6. 🪴 [Usage](#-usage)
7. 📂 [Project Structure](#-project-structure)
8. 🔭 [Deployment](#-deployment)
9. 🔗 [Assets](#-assets)
10. 🤝 [Contributing](#-contributing)
11. 📄 [License](#-license)

## 🍁 Introduction

Podly revolutionizes the way people interact with podcasts by integrating cutting-edge AI technology into every aspect of the platform. From content creation to personalized recommendations, Podly makes podcasting more accessible, efficient, and enjoyable for everyone. This is an innovative podcast management and discovery platform that leverages artificial intelligence (AI) to enhance the podcasting experience for both creators and listeners.

## ⚙️ Tech Stack

- Next.js 15
- React.js
- TypeScript
- Tailwind CSS
- ShadCN UI
- React Query
- PostgreSQL (Supabase)
- Prisma ORM
- VercelAI + Gemini + Unsplash (AI-powered content generation)
- React Hook Form + Zod (Form validation)
- Husky + Lint-staged (Code quality)

## 🤖 Key AI-powered features include

1. **AI-Assisted Podcast Creation**: Simplify the podcast creation process with AI tools that help with content ideation, script generation, and even voice synthesis for those who prefer not to record themselves.

2. **AI-Generated Thumbnails**: Automatically create eye-catching podcast thumbnails based on episode content, saving time for creators and improving visual appeal for listeners.

## 🕸️ Features

- AI-assisted podcast creation and editing
- AI-generated thumbnails and artwork
- User profiles and preference learning
- Global search and filtering
- Similar podcast recommendations
- Optimistic UI updates and prefetching
- Optimized performance with data caching

## 🤸 Getting Started

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/) - for version control
- [Node.js](https://nodejs.org/en/) - for running JavaScript on the server
- [pnpm](https://www.pnpm.io/) - for package management

1. **Clone the repository:**

```bash
git clone https://github.com/[user-username]/Podly.git
```

2. **Install dependencies:**

```bash
pnpm install

```

3. **Set up environment variables:**

Create a `.env` file in the root directory and add the necessary environment variables (refer to `.env.example` for required variables).

```ts
// Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = ""
CLERK_SECRET_KEY = ""
NEXT_PUBLIC_CLERK_SIGN_IN_URL = "/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL = "/sign-up"

// Google text content generator
GOOGLE_GENERATIVE_AI_API_KEY = ""

// Unsplash API Key
UNSPLASH_API_KEY = ""

// Supabase
NEXT_PUBLIC_SUPABASE_URL = ""
NEXT_PUBLIC_SUPABASE_ANON_KEY = ""

// Connect to Supabase via connection pooling with Supavisor.
DATABASE_URL = ""

// Direct connection to the database. Used for migrations.
DIRECT_URL = ""
```

Replace the placeholder values with your actual respective account credentials.

4. **Run the development server:**

```bash
pnpm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🪴 Usage

- **Create a Podcast**: Click on `Create` and use our AI-assisted tools to generate ideas, write scripts, or even synthesize voices for your podcast.

- **Discover New Content**: Explore our AI-curated recommendations or use the smart search feature to find podcasts that match your interests.

## 📂 Project Structure

- `app/`: Next.js app router and page components
- `components/`: Reusable React components
- `prisma/`: Prisma schema and migrations
- `constants/`: Application-wide constants
- `public/`: Static assets
- `hooks/`: React custom hooks
- `lib/`: Utility functions and API clients
- `type/`: TypeScript types

## 🔭 Deployment

The app is configured for easy deployment on `Vercel`. Connect your `GitHub repository` to Vercel for automatic deployments on each push to the main branch.

## 🔗 Assets

Static assets like images, fonts etc. are stored in the `public` directory and referenced using the `/` path prefix.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

To contribute:

Fork the repository </br>
Create your feature branch (`git checkout -b feature/your-feature`) </br>
Commit your changes (`git commit -m 'feat: add your feature'`) </br>
Push to the branch (`git push origin feature/your-feature`) </br>
Open a pull request

## 📄 License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) file for details.

## 📩 Contact

Laxman Rathod - [@Linkedin](https://linkedin.com/in/laxmanrathod69) - laxmanrathod.dev@gmail.com

Project Link: [https://github.com/laxmanrathod69/Podly](https://github.com/laxmanrathod69/podly)
