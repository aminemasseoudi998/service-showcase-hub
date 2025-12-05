import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Pencil,
  Trash2,
  LogOut,
  LayoutDashboard,
  FolderKanban,
  Users,
  Settings,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { PortfolioProject, PortfolioProjectInput } from "@/types/portfolio";
import apiService from "@/services/api";
import { toast } from "sonner";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  techStack: z.string().min(1, "At least one technology is required"),
  results: z.string().min(1, "Results are required"),
  clientName: z.string().optional(),
  projectUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
});

type ProjectForm = z.infer<typeof projectSchema>;

// Demo projects for testing without backend
const DEMO_PROJECTS: PortfolioProject[] = [
  {
    _id: "1",
    title: "Enterprise Cloud Migration",
    description: "Complete infrastructure migration to AWS with zero downtime.",
    category: "Cloud Solutions",
    techStack: ["AWS", "Docker", "Kubernetes"],
    results: "99.9% uptime achieved",
    clientName: "Global Finance Corp",
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAdmin, logout, isLoading: authLoading } = useAuth();
  const [projects, setProjects] = useState<PortfolioProject[]>(DEMO_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null);
  const [activeTab, setActiveTab] = useState("portfolio");

  const form = useForm<ProjectForm>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      techStack: "",
      results: "",
      clientName: "",
      projectUrl: "",
      githubUrl: "",
      imageUrl: "",
      featured: false,
    },
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const data = await apiService.getPortfolioProjects();
      if (data.length > 0) {
        setProjects(data);
      }
    } catch {
      console.log("Using demo data - connect your API to manage real projects");
    } finally {
      setIsLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingProject(null);
    form.reset({
      title: "",
      description: "",
      category: "",
      techStack: "",
      results: "",
      clientName: "",
      projectUrl: "",
      githubUrl: "",
      imageUrl: "",
      featured: false,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (project: PortfolioProject) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      description: project.description,
      category: project.category,
      techStack: project.techStack.join(", "),
      results: project.results,
      clientName: project.clientName || "",
      projectUrl: project.projectUrl || "",
      githubUrl: project.githubUrl || "",
      imageUrl: project.imageUrl || "",
      featured: project.featured,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: ProjectForm) => {
    const projectData: PortfolioProjectInput = {
      title: data.title,
      description: data.description,
      category: data.category,
      results: data.results,
      techStack: data.techStack.split(",").map((t) => t.trim()),
      clientName: data.clientName || undefined,
      projectUrl: data.projectUrl || undefined,
      githubUrl: data.githubUrl || undefined,
      imageUrl: data.imageUrl || undefined,
      featured: data.featured,
    };

    try {
      if (editingProject) {
        const updated = await apiService.updatePortfolioProject(editingProject._id, projectData);
        setProjects((prev) =>
          prev.map((p) => (p._id === editingProject._id ? updated : p))
        );
        toast.success("Project updated successfully");
      } else {
        const created = await apiService.createPortfolioProject(projectData);
        setProjects((prev) => [...prev, created]);
        toast.success("Project created successfully");
      }
      setDialogOpen(false);
    } catch (error) {
      // Demo mode - add locally
      const newProject: PortfolioProject = {
        _id: Date.now().toString(),
        ...projectData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        featured: data.featured,
      };
      
      if (editingProject) {
        setProjects((prev) =>
          prev.map((p) => (p._id === editingProject._id ? { ...newProject, _id: editingProject._id } : p))
        );
        toast.success("Project updated (demo mode)");
      } else {
        setProjects((prev) => [...prev, newProject]);
        toast.success("Project created (demo mode)");
      }
      setDialogOpen(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await apiService.deletePortfolioProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted successfully");
    } catch {
      // Demo mode
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted (demo mode)");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "portfolio", label: "Portfolio", icon: FolderKanban },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="font-outfit text-xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">
            {user?.name || "Demo User"}
          </p>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        {activeTab === "portfolio" && (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-outfit text-3xl font-bold">Portfolio Projects</h2>
                <p className="text-muted-foreground">
                  Manage your portfolio projects
                </p>
              </div>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={openCreateDialog} className="gradient-accent">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProject ? "Edit Project" : "Create New Project"}
                    </DialogTitle>
                  </DialogHeader>

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Project title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Cloud Solutions" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Project description..."
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="techStack"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tech Stack (comma-separated)</FormLabel>
                            <FormControl>
                              <Input placeholder="React, Node.js, AWS" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="results"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Results</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., 40% cost reduction" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="clientName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Client Name (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="Client name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="imageUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image URL (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="projectUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project URL (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="githubUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>GitHub URL (optional)</FormLabel>
                              <FormControl>
                                <Input placeholder="https://github.com/..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                          <FormItem className="flex items-center gap-3">
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="!mt-0">Featured Project</FormLabel>
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="gradient-accent">
                          {editingProject ? "Update" : "Create"} Project
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Projects Grid */}
            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project._id} className="group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {project.category}
                          </Badge>
                          <CardTitle className="text-lg">{project.title}</CardTitle>
                        </div>
                        {project.featured && (
                          <Badge className="gradient-accent">Featured</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.techStack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditDialog(project)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => deleteProject(project._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <h2 className="font-outfit text-3xl font-bold">Dashboard</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-accent">{projects.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Featured</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-accent">
                    {projects.filter((p) => p.featured).length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-accent">
                    {new Set(projects.map((p) => p.category)).size}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="font-outfit text-3xl font-bold mb-4">Users</h2>
            <p className="text-muted-foreground">
              User management will be available when connected to your backend.
            </p>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="font-outfit text-3xl font-bold mb-4">Settings</h2>
            <Card className="max-w-xl">
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">API Base URL</label>
                  <Input
                    value={import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"}
                    disabled
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Set VITE_API_BASE_URL in your .env file
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
