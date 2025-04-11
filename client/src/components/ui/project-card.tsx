import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GithubIcon, ExternalLink } from "lucide-react";
import TechBadge from "./tech-badge";
import { Project } from "@/lib/data";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card 
        className="overflow-hidden h-full bg-transparent relative min-h-[450px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-700 ease-in-out"
          style={{ 
            backgroundImage: `url(${project.image})`,
            filter: 'blur(0px) brightness(0.15)',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />

        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background z-0"
        />

        <motion.div 
          className="absolute top-8 left-0 right-0 flex justify-center z-10"
          animate={{
            y: isHovered ? -5 : 0,
            opacity: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        >
          <Badge variant="default" className="bg-primary text-white px-4 py-1 text-xs">
            {project.category}
          </Badge>

          {project.inProgress && (
            <Badge variant="outline" className="bg-yellow-500/80 border-yellow-500/80 text-white ml-2 px-3 py-1 text-xs">
              In Progress
            </Badge>
          )}
        </motion.div>

        <CardContent className="p-8 relative z-10 flex flex-col h-full">
          <motion.h3 
            className="text-2xl font-heading font-semibold mb-4 text-white"
            animate={{
              y: isHovered ? -5 : 0,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.title}
          </motion.h3>

          <motion.p 
            className="text-muted-foreground mb-4 line-clamp-4 text-base"
            animate={{
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>

          <motion.div 
            className="flex flex-wrap gap-3 mb-6"
            animate={{
              y: isHovered ? 0 : 5,
              opacity: isHovered ? 1 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.technologies.map((tech, index) => (
              <TechBadge key={index} name={tech} className="font-medium" />
            ))}
          </motion.div>

          <motion.div 
            className="flex justify-between mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0.7, 
              y: isHovered ? 0 : 5 
            }}
            transition={{ duration: 0.3 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition-colors duration-200 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GithubIcon size={18} />
                <span>View Code</span>
              </motion.a>
            )}

            {project.liveDemo ? (
              <motion.a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white transition-colors duration-200 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink size={18} />
                <span>Live Demo</span>
              </motion.a>
            ) : (
              <motion.span 
                className="text-muted-foreground italic px-4 py-2 rounded-full bg-secondary/30 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Coming Soon
              </motion.span>
            )}
          </motion.div>

        </CardContent>
      </Card>
    </motion.div>
  );
}

export default ProjectCard;