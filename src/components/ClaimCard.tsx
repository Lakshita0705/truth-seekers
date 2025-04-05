
import React from "react";
import { Link } from "react-router-dom";
import { CalendarIcon, InfoIcon, Link2Icon, MessageSquare } from "lucide-react";
import { Claim } from "@/contexts/ClaimsContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

interface ClaimCardProps {
  claim: Claim;
}

const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const getStatusBadge = () => {
    switch (claim.status) {
      case "verified":
        return <Badge className="verified-true">Verified True</Badge>;
      case "debunked":
        return <Badge className="verified-false">Debunked</Badge>;
      default:
        return <Badge className="verified-pending">Verification In Progress</Badge>;
    }
  };

  const totalVotes = claim.votesTrue + claim.votesFalse;
  const totalStakes = claim.stakesTrue + claim.stakesFalse;
  const truePercentage = totalVotes > 0 ? Math.round((claim.votesTrue / totalVotes) * 100) : 0;
  const falsePercentage = totalVotes > 0 ? Math.round((claim.votesFalse / totalVotes) * 100) : 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      {claim.imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={claim.imageUrl}
            alt={claim.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute top-2 right-2">
            {getStatusBadge()}
          </div>
        </div>
      )}
      <CardHeader className={!claim.imageUrl ? "pb-2" : ""}>
        {!claim.imageUrl && (
          <div className="flex justify-between items-center mb-2">
            {getStatusBadge()}
          </div>
        )}
        <CardTitle className="line-clamp-2 text-xl">
          <Link to={`/claims/${claim.id}`} className="hover:text-primary">
            {claim.title}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs">
          <CalendarIcon className="h-3 w-3" />
          {formatDistanceToNow(new Date(claim.submittedAt), { addSuffix: true })}
          
          {claim.source && (
            <>
              <span className="mx-1">•</span>
              <Link2Icon className="h-3 w-3" />
              <span>{claim.source}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground mb-4">
          {claim.content}
        </p>
        
        {totalVotes > 0 && (
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>True ({truePercentage}%)</span>
              <span>False ({falsePercentage}%)</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-truth-lightBlue"
                style={{ width: `${truePercentage}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-center text-muted-foreground">
              {totalVotes} votes • {totalStakes} points staked
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Link to={`/claims/${claim.id}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>View Details</span>
          </Button>
        </Link>
        {claim.status === "pending" && (
          <Link to={`/claims/${claim.id}/vote`}>
            <Button variant="default" size="sm">Vote & Stake</Button>
          </Link>
        )}
        {claim.status !== "pending" && (
          <Link to={`/claims/${claim.id}`}>
            <Button variant="secondary" size="sm" className="flex items-center gap-1">
              <InfoIcon className="h-4 w-4" />
              <span>See Resolution</span>
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default ClaimCard;
