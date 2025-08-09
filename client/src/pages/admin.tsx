import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Event, insertEventSchema } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Calendar, Users, Book, ClipboardCheck, Plus, Edit, Trash2, UserPlus } from "lucide-react";

export default function Admin() {
  const [eventForm, setEventForm] = useState({
    title: "",
    description: "",
    fullDescription: "",
    date: "",
    category: "",
    image: "",
    instructor: "",
    duration: "",
    level: "",
    maxParticipants: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: events } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const createEventMutation = useMutation({
    mutationFn: async (eventData: any) => {
      const response = await apiRequest("POST", "/api/events", eventData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setEventForm({
        title: "",
        description: "",
        fullDescription: "",
        date: "",
        category: "",
        image: "",
        instructor: "",
        duration: "",
        level: "",
        maxParticipants: "",
      });
      toast({
        title: "Success",
        description: "Event created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const eventData = {
        ...eventForm,
        maxParticipants: eventForm.maxParticipants ? parseInt(eventForm.maxParticipants) : null,
      };
      insertEventSchema.parse(eventData);
      createEventMutation.mutate(eventData);
    } catch (error) {
      toast({
        title: "Validation Error",
        description: "Please check all required fields.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEventForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cyber-dark mb-4">Admin Panel</h1>
          <p className="text-xl text-gray-600">Manage events, users, and content</p>
        </div>

        {/* Admin Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Events</p>
                  <p className="text-2xl font-bold text-cyber-dark">{events?.length || 0}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Active Users</p>
                  <p className="text-2xl font-bold text-cyber-dark">1,247</p>
                </div>
                <Users className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Resources</p>
                  <p className="text-2xl font-bold text-cyber-dark">89</p>
                </div>
                <Book className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Quiz Submissions</p>
                  <p className="text-2xl font-bold text-cyber-dark">456</p>
                </div>
                <ClipboardCheck className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Event Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-cyber-dark">Event Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="default">
                <Plus className="h-4 w-4 mr-2" /> Add New Event
              </Button>
              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" /> Edit Existing Events
              </Button>
              <Button className="w-full" variant="destructive">
                <Trash2 className="h-4 w-4 mr-2" /> Delete Events
              </Button>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold text-cyber-dark">User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" variant="default">
                <UserPlus className="h-4 w-4 mr-2" /> Add New User
              </Button>
              <Button className="w-full" variant="outline">
                <Users className="h-4 w-4 mr-2" /> View All Users
              </Button>
              <Button className="w-full" variant="outline">
                <Edit className="h-4 w-4 mr-2" /> Manage Permissions
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Add Event Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold text-cyber-dark">Quick Add Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Event Title</Label>
                  <Input
                    id="title"
                    value={eventForm.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter event title"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Event description"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  rows={4}
                  value={eventForm.fullDescription}
                  onChange={(e) => handleInputChange("fullDescription", e.target.value)}
                  placeholder="Detailed event description"
                  required
                />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={eventForm.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="workshop">Workshop</SelectItem>
                      <SelectItem value="hackathon">Hackathon</SelectItem>
                      <SelectItem value="networking">Networking</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="level">Level</Label>
                  <Select value={eventForm.level} onValueChange={(value) => handleInputChange("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="all levels">All Levels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input
                    id="instructor"
                    value={eventForm.instructor}
                    onChange={(e) => handleInputChange("instructor", e.target.value)}
                    placeholder="Instructor name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={eventForm.duration}
                    onChange={(e) => handleInputChange("duration", e.target.value)}
                    placeholder="e.g., 2 hours"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={eventForm.image}
                    onChange={(e) => handleInputChange("image", e.target.value)}
                    placeholder="Event image URL"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    value={eventForm.maxParticipants}
                    onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                    placeholder="50"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={createEventMutation.isPending}>
                {createEventMutation.isPending ? "Creating..." : "Create Event"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
