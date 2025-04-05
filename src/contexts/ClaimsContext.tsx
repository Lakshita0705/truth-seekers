
import React, { createContext, useContext, useState, useEffect } from "react";

export type ClaimStatus = "pending" | "verified" | "debunked";

export type Claim = {
  id: string;
  title: string;
  content: string;
  source?: string;
  imageUrl?: string;
  submittedBy: string;
  submittedAt: Date;
  status: ClaimStatus;
  votesTrue: number;
  votesFalse: number;
  userVote?: "true" | "false" | null;
  stakesTrue: number;
  stakesFalse: number;
  resolution?: boolean;
  verifiedBy?: string[];
};

type ClaimsContextType = {
  claims: Claim[];
  loading: boolean;
  submitClaim: (claim: Omit<Claim, "id" | "submittedAt" | "status" | "votesTrue" | "votesFalse" | "stakesTrue" | "stakesFalse">) => void;
  voteClaim: (claimId: string, isTrue: boolean, stakeAmount: number) => void;
  resolveClaim: (claimId: string, isTrue: boolean) => void;
  getUserClaims: (userId: string) => Claim[];
};

// Mock data
const initialClaims: Claim[] = [
  {
    id: "claim-1",
    title: "Scientists discover way to reverse climate change",
    content: "A team of researchers claims to have developed a technology that can remove carbon from the atmosphere at unprecedented rates, potentially reversing climate change effects within a decade.",
    source: "Science Daily",
    imageUrl: "https://placehold.co/600x400?text=Climate+News",
    submittedBy: "user-2",
    submittedAt: new Date("2025-03-10"),
    status: "pending",
    votesTrue: 24,
    votesFalse: 12,
    stakesTrue: 240,
    stakesFalse: 180,
  },
  {
    id: "claim-2",
    title: "New health study shows coffee extends lifespan",
    content: "Recent research suggests drinking 3-4 cups of coffee daily can extend your lifespan by up to 7 years by reducing inflammation and improving heart health.",
    source: "Health Research Journal",
    submittedBy: "user-3",
    submittedAt: new Date("2025-03-25"),
    status: "verified",
    votesTrue: 52,
    votesFalse: 5,
    stakesTrue: 520,
    stakesFalse: 50,
    resolution: true,
    verifiedBy: ["FactCheckers", "MedicalAssociation"]
  },
  {
    id: "claim-3",
    title: "Famous actor secretly living double life as government spy",
    content: "Insiders claim that a well-known Hollywood actor has been working as an intelligence operative for the past 15 years, participating in covert operations worldwide.",
    imageUrl: "https://placehold.co/600x400?text=Celebrity+News",
    submittedBy: "user-4",
    submittedAt: new Date("2025-04-02"),
    status: "debunked",
    votesTrue: 31,
    votesFalse: 89,
    stakesTrue: 310,
    stakesFalse: 890,
    resolution: false
  },
  {
    id: "claim-4",
    title: "Major tech company developing mind-reading technology",
    content: "Sources report that a leading tech company has successfully tested a non-invasive device that can interpret basic thoughts and convert them into text with 85% accuracy.",
    source: "Tech Insider",
    submittedBy: "user-1",
    submittedAt: new Date("2025-04-04"),
    status: "pending",
    votesTrue: 47,
    votesFalse: 42,
    stakesTrue: 470,
    stakesFalse: 420,
  }
];

const ClaimsContext = createContext<ClaimsContextType | undefined>(undefined);

export const ClaimsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setClaims(initialClaims);
      setLoading(false);
    }, 1000);
  }, []);

  const submitClaim = (newClaim: Omit<Claim, "id" | "submittedAt" | "status" | "votesTrue" | "votesFalse" | "stakesTrue" | "stakesFalse">) => {
    const claim: Claim = {
      ...newClaim,
      id: `claim-${claims.length + 1}`,
      submittedAt: new Date(),
      status: "pending",
      votesTrue: 0,
      votesFalse: 0,
      stakesTrue: 0,
      stakesFalse: 0,
    };
    
    setClaims((prevClaims) => [claim, ...prevClaims]);
  };

  const voteClaim = (claimId: string, isTrue: boolean, stakeAmount: number) => {
    setClaims((prevClaims) =>
      prevClaims.map((claim) => {
        if (claim.id === claimId) {
          return {
            ...claim,
            userVote: isTrue ? "true" : "false",
            votesTrue: isTrue ? claim.votesTrue + 1 : claim.votesTrue,
            votesFalse: !isTrue ? claim.votesFalse + 1 : claim.votesFalse,
            stakesTrue: isTrue ? claim.stakesTrue + stakeAmount : claim.stakesTrue,
            stakesFalse: !isTrue ? claim.stakesFalse + stakeAmount : claim.stakesFalse,
          };
        }
        return claim;
      })
    );
  };

  const resolveClaim = (claimId: string, isTrue: boolean) => {
    setClaims((prevClaims) =>
      prevClaims.map((claim) => {
        if (claim.id === claimId) {
          return {
            ...claim,
            status: isTrue ? "verified" : "debunked",
            resolution: isTrue,
          };
        }
        return claim;
      })
    );
  };

  const getUserClaims = (userId: string) => {
    return claims.filter((claim) => claim.submittedBy === userId);
  };

  return (
    <ClaimsContext.Provider
      value={{
        claims,
        loading,
        submitClaim,
        voteClaim,
        resolveClaim,
        getUserClaims,
      }}
    >
      {children}
    </ClaimsContext.Provider>
  );
};

export const useClaims = () => {
  const context = useContext(ClaimsContext);
  if (context === undefined) {
    throw new Error("useClaims must be used within a ClaimsProvider");
  }
  return context;
};
