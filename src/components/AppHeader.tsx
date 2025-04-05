
import React from "react";
import { Link } from "react-router-dom";
import { Award, Bell, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AppHeader: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2">
          <Award className="h-6 w-6 text-truth-purple" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-truth-blue to-truth-purple">
            TruthSeekers
          </span>
        </Link>

        <nav className="ml-auto flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link to="/claims" className="text-sm font-medium transition-colors hover:text-primary">
                Claims
              </Link>
              <Link to="/submit" className="text-sm font-medium transition-colors hover:text-primary">
                Submit
              </Link>
              <Link to="/leaderboard" className="text-sm font-medium transition-colors hover:text-primary">
                Leaderboard
              </Link>
              
              <div className="flex items-center gap-4">
                <Link to="/notifications" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-truth-purple text-[10px] font-bold text-white flex items-center justify-center">
                    3
                  </span>
                </Link>
                
                <Link to="/profile" className="flex items-center gap-2">
                  <div className="rounded-full bg-muted p-1">
                    <User className="h-5 w-5 text-foreground/80" />
                  </div>
                  <div className="hidden md:block text-sm font-medium">
                    {user?.username}
                  </div>
                  <div className="hidden md:block text-xs bg-truth-lightBlue/20 text-truth-blue px-2 py-0.5 rounded-full">
                    {user?.points} pts
                  </div>
                </Link>
                
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
              <Link to="/login" className="text-sm font-medium transition-colors hover:text-primary">
                Login
              </Link>
              <Link to="/signup">
                <Button variant="default" size="sm">Sign up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
