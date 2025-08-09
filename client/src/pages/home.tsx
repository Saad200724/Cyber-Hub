import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Cog, Smartphone, Code, Cpu, Users, Target, Award, Calendar, BookOpen, Trophy, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@shared/schema";
import EventCard from "@/components/cards/event-card";

export default function Home() {
  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const upcomingEvents = events?.slice(0, 4) || [];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-white pt-20 pb-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 md:pr-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                JOIN THE COMMUNITY OF
                <span className="block text-blue-600">TECH ENTHUSIASTS</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Connect with like-minded developers, innovators, and tech professionals. 
                Learn, grow, and build the future together in our vibrant community.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                JOIN US
              </Button>
            </div>
            <div className="relative flex-1 md:pl-8">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 aspect-square flex items-center justify-center">
                  <Code className="h-8 w-8 text-white" />
                </div>
                <div className="bg-blue-600 rounded-lg p-4 aspect-square flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div className="bg-gray-300 rounded-lg p-4 aspect-square flex items-center justify-center">
                  <Smartphone className="h-8 w-8 text-gray-700" />
                </div>
                <div className="bg-gray-400 rounded-lg p-4 aspect-square flex items-center justify-center">
                  <Cog className="h-8 w-8 text-white" />
                </div>
                <div className="bg-gray-200 rounded-lg p-4 aspect-square flex items-center justify-center">
                  <Cpu className="h-8 w-8 text-gray-700" />
                </div>
                <div className="bg-gray-600 rounded-lg p-4 aspect-square flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              WE HAVE <span className="text-blue-600">DEPARTMENTS</span> ON
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {/* Artificial Intelligence */}
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-blue-200 transition-colors">
                <Brain className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Artificial</h3>
              <h3 className="font-semibold text-gray-900">Intelligence</h3>
            </div>

            {/* Research & Development */}
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-gray-200 transition-colors">
                <Target className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Research &</h3>
              <h3 className="font-semibold text-gray-900">Development</h3>
            </div>

            {/* App Development */}
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-blue-700 transition-colors">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">App</h3>
              <h3 className="font-semibold text-gray-900">Development</h3>
            </div>

            {/* Programming */}
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-teal-200 transition-colors">
                <Code className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Programming</h3>
            </div>

            {/* AI & IoT */}
            <div className="flex-shrink-0 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto hover:bg-purple-200 transition-colors">
                <Cpu className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">AI &</h3>
              <h3 className="font-semibold text-gray-900">IoT</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              OUR <span className="text-blue-600">ACTIVITIES</span> INCLUDE
            </h2>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <CardContent className="p-4 bg-gray-800">
                    <div className="h-4 bg-gray-600 rounded mb-2"></div>
                    <div className="h-16 bg-gray-600 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 bg-gray-900 text-white">
                    <h3 className="font-bold text-sm mb-2 uppercase tracking-wide">{event.title}</h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {event.description.length > 100 
                        ? event.description.substring(0, 100) + '...'
                        : event.description
                      }
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              WHY YOU SHOULD <span className="text-blue-600">JOIN CYBERHUB?</span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Skill Development */}
            <div className="flex-1 text-center">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">SKILL DEVELOPMENT</h3>
              <p className="text-gray-600 leading-relaxed">
                Enhance your technical skills through hands-on workshops, coding challenges, 
                and real-world projects that prepare you for industry success.
              </p>
            </div>

            {/* Community & Networking */}
            <div className="flex-1 text-center">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">NETWORK WITH EXPERTS</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with industry professionals, mentors, and like-minded peers. 
                Build valuable relationships that advance your career.
              </p>
            </div>

            {/* Career Growth */}
            <div className="flex-1 text-center">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Trophy className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">CAREER ADVANCEMENT</h3>
              <p className="text-gray-600 leading-relaxed">
                Access exclusive job opportunities, internships, and mentorship programs 
                that accelerate your professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
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
    </div>
  );
}
