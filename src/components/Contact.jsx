import { useState } from 'react';
import { useScrollReveal } from '../hooks/useGSAP';
import { FaGithub, FaInstagram } from 'react-icons/fa';

export default function Contact() {
  const formRef = useScrollReveal({ y: 60 });
  const [form, setForm] = useState({
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission placeholder
    alert('Message sent! (demo)');
    setForm({ email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-blue-950">
      <div className="max-w-3xl mx-auto px-6">
        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-10">
          <a
            href="#"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            aria-label="GitHub"
          >
            <FaGithub className="text-lg" />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors duration-200"
            aria-label="Instagram"
          >
            <FaInstagram className="text-lg" />
          </a>
        </div>

        {/* Form Card */}
        <div
          ref={formRef}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10"
        >
          <p className="text-yellow-400 text-sm font-semibold tracking-wider mb-2">
            SEND A MESSAGE
          </p>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-8 leading-tight">
            WE'D LOVE
            <br />
            TO HEAR FROM YOU
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address <span className="text-yellow-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="budi@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Subject <span className="text-yellow-400">*</span>
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-blue-950">
                    Select a topic...
                  </option>
                  <option value="collaboration" className="bg-blue-950">
                    Collaboration
                  </option>
                  <option value="hiring" className="bg-blue-950">
                    Hiring
                  </option>
                  <option value="feedback" className="bg-blue-950">
                    Feedback
                  </option>
                  <option value="other" className="bg-blue-950">
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Your Message <span className="text-yellow-400">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                rows={5}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition-all duration-200 hover:scale-105 shadow-lg"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
