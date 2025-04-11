import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/data";
import useScrollSpy from "@/hooks/use-scroll-spy";
import { motion } from "framer-motion";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = navigationLinks.map(link => link.href.substring(1));
  const activeSection = useScrollSpy(sectionIds);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-lg shadow-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="text-xl font-heading font-bold flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.span 
            className="text-primary"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            &lt;
          </motion.span>
          <span className="mx-1">Abhay Bajpai</span>
          <motion.span 
            className="text-primary"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            /&gt;
          </motion.span>
        </motion.a>
        
        <div className="hidden md:flex space-x-8">
          {navigationLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`hover:text-primary transition-colors duration-200 relative ${
                activeSection === link.href.substring(1) ? "text-primary" : ""
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -2 }}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <motion.span 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                  layoutId="activeNavIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.a
            href="/resume.pdf"
            className="bg-primary/10 text-primary rounded-full px-4 py-2 flex items-center hover:bg-primary/20 transition-all duration-200 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="absolute inset-0 bg-primary/10 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
            <span className="relative z-10">Resume</span>
          </motion.a>
          
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <motion.div 
        className={`md:hidden bg-background/95 backdrop-blur-lg absolute top-full left-0 right-0 border-b border-border px-4 py-4 ${
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        initial={false}
        animate={mobileMenuOpen ? { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.3, type: "spring", stiffness: 300, damping: 25 }
        } : { 
          opacity: 0, 
          y: -10,
          transition: { duration: 0.2 }
        }}
      >
        <div className="flex flex-col space-y-4">
          {navigationLinks.map((link, index) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`hover:text-primary transition-colors duration-200 py-2 ${
                activeSection === link.href.substring(1) ? "text-primary" : ""
              }`}
              onClick={closeMobileMenu}
              initial={{ opacity: 0, x: -10 }}
              animate={mobileMenuOpen ? { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.3, delay: index * 0.05 + 0.1 }
              } : { opacity: 0, x: -10 }}
              whileHover={{ x: 5 }}
            >
              <span className="relative">
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                    layoutId="mobileActiveNavIndicator"
                    style={{ width: '100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default Navbar;
