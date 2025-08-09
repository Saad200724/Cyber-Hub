import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Resource } from "@shared/schema";
import { PlayCircle, FileText, Newspaper, GraduationCap, Clock } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "videos":
        return <PlayCircle className="h-5 w-5 text-red-500" />;
      case "pdfs":
        return <FileText className="h-5 w-5 text-red-600" />;
      case "articles":
        return <Newspaper className="h-5 w-5 text-gray-600" />;
      case "courses":
        return <GraduationCap className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getButtonProps = (type: string) => {
    switch (type) {
      case "videos":
        return { text: "Watch Video", className: "bg-red-500 hover:bg-red-600" };
      case "pdfs":
        return { text: "Download PDF", className: "bg-primary hover:bg-primary/90" };
      case "articles":
        return { text: "Read Article", className: "bg-green-500 hover:bg-green-600" };
      case "courses":
        return { text: "Start Course", className: "bg-purple-500 hover:bg-purple-600" };
      default:
        return { text: "View Resource", className: "bg-primary hover:bg-primary/90" };
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAction = () => {
    if (resource.link && resource.link !== "#") {
      if (resource.link.includes("youtube")) {
        window.open(resource.link, "_blank");
      } else {
        // For PDFs and other resources, we would typically handle downloads here
        console.log("Action for resource:", resource.id);
      }
    } else {
      console.log("Action for resource:", resource.id);
    }
  };

  const buttonProps = getButtonProps(resource.type);

  return (
    <Card className="overflow-hidden shadow-lg card-hover">
      <img
        src={resource.image}
        alt={resource.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {getTypeIcon(resource.type)}
            <span className="text-sm font-medium text-gray-600">{resource.category}</span>
          </div>
          <Badge className={getLevelColor(resource.level)}>
            {resource.level}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold text-cyber-dark mb-2">{resource.title}</h3>
        <p className="text-gray-600 mb-3 line-clamp-3">{resource.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            {resource.duration}
          </span>
        </div>
        <Button
          className={`w-full text-white ${buttonProps.className}`}
          onClick={handleAction}
        >
          {buttonProps.text}
        </Button>
      </CardContent>
    </Card>
  );
}
