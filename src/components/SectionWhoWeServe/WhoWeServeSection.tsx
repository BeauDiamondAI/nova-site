import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { audienceData } from "./audienceData";
import { AudienceCard } from "./AudienceCard";
import "./SectionWhoWeServe.css";

const SectionWhoWeServe: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Parallax effect for background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Mobile swipe handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && containerRef.current) {
        // Set up mobile carousel behavior
        const container = containerRef.current;
        container.scrollTo({ left: 0, behavior: "smooth" });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="who-we-serve"
      className="section-who-we-serve"
    >
      {/* Background Network Video with Parallax */}
      <motion.div 
        className="background-layer"
        style={{ y: backgroundY }}
      >
        <video
          className="background-video"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/SectionWhoWeServeMedia/Network.mp4" type="video/mp4" />
        </video>
        
        {/* Dark overlay for better text contrast */}
        <div className="background-overlay" />
      </motion.div>

      {/* Grain Texture Overlay */}
      <div className="grain-overlay" />

      {/* Header Content */}
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-heading font-orbitron">
          Who We Serve
        </h2>
        <p className="section-subheading">
          Deployable Intelligence for Builders, Strategists, and Scaling Teams
        </p>
        <p className="section-description">
          We&apos;re building cognitive engines powered by an entirely new class of
          intelligence — systems operating at an altitude beyond conventional
          AI. They bring adaptive reasoning, end-to-end automation, multi-agent
          orchestration, and execution clarity that were simply not possible
          until now.
        </p>
      </motion.div>

      {/* Audience Cards Container */}
      <motion.div
        className="pillars-wrapper"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
      >
        <div 
          ref={containerRef}
          className="pillars-container"
        >
          {audienceData.map((audience, index) => (
            <AudienceCard
              key={index}
              icon={audience.icon}
              title={audience.title}
              description={audience.description}
              color={audience.color}
              index={index}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            />
          ))}
        </div>
      </motion.div>

      {/* Mobile Scroll Indicator */}
      <motion.div 
        className="mobile-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span>Swipe to explore →</span>
      </motion.div>
    </section>
  );
};

export default SectionWhoWeServe;