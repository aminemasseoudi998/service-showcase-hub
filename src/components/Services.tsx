import { Code2, Cloud, ClipboardList, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Code2,
    title: "Custom Software Development",
    description:
      "Tailored solutions built with modern frameworks and best practices to meet your unique business needs.",
    features: ["Web Applications", "Mobile Apps", "API Development", "Legacy Modernization"],
  },
  {
    icon: Cloud,
    title: "DevOps & Cloud Solutions",
    description:
      "Streamline your operations with automated CI/CD pipelines and scalable cloud infrastructure.",
    features: ["AWS/Azure/GCP", "Container Orchestration", "Infrastructure as Code", "24/7 Monitoring"],
  },
  {
    icon: ClipboardList,
    title: "Project Management & Consulting",
    description:
      "Expert guidance to navigate digital transformation and deliver projects on time and within budget.",
    features: ["Agile Methodology", "Technical Leadership", "Process Optimization", "Risk Management"],
  },
  {
    icon: BarChart3,
    title: "Business Intelligence & Analytics",
    description:
      "Transform data into actionable insights with powerful analytics and visualization solutions.",
    features: ["Data Warehousing", "Dashboard Creation", "Predictive Analytics", "Real-time Reporting"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive technology solutions to power your business growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-large transition-all duration-300 hover:-translate-y-2 animate-scale-in border-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 gradient-accent rounded-xl flex items-center justify-center mb-4 shadow-glow">
                  <service.icon className="text-white" size={28} />
                </div>
                <CardTitle className="text-2xl font-outfit">{service.title}</CardTitle>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
