
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Award, ShieldCheck, Zap, Users, Target, Sparkles } from "lucide-react";

const About = () => {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-truth-blue to-truth-purple">
            About TruthSeekers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A community-driven platform dedicated to verifying news claims and combating misinformation
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="bg-card p-6 rounded-lg border">
            <div className="h-12 w-12 rounded-full bg-truth-purple/20 flex items-center justify-center mb-4">
              <ShieldCheck className="h-6 w-6 text-truth-purple" />
            </div>
            <h2 className="text-xl font-bold mb-2">Our Mission</h2>
            <p className="text-muted-foreground">
              To empower individuals to distinguish fact from fiction by creating a platform where truth is determined through collective wisdom and evidence-based verification.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg border">
            <div className="h-12 w-12 rounded-full bg-truth-blue/20 flex items-center justify-center mb-4">
              <Target className="h-6 w-6 text-truth-blue" />
            </div>
            <h2 className="text-xl font-bold mb-2">Our Vision</h2>
            <p className="text-muted-foreground">
              A world where misinformation is quickly identified and truth prevails, enabling people to make informed decisions based on accurate information.
            </p>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">How It Works</h2>
        
        <div className="space-y-8 mb-12">
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-truth-purple/20 flex items-center justify-center shrink-0">
              <span className="font-bold">1</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Submit or Select Claims</h3>
              <p className="text-muted-foreground">
                Users can submit suspicious news for verification or choose existing claims to verify.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-truth-blue/20 flex items-center justify-center shrink-0">
              <span className="font-bold">2</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Community Voting & Staking</h3>
              <p className="text-muted-foreground">
                Members vote on whether claims are true or false, staking their points on their decision.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-truth-purple/20 flex items-center justify-center shrink-0">
              <span className="font-bold">3</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Verification & Rewards</h3>
              <p className="text-muted-foreground">
                When consensus is reached, the claim is verified. Correct voters earn points, while incorrect voters lose their staked points.
              </p>
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="h-8 w-8 rounded-full bg-truth-blue/20 flex items-center justify-center shrink-0">
              <span className="font-bold">4</span>
            </div>
            <div>
              <h3 className="text-lg font-bold">Build Credibility</h3>
              <p className="text-muted-foreground">
                Users earn badges and climb the leaderboard based on their accuracy and contribution to fact-checking.
              </p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <div className="bg-card p-4 rounded-lg border">
            <Zap className="h-5 w-5 text-yellow-500 mb-2" />
            <h3 className="font-bold">Points & Staking</h3>
            <p className="text-sm text-muted-foreground">
              Earn points for correct verifications and stake them on your decisions.
            </p>
          </div>
          
          <div className="bg-card p-4 rounded-lg border">
            <Award className="h-5 w-5 text-truth-purple mb-2" />
            <h3 className="font-bold">Credibility Badges</h3>
            <p className="text-sm text-muted-foreground">
              Earn badges that reflect your accuracy and expertise in fact-checking.
            </p>
          </div>
          
          <div className="bg-card p-4 rounded-lg border">
            <Users className="h-5 w-5 text-truth-blue mb-2" />
            <h3 className="font-bold">Community Consensus</h3>
            <p className="text-sm text-muted-foreground">
              Collective wisdom determines the truth through voting and verification.
            </p>
          </div>
          
          <div className="bg-card p-4 rounded-lg border">
            <Sparkles className="h-5 w-5 text-yellow-500 mb-2" />
            <h3 className="font-bold">Daily Rewards</h3>
            <p className="text-sm text-muted-foreground">
              Check in daily for bonus points and special verification tasks.
            </p>
          </div>
        </div>
        
        <div className="bg-muted p-8 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to become a TruthSeeker?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Join our community of fact-checkers and help combat misinformation while earning rewards.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/signup">Sign up now</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
