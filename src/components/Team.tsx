import { Award, Users, Zap, Target } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Expert Engineers",
  },
  {
    icon: Award,
    value: "200+",
    label: "Projects Delivered",
  },
  {
    icon: Zap,
    value: "15+",
    label: "Years Experience",
  },
  {
    icon: Target,
    value: "98%",
    label: "Client Satisfaction",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-20 gradient-hero">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-white mb-4">
            World-Class Team
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Our experts bring decades of combined experience across industries
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
                <stat.icon className="text-accent" size={32} />
              </div>
              <div className="text-5xl font-outfit font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 animate-fade-in-up">
            <h3 className="font-outfit font-bold text-xl text-white mb-3">
              Certified Experts
            </h3>
            <p className="text-white/80">
              AWS, Azure, GCP certified professionals with proven track records
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            <h3 className="font-outfit font-bold text-xl text-white mb-3">
              Agile Approach
            </h3>
            <p className="text-white/80">
              Iterative development with continuous feedback and rapid delivery
            </p>
          </div>
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <h3 className="font-outfit font-bold text-xl text-white mb-3">
              24/7 Support
            </h3>
            <p className="text-white/80">
              Round-the-clock monitoring and support for mission-critical systems
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
