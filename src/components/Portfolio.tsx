import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Enterprise E-Commerce Platform",
    description: "Built a scalable e-commerce solution handling 100K+ daily transactions",
    category: "Software Development",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    results: "300% increase in conversion rate",
  },
  {
    title: "Cloud Migration Initiative",
    description: "Migrated legacy infrastructure to cloud, reducing costs by 40%",
    category: "DevOps & Cloud",
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform"],
    results: "60% reduction in deployment time",
  },
  {
    title: "Real-Time Analytics Dashboard",
    description: "Created interactive BI dashboard for Fortune 500 client",
    category: "Business Intelligence",
    technologies: ["Power BI", "Python", "Azure", "SQL"],
    results: "10x faster data insights",
  },
];

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Our Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real results from real projects that made a difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="hover:shadow-large transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader>
                <Badge className="w-fit mb-2 bg-accent/10 text-accent hover:bg-accent/20">
                  {project.category}
                </Badge>
                <CardTitle className="text-2xl font-outfit">{project.title}</CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-accent font-semibold">{project.results}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
