import React, { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
   

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);




  return (
    <div className="bg-[#FAF8F5] font-serif">
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop"
            alt="Luxury interior"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </motion.div>

        <motion.div 
          style={{ opacity }}
          className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center"
          >
            <p className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 text-amber-200 font-sans">
              Est. 2020
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-tight">
              Curated for<br />
              <span className="italic font-serif">Your Life</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200 leading-relaxed font-sans font-light">
              Where beauty meets function. Where comfort meets style.
            </p>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white text-xs tracking-widest uppercase font-sans">Scroll</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-[1px] h-12 bg-white/50"
            ></motion.div>
          </div>
        </motion.div>
      </section>

      {/* Story Section */}
      <StorySection />

      {/* Values Grid */}
      <ValuesSection />

      {/* Image Gallery */}
      <GallerySection />

      {/* Team Section */}
      <TeamSection />

      {/* Final CTA */}
      <CTASection />
    </div>
  );
};

// Story Section
const StorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm tracking-[0.3em] uppercase text-amber-700 font-sans font-medium">
            Our Story
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mt-4 mb-6 leading-tight">
            Crafting Spaces,<br />
            <span className="italic">Elevating Lives</span>
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed font-sans text-lg">
            <p>
              We believe that beauty is not a luxury—it's a necessity. From the furniture that embraces you after a long day to the skincare that nurtures your glow, every product we curate tells a story of craftsmanship and care.
            </p>
            <p>
              Founded by design enthusiasts and beauty lovers, our mission is simple: bring together the world's finest products that transform houses into homes and routines into rituals.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=1000&fit=crop"
              alt="Elegant living room"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-200/30 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

// Values Section
const ValuesSection = () => {
  const values = [
    {
     
      title: "Quality First",
      description: "Every product is handpicked and tested to meet our exacting standards.",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=400&fit=crop"
    },
    {
     
      title: "Sustainability",
      description: "We partner with brands that care about the planet as much as we do.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop"
    },
    {
      
      title: "Timeless Design",
      description: "Trends fade, but true style endures. We curate pieces that last.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop"
    },
    {
     
      title: "Customer Love",
      description: "Your satisfaction isn't just our goal—it's our obsession.",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-amber-50 to-white py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            What We <span className="italic">Stand For</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-sans">
            Our values aren't just words on a page—they're promises we keep every single day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueCard = ({ value, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/2]">
        <img
          src={value.image}
          alt={value.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      <h3 className="text-2xl font-light mb-2">{value.title}</h3>
      <p className="text-gray-600 leading-relaxed font-sans">{value.description}</p>
    </motion.div>
  );
};

// Gallery Section
const GallerySection = () => {
  const images = [
    { url: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=1000&fit=crop", span: "row-span-2" },
    { url: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop", span: "" },
    { url: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=600&h=600&fit=crop", span: "" },
    { url: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=1000&fit=crop", span: "row-span-2" },
    { url: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=600&h=600&fit=crop", span: "" }
  ];

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-light text-center mb-16"
        >
          A Glimpse Into <span className="italic">Our World</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[200px]">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${img.span} group relative overflow-hidden rounded-2xl cursor-pointer`}
            >
              <img
                src={img.url}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Team Section
const TeamSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-amber-50 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            Meet The <span className="italic">Curators</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto font-sans">
            Passionate experts who handpick every item with love and intention.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            { name: "Sarah Mitchell", role: "Founder & Creative Director", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop" },
            { name: "James Chen", role: "Head of Furniture Curation", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop" },
            { name: "Emma Rodriguez", role: "Beauty & Wellness Lead", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop" }
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl aspect-[3/4]">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-2xl font-light mb-2">{member.name}</h3>
              <p className="text-amber-700 font-sans text-sm tracking-wide">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
   const navigate = useNavigate();

 const navigateToAllProducts =()=>{
    navigate('/products')
   }
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1920&h=800&fit=crop"
          alt="Beautiful home"
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-6"
      >
        <h2 className="text-4xl md:text-6xl font-light mb-6">
          Ready to Transform<br />
          <span className="italic">Your Space?</span>
        </h2>
        <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto font-sans font-light">
          Explore our curated collection and discover pieces that speak to your soul.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={navigateToAllProducts}
          className="px-10 py-4 bg-white text-black font-sans font-medium tracking-wider uppercase text-sm rounded-full hover:bg-amber-100 transition-colors duration-300 shadow-xl"
        >
          Start Shopping
        </motion.button>
      </motion.div>
    </section>
  );
};

export default About;