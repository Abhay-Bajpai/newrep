import React, { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import ProjectsSection from "@/components/sections/projects";
import SkillsSection from "@/components/sections/skills";
import EducationSection from "@/components/sections/education";
import ContactSection from "@/components/sections/contact";

// For Font Awesome icons
const loadFontAwesome = () => {
  const script = document.createElement('script');
  script.src = 'https://kit.fontawesome.com/a076d05399.js';
  script.crossOrigin = 'anonymous';
  document.body.appendChild(script);

  // Fallback to cdnjs if the kit fails
  script.onerror = () => {
    const fallbackScript = document.createElement('script');
    fallbackScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    fallbackScript.integrity = 'sha512-fD9DI5bZwQxOi7MhYWnnNPlvXdp/2Pj3XSTRrFs5FQa4mizyGLnJcN6tuvUS6LbmgN1ut+XGSABKvjN0H6Aoow==';
    fallbackScript.crossOrigin = 'anonymous';
    document.body.appendChild(fallbackScript);
  };
};

export default function Home() {
  useEffect(() => {
    // Load Font Awesome icons
    loadFontAwesome();

    // Set page title
    document.title = "Abhay Bajpai | Developer Portfolio";

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetElement = document.querySelector(href);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
