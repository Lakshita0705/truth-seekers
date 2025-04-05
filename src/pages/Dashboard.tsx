
import React from "react";
import { Link } from "react-router-dom";
import { Award, Check, Clock, Plus, TrendingDown, TrendingUp, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useClaims } from "@/contexts/ClaimsContext";
import Badge from "@/components/Badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ClaimCard from "@/components/ClaimCard";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { claims, loading } = useClaims();

  const latestClaims = claims.slice(0, 3);

  if (!user) return null;

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-truth-purple" />
              Welcome back, {user.username}!
            </CardTitle>
            <CardDescription>
              Your truth-seeking journey continues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">Reputation Score</div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-truth-purple" />
                  <span className="text-2xl font-bold">{user.accuracy}%</span>
                </div>
                <div className="flex items-center text-xs mt-2">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-green-500">+2.5% this week</span>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">Points Balance</div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-truth-lightBlue" />
                  <span className="text-2xl font-bold">{user.points}</span>
                </div>
                <div className="flex items-center text-xs mt-2">
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  <span className="text-red-500">-15 last stake</span>
                </div>
              </div>
              
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="text-muted-foreground text-sm mb-1">Badge Level</div>
                <div className="flex items-center gap-2">
                  <Badge level={user.badgeLevel} />
                  <span className="text-2xl font-bold">{user.badgeLevel}</span>
                </div>
                <div className="flex items-center text-xs mt-2">
                  <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                  <span>25 pts to next level</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/submit">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Submit New Claim
                </Button>
              </Link>
              <Link to="/claims">
                <Button variant="outline">Browse Claims</Button>
              </Link>
              <Link to="/leaderboard">
                <Button variant="secondary">View Leaderboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-1/3">
          <CardHeader>
            <CardTitle className="text-lg">Your Credibility Badge</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <Badge level={user.badgeLevel} size="lg" showLabel />
            <div className="mt-6 text-center">
              <div className="text-sm text-muted-foreground">Next level in</div>
              <div className="text-2xl font-bold mt-1">25 points</div>
              <div className="w-full bg-muted mt-2 rounded-full h-2.5">
                <div
                  className="bg-truth-purple h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <Button variant="link" className="mt-4" asChild>
                <Link to="/profile/badges">Learn how to level up</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Latest Claims to Verify</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/claims">See All</Link>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading claims...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestClaims.map((claim) => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
