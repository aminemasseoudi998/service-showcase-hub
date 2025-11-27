import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-outfit font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your business? Get in touch with us today
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8 animate-fade-in-up">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="font-outfit text-2xl">
                  Get In Touch
                </CardTitle>
                <CardDescription>
                  Fill out the form and our team will get back to you within 24
                  hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-input"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-input"
                    />
                  </div>
                  <div>
                    <Input
                      name="company"
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={handleChange}
                      className="border-input"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Tell us about your project"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="border-input"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full gradient-accent hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-start space-x-4 p-6 bg-muted rounded-xl">
              <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0 shadow-glow">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                <p className="text-muted-foreground">contact@techvision.com</p>
                <p className="text-muted-foreground">support@techvision.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-muted rounded-xl">
              <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0 shadow-glow">
                <Phone className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
                <p className="text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-6 bg-muted rounded-xl">
              <div className="w-12 h-12 gradient-accent rounded-lg flex items-center justify-center flex-shrink-0 shadow-glow">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Visit Us</h3>
                <p className="text-muted-foreground">123 Tech Avenue</p>
                <p className="text-muted-foreground">San Francisco, CA 94105</p>
              </div>
            </div>

            <Card className="mt-8 gradient-hero border-0">
              <CardContent className="p-6 text-center">
                <h3 className="font-outfit font-bold text-2xl text-white mb-2">
                  Schedule a Free Consultation
                </h3>
                <p className="text-white/90 mb-4">
                  Let's discuss how we can help your business grow
                </p>
                <Button
                  variant="outline"
                  className="bg-white text-primary hover:bg-white/90"
                  size="lg"
                >
                  Book a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
