import { useQuery } from "@tanstack/react-query";
import { LeaderboardEntry } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Star, Flame } from "lucide-react";

export default function Leaderboard() {
  const { data: entries, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
  });

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-cyber-dark mb-4">Leaderboard</h1>
          <p className="text-xl text-gray-600">
            Top performers in our community challenges and competitions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-cyber-dark">156</h3>
              <p className="text-gray-600">Total Competitions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-cyber-dark">2,847</h3>
              <p className="text-gray-600">Active Participants</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-green-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-cyber-dark">98.5%</h3>
              <p className="text-gray-600">Satisfaction Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Flame className="h-8 w-8 text-red-500 mx-auto mb-3" />
              <h3 className="text-2xl font-bold text-cyber-dark">42</h3>
              <p className="text-gray-600">Days Streak Record</p>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-cyber-dark">Top Scorers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center space-x-4 animate-pulse">
                      <div className="w-12 h-12 bg-gray-200 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Rank
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Event
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Score
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {entries?.map((entry, index) => {
                      const rank = index + 1;
                      let rankIcon = null;
                      let rankClass = "";

                      if (rank === 1) {
                        rankIcon = <Trophy className="h-5 w-5 text-yellow-500 mr-2" />;
                        rankClass = "bg-yellow-50";
                      } else if (rank === 2) {
                        rankIcon = <Trophy className="h-5 w-5 text-gray-400 mr-2" />;
                        rankClass = "bg-gray-50";
                      } else if (rank === 3) {
                        rankIcon = <Trophy className="h-5 w-5 text-orange-600 mr-2" />;
                        rankClass = "bg-orange-50";
                      }

                      return (
                        <tr key={entry.id} className={rankClass}>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {rankIcon}
                              <span className="font-semibold text-cyber-dark">#{rank}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{entry.name}</div>
                          </td>
                          <td className="px-6 py-4 text-gray-600">{entry.event}</td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-primary">
                              {entry.score.toLocaleString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600">
                            {new Date(entry.date).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
