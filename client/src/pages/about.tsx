import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Users, Calendar, Trophy, Target, Code, Award } from "lucide-react";

export default function About() {
  const achievements = [
    {
      year: "2024",
      date: "15 Dec",
      title: "NATIONAL HACKATHON CHAMPIONS",
      description: "Our team secured first place in the National Tech Innovation Challenge with our AI-powered sustainability project, competing against 200+ teams nationwide.",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      year: "2024",
      date: "08 Oct",
      title: "TECH CONFERENCE ORGANIZERS",
      description: "Successfully organized and hosted CyberCon 2024, bringing together 500+ tech enthusiasts, industry experts, and students for knowledge sharing.",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      year: "2023",
      date: "22 Nov",
      title: "STARTUP INCUBATOR LAUNCH",
      description: "Launched our startup incubator program, successfully mentoring 12 student startups with 8 securing funding and continuing operations.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    },
    {
      year: "2023",
      date: "01 Jun",
      title: "CYBERHUB FOUNDATION ESTABLISHED",
      description: "Founded CyberHub as a community-driven platform to bridge the gap between academic learning and industry requirements in technology.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
    }
  ];

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <HelpCircle className="h-6 w-6 text-gray-600" />
          </div>
          <h1 className="text-4xl font-bold">
            ABOUT <span className="text-blue-600">US</span>
          </h1>
        </div>

        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
              alt="CyberHub Community"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              CyberHub, a dynamic technology community platform, began its journey in 2021 
              to create a bridge between academic learning and real-world technology applications. 
              Our mission is to foster innovation, encourage collaboration, and provide a 
              supportive environment where tech enthusiasts can grow, learn, and build 
              meaningful projects together.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We recognized the need for a platform that goes beyond traditional learning 
              methods to offer hands-on experience, mentorship, and community support. 
              CyberHub is dedicated to empowering the next generation of technology leaders 
              through workshops, hackathons, networking events, and educational resources 
              that keep our members at the forefront of technological advancement.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our community has taken the commitment to democratize technology education 
              and make it accessible to everyone, regardless of their background. We believe 
              in creating an inclusive environment where innovation thrives, ideas are shared 
              freely, and every member has the opportunity to make a meaningful impact in 
              the technology landscape.
            </p>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            OUR <span className="text-blue-600">ACHIEVEMENTS</span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Timeline */}
            <div className="lg:col-span-2 space-y-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex">
                      <div className="w-20 bg-gray-800 text-white text-center py-4 flex flex-col items-center justify-center">
                        <div className="text-sm font-bold">{achievement.year}</div>
                        <div className="text-xs">{achievement.date}</div>
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex gap-4">
                          <img 
                            src={achievement.image}
                            alt={achievement.title}
                            className="w-24 h-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-gray-900 mb-2">{achievement.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Stats */}
            <div className="space-y-6">
              {/* Events Stats */}
              <Card className="bg-blue-600 text-white">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 mx-auto mb-4" />
                  <h3 className="text-sm font-semibold mb-2">Events</h3>
                  <p className="text-xs mb-4">Organized by CYBERHUB</p>
                  <div className="text-4xl font-bold">47</div>
                  <div className="text-sm">Total Events</div>
                </CardContent>
              </Card>

              {/* Members */}
              <div className="flex items-center gap-4 text-gray-600">
                <Users className="h-6 w-6" />
                <div>
                  <div className="text-sm">Total</div>
                  <div className="text-sm">Members</div>
                </div>
                <div className="text-2xl font-bold text-blue-600 ml-auto">1,200+</div>
              </div>

              {/* Alumni */}
              <div className="flex items-center gap-4 text-gray-600">
                <Trophy className="h-6 w-6" />
                <div>
                  <div className="text-sm">Total</div>
                  <div className="text-sm">Alumni</div>
                </div>
                <div className="text-2xl font-bold text-blue-600 ml-auto">850+</div>
              </div>

              {/* Years */}
              <div className="relative">
                <div className="w-20 h-20 border-4 border-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">3</div>
                    <div className="text-xs text-gray-600">Years</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Users className="h-4 w-4 mr-2" />
              See Members
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Code className="h-4 w-4 mr-2" />
              Explore Projects
            </Button>
          </div>

          {/* Total Panelists */}
          <div className="mt-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Award className="h-5 w-5" />
              <span className="font-semibold">TOTAL PANELISTS</span>
              <span className="text-2xl font-bold text-blue-600">36</span>
            </div>
          </div>
        </div>

        {/* Our Motive Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">
            OUR <span className="text-blue-600">MOTIVE</span>
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Technology serves as the driving force of modern progress, fundamentally transforming how we live, 
              work, and connect with one another. In this digital age, where innovation moves at unprecedented 
              speed, CyberHub emerged with a clear vision: to prepare tomorrow's tech leaders for the challenges 
              and opportunities that lie ahead. Our community represents more than just a learning platform—we 
              are a movement dedicated to fostering technological excellence and inclusive innovation.
            </p>
            <p>
              At CyberHub, we believe in the power of collaborative learning and peer-to-peer knowledge sharing. 
              Our approach combines structured learning with hands-on experience, ensuring our members not only 
              understand theoretical concepts but can also apply them to solve real-world problems. Through our 
              diverse range of programs—from beginner-friendly workshops to advanced hackathons—we create 
              pathways for continuous growth and skill development.
            </p>
            <p>
              Our commitment extends beyond individual growth to community impact. We envision a future where 
              technology serves humanity's greatest needs, and we're dedicated to nurturing the innovators 
              who will make that vision a reality. Through mentorship, collaboration, and unwavering support 
              for our members' aspirations, CyberHub continues to build a legacy of technological advancement 
              and positive social impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}