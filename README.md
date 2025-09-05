# Zihan Liu's Portfolio

Personal portfolio website showcasing my work as a Data Science Graduate Student & Software Developer. Built with Next.js and deployed on Google App Engine.

🌐 **Live Site**: [hankyliu.com](https://hankyliu.com)


## About Me

I'm Zihan Liu, a Data Science graduate student at University of Zurich with professional experience at Volvo Cars and Tesla R&D Center. I specialize in:

- **Software Development**: Python, JavaScript, TypeScript, C, CAPL
- **Frameworks & Tools**: React, Angular, FastAPI, Spring, Appium
- **AI/ML & Cloud**: LLM fine-tuning, RAG systems, Docker, MongoDB, Azure, Google Cloud
- **CI/CD Automation**: Pipeline development and deployment optimization

## Tech Stack

This portfolio is built with modern web technologies:

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **UI System**: [Once UI](https://once-ui.com) for design components
- **Styling**: SCSS with CSS modules
- **AI Integration**: OpenAI GPT-4o mini for interactive chatbot
- **Deployment**: Google App Engine with GitHub Actions CI/CD
- **Domain**: Custom domain with SSL

## Local Development

**1. Clone the repository**
```bash
git clone https://github.com/zihanltesla/My_Website.git
cd My_Website
```

**2. Install dependencies**
```bash
npm install
```

**3. Set up environment variables**
```bash
cp .env.example .env.local
```
Edit `.env.local` and add your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

**4. Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

**Requirements**: Node.js v18.17+

## Features

### 🤖 AI-Powered Chatbot
- Interactive AI assistant powered by OpenAI GPT-4o mini
- Provides personalized information about my experience, skills, and projects
- Fixed position chat widget with responsive design
- Context-aware responses about my background and work

### 📱 Responsive Design
- Mobile-first approach with optimized layouts for all screen sizes
- Clean, professional design without heavy animations
- Dark/light theme support with system preference detection
- Accessible UI components following WCAG guidelines

### 📝 Content Management
- MDX-based blog posts and project documentation
- Dynamic routing for blog articles and project showcases
- Conditional rendering of sections based on content configuration
- Automatic social media link generation

### 🔍 SEO Optimized
- Automatic Open Graph and Twitter Card image generation
- Schema.org structured data for better search visibility
- Optimized meta tags and descriptions
- Sitemap and robots.txt generation

### 🚀 Performance & Deployment
- Server-side rendering with Next.js App Router
- Optimized static asset delivery
- Google App Engine deployment with auto-scaling
- GitHub Actions CI/CD pipeline for automated deployments

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page with CV/resume
│   ├── blog/              # Blog posts (MDX)
│   ├── work/              # Project showcases (MDX)
│   ├── gallery/           # Image gallery
│   └── api/               # API routes (chatbot)
├── components/            # Reusable React components
├── resources/             # Configuration and content
│   ├── content.tsx        # Site content and data
│   └── once-ui.config.ts  # UI theme configuration
└── styles/               # Global styles and SCSS modules
```

## Deployment

This site is automatically deployed to Google App Engine using GitHub Actions:

1. **Push to main branch** triggers the deployment workflow
2. **Build process** compiles Next.js application with optimizations
3. **Deploy to GAE** with auto-scaling and SSL certificate
4. **Custom domain** configured with DNS pointing to GAE

### Manual Deployment

```bash
# Build the application
npm run build

# Deploy to Google App Engine (requires gcloud CLI)
gcloud app deploy
```

## Contact & Links

- 🌐 **Website**: [hankyliu.com](https://hankyliu.com)
- 💼 **LinkedIn**: [linkedin.com/in/zihan-liu](https://www.linkedin.com/in/zihan-liu/)
- 🐙 **GitHub**: [github.com/zihanltesla](https://github.com/zihanltesla)
- 📧 **Email**: [liu3675716@gmail.com](mailto:liu3675716@gmail.com)

## Acknowledgments

Built with [Once UI](https://once-ui.com) design system and [Next.js](https://nextjs.org) framework.

## License

This project is open source and available under the [MIT License](LICENSE).