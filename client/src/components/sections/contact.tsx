import React, { useState, useRef } from "react";
import { SectionTitle } from "@/components/ui/section-title";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { contactInfo } from "@/lib/data";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, useInView } from "framer-motion";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const response = await apiRequest("POST", "/api/contact", data);
      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
          variant: "default",
        });
        form.reset();
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const formFields = [
    { name: "name", label: "Your Name", placeholder: "John Doe", type: "text" },
    { name: "email", label: "Your Email", placeholder: "john@example.com", type: "email" },
    { name: "subject", label: "Subject", placeholder: "Project Inquiry", type: "text" },
    { name: "message", label: "Your Message", placeholder: "I'd like to discuss a potential project...", type: "textarea" }
  ];

  return (
    <section 
      id="contact" 
      className="py-20 bg-secondary/30 relative overflow-hidden section-padding"
      ref={sectionRef}
    >
      <div className="grid-pattern absolute inset-0 opacity-10"></div>
      
      {/* Floating decorative elements */}
      <div className="floating-shape w-32 h-32 bg-primary/5 rounded-full -top-10 left-[15%]"></div>
      <div className="floating-shape w-24 h-24 bg-primary/5 rounded-full bottom-40 right-[5%]" 
        style={{animationDelay: '2s'}}></div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle 
            title="Get In Touch" 
            subtitle="Ready to start a project together? Have questions about my work? Feel free to reach out!"
          />
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Card className="bg-background/50 backdrop-blur-md shadow-xl border border-primary/10 hover:shadow-primary/10 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <motion.h3 
                  className="text-2xl font-heading font-semibold mb-6 relative inline-block"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Send Me a Message
                  <motion.span 
                    className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: '100%' } : { width: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  />
                </motion.h3>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {formFields.map((field, index) => (
                      <motion.div
                        key={field.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      >
                        <FormField
                          control={form.control}
                          name={field.name as "name" | "email" | "subject" | "message"}
                          render={({ field: formField }) => (
                            <FormItem>
                              <FormLabel>{field.label}</FormLabel>
                              <FormControl>
                                {field.type === "textarea" ? (
                                  <Textarea 
                                    placeholder={field.placeholder} 
                                    rows={5} 
                                    {...formField} 
                                    className="bg-card/50 border-border focus:border-primary focus:ring-primary transition-all duration-300" 
                                  />
                                ) : (
                                  <Input 
                                    placeholder={field.placeholder} 
                                    type={field.type} 
                                    {...formField} 
                                    className="bg-card/50 border-border focus:border-primary focus:ring-primary transition-all duration-300" 
                                  />
                                )}
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    ))}
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 relative overflow-hidden group" 
                        disabled={isSubmitting}
                      >
                        <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                        {isSubmitting ? (
                          <span className="flex items-center gap-2 relative z-10">
                            <i className="fas fa-circle-notch fa-spin"></i> Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 relative z-10">
                            <i className="fas fa-paper-plane"></i> Send Message
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.h3 
              className="text-2xl font-heading font-semibold mb-6 relative inline-block"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Contact Information
              <motion.span 
                className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                initial={{ width: 0 }}
                animate={isInView ? { width: '100%' } : { width: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
            </motion.h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={info.id} 
                  className="flex items-start p-4 rounded-lg bg-background/50 backdrop-blur-sm hover:bg-card/30 hover:shadow-md transition-all duration-300 border border-border/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5, x: 0 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mr-4 flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <i className={`fas fa-${info.icon} text-primary`}></i>
                  </motion.div>
                  <div>
                    <h4 className="font-medium mb-1">{info.title}</h4>
                    <a
                      href={info.link}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      target={info.link.startsWith('http') ? "_blank" : undefined}
                      rel={info.link.startsWith('http') ? "noopener noreferrer" : undefined}
                    >
                      {info.value}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-12 relative"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <div className="absolute inset-0 bg-primary/20 filter blur-xl rounded-lg animate-pulse-slow"></div>
              <Card className="relative z-10 border border-primary/20 bg-background/70 backdrop-blur-md">
                <CardContent className="p-6">
                  <motion.h4 
                    className="text-xl font-heading font-semibold mb-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                  >
                    Let's Work Together
                  </motion.h4>
                  <motion.p 
                    className="text-muted-foreground mb-6"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 1 }}
                  >
                    I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button asChild className="relative overflow-hidden group">
                      <a href="mailto:abhayofc59@gmail.com">
                        <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                        <span className="relative z-10 flex items-center">
                          <i className="fas fa-handshake mr-2"></i> Start a Project
                        </span>
                      </a>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
