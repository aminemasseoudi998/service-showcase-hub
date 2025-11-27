import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "TechVision Solutions transformed our entire infrastructure. The team's expertise in cloud migration saved us 40% in operational costs while improving performance.",
    author: "Sarah Johnson",
    role: "CTO, GlobalTech Inc",
  },
  {
    quote:
      "Their custom software development exceeded our expectations. The application they built handles our complex workflows seamlessly and scales beautifully.",
    author: "Michael Chen",
    role: "VP of Engineering, DataFlow Systems",
  },
  {
    quote:
      "The business intelligence dashboard they created gave us insights we never had before. Decision-making is now data-driven across all departments.",
    author: "Emily Rodriguez",
    role: "COO, Analytics Pro",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Client Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our clients say about working with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative hover:shadow-large transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="pt-6">
                <Quote className="text-accent/20 mb-4" size={48} />
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
