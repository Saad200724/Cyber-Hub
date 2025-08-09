import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Resource, type Blog } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, PlayCircle, BookOpen, FileText, Video, Calendar, User, Clock, Tag } from "lucide-react";

export default function Learning() {
  const { data: resources = [], isLoading: resourcesLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const { data: blogs = [], isLoading: blogsLoading } = useQuery<Blog[]>({
    queryKey: ["/api/blogs"],
  });

  if (resourcesLoading || blogsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading educational content...</div>
      </div>
    );
  }

  const resourcesByType = resources.reduce((acc, resource) => {
    if (!acc[resource.type]) {
      acc[resource.type] = [];
    }
    acc[resource.type].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  const getIcon = (type: string) => {
    switch (type) {
      case "videos": return Video;
      case "pdfs": return FileText;
      case "articles": return BookOpen;
      case "courses": return PlayCircle;
      default: return BookOpen;
    }
  };

  const renderResourceCard = (resource: Resource) => {
    const Icon = getIcon(resource.type);
    
    return (
      <Card key={resource.id} className="group hover:shadow-lg transition-shadow">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              <Icon className="w-3 h-3 mr-1" />
              {resource.type}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">{resource.title}</CardTitle>
          <CardDescription>{resource.description}</CardDescription>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <Badge variant="outline">{resource.category}</Badge>
            <div className="flex items-center gap-4">
              <span>{resource.duration}</span>
              <span>{resource.level}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full" asChild>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Access Resource
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderBlogCard = (blog: Blog) => {
    const tags = JSON.parse(blog.tags) as string[];
    
    return (
      <Card key={blog.id} className="group hover:shadow-lg transition-shadow">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
          />
          <div className="absolute top-4 right-4">
            <Badge variant={blog.isPublished ? "default" : "secondary"}>
              {blog.isPublished ? "Published" : "Draft"}
            </Badge>
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold line-clamp-2">{blog.title}</CardTitle>
          <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
            <Badge variant="outline" className="ml-auto">
              {blog.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-1">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {tags.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{tags.length - 3} more
                </Badge>
              )}
            </div>
            <Button variant="outline" className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              Read Article
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderResourcesByType = (type: string, typeResources: Resource[]) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold capitalize mb-2">{type.replace("_", " ")}</h3>
        <p className="text-muted-foreground">
          {type === "videos" && "Watch comprehensive tutorials and lectures"}
          {type === "articles" && "Read in-depth articles and guides"}  
          {type === "pdfs" && "Download detailed documentation and papers"}
          {type === "courses" && "Take structured learning paths"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {typeResources.map(renderResourceCard)}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Education Hub</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expand your knowledge with our curated learning resources, tutorials, and expert insights from the community.
          </p>
        </div>

        <Tabs defaultValue="blogs" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="blogs">Blog Articles</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="blogs" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Latest Articles</h2>
              <p className="text-muted-foreground">
                Stay updated with the latest trends and insights in technology
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.filter(blog => blog.isPublished).map(renderBlogCard)}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Learning Resources</h2>
              <p className="text-muted-foreground">
                Comprehensive learning materials across different formats
              </p>
            </div>
            
            <Tabs defaultValue={Object.keys(resourcesByType)[0] || "videos"} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                {Object.keys(resourcesByType).map((type) => {
                  const Icon = getIcon(type);
                  return (
                    <TabsTrigger key={type} value={type} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {Object.entries(resourcesByType).map(([type, typeResources]) => (
                <TabsContent key={type} value={type}>
                  {renderResourcesByType(type, typeResources)}
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
