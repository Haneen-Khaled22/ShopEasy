import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import img1 from "../../assets/slider1.png"
import img2 from "../../assets/slider2.png"
import img3 from "../../assets/slider3.png"
import top from "../../assets/rightttimg.png"
import left from "../../assets/lefttimg.png"


// كومبوننت الأرقام المتحركة
const AnimatedCounter = ({ target, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0)


  
  useEffect(() => {
    let startTime
    let animationFrame
    
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = (currentTime - startTime) / duration
      
      if (progress < 1) {
        setCount(Math.floor(target * progress))
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    // تحديث الأرقام كل 5 ثواني
    const interval = setInterval(() => {
      setCount(0)
      startTime = null
      animationFrame = requestAnimationFrame(animate)
    }, 5000)
    
    return () => {
      cancelAnimationFrame(animationFrame)
      clearInterval(interval)
    }
  }, [target, duration])
  
  return (
    <motion.span
      key={count}
      initial={{ opacity: 0.7 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1 }}
    >
      {count}{suffix}
    </motion.span>
  )
}

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      main: img1,
      top: top,
      bottom: left
    },
    {
      main: img2,
      top: top,
      bottom: left
    },
    {
      main: img3,
      top: top,
      bottom: left
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    enter: {
      opacity: 0,
      scale: 1.1,
      rotateY: 10
    },
    center: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      rotateY: -10,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className='flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16 max-w-7xl mx-auto'>
      {/* Left Content */}
      <motion.div 
        className='w-full lg:w-1/2 space-y-6 md:space-y-8 order-2 lg:order-1'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div 
          className='inline-flex items-center bg-gray-100 text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full'
          variants={itemVariants}
        >
          <motion.span 
            className='w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full mr-2'
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className='whitespace-nowrap'>Discover Fashion with Purpose</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight'
          variants={itemVariants}
        >
          Focuses on comfort and lasting style
        </motion.h1>

        {/* Description */}
        <motion.p 
          className='text-gray-500 text-sm sm:text-base md:text-lg max-w-lg'
          variants={itemVariants}
        >
          Discover fashion that reflects your values and your style. Sustainably 
          sourced, thoughtfully designed, endlessly stylish.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className='flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4'
          variants={itemVariants}
        >
          <motion.button 
            className='bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base cursor-pointer'
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
            <motion.svg 
              className='w-3.5 h-3.5 sm:w-4 sm:h-4' 
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </motion.svg>
          </motion.button>
          
          <motion.button 
            className='border border-gray-300 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer'
            whileHover={{ 
              scale: 1.05,
              borderColor: "#666"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Trendy Collections
            <motion.svg 
              className='w-3.5 h-3.5 sm:w-4 sm:h-4' 
              fill='none' 
              stroke='currentColor' 
              viewBox='0 0 24 24'
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* Stats - محدّث مع الخطوط الفاصلة والأرقام المتحركة */}
        <motion.div 
          className='flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 md:gap-8 pt-6 md:pt-8'
          variants={itemVariants}
        >
          {[
            { value: 30, suffix: 'k+', label: 'Happy Customers' },
            { value: 500, suffix: '+', label: 'New Products' },
            { value: 50, suffix: 'M+', label: 'Followers' }
          ].map((stat, index) => (
            <React.Fragment key={index}>
              <motion.div 
                className='flex flex-col items-center sm:items-start'
                whileHover={{ 
                  scale: 1.1,
                  y: -5
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className='text-2xl sm:text-3xl md:text-4xl font-bold'>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className='text-gray-400 text-xs sm:text-sm mt-1 text-center sm:text-left'>{stat.label}</div>
              </motion.div>
              
              {/* الخط الفاصل - لا يظهر بعد آخر عنصر */}
              {index < 2 && (
                <motion.div 
                  className='hidden md:block h-12 md:h-14 w-[1px] md:w-[1.5px] bg-gradient-to-b from-transparent via-gray-300 to-transparent'
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.6 + (index * 0.2), 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </motion.div>

      {/* Right Content - Images Carousel */}
      <div className='w-full lg:w-1/2 relative pb-8 order-1 lg:order-2'>
        <div className='relative max-w-xs sm:max-w-sm md:max-w-md mx-auto'>
          {/* Main Image with smooth transition */}
          <motion.div 
            className='rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl relative'
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatePresence mode='wait'>
              <motion.img 
                key={currentSlide}
                src={slides[currentSlide].main} 
                alt='Fashion model' 
                className='w-full h-[350px] xs:h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] object-cover'
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            </AnimatePresence>
            
            {/* Overlay gradient */}
            <motion.div 
              className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent'
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Top Small Image */}
          <div className='absolute -top-4 sm:-top-6 md:-top-8 -right-6 sm:-right-8 md:-right-12 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden p-1.5 sm:p-2'>
            <AnimatePresence mode='wait'>
              <motion.img 
                key={`top-${currentSlide}`}
                src={slides[currentSlide].top}
                alt='Fashion collection' 
                className='w-full h-full object-cover rounded-lg'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          {/* Bottom Small Image */}
          <div className='absolute bottom-2 sm:bottom-3 -left-6 sm:-left-10 md:-left-16 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl overflow-hidden p-1.5 sm:p-2'>
            <AnimatePresence mode='wait'>
              <motion.img 
                key={`bottom-${currentSlide}`}
                src={slides[currentSlide].bottom}
                alt='Clothing items' 
                className='w-full h-full object-cover rounded-lg'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className='absolute bottom-12 sm:bottom-14 md:bottom-16 right-3 sm:right-4 flex gap-1.5 sm:gap-2 z-10'>
            <motion.button 
              onClick={prevSlide}
              className='w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-md sm:shadow-lg flex items-center justify-center group'
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
                whileHover={{ x: -3 }}
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
              </motion.svg>
            </motion.button>
            
            <motion.button 
              onClick={nextSlide}
              className='w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-md sm:shadow-lg flex items-center justify-center group'
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className='w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5' 
                fill='none' 
                stroke='currentColor' 
                viewBox='0 0 24 24'
                whileHover={{ x: 3 }}
              >
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
              </motion.svg>
            </motion.button>
          </div>

          {/* Progress Indicator Dots */}
          <div className='absolute -bottom-3 sm:-bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5 sm:gap-2'>
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className='rounded-full'
                animate={{
                  width: currentSlide === index ? 24 : 6,
                  height: 6,
                  backgroundColor: currentSlide === index ? '#000' : '#d1d5db'
                }}
                whileHover={{ 
                  scale: 1.2,
                  backgroundColor: currentSlide === index ? '#000' : '#9ca3af'
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection