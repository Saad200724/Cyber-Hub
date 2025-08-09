import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Resource } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ResourceCard from "@/components/cards/resource-card";

export default function Learning() {
  const [activeFilter, setActiveFilter] = useState("all");

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const filteredResources = resources?.filter((resource) => {
    return activeFilter === "all" || resource.type === activeFilter;
  }) || [];

  const filters = [
    { key: "all", label: "All Resources" },
    { key: "videos", label: "Video Tutorials" },
    { key: "articles", label: "Articles" },
    { key: "pdfs", label: "PDFs" },
    { key: "courses", label: "Courses" },
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cyber-dark mb-4">Learning Zone</h1>
          <p className="text-xl text-gray-600">
            Expand your knowledge with our curated resources and tutorials
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.key)}
              className="rounded-full"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Resources Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No resources found</h3>
              <p className="text-gray-500">
                Check back later for new learning materials in this category.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
