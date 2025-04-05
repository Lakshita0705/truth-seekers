
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Plus } from "lucide-react";
import { useClaims, ClaimStatus } from "@/contexts/ClaimsContext";
import ClaimCard from "@/components/ClaimCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ClaimsPage: React.FC = () => {
  const { claims, loading } = useClaims();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | "all">("all");

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch = claim.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          claim.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Claims</h1>
          <p className="text-muted-foreground">
            Browse and verify news claims submitted by the community
          </p>
        </div>
        <Button asChild>
          <Link to="/submit" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Submit New Claim
          </Link>
        </Button>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Input
              type="search"
              placeholder="Search claims..."
              className="w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            More Filters
          </Button>
        </div>

        <Tabs defaultValue="all" onValueChange={(value) => setStatusFilter(value as ClaimStatus | "all")}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Claims</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="debunked">Debunked</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading claims...</div>
      ) : filteredClaims.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClaims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No claims found matching your filters</p>
          <Button variant="outline" onClick={() => {
            setSearchTerm("");
            setStatusFilter("all");
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ClaimsPage;
