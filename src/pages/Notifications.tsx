
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCheck } from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "Your claim was verified",
    description: "The community has verified your claim about climate change as TRUE",
    time: "2 hours ago",
    unread: true,
    type: "success"
  },
  {
    id: 2,
    title: "You earned 50 points!",
    description: "Your verification of 'COVID-19 vaccines cause magnetism' was correct",
    time: "Yesterday",
    unread: true,
    type: "points"
  },
  {
    id: 3,
    title: "New badge unlocked!",
    description: "You've earned the 'Fact Checker' badge",
    time: "2 days ago",
    unread: false,
    type: "badge"
  },
  {
    id: 4,
    title: "Claim update",
    description: "A claim you voted on has been marked as DISPUTED",
    time: "3 days ago",
    unread: false,
    type: "update"
  },
  {
    id: 5,
    title: "Welcome to TruthSeekers!",
    description: "Start your journey by verifying your first claim",
    time: "1 week ago",
    unread: false,
    type: "info"
  }
];

const getNotificationColor = (type: string) => {
  switch (type) {
    case "success": return "bg-green-500/10 border-green-500";
    case "points": return "bg-truth-purple/10 border-truth-purple";
    case "badge": return "bg-truth-blue/10 border-truth-blue";
    case "update": return "bg-yellow-500/10 border-yellow-500";
    default: return "bg-gray-100 border-gray-300";
  }
};

const Notifications = () => {
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">Notifications</h1>
            <Badge variant="secondary" className="ml-2">3 unread</Badge>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </Button>
        </div>

        {notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`p-4 rounded-lg border ${notification.unread ? getNotificationColor(notification.type) : "bg-card"} relative`}
              >
                {notification.unread && (
                  <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-truth-purple"></div>
                )}
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h2 className="text-xl font-medium">No notifications</h2>
            <p className="text-sm text-muted-foreground mt-1">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
