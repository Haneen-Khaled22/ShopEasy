import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Contact Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-light mb-4">
                Let's <span className="italic">Connect</span>
              </h2>
              <p className="text-gray-600 text-lg font-sans">
                Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FloatingInput
                  name="name"
                  label="Your Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
                <FloatingInput
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>

              <FloatingInput
                name="subject"
                label="Subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="6"
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 resize-none font-sans"
                  placeholder=" "
                  required
                />
                <label
                  className={`absolute left-4 transition-all duration-300 pointer-events-none font-sans ${
                    focusedField === 'message' || formData.message
                      ? '-top-3 text-sm bg-[#FAF8F5] px-2 text-amber-700'
                      : 'top-3 text-gray-500'
                  }`}
                >
                  Your Message
                </label>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white font-sans font-semibold rounded-xl hover:shadow-xl transition-all duration-300 tracking-wide"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              <ContactCard
                icon={<HiPhone className="text-3xl" />}
                title="Phone"
                info="+1 (555) 123-4567"
                delay={0.1}
              />
              <ContactCard
                icon={<HiMail className="text-3xl" />}
                title="Email"
                info="easyshop@gmail.com"
                delay={0.2}
              />
              <ContactCard
                icon={<HiLocationMarker className="text-3xl" />}
                title="Address"
                info="123 Luxury Avenue, New York, NY 10001"
                delay={0.3}
              />
              <ContactCard
                icon={<HiClock className="text-3xl" />}
                title="Business Hours"
                info="Mon - Fri: 9AM - 6PM"
                delay={0.4}
              />
            </div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative h-64 rounded-2xl overflow-hidden shadow-xl group"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9476519598093!2d-73.99099492346652!3d40.74844097138558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1705234567890!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="grayscale group-hover:grayscale-0 transition-all duration-500"
              ></iframe>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-light mb-4">Follow Us</h3>
              <p className="text-gray-600 mb-6 font-sans">
                Join our community and stay updated with the latest trends.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <FaFacebook />, color: 'hover:bg-blue-600' },
                  { icon: <FaInstagram />, color: 'hover:bg-pink-600' },
                  { icon: <FaTwitter />, color: 'hover:bg-sky-500' },
                  { icon: <FaPinterest />, color: 'hover:bg-red-600' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 hover:text-white transition-all duration-300 ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </div>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative h-[50vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop"
          alt="Contact us"
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-white px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm tracking-[0.3em] uppercase mb-4 text-amber-200 font-sans"
        >
          Get In Touch
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-light mb-4"
        >
          We'd Love to <span className="italic">Hear</span> From You
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl font-sans font-light"
        >
          Whether you have questions, feedback, or just want to say hello, we're here for you.
        </motion.p>
      </motion.div>
    </section>
  );
};

// Floating Input Component
const FloatingInput = ({ name, label, type, value, onChange, focusedField, setFocusedField }) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocusedField(name)}
        onBlur={() => setFocusedField(null)}
        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 font-sans"
        placeholder=" "
        required
      />
      <label
        className={`absolute left-4 transition-all duration-300 pointer-events-none font-sans ${
          focusedField === name || value
            ? '-top-3 text-sm bg-[#FAF8F5] px-2 text-amber-700'
            : 'top-3 text-gray-500'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

// Contact Card Component
const ContactCard = ({ icon, title, info, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ x: 5 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-start gap-4 group cursor-pointer"
    >
      <div className="text-amber-600 bg-amber-50 p-3 rounded-lg group-hover:bg-amber-100 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1 font-sans">{title}</h3>
        <p className="text-gray-600 font-sans">{info}</p>
      </div>
    </motion.div>
  );
};

// FAQ Section
const FAQSection = () => {
  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping on orders over $100."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of delivery. Items must be unused and in original packaging."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes! We ship to over 50 countries worldwide. Shipping costs vary by location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also track orders in your account."
    }
  ];

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4">
            Frequently Asked <span className="italic">Questions</span>
          </h2>
          <p className="text-gray-600 text-lg font-sans">
            Find quick answers to common questions below.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQItem = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-amber-50 rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-amber-100 transition-colors duration-300"
      >
        <h3 className="font-semibold text-gray-800 font-sans">{faq.question}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl text-amber-600"
        >
          ↓
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-gray-600 font-sans leading-relaxed">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
};

// Newsletter Section
const NewsletterSection = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-500"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white"
      >
        <h2 className="text-4xl md:text-5xl font-light mb-4">
          Stay In <span className="italic">The Loop</span>
        </h2>
        <p className="text-lg mb-8 text-amber-50 font-sans font-light">
          Subscribe to our newsletter for exclusive offers, new arrivals, and design inspiration.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors duration-300 font-sans"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-amber-600 font-sans font-semibold rounded-xl hover:bg-amber-50 transition-colors duration-300 shadow-xl"
          >
            Subscribe
          </motion.button>
        </form>

        <p className="mt-6 text-sm text-amber-100 font-sans">
          No spam, ever. Unsubscribe anytime.
        </p>
      </motion.div>
    </section>
  );
};

export default ContactUs;