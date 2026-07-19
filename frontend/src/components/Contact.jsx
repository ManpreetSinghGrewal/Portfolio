import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Get In <span className="gradient-text">Touch</span>
      </motion.h2>

      <div className="contact-container">
        <motion.div 
          className="contact-info"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Let's build something amazing together.</h3>
          <p>Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          <div className="contact-details">
            <p><strong>Email:</strong> manpreet1405.becse24@chitkara.edu.in</p>
            <p><strong>Phone:</strong> +91 7888344778</p>
            <p><strong>Location:</strong> Punjab, India</p>
          </div>
        </motion.div>

        <motion.form 
          className="contact-form glass-panel"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="input-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <textarea 
              name="message" 
              rows="5" 
              placeholder="Your Message" 
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary submit-btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : (
              <>Send Message <Send size={18} /></>
            )}
          </button>

          {status === 'success' && (
            <div className="form-message success">
              <CheckCircle size={20} /> Message sent successfully!
            </div>
          )}
          {status === 'error' && (
            <div className="form-message error">
              <AlertCircle size={20} /> Failed to send message. Please try again.
            </div>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
