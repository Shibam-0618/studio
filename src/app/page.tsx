
import { Mail, Linkedin, Github, Code, ExternalLink, School, Database, Cloud, Server, Sparkles, Calendar, Phone, Wind, Type } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AboutGenerator from '@/components/about-generator';
import ScrollToTop from '@/components/scroll-to-top';

const skills = {
  "Programming Languages": ["JavaScript", "Python", "Java", "C++", "SQL"],
  "Web Technologies": ["React", "Node.js", "HTML", "CSS"],
  "Libraries/Frameworks": ["Pandas", "NumPy"],
  "Cloud Platforms": ["Amazon Web Services (AWS)", "Google Cloud Platform (GCP)", "Firebase"],
  "Databases": ["MySQL", "PostgreSQL", "MongoDB"],
  "Version Control": ["Git", "GitHub"]
};

const experience = [
  {
    company: "Elewayte (A company of Realtalk Software Services Pvt. Ltd.)",
    role: "AWS Cloud Intern",
    period: "Feb 2025 - Mar 2025 (2 Months)",
    responsibilities: [
      "Designed ETL pipelines for structured & semi-structured datasets.",
      "Worked on AWS Glue, a serverless ETL tool used in Data Analytics and ML pipelines.",
      "Built and managed Data Catalogs, Databases, and Tables.",
      "Used Crawlers & Classifiers for metadata management.",
      "Developed ETL jobs using Apache Spark (Python).",
      "Configured Triggers for workflow automation.",
      "Tested ETL scripts in Development Endpoints."
    ]
  }
];

const projects = [
  {
    title: "AWS Glue – Automated ETL Pipeline",
    description: "Designed and implemented a fully automated ETL pipeline on AWS for processing large datasets. Leveraged AWS Glue for data extraction, transformation, and loading, S3 for data storage, and Athena for querying.",
    tools: ["AWS Glue", "S3", "Athena", "Python"],
    link: "#",
    dataAiHint: "cloud data"
  },
  {
    title: "AI/ML Candlestick Analysis System",
    description: "Developed a machine learning model to analyze and predict stock market trends based on candlestick patterns. Utilized deep learning techniques to identify patterns and provide insights for trading decisions.",
    tools: ["Python", "TensorFlow", "Pandas"],
    link: "#",
    dataAiHint: "stock market"
  },
  {
    title: "Fraud Detection in Online Transactions",
    description: "Built a machine learning system to detect fraudulent online transactions in real-time. The model was trained on a large dataset of transactions to identify anomalies and flag suspicious activities.",
    tools: ["Python", "Flask", "Jupyter"],
    link: "#",
    dataAiHint: "security code"
  }
];

const education = {
  institution: "MCKV institute of engineering",
  degree: "Bachelor of Technology in Information Technology",
  details: "Pursuing a Bachelor of Technology with a focus on Information Technology."
};

const iconMap: { [key: string]: React.ReactNode } = {
  "Programming Languages": <Code className="h-6 w-6 text-primary" />,
  "Web Technologies": <Wind className="h-6 w-6 text-primary" />,
  "Libraries/Frameworks": <Server className="h-6 w-6 text-primary" />,
  "Cloud Platforms": <Cloud className="h-6 w-6 text-primary" />,
  "Databases": <Database className="h-6 w-6 text-primary" />,
  "Version Control": <Github className="h-6 w-6 text-primary" />
};

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center">
          <a href="#" className="mr-6 flex items-center space-x-2">
            <Code className="h-6 w-6 text-primary" />
            <span className="font-bold">
              Shibam Das
            </span>
          </a>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <a href="#about" className="transition-colors hover:text-primary">About</a>
            <a href="#skills" className="transition-colors hover:text-primary">Skills</a>
            <a href="#experience" className="transition-colors hover:text-primary">Experience</a>
            <a href="#projects" className="transition-colors hover:text-primary">Projects</a>
            <a href="#education" className="transition-colors hover:text-primary">Education</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section id="home" className="container grid grid-cols-1 items-center gap-8 py-24 text-center md:py-32">
          <div className="space-y-4 [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">Shibam Das</h1>
            <h2 className="text-2xl font-medium text-primary md:text-3xl">Software Developer & AI Enthusiast</h2>
            <p className="mx-auto max-w-xl text-foreground/80">
              An Information Technology student with a passion for building innovative software solutions and exploring the frontiers of artificial intelligence.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild>
                <a href="mailto:shibamdas0618@gmail.com"><Mail className="mr-2 h-4 w-4" /> Email Me</a>
              </Button>
               <Button asChild>
                <a href="tel:8240169466"><Phone className="mr-2 h-4 w-4" /> Call Me</a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="https://github.com/shibam-das" target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> GitHub</a>
              </Button>
              <Button variant="secondary" asChild>
                <a href="https://www.linkedin.com/in/shibam-das-8262092a7" target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">
              <Sparkles className="mr-2 inline-block h-8 w-8 text-accent" />
              About Me
            </h2>
            <div className="mx-auto max-w-4xl">
              <AboutGenerator />
            </div>
          </div>
        </section>

        <section id="skills" className="container py-12 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">My Skillset</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([category, items]) => (
              <Card key={category}>
                <CardHeader className="flex flex-row items-center gap-4">
                  {iconMap[category]}
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {items.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="experience" className="w-full py-12 md:py-24">
          <div className="container">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">Work Experience</h2>
            <div className="mx-auto max-w-3xl space-y-8">
              {experience.map(exp => (
                <Card key={exp.company}>
                  <CardHeader>
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-semibold text-primary">{exp.company}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> {exp.period}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                      {exp.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="container py-12 md:py-24">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">Featured Projects</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map(project => (
              <Card key={project.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4 text-sm text-muted-foreground">{project.description}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tools.map(tool => <Badge key={tool} variant="outline">{tool}</Badge>)}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="h-auto p-0">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View on GitHub <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section id="education" className="w-full py-12 md:py-24">
          <div className="container text-center">
            <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl [text-shadow:0_2px_4px_rgba(0,0,0,0.2)]">Education</h2>
            <Card className="mx-auto max-w-2xl text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <School className="h-6 w-6 text-primary" />
                  {education.degree}
                </CardTitle>
                <CardDescription>{education.institution}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{education.details}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="container py-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Shibam Das. All rights reserved.</p>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  )
}

    