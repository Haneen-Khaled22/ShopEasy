import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const {t} = useTranslation();

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
    <div className="bg-[#FAF8F5] dark:bg-black min-h-screen">
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
  {t("heroTitle1")} <span className="italic">{t("heroTitle2")}</span>
              </h2>
              <p className="text-gray-600 text-lg font-sans">
  {t("heroSubtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FloatingInput
                  name="name"
                  label={t("name")}
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
                <FloatingInput
                  name="email"
                  label={t("email")}
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>

              <FloatingInput
                name="subject"
                label={t("subject")}
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
                  className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl dark:bg-black  focus:outline-none transition-colors duration-300 resize-none font-sans"
                  placeholder=" "
                  required
                />
                <label
                  className={`absolute left-4 transition-all  duration-300 pointer-events-none font-sans ${
                    focusedField === 'message' || formData.message
                      ? '-top-3 text-sm bg-[#FAF8F5]  px-2 text-amber-700'
                      : 'top-3 text-gray-500'
                  }`}
                >
                 {t("message")}
                </label>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                 style={{
            background:
              "linear-gradient(135deg, #1a1410 0%, #3d2b1f 50%, #6b4c36 100%)",
          }}
                className=" cursor-pointer w-full py-4  text-white font-sans font-semibold rounded-xl hover:shadow-xl transition-all duration-300 tracking-wide"
              >
             { t( "sendButton")}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 dark:bg-black"
          >
            {/* Contact Cards */}
            <div className="space-y-4 ">
            
              <ContactCard
  icon={<HiPhone className="text-3xl" />}
  title={t("phone")}
  info={t("phoneInfo")}
  delay={0.1}
/>
<ContactCard
  icon={<HiMail className="text-3xl" />}
  title={t("emailInfoTitle")}
  info={t("emailInfo")}
  delay={0.2}
/>
<ContactCard
  icon={<HiLocationMarker className="text-3xl" />}
  title={t("address")}
  info={t("addressInfo")}
  delay={0.3}
/>
<ContactCard
  icon={<HiClock className="text-3xl" />}
  title={t("hours")}
  info={t("hoursInfo")}
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
                className="grayscale group-hover:grayscale-0 transition-all duration-500 bg-black"
              ></iframe>
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-white dark:bg-black rounded-2xl p-8 shadow-lg"
            >
              <h3 className="text-2xl font-light mb-4 dark:text-white">{t("followUs")}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 font-sans">
                {t("followUsSubtitle")}
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
  const {t} = useTranslation();
  return (
    <section className="relative h-[50vh] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop"
          alt={t("heroImgAlt")}
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
          {t("heroEst")}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-light mb-4"
        >
          {t("heroTitle1")} <span className="italic">{t("heroTitle2")}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-200 max-w-2xl font-sans font-light"
        >
  {t("heroSubtitle")}        </motion.p>
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
        className="w-full px-4 py-3 bg-white dark:bg-black border-2 border-gray-200 dark:border-gray-50 rounded-xl  focus:outline-none transition-colors duration-300 font-sans"
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
      className="bg-white dark:bg-black rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-start gap-4 group cursor-pointer"
    >
      <div className="text-[#3d2b1a] bg-amber-50 p-3 rounded-lg group-hover:bg-amber-100 transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 mb-1 font-sans dark:text-gray-400">{title}</h3>
        <p className="text-gray-600 font-sans dark:text-gray-300">{info}</p>
      </div>
    </motion.div>
  );
};

// FAQ Section
const FAQSection = () => {

  const {t} = useTranslation();
  const faqs = [
    { question: t("faqShippingQ"), answer: t("faqShippingA") },
    { question: t("faqReturnQ"), answer: t("faqReturnA") },
    { question: t("faqInternationalQ"), answer: t("faqInternationalA") },
    { question: t("faqTrackQ"), answer: t("faqTrackA") }
  ];

  return (
    <section className="bg-white dark:bg-black py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light mb-4 dark:text-white">
            {t("faqTitle")} 
          </h2>
          <p className="text-gray-500 text-lg font-sans">
{t("faqSubtitle")  }        </p>
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
        className="cursor-pointer w-full px-6 py-5 text-left flex justify-between items-center hover:bg-amber-100 transition-colors duration-300"
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
  const {t} = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-500"
       style={{
            background:
              "linear-gradient(135deg, #1a1410 0%, #3d2b1f 50%, #6b4c36 100%)",
          }}
      ></div>
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
          {t("newsletterTitle")} <span className="italic">{t("newsletterTitleItalic")}</span>
        </h2>
        <p className="text-lg mb-8 text-amber-50 font-sans font-light">
          {t("newsletterSubtitle")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("newsletterPlaceholder")}
            className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white transition-colors duration-300 font-sans"
            required
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}

            className=" cursor-pointer px-8 py-4 bg-white text-amber-600 font-sans font-semibold rounded-xl hover:bg-amber-50 transition-colors duration-300 shadow-xl"
          >
                        {t("newsletterButton")}

          </motion.button>
        </form>

        <p className="mt-6 text-sm text-amber-100 font-sans">
          {t("newsletterDisclaimer")}
        </p>
      </motion.div>
    </section>
  );
};

export default ContactUs;