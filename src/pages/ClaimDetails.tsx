
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, X, AlertCircle, Award } from "lucide-react";
import { useClaims, Claim } from "@/contexts/ClaimsContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";
import Badge from "@/components/Badge";

const ClaimDetails = () => {
  const { claimId } = useParams();
  const { claims, voteClaim, resolveClaim } = useClaims();
  const { user } = useAuth();
  const [stakeAmount, setStakeAmount] = useState(10);
  const [voteType, setVoteType] = useState<"true" | "false" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const claim = claims.find(c => c.id === claimId);

  if (!claim) {
    return (
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link to="/claims" className="flex items-center text-sm font-medium mr-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Claims
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium">Claim not found</h2>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              The claim you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/claims">Browse Claims</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleVote = async () => {
    if (!voteType) {
      toast({
        title: "Error",
        description: "Please select whether you believe this claim is true or false",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);
    try {
      voteClaim(claim.id, voteType === "true", stakeAmount);
      toast({
        title: "Vote submitted",
        description: `You've staked ${stakeAmount} points on this claim being ${voteType === "true" ? "true" : "false"}.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your vote. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const calculateTruePercentage = () => {
    const total = claim.votesTrue + claim.votesFalse;
    return total > 0 ? Math.round((claim.votesTrue / total) * 100) : 0;
  };

  const calculateFalsePercentage = () => {
    const total = claim.votesTrue + claim.votesFalse;
    return total > 0 ? Math.round((claim.votesFalse / total) * 100) : 0;
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center mb-6">
          <Link to="/claims" className="flex items-center text-sm font-medium mr-4">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Claims
          </Link>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            claim.status === "verified" ? "bg-green-500/10 text-green-600" :
            claim.status === "debunked" ? "bg-red-500/10 text-red-500" :
            "bg-yellow-500/10 text-yellow-600"
          }`}>
            {claim.status === "verified" ? "Verified" :
             claim.status === "debunked" ? "Debunked" : "Pending"}
          </div>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{claim.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{claim.content}</p>
          
          {claim.imageUrl && (
            <div className="mb-6">
              <img 
                src={claim.imageUrl} 
                alt={claim.title} 
                className="w-full rounded-lg object-cover max-h-80"
              />
            </div>
          )}
          
          <div className="flex flex-wrap gap-4 mb-6">
            {claim.source && (
              <div className="text-sm">
                <span className="text-muted-foreground">Source:</span>{" "}
                <a 
                  href={claim.source.startsWith("http") ? claim.source : `https://${claim.source}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-truth-blue hover:underline"
                >
                  {claim.source}
                </a>
              </div>
            )}
            <div className="text-sm">
              <span className="text-muted-foreground">Submitted:</span>{" "}
              {claim.submittedAt.toLocaleDateString()}
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">By:</span>{" "}
              <Link to={`/profile/${claim.submittedBy}`} className="text-truth-blue hover:underline">
                {claim.submittedBy}
              </Link>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="vote" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="vote">Vote & Stake</TabsTrigger>
            <TabsTrigger value="results">Current Results</TabsTrigger>
            <TabsTrigger value="discussion">Discussion</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vote">
            {claim.status === "pending" && !claim.userVote ? (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Cast Your Vote</h2>
                <p className="text-muted-foreground mb-6">
                  Stake your points on whether you believe this claim is true or false. 
                  You'll earn rewards if your assessment matches the final verification outcome.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-3">Your verdict:</h3>
                    <div className="flex gap-4">
                      <Button
                        onClick={() => setVoteType("true")}
                        variant={voteType === "true" ? "default" : "outline"}
                        className={`flex-1 ${voteType === "true" ? "bg-green-600 hover:bg-green-700" : "border-green-500 hover:bg-green-500/10"}`}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        True
                      </Button>
                      <Button
                        onClick={() => setVoteType("false")}
                        variant={voteType === "false" ? "default" : "outline"} 
                        className={`flex-1 ${voteType === "false" ? "bg-red-600 hover:bg-red-700" : "border-red-500 hover:bg-red-500/10"}`}
                      >
                        <X className="h-4 w-4 mr-2" />
                        False
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <h3 className="text-sm font-medium">Stake amount:</h3>
                      <span className="text-sm font-bold">{stakeAmount} points</span>
                    </div>
                    <Slider
                      defaultValue={[10]}
                      min={5}
                      max={100}
                      step={5}
                      onValueChange={(val) => setStakeAmount(val[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>5 points</span>
                      <span>100 points</span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      onClick={handleVote} 
                      className="w-full" 
                      disabled={!voteType || submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Vote & Stake"}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      You currently have {user?.points || 0} points available
                    </p>
                  </div>
                </div>
              </Card>
            ) : claim.userVote ? (
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <h2 className="text-xl font-bold">Vote Submitted</h2>
                </div>
                <p className="text-muted-foreground mb-4">
                  You've already voted that this claim is <strong>{claim.userVote === "true" ? "TRUE" : "FALSE"}</strong>.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span>Your stake:</span>
                    <span className="font-bold">{claim.userVote === "true" ? claim.stakesTrue : claim.stakesFalse} points</span>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <h2 className="text-xl font-bold">Voting Closed</h2>
                </div>
                <p className="text-muted-foreground">
                  This claim has been {claim.status === "verified" ? "verified as TRUE" : "debunked as FALSE"} and voting is now closed.
                </p>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="results">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Current Results</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span>True</span>
                    </div>
                    <span className="font-bold">{calculateTruePercentage()}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500" 
                      style={{ width: `${calculateTruePercentage()}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{claim.votesTrue} votes</span>
                    <span>{claim.stakesTrue} points staked</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span>False</span>
                    </div>
                    <span className="font-bold">{calculateFalsePercentage()}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-red-500" 
                      style={{ width: `${calculateFalsePercentage()}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{claim.votesFalse} votes</span>
                    <span>{claim.stakesFalse} points staked</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total participants:</span>
                    <span className="font-bold">{claim.votesTrue + claim.votesFalse}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Total points staked:</span>
                    <span className="font-bold">{claim.stakesTrue + claim.stakesFalse}</span>
                  </div>
                </div>
              </div>
              
              {user && user.badgeLevel >= 4 && claim.status === "pending" && (
                <div className="border-t pt-4 mt-6">
                  <h3 className="text-lg font-bold mb-2 flex items-center">
                    <Award className="h-5 w-5 mr-2 text-truth-purple" />
                    Trusted Verifier Actions
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    As a trusted verifier (Badge Level 4+), you can help resolve this claim.
                  </p>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-green-500 hover:bg-green-500/10"
                      onClick={() => {
                        resolveClaim(claim.id, true);
                        toast({
                          title: "Claim Verified",
                          description: "This claim has been marked as TRUE."
                        });
                      }}
                    >
                      Mark as True
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-red-500 hover:bg-red-500/10"
                      onClick={() => {
                        resolveClaim(claim.id, false);
                        toast({
                          title: "Claim Debunked",
                          description: "This claim has been marked as FALSE."
                        });
                      }}
                    >
                      Mark as False
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="discussion">
            <Card className="p-6">
              <div className="flex flex-col items-center justify-center py-6">
                <h2 className="text-xl font-bold mb-2">Discussion Coming Soon</h2>
                <p className="text-muted-foreground text-center mb-4">
                  We're working on adding community discussions to claims. Check back soon!
                </p>
                <Badge level={3} size="md" />
              </div>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="border-t pt-6">
          <h2 className="text-xl font-bold mb-4">Similar Claims</h2>
          <p className="text-muted-foreground">
            Browse similar claims that might be related to this topic.
          </p>
          <div className="flex justify-center py-8">
            <Button asChild variant="outline">
              <Link to="/claims">Browse All Claims</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;
