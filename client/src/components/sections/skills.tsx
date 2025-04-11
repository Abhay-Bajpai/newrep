import React, { useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import TechBadge from "@/components/ui/tech-badge";
import { programmingSkills, tools, concepts } from "@/lib/data";
import { motion, useInView } from "framer-motion";

export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section 
      id="skills" 
      className="py-20 bg-secondary/30 relative overflow-hidden section-padding"
      ref={sectionRef}
    >
      <div className="grid-pattern absolute inset-0 opacity-10"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-shape w-16 h-16 bg-primary/10 rounded-full top-32 left-[15%]"></div>
      <div className="floating-shape w-24 h-24 bg-primary/5 rounded-full bottom-24 right-[20%]" 
        style={{animationDelay: '1.5s'}}></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Skills & Expertise" 
            subtitle="I constantly try to improve my tech stack and skills to deliver the best solutions"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Programming Languages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="bg-background shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full backdrop-blur-sm border border-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 animate-pulse-slow">
                    <i className="fas fa-code text-primary"></i>
                  </div>
                  <h3 className="text-xl font-heading font-semibold">Programming Languages</h3>
                </div>
                
                <div className="space-y-5">
                  {programmingSkills.map((skill, index) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, width: 0 }}
                      animate={isInView ? { opacity: 1, width: "100%" } : { opacity: 0, width: 0 }}
                      transition={{ delay: 0.3 + index * 0.15, duration: 0.8 }}
                      className="relative"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span>{skill.percentage}%</span>
                      </div>
                      <div className="relative">
                        <Progress value={0} className="h-2 bg-card" />
                        <motion.div 
                          className="absolute top-0 left-0 h-2 bg-primary rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                          transition={{ delay: 0.5 + index * 0.15, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Tools & Tech */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-background shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full backdrop-blur-sm border border-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 animate-pulse-slow">
                    <i className="fas fa-tools text-primary"></i>
                  </div>
                  <h3 className="text-xl font-heading font-semibold">Tools & Tech</h3>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                  {tools.map((tool, index) => (
                    <motion.div 
                      key={tool.name}
                      initial={{ opacity: 0, y: 20, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5, scale: 1.05 }}
                      className="flex flex-col items-center p-4 bg-card/50 rounded-lg shadow-sm transition-all duration-300 hover:bg-card/80"
                    >
                      <div className="w-14 h-14 flex items-center justify-center mb-3 rounded-full bg-primary/10">
                        <i className={`fab fa-${tool.icon} text-3xl text-primary`}></i>
                      </div>
                      <span className="text-sm font-medium text-center">{tool.name}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Concepts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Card className="bg-background shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full backdrop-blur-sm border border-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 animate-pulse-slow">
                    <i className="fas fa-brain text-primary"></i>
                  </div>
                  <h3 className="text-xl font-heading font-semibold">Concepts</h3>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {concepts.map((concept, index) => (
                    <motion.div 
                      key={concept.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.6 + index * 0.07, duration: 0.4 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                    >
                      <TechBadge
                        name={concept.name}
                        className="px-4 py-2 bg-card/50 text-sm font-medium rounded-lg hover:bg-primary/20 hover:text-white"
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
