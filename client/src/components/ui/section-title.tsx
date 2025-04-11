import React from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{title}</h2>
      <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6"></div>
      {subtitle && (
        <p className="text-muted-foreground max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
