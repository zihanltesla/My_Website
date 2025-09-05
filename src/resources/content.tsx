import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Zihan",
  lastName: "Liu",
  name: `Zihan Liu`,
  role: "Data Science Graduate Student & Software Developer",
  avatar: "/images/avatar.jpg",
  email: "liu3675716@gmail.com",
  location: "Europe/Zurich", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "German", "Chinese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: <>My newsletter about software development, CI/CD, AI/ML, and data science insights</>,
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/zihanltesla",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/zihan-liu/",
  },
  {
    name: "Website",
    icon: "globe",
    link: "https://www.hankyliu.com",
  },
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Software development and CI/CD with AI and data science</>,
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Featured</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/work/startseoup",
  },
  subline: (
    <>
      I'm Zihan, a Data Science graduate student at University of Zurich with experience at Volvo Cars and Tesla.
      <br /> I specialize in software development, CI/CD, AI/ML and full-stack development.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role} from ${person.location}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "https://cal.com",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        I am a Data Science graduate student at University of Zurich with professional experience at
        Volvo Cars and Tesla R&D Center. I specialize in software development, CI/CD automation,
        AI/ML applications, and full-stack development. Co-founder of StartSEOUp.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Volvo Cars",
        timeframe: "Feb 2025 - Aug 2025",
        role: "Master Thesis Worker",
        achievements: [
          <>
            Conducted fine-tuning of large language models (LLMs) for software development applications
          </>,
          <>
            Implemented a RAG-based AI system to assist in requirement analysis and test automation
          </>,
          <>
            Developed CI/CD pipelines for multimodal data processing and training data generation
          </>,
        ],
        images: [],
      },
      {
        company: "Volvo Cars",
        timeframe: "Sep 2024 - Feb 2025",
        role: "Software Developer Intern",
        achievements: [
          <>
            Developed and maintained CI/CD tools for automated software testing and deployment
          </>,
          <>
            Automated validation routines and enhanced system-level testing frameworks
          </>,
          <>
            Built testing modules using Appium, Simulink, and SomeIP for software integration
          </>,
        ],
        images: [],
      },
      {
        company: "Tesla R&D Center",
        timeframe: "Oct 2021 - Jun 2022",
        role: "Software Engineer Intern",
        achievements: [
          <>
            Developed diagnostic and testing scripts for vehicle systems using Python
          </>,
          <>
            Analyzed system failures in Model 3/Y and designed automated test benches for validation
          </>,
          <>
            Built CI/CD pipelines for automated testing and deployment of diagnostic tools
          </>,
        ],
        images: [],
      },
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "University of Zurich",
        description: <>Master of Science in Data Science with Minor in Banking and Finance (Sep 2022 - Present)</>,
      },
      {
        name: "Xiamen University Malaysia",
        description: <>Bachelor of Science in Electrical and Computer Engineering (Sep 2018 - Jun 2022)</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical Skills",
    skills: [
      {
        title: "Programming Languages",
        description: (
          <>Proficient in Python, JavaScript, C, CAPL, HTML, TypeScript, and SQL for various development needs.</>
        ),
        tags: [
          {
            name: "Python",
            icon: "python",
          },
          {
            name: "JavaScript",
            icon: "javascript",
          },
          {
            name: "TypeScript",
            icon: "typescript",
          },
        ],
        images: [],
      },
      {
        title: "Frameworks & Tools",
        description: (
          <>Experience with Angular, React, Spring, FastAPI, Appium, and SomeIP for full-stack development and testing.</>
        ),
        tags: [
          {
            name: "React",
            icon: "react",
          },
          {
            name: "Angular",
            icon: "angular",
          },
          {
            name: "FastAPI",
            icon: "fastapi",
          },
        ],
        images: [],
      },
      {
        title: "AI/ML & Cloud Platforms",
        description: (
          <>Specialized in LLM fine-tuning, RAG systems, multimodal processing, Docker, MongoDB, Azure, and Google Cloud.</>
        ),
        tags: [
          {
            name: "Docker",
            icon: "docker",
          },
          {
            name: "Azure",
            icon: "azure",
          },
          {
            name: "MongoDB",
            icon: "mongodb",
          },
        ],
        images: [],
      },

    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about software development, CI/CD, AI/ML, and data science...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Software development, CI/CD, and AI/ML projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
