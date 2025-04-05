
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

type BadgeProps = {
  level: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
};

const getBadgeLabel = (level: number) => {
  switch (level) {
    case 1:
      return "Novice";
    case 2:
      return "Fact Checker";
    case 3:
      return "Truth Guardian";
    case 4:
      return "Wisdom Keeper";
    case 5:
      return "Master Verifier";
    default:
      return "Novice";
  }
};

const Badge = ({ level, size = "md", showLabel = false, className }: BadgeProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const badgeClass = `badge-level-${level}`;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center",
          badgeClass,
          sizeClasses[size],
          level >= 4 && "animate-pulse-badge"
        )}
      >
        <Award className={cn("text-current", size === "lg" ? "w-6 h-6" : "w-4 h-4")} />
      </div>
      {showLabel && (
        <span className="text-sm font-medium">
          {getBadgeLabel(level)}
        </span>
      )}
    </div>
  );
};

export default Badge;
