import { useState, useEffect } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PortfolioProject } from "@/types/portfolio";
import apiService from "@/services/api";

// Demo data for when API is not connected
const DEMO_PROJECTS: PortfolioProject[] = [
  {
    _id: "1",
    title: "Enterprise Cloud Migration",
    description: "Complete infrastructure migration to AWS with zero downtime. Implemented CI/CD pipelines and containerized microservices architecture.",
    category: "Cloud Solutions",
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
    results: "99.9% uptime achieved, 40% cost reduction",
    clientName: "Global Finance Corp",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
    projectUrl: "https://example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "2",
    title: "AI-Powered Analytics Platform",
    description: "Built a real-time analytics dashboard with machine learning predictions for inventory management and sales forecasting.",
    category: "Business Intelligence",
    techStack: ["Python", "TensorFlow", "React", "PostgreSQL", "Redis"],
    results: "35% improvement in forecast accuracy",
    clientName: "RetailMax",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    githubUrl: "https://github.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "3",
    title: "Healthcare Management System",
    description: "HIPAA-compliant patient management system with telemedicine integration, appointment scheduling, and electronic health records.",
    category: "Custom Software",
    techStack: ["Node.js", "React", "MongoDB", "WebRTC", "AWS"],
    results: "50% reduction in admin time",
    clientName: "MedCare Solutions",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "4",
    title: "E-Commerce Platform Redesign",
    description: "Full-stack e-commerce platform with headless CMS, payment integration, and personalized recommendations engine.",
    category: "Custom Software",
    techStack: ["Next.js", "Stripe", "Sanity", "Vercel", "Algolia"],
    results: "120% increase in conversions",
    clientName: "StyleHub",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    projectUrl: "https://example.com",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const PortfolioSection = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>(DEMO_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      try {
        const data = await apiService.getPortfolioProjects();
        if (data.length > 0) {
          setProjects(data);
        }
      } catch {
        // Use demo data if API fails
        console.log("Using demo portfolio data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = ["all", ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Our Work
          </Badge>
          <h2 className="font-outfit text-4xl md:text-5xl font-bold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our portfolio of successful projects that have helped businesses 
            transform and grow through technology.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project._id}
              className="group overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden bg-muted">
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <Badge className="absolute top-4 left-4 gradient-accent">
                  {project.category}
                </Badge>
                {project.featured && (
                  <Badge variant="secondary" className="absolute top-4 right-4">
                    Featured
                  </Badge>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-outfit text-xl font-semibold mb-1 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    {project.clientName && (
                      <p className="text-sm text-muted-foreground">
                        {project.clientName}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.projectUrl && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.slice(0, 5).map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs font-normal"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.techStack.length > 5 && (
                    <Badge variant="outline" className="text-xs font-normal">
                      +{project.techStack.length - 5}
                    </Badge>
                  )}
                </div>

                {/* Results */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Results:</span>
                    <span className="font-medium text-accent">
                      {project.results}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
          </div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;
