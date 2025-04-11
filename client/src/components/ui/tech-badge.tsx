import React from "react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  className?: string;
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "px-3 py-1.5 bg-secondary/80 text-xs rounded-full transition-all duration-200 hover:transform hover:-translate-y-1 hover:bg-primary/20",
        className
      )}
    >
      {name}
    </span>
  );
}

export default TechBadge;

