import React, { useState } from 'react';
import { motion } from 'framer-motion';

const contactInfo = [
  {
    icon: '📧',
    title: 'Email',
    info: 'contact@m-client.com',
    description: 'Send us an email anytime',
  },
  {
    icon: '📱',
    title: 'Phone',
    info: '+1 (555) 123-4567',
    description: 'Call us during business hours',
  },
  {
    icon: '📍',
    title: 'Address',
    info: '123 Tech Street, Digital City',
    description: 'Visit our office',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Hide success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="w-full">
      <motion.main
        className="content-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">📞 Get in Touch</h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
            Have questions about M-Client? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Contact Information Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="contact-grid"
        >
          {contactInfo.map((contact, index) => (
            <motion.div
              key={index}
              className="card text-center group"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-5xl mb-4 group-hover:animate-bounce">
                {contact.icon}
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">
                {contact.title}
              </h3>
              <p className="text-gray-300 mb-4 font-medium">
                {contact.info}
              </p>
              <p className="text-gray-400 text-sm">
                {contact.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="What is this about?"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your inquiry..."
                className="form-textarea"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="form-button"
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="loading-spinner"></div>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </motion.button>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                className="success-message mt-4 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                ✅ Thank you! Your message has been sent successfully.
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.main>
    </div>
  );
};