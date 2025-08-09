import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@shared/schema";
import { Calendar, Clock, User, Signal } from "lucide-react";

interface EventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "workshop":
        return "bg-primary text-primary-foreground";
      case "hackathon":
        return "bg-green-500 text-white";
      case "networking":
        return "bg-purple-500 text-white";
      case "competition":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-cyber-dark mb-2">
            {event.title}
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="flex items-center justify-between text-sm text-gray-600 border-b pb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.duration}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 border-b pb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {event.instructor}
                </div>
                <div className="flex items-center">
                  <Signal className="h-4 w-4 mr-2" />
                  {event.level}
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <Badge className={getCategoryColor(event.category)}>
                  {event.category}
                </Badge>
                {event.maxParticipants && (
                  <Badge variant="outline">
                    Max {event.maxParticipants} participants
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-700 leading-relaxed">{event.fullDescription}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-cyber-dark mb-2">What you'll learn:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Hands-on practical experience</li>
                  <li>Industry best practices</li>
                  <li>Networking opportunities</li>
                  <li>Certificate of completion</li>
                </ul>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button className="flex-1">Register for Event</Button>
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
