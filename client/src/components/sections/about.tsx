import React, { useEffect, useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { motion, useInView } from "framer-motion";

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  // Parallax effect for floating shapes
  const parallaxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleParallax = () => {
      if (!parallaxRef.current) return;
      const scrollY = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrollY * 0.05}px)`;
    };
    
    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <section 
      id="about" 
      className="py-20 bg-secondary/30 relative overflow-hidden section-padding"
      ref={sectionRef}
    >
      <div className="grid-pattern absolute inset-0 opacity-10"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-shape w-24 h-24 bg-primary/10 rounded-full top-20 left-[10%]"></div>
      <div className="floating-shape w-20 h-20 bg-primary/10 rounded-full bottom-20 right-[10%]" 
        style={{animationDelay: '3s'}} ref={parallaxRef}></div>
      <div className="floating-shape w-16 h-16 bg-primary/5 rounded-full top-1/4 right-[30%]" 
        style={{animationDelay: '1.5s'}}></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <SectionTitle title="About Me" />
        
        <div className="flex flex-col lg:flex-row items-center gap-12">          
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3 
              className="text-2xl font-heading font-semibold mb-4 gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              A Passionate Developer
            </motion.h3>
            
            <motion.p 
              className="text-foreground mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              I'm a CSE student specializing in AI & ML at Babu Banarasi Das Institute of Technology & Management, 
              graduating in 2025. My technical journey is fueled by a deep interest in artificial intelligence, 
              machine learning, web development, and distributed databases.
            </motion.p>
            
            <motion.p 
              className="text-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              I believe in collaborative development and creative problem-solving. As a quick learner, 
              I'm constantly exploring new technologies and methodologies to expand my skill set and 
              create more impactful solutions.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { icon: "graduation-cap", title: "Education", value: "B.Tech CSE (AI&ML), BBDITM", delay: 0.8 },
                { icon: "calendar-alt", title: "Graduation", value: "2025", delay: 0.9 },
                { icon: "laptop-code", title: "Tech Interests", value: "AI/ML, Web Dev, Databases", delay: 1.0 },
                { icon: "chess-knight", title: "Hobbies", value: "Chess, Basketball", delay: 1.1 }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center p-4 bg-card/40 backdrop-blur-sm rounded-lg hover:bg-card/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: item.delay, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.1)' }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 animate-pulse-slow">
                    <i className={`fas fa-${item.icon} text-primary`}></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-medium">{item.title}</h4>
                    <p className="text-muted-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
