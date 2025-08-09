import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
  onEventClick?: () => void;
}

export default function EventCard({ event, onEventClick }: EventCardProps) {
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden shadow-lg card-hover cursor-pointer" onClick={onEventClick}>
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getCategoryColor(event.category)}>
            {event.category}
          </Badge>
          <span className="text-gray-500 text-sm">{formatDate(event.date)}</span>
        </div>
        <h3 className="text-xl font-semibold text-cyber-dark mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
        <Button className="w-full">
          {onEventClick ? "Learn More" : "Register Now"}
        </Button>
      </CardContent>
    </Card>
  );
}
