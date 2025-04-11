import React from "react";
import { navigationLinks, socialLinks } from "@/lib/data";
import { motion } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background pt-16 pb-8 relative overflow-hidden">
      <div className="grid-pattern absolute inset-0 opacity-20"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-shape w-20 h-20 bg-primary/5 rounded-full top-20 left-[10%]"></div>
      <div className="floating-shape w-24 h-24 bg-primary/5 rounded-full bottom-10 right-[15%]" 
        style={{animationDelay: '1.5s'}}></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="flex flex-col items-center justify-center">
          <motion.a 
            href="#" 
            className="text-3xl font-heading font-bold flex items-center mb-6 relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span 
              className="text-primary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              &lt;
            </motion.span>
            <span className="mx-1 relative">
              Abhay Bajpai
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-primary rounded"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
              />
            </span>
            <motion.span 
              className="text-primary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
            >
              /&gt;
            </motion.span>
          </motion.a>
          
          <div className="flex space-x-6 mb-8">
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 text-xl relative"
                aria-label={link.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileHover={{ y: -5, scale: 1.2 }}
              >
                <i className={`fab fa-${link.icon}`}></i>
                <motion.span
                  className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.a 
              href="#" 
              className="text-muted-foreground hover:text-primary transition-colors duration-200 relative"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4 }}
            >
              Home
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-primary/70 rounded"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            
            {navigationLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 relative"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.4, delay: 0.05 * (index + 1) }}
              >
                {link.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary/70 rounded"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>
          
          <motion.div 
            className="text-muted-foreground text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="relative inline-block">
              Copyright © {currentYear} Abhay Bajpai. All Rights Reserved.
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 mx-auto h-px bg-primary/30 rounded"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
