import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/cards/event-card";
import EventModal from "@/components/modals/event-modal";

export default function Events() {
  const [categoryFilter, setCategoryFilter] = useState("events");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const filteredEvents = events?.filter((event) => {
    if (categoryFilter === "events") return true;
    return event.category.toLowerCase() === categoryFilter.toLowerCase();
  }) || [];

  const filterButtons = [
    { id: "events", label: "Events", active: true },
    { id: "workshop", label: "Workshops", active: false },
    { id: "hackathon", label: "Projects", active: false },
    { id: "networking", label: "Publications", active: false }
  ];

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">ALL EVENTS</h1>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          {filterButtons.map((button) => (
            <Button
              key={button.id}
              onClick={() => setCategoryFilter(button.id)}
              variant={categoryFilter === button.id ? "default" : "outline"}
              className={`px-6 py-2 rounded-full ${
                categoryFilter === button.id 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {button.label}
            </Button>
          ))}
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i} className="animate-pulse bg-white border border-gray-200">
                <div className="h-48 bg-gray-200"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-16 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredEvents.map((event) => (
              <Card key={event.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-sm mb-2 text-gray-900 uppercase tracking-wide">
                    {event.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-4">
                    {event.description}
                  </p>
                  <Button 
                    onClick={() => setSelectedEvent(event)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-2"
                  >
                    LEARN MORE
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-white border border-gray-200">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No events found</h3>
              <p className="text-gray-500">
                {categoryFilter !== "events"
                  ? "Try selecting a different category."
                  : "Check back later for upcoming events."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Newsletter Section */}
        <section className="py-16 bg-gray-900 text-white mt-20 -mx-6">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                SUBSCRIBE TO OUR <span className="text-blue-400">NEWSLETTER</span>
              </h2>
              <p className="text-gray-300 mb-8 text-lg">
                Stay updated with the latest events, workshops, and tech news. 
                Get exclusive access to resources and early event registrations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            isOpen={!!selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </div>
    </div>
  );
}
