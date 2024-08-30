<div align="center">
  <br />
    <a href="https://podly-rose.vercel.app" target="_blank">
      <img src="" alt="Project Banner">
    </a>
  <br />
  <div>
    <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="nextdotjs" />
    <img src="https://shields.io/badge/react-0F172A?logo=react&style=for-the-badge" alt="reactdotjs" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="typescript" />
    <img src="https://img.shields.io/badge/tailwindcss-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/Convex-F02E65?style=for-the-badge&logo=Convex&logoColor=white" alt="convex" />
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

- Next.js 14
- React.js
- TypeScript
- Tailwind CSS
- Convex (Backend as a Service)
- VercelAI (Seamless ai integration with nextjs)
- Gemini (NLP for AI Podcast generator)
- OpenAI (Text to Image generation)
- RapidAPI (built-in API endpoints for faster development)
- React Hook Form (Form Management)
- Zod (Input Validation)
- ShadCN (Components library)

## 🤖 Key AI-powered features include

1. **AI-Assisted Podcast Creation**: Simplify the podcast creation process with AI tools that help with content ideation, script generation, and even voice synthesis for those who prefer not to record themselves.

2. **Intelligent Playback**: Our AI analyzes podcast content to provide smart chapter markers, transcriptions, and content summaries, allowing listeners to navigate and consume content more efficiently.

3. **AI-Generated Thumbnails**: Automatically create eye-catching podcast thumbnails based on episode content, saving time for creators and improving visual appeal for listeners.

4. **Personalized Recommendations**: Our advanced AI algorithm learns from user preferences and listening habits to suggest new podcasts and episodes tailored to individual tastes.

5. **Smart Content Moderation**: AI-powered moderation tools help maintain a safe and respectful community by flagging inappropriate content and ensuring compliance with platform guidelines.

## 🕸️ Features

- AI-assisted podcast creation and editing
- Intelligent podcast search and discovery
- AI-generated thumbnails and artwork
- Personalized recommendations powered by machine learning
- Smart playback with AI-generated chapters and summaries
- User profiles and preference learning
- Playlist creation and management
- Cross-device synchronization
- Social sharing and community features
- Content moderation and safety tools

## 🤸 Getting Started

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/) - for version control
- [Node.js](https://nodejs.org/en/) - for running JavaScript on the server
- [npm](https://www.npmjs.com/) - Node Package Manager

1. **Clone the repository:**

```bash
git clone https://github.com/laxman-rathod/Podly.git
```

2. **Install dependencies:**

```bash
npm install

```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory and add the necessary environment variables (refer to `.env.example` for required variables).

```ts

CONVEX_DEPLOYMENT=<your-convex-deployment>

NEXT_PUBLIC_CONVEX_URL=<your-convex-public-url>

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>

CLERK_SECRET_KEY=<your-clerk-secret-key>

CLERK_WEBHOOK_SECRET=<your-clerk-webhook-secret>

NEXT_PUBLIC_CLERK_SIGN_IN_URL='/sign-in'

NEXT_PUBLIC_CLERK_SIGN_UP_URL='/sign-up'

RAPIDAPI_KEY=<your-rapidapi-key>

RAPIDAPI_IMG_HOST=<your-rapidapi-image-generation-host-name>

RAPIDAPI_IMG_URL=<your-rapidapi-image-generation-url-endpoint>

```

Replace the placeholder values with your actual respective account credentials. You can obtain these credentials by signing up on the [Convex](https://convex.dev/), [Clerk](https://clerk.com/) and [Rapidapi](https://rapidapi.com/)

4. **Run the development server:**

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🪴 Usage

1. **Create a Podcast**: Click on `Create` and use our AI-assisted tools to generate ideas, write scripts, or even synthesize voices for your podcast.

2. **Discover New Content**: Explore our AI-curated recommendations or use the smart search feature to find podcasts that match your interests.

3. **Enhance Your Listening**: Enjoy smart playback features like AI-generated chapters and summaries to navigate content easily.

4. **Engage with the Community**: Share your favorite podcasts, create playlists, and interact with other podcast enthusiasts.

5. **Manage Your Content**: For creators, use our AI tools to generate thumbnails, moderate comments, and analyze listener engagement.

## 📂 Project Structure

- `app/`: Next.js app router and page components
- `components/`: Reusable React components
- `convex/`: Convex backend services
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

## Contact

Laxman Rathod - [@Linkedin](https://linkedin.com/in/laxmanrathod1) - laxmanrathod.dev@gmail.com

Project Link: [https://github.com/laxman-rathod/Podly](https://github.com/laxman-rathod/podly)
