
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Badge from "@/components/Badge";

const leaderboardData = [
  { id: 1, username: "TruthMaster", points: 7865, badge: 5, accuracy: "98%" },
  { id: 2, username: "FactHunter", points: 5621, badge: 4, accuracy: "96%" },
  { id: 3, username: "VerityChecker", points: 4550, badge: 4, accuracy: "94%" },
  { id: 4, username: "NewsSleuth", points: 3720, badge: 3, accuracy: "92%" },
  { id: 5, username: "JaneDoe", points: 3105, badge: 3, accuracy: "91%" },
  { id: 6, username: "FactFinder", points: 2890, badge: 3, accuracy: "89%" },
  { id: 7, username: "TruthAgent", points: 2640, badge: 2, accuracy: "87%" },
  { id: 8, username: "RealityCheck", points: 2405, badge: 2, accuracy: "86%" },
  { id: 9, username: "CriticalThinker", points: 2120, badge: 2, accuracy: "85%" },
  { id: 10, username: "NewsWise", points: 1850, badge: 2, accuracy: "83%" },
];

const Leaderboard = () => {
  const [timeFrame, setTimeFrame] = useState("all-time");

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        
        <Tabs defaultValue="points" className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="points">Top Points</TabsTrigger>
              <TabsTrigger value="accuracy">Top Accuracy</TabsTrigger>
              <TabsTrigger value="claims">Most Claims</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button 
                variant={timeFrame === "weekly" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeFrame("weekly")}
              >
                Weekly
              </Button>
              <Button 
                variant={timeFrame === "monthly" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeFrame("monthly")}
              >
                Monthly
              </Button>
              <Button 
                variant={timeFrame === "all-time" ? "default" : "outline"} 
                size="sm"
                onClick={() => setTimeFrame("all-time")}
              >
                All Time
              </Button>
            </div>
          </div>
          
          <TabsContent value="points">
            <div className="bg-card rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Points</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Badge</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((user, index) => (
                    <tr key={user.id} className={`${index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index < 3 ? (
                            <span className="h-6 w-6 flex items-center justify-center rounded-full bg-truth-purple text-white font-bold text-sm">
                              {index + 1}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                            <span className="font-medium">{user.username.charAt(0)}</span>
                          </div>
                          <div className="text-sm font-medium">{user.username}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-bold text-truth-purple">{user.points.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge level={user.badge} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">{user.accuracy}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="accuracy">
            <div className="flex flex-col items-center justify-center py-12 bg-card border rounded-lg">
              <p className="text-muted-foreground">
                Switch to the "Top Points" tab to view the leaderboard by points.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="claims">
            <div className="flex flex-col items-center justify-center py-12 bg-card border rounded-lg">
              <p className="text-muted-foreground">
                Switch to the "Top Points" tab to view the leaderboard by points.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboard;
