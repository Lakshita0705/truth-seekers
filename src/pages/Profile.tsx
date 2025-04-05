
import { useAuth } from "@/contexts/AuthContext";
import Badge from "@/components/Badge";

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Loading profile...</h1>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center">
            <span className="text-3xl font-bold text-truth-purple">
              {user.username.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge level={Math.min(Math.floor(user.points / 100) + 1, 5)} size="md" showLabel />
              <span className="text-sm text-muted-foreground">
                • Member since {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Stats</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Points</span>
                <span className="font-bold text-truth-purple">{user.points}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Claims Submitted</span>
                <span className="font-bold">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Claims Verified</span>
                <span className="font-bold">48</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Accuracy</span>
                <span className="font-bold text-truth-blue">86%</span>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-bold mb-4">Badges Progress</h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-sm">Next Badge</span>
                  <span className="text-sm text-muted-foreground">300 pts needed</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-truth-blue" style={{ width: `${Math.min((user.points / 300) * 100, 100)}%` }}></div>
                </div>
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <Badge level={1} showLabel />
                <Badge level={2} showLabel />
                <Badge level={3} showLabel />
                <Badge level={4} showLabel />
                <Badge level={5} showLabel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
