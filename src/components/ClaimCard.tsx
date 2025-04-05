
import React from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Claim } from "@/contexts/ClaimsContext";

interface ClaimCardProps {
  claim: Claim;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const getStatusBadge = () => {
    switch (claim.status) {
      case "verified":
        return <div className="px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">Verified</div>;
      case "debunked":
        return <div className="px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-medium">Debunked</div>;
      default:
        return <div className="px-2 py-1 rounded-full bg-yellow-500/10 text-yellow-600 text-xs font-medium">Pending</div>;
    }
  };

  const totalVotes = claim.votesTrue + claim.votesFalse;
  
  return (
    <Card className="h-full flex flex-col">
      {claim.imageUrl && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={claim.imageUrl}
            alt={claim.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardContent className="flex-grow p-6">
        <div className="flex items-center gap-2 mb-2">
          {getStatusBadge()}
          <span className="text-xs text-muted-foreground">
            {new Date(claim.submittedAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="font-bold text-xl mb-2 line-clamp-2">{claim.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{claim.content}</p>

        <div className="flex gap-6 mb-1">
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm font-medium">{claim.votesTrue}</span>
          </div>
          <div className="flex items-center gap-1">
            <X className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">{claim.votesFalse}</span>
          </div>
          <div className="text-xs text-muted-foreground ml-auto">
            {totalVotes} votes
          </div>
        </div>
        
        <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-1">
          {totalVotes > 0 && (
            <div 
              className="h-full bg-truth-blue" 
              style={{ width: `${(claim.votesTrue / totalVotes) * 100}%` }}
            ></div>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/claims/${claim.id}`}>
            {claim.status === "pending" ? "Vote & Stake" : "View Details"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;
