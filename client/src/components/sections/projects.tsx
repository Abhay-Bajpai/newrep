import React, { useState, useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useInView } from "framer-motion";

type ProjectCategory = 'All' | 'AI/ML' | 'Web Dev' | 'Frontend' | 'Full Stack';

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const categories: ProjectCategory[] = [
    "All",
    "Web Dev",
    "AI/ML",
    "Frontend",
    "Full Stack",
  ];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section 
      id="projects" 
      className="py-20 relative overflow-hidden section-padding"
      ref={sectionRef}
    >
      <div className="grid-pattern absolute inset-0 opacity-20"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-shape w-20 h-20 bg-primary/5 rounded-full top-40 left-[5%]"></div>
      <div className="floating-shape w-28 h-28 bg-primary/5 rounded-full bottom-20 right-[10%]" 
        style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle 
            title="Featured Projects" 
            subtitle="A showcase of my recent work in web development, AI/ML, and more"
          />
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Button
                  variant={activeCategory === category ? "secondary" : "outline"}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-md transition-all duration-300 ${
                    activeCategory === category ? 'bg-white/10' : ''
                  }`}
                >
                  <span className="relative z-10">{category}</span>
                  {activeCategory === category && (
                    <motion.span 
                      className="absolute inset-0 bg-primary rounded-md -z-10"
                      layoutId="activeCategoryBackground"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-muted-foreground text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
