import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Typewriter from "@/components/ui/typewriter";
import { socialLinks } from "@/lib/data";
import { motion } from "framer-motion";

export function HeroSection() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = spotlightRef.current.getBoundingClientRect();
      
      const x = ((clientX - left) / width) * 100;
      const y = ((clientY - top) / height) * 100;
      
      spotlightRef.current.style.setProperty('--x', `${x}%`);
      spotlightRef.current.style.setProperty('--y', `${y}%`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen pt-24 pb-12 flex items-center relative overflow-hidden"
      ref={spotlightRef}
      style={{
        background: 'radial-gradient(circle at var(--x, 50%) var(--y, 50%), rgba(139, 92, 246, 0.15) 0%, rgba(0, 0, 0, 0) 50%)'
      }}
    >
      <div className="grid-pattern absolute inset-0 opacity-20"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-shape w-24 h-24 bg-primary/10 rounded-full top-20 left-[20%]"></div>
      <div className="floating-shape w-32 h-32 bg-primary/10 rounded-full bottom-20 right-[20%]" style={{animationDelay: '2s'}}></div>
      <div className="floating-shape w-16 h-16 bg-primary/20 rounded-full top-1/3 right-[25%]" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div 
            className="w-full max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="text-primary font-medium mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hello, I'm
            </motion.p>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-heading font-bold mb-6 spotlight-effect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Abhay Bajpai
            </motion.h1>
            
            <motion.div 
              className="h-12 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Typewriter
                phrases={[
                  "AI/ML Developer",
                  "Web Developer",
                  "Hackathon Enthusiast",
                  "Tech Explorer"
                ]}
                className="text-xl md:text-2xl text-gray-300"
              />
            </motion.div>
            
            <motion.p 
              className="text-muted-foreground text-lg md:text-xl mb-8 md:max-w-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              Building intelligent & creative web experiences with a passion for AI, ML, and web development.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white relative overflow-hidden animate-background-shine"
              >
                <a href="#contact">
                  <i className="fas fa-paper-plane mr-2"></i> Contact Me
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="border-border bg-transparent hover:bg-card backdrop-blur-sm"
              >
                <a href="#projects">
                  <i className="fas fa-code mr-2"></i> View Projects
                </a>
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex space-x-6 mt-8 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary hover:scale-110 transition-all duration-200 text-xl"
                  aria-label={link.name}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                >
                  <i className={`fab fa-${link.icon}`}></i>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
