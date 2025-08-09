import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type Event, type InsertEvent,
  type Project, type InsertProject,
  type Publication, type InsertPublication,
  type Blog, type InsertBlog,
  type Resource, type InsertResource,
  insertEventSchema,
  insertProjectSchema,
  insertPublicationSchema,
  insertBlogSchema,
  insertResourceSchema
} from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, Calendar, Users, BookOpen, FileText, Video } from "lucide-react";

const CONTENT_TYPES = {
  events: { title: "Events", icon: Calendar, endpoint: "/api/events" },
  projects: { title: "Projects", icon: Users, endpoint: "/api/projects" },
  publications: { title: "Publications", icon: BookOpen, endpoint: "/api/publications" },
  blogs: { title: "Blogs", icon: FileText, endpoint: "/api/blogs" },
  resources: { title: "Resources", icon: Video, endpoint: "/api/resources" }
};

interface AdminFormProps {
  type: keyof typeof CONTENT_TYPES;
  item?: any;
  onClose: () => void;
}

function AdminForm({ type, item, onClose }: AdminFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!item;

  const getSchema = () => {
    switch (type) {
      case "events": return insertEventSchema;
      case "projects": return insertProjectSchema;
      case "publications": return insertPublicationSchema;
      case "blogs": return insertBlogSchema;
      case "resources": return insertResourceSchema;
      default: return insertEventSchema;
    }
  };

  const form = useForm({
    resolver: zodResolver(getSchema()),
    defaultValues: item || {}
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${CONTENT_TYPES[type].endpoint}/${item.id}` : CONTENT_TYPES[type].endpoint;
      
      return apiRequest(url, {
        method,
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTENT_TYPES[type].endpoint] });
      toast({
        title: `${CONTENT_TYPES[type].title.slice(0, -1)} ${isEditing ? 'updated' : 'created'}`,
        description: `${CONTENT_TYPES[type].title.slice(0, -1)} has been ${isEditing ? 'updated' : 'created'} successfully.`
      });
      onClose();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to ${isEditing ? 'update' : 'create'} ${type.slice(0, -1)}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: any) => {
    // Handle JSON fields
    if (type === "projects" && data.technologies) {
      data.technologies = JSON.stringify(data.technologies.split(",").map((t: string) => t.trim()));
    }
    if ((type === "publications" || type === "blogs") && data.tags) {
      data.tags = JSON.stringify(data.tags.split(",").map((t: string) => t.trim()));
    }
    
    mutation.mutate(data);
  };

  const renderFields = () => {
    const commonFields = (
      <>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register("title")} placeholder="Enter title" />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input id="category" {...form.register("category")} placeholder="Enter category" />
            {form.formState.errors.category && (
              <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" {...form.register("description")} placeholder="Enter description" />
          {form.formState.errors.description && (
            <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Image URL</Label>
          <Input id="image" {...form.register("image")} placeholder="Enter image URL" />
          {form.formState.errors.image && (
            <p className="text-sm text-destructive">{form.formState.errors.image.message}</p>
          )}
        </div>
      </>
    );

    switch (type) {
      case "events":
        return (
          <>
            {commonFields}
            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea id="fullDescription" {...form.register("fullDescription")} placeholder="Enter full description" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" {...form.register("date")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input id="instructor" {...form.register("instructor")} placeholder="Instructor name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" {...form.register("duration")} placeholder="e.g., 2 hours" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input id="level" {...form.register("level")} placeholder="e.g., Beginner" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input id="maxParticipants" type="number" {...form.register("maxParticipants", { valueAsNumber: true })} />
              </div>
            </div>
          </>
        );
      
      case "projects":
        return (
          <>
            {commonFields}
            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description</Label>
              <Textarea id="fullDescription" {...form.register("fullDescription")} placeholder="Enter full description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="technologies">Technologies (comma-separated)</Label>
              <Input 
                id="technologies" 
                {...form.register("technologies")} 
                placeholder="React, Node.js, TypeScript" 
                defaultValue={item?.technologies ? JSON.parse(item.technologies).join(", ") : ""}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...form.register("author")} placeholder="Author name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input id="githubUrl" {...form.register("githubUrl")} placeholder="https://github.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL</Label>
                <Input id="demoUrl" {...form.register("demoUrl")} placeholder="https://demo.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => form.setValue("status", value)} defaultValue={item?.status || "Active"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );

      case "publications":
        return (
          <>
            {commonFields}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" {...form.register("content")} placeholder="Enter content" rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...form.register("author")} placeholder="Author name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishedDate">Published Date</Label>
                <Input id="publishedDate" type="date" {...form.register("publishedDate")} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input 
                  id="tags" 
                  {...form.register("tags")} 
                  placeholder="AI, Machine Learning, Research" 
                  defaultValue={item?.tags ? JSON.parse(item.tags).join(", ") : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pdfUrl">PDF URL</Label>
                <Input id="pdfUrl" {...form.register("pdfUrl")} placeholder="https://example.com/paper.pdf" />
              </div>
            </div>
          </>
        );

      case "blogs":
        return (
          <>
            {commonFields}
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" {...form.register("content")} placeholder="Enter blog content" rows={8} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="author">Author</Label>
                <Input id="author" {...form.register("author")} placeholder="Author name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="publishedDate">Published Date</Label>
                <Input id="publishedDate" type="date" {...form.register("publishedDate")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime">Read Time</Label>
                <Input id="readTime" {...form.register("readTime")} placeholder="5 min read" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input 
                  id="tags" 
                  {...form.register("tags")} 
                  placeholder="Tutorial, JavaScript, React" 
                  defaultValue={item?.tags ? JSON.parse(item.tags).join(", ") : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="isPublished">Published</Label>
                <Select onValueChange={(value) => form.setValue("isPublished", value === "true")} defaultValue={item?.isPublished?.toString() || "true"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="true">Published</SelectItem>
                    <SelectItem value="false">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );

      case "resources":
        return (
          <>
            {commonFields}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select onValueChange={(value) => form.setValue("type", value)} defaultValue={item?.type || "videos"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="videos">Videos</SelectItem>
                    <SelectItem value="pdfs">PDFs</SelectItem>
                    <SelectItem value="articles">Articles</SelectItem>
                    <SelectItem value="courses">Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" {...form.register("duration")} placeholder="e.g., 2 hours or 50 pages" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input id="level" {...form.register("level")} placeholder="e.g., Beginner" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input id="link" {...form.register("link")} placeholder="https://example.com" />
            </div>
          </>
        );

      default:
        return commonFields;
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {renderFields()}
      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : isEditing ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}

function AdminPanel({ type }: { type: keyof typeof CONTENT_TYPES }) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: [CONTENT_TYPES[type].endpoint],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`${CONTENT_TYPES[type].endpoint}/${id}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [CONTENT_TYPES[type].endpoint] });
      toast({
        title: `${CONTENT_TYPES[type].title.slice(0, -1)} deleted`,
        description: `${CONTENT_TYPES[type].title.slice(0, -1)} has been deleted successfully.`
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || `Failed to delete ${type.slice(0, -1)}`,
        variant: "destructive",
      });
    },
  });

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedItem(null);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  const Icon = CONTENT_TYPES[type].icon;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Manage {CONTENT_TYPES[type].title}</h2>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Add {CONTENT_TYPES[type].title.slice(0, -1)}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedItem ? "Edit" : "Create"} {CONTENT_TYPES[type].title.slice(0, -1)}
              </DialogTitle>
            </DialogHeader>
            <AdminForm type={type} item={selectedItem} onClose={handleCloseDialog} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {items.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No {type} found. Create your first one!</p>
            </CardContent>
          </Card>
        ) : (
          items.map((item: any) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {item.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteMutation.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="outline">{item.category}</Badge>
                  {item.author && <span>by {item.author}</span>}
                  {item.publishedDate && <span>{new Date(item.publishedDate).toLocaleDateString()}</span>}
                  {item.status && <Badge variant="secondary">{item.status}</Badge>}
                  {item.type && <Badge>{item.type}</Badge>}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<keyof typeof CONTENT_TYPES>("events");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-xl text-muted-foreground">
            Manage all content for the CyberHub platform
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as keyof typeof CONTENT_TYPES)}>
          <TabsList className="grid w-full grid-cols-5">
            {Object.entries(CONTENT_TYPES).map(([key, config]) => (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <config.icon className="w-4 h-4" />
                {config.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(CONTENT_TYPES).map((type) => (
            <TabsContent key={type} value={type}>
              <AdminPanel type={type as keyof typeof CONTENT_TYPES} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}