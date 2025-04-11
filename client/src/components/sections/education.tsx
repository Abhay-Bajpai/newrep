import React, { useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { education, certifications } from "@/lib/data";
import { motion, useInView } from "framer-motion";

export function EducationSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section 
      id="education" 
      className="py-20 relative overflow-hidden section-padding"
      ref={sectionRef}
    >
      <div className="grid-pattern absolute inset-0 opacity-20"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-shape w-16 h-16 bg-primary/5 rounded-full top-40 left-[8%]"></div>
      <div className="floating-shape w-28 h-28 bg-primary/5 rounded-full bottom-40 right-[5%]" 
        style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Education & Certifications" 
            subtitle="My academic journey and professional development"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h3 
              className="text-2xl font-heading font-semibold mb-8 flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 animate-pulse-slow">
                <i className="fas fa-graduation-cap text-primary"></i>
              </div>
              Education Timeline
            </motion.h3>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:h-full before:w-0.5 before:bg-primary/30 before:left-4 ml-12">
              {education.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -30, scale: 0.9 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.5 }}
                  className="relative pl-8"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="absolute -left-8 w-4 h-4 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.4 + index * 0.2, duration: 0.4 }}
                    whileHover={{ scale: 1.5 }}
                  />
                  
                  <Card className="bg-background/50 backdrop-blur-sm hover:shadow-md hover:shadow-primary/10 transition-all duration-300 border border-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                        <motion.h4 
                          className="text-lg font-semibold mb-1 md:mb-0"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                        >
                          {item.degree}
                        </motion.h4>
                        <motion.span 
                          className="text-primary text-sm"
                          initial={{ opacity: 0 }}
                          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                          transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                        >
                          {item.duration}
                        </motion.span>
                      </div>
                      <motion.p 
                        className="text-muted-foreground mb-2"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                      >
                        {item.institution}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="bg-primary/10 text-primary border-primary/20 animate-background-shine"
                        >
                          {item.score}
                        </Badge>
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Certifications & Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.h3 
              className="text-2xl font-heading font-semibold mb-8 flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3 animate-pulse-slow">
                <i className="fas fa-certificate text-primary"></i>
              </div>
              Certifications & Achievements
            </motion.h3>
            
            <div className="grid grid-cols-1 gap-6">
              {certifications.map((cert, index) => (
                <motion.div 
                  key={cert.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card 
                    className="border-l-4 border-primary overflow-hidden bg-background/50 backdrop-blur-sm hover:shadow-md hover:shadow-primary/10 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <motion.div 
                          className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0"
                          animate={{ rotate: [0, 5, 0, -5, 0] }}
                          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
                        >
                          <i className={`fas fa-${cert.icon} text-primary`}></i>
                        </motion.div>
                        <div>
                          <motion.h4 
                            className="text-lg font-semibold mb-1"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
                          >
                            {cert.title}
                          </motion.h4>
                          <motion.p 
                            className="text-muted-foreground mb-2"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: 0.7 + index * 0.2, duration: 0.5 }}
                          >
                            {cert.description}
                          </motion.p>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
                          >
                            <Badge 
                              variant="outline" 
                              className={`
                                ${cert.status === 'Completed' ? 'bg-green-500/20 text-green-400 border-green-500/20' : ''}
                                ${cert.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20' : ''}
                                ${cert.status === 'Achievement' ? 'bg-primary/20 text-primary border-primary/20' : ''}
                                animate-background-shine
                              `}
                            >
                              {cert.status}
                            </Badge>
                          </motion.div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
