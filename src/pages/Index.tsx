
import React from "react";
import { Link } from "react-router-dom";
import { Award, Check, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-background to-muted px-4 py-20 md:py-32">
        <div className="container mx-auto text-center max-w-3xl">
          <Award className="h-16 w-16 mx-auto mb-6 text-truth-purple" />
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-truth-blue to-truth-purple">
            Verify Truth. Build Trust.
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-foreground/80">
            Join a community dedicated to distinguishing fact from fiction, 
            earning rewards for your truth-seeking expertise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/signup">Join TruthSeekers</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-1 border-t-4 border-truth-blue">
              <CardContent className="pt-6">
                <div className="bg-truth-blue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-truth-blue font-bold">1</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Submit or Choose Claims</h3>
                <p className="text-muted-foreground">
                  Post suspicious news claims you've encountered or select from existing submissions that need verification.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-1 border-t-4 border-truth-purple">
              <CardContent className="pt-6">
                <div className="bg-truth-purple/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-truth-purple font-bold">2</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Vote & Stake Points</h3>
                <p className="text-muted-foreground">
                  Cast your vote on whether claims are true or false, and stake your points to show confidence in your assessment.
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-1 border-t-4 border-truth-lightBlue">
              <CardContent className="pt-6">
                <div className="bg-truth-lightBlue/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <span className="text-truth-lightBlue font-bold">3</span>
                </div>
                <h3 className="font-bold text-xl mb-2">Earn & Build Credibility</h3>
                <p className="text-muted-foreground">
                  Win points when you vote correctly and build your reputation with badges that showcase your fact-checking expertise.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="bg-muted/50 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Features</h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Our platform combines fact-checking with game mechanics to make truth verification engaging and rewarding.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Check className="h-8 w-8 text-truth-lightBlue flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-2">Community Verification</h3>
                <p className="text-muted-foreground">
                  Harness the wisdom of the crowd with our community-driven approach to fact checking and news verification.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Award className="h-8 w-8 text-truth-lightBlue flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-2">Credibility Badges</h3>
                <p className="text-muted-foreground">
                  Build your reputation through accuracy and earn badges that reflect your expertise and trustworthiness.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <TrendingUp className="h-8 w-8 text-truth-lightBlue flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-2">Points & Rewards</h3>
                <p className="text-muted-foreground">
                  Stake points on your assessments and earn rewards for accurate verifications and contributions.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <User className="h-8 w-8 text-truth-lightBlue flex-shrink-0" />
              <div>
                <h3 className="font-bold text-xl mb-2">Premium Features</h3>
                <p className="text-muted-foreground">
                  Unlock enhanced tools, exclusive verification tasks, and bonus rewards with our premium subscription.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Ready to Become a Truth Seeker?</h2>
          <p className="text-xl mb-8 text-muted-foreground">
            Join our community today and help combat misinformation while earning rewards for your expertise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isAuthenticated ? (
              <Button size="lg" asChild>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" asChild>
                  <Link to="/signup">Create an Account</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/about">Learn More</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
