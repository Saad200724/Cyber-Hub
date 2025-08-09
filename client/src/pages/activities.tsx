import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Event, type Project, type Publication } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Github, Calendar, User, Tag, Clock, MapPin, Users } from "lucide-react";

export default function Activities() {
  const { data: events = [], isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: publications = [], isLoading: publicationsLoading } = useQuery<Publication[]>({
    queryKey: ["/api/publications"],
  });

  if (eventsLoading || projectsLoading || publicationsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading activities...</div>
      </div>
    );
  }

  const workshops = events.filter(event => event.category === "Workshop");
  const otherEvents = events.filter(event => event.category !== "Workshop");

  const renderEvents = (eventList: Event[], title: string) => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">
          {title === "Workshops" ? "Hands-on learning experiences and skill development sessions" : "Community events, hackathons, and networking opportunities"}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventList.map((event) => (
          <Card key={event.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-4 right-4">
                <Badge variant="default">{event.category}</Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{event.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{event.maxParticipants}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Instructor: {event.instructor}</span>
                  <Badge variant="outline">{event.level}</Badge>
                </div>
                <Button className="w-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  Register Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => {
        const technologies = JSON.parse(project.technologies) as string[];
        return (
          <Card key={project.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-4 right-4">
                <Badge variant={project.status === "Active" ? "default" : 
                               project.status === "Completed" ? "secondary" : "outline"}>
                  {project.status}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {project.description}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{project.author}</span>
                <Badge variant="outline" className="ml-auto">
                  {project.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderPublications = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {publications.map((publication) => {
        const tags = JSON.parse(publication.tags) as string[];
        return (
          <Card key={publication.id} className="group hover:shadow-lg transition-shadow">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={publication.image}
                alt={publication.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg font-semibold">{publication.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {publication.description}
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{publication.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(publication.publishedDate).toLocaleDateString()}</span>
                </div>
                <Badge variant="outline" className="ml-auto">
                  {publication.category}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
                {publication.pdfUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={publication.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Read Paper
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Community Activities</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore workshops, events, innovative projects, and research publications from our tech community.
          </p>
        </div>

        <Tabs defaultValue="workshops" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
          </TabsList>

          <TabsContent value="workshops" className="space-y-6">
            {renderEvents(workshops, "Workshops")}
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            {renderEvents(otherEvents, "Events")}
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Innovative Projects</h2>
              <p className="text-muted-foreground">
                Explore cutting-edge projects built by our community members
              </p>
            </div>
            {renderProjects()}
          </TabsContent>

          <TabsContent value="publications" className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-2">Research Publications</h2>
              <p className="text-muted-foreground">
                Academic papers and research contributions from our members
              </p>
            </div>
            {renderPublications()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}