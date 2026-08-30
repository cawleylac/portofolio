import { useState } from 'react';
import { useScrollReveal } from '../hooks/useGSAP';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

export default function Connect() {
  const contentRef = useScrollReveal({ y: 30 });
  const formCardRef = useScrollReveal({ y: 40, delay: 0.2 });

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
    alert('Message sent! (Demo)');
    setForm({ email: '', subject: '', message: '' });
  };

  return (
    <section id="connect" className="py-20 lg:py-28 bg-[#0F4C81] text-white relative overflow-visible">
      {/* Bob with Teddy Bear Tim Illustration Overlapping Top-Left Boundary (Desktop only) */}
      <div className="hidden lg:block absolute -mt-25 left-4 sm:left-12 lg:left-24 -top-24 sm:-top-32 lg:-top-44 w-64 sm:w-72 lg:w-80 z-20 pointer-events-none drop-shadow-2xl">
        <img
          src="/minion1.png"
          alt="Minion Bob holding teddy bear"
          className="w-full h-auto object-contain select-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Top Header */}
        <div ref={contentRef} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#FFDE17] tracking-wide mb-4">
            LET&apos;S CONNECT
          </h2>
          <p className="text-white/90 text-sm sm:text-base font-normal max-w-xl mx-auto leading-relaxed mb-6">
            Looking for a developer to join your next big adventure? Drop me<br className="hidden sm:block" /> a message and let&apos;s make something amazing together.
          </p>

          {/* Yellow Email Pill Button */}
          <a
            href="mailto:m4rshazzila4ura@gmail.com"
            className="inline-block px-8 py-3.5 bg-[#FFDE17] hover:bg-[#FED136] text-[#1E293B] font-bold text-sm sm:text-base rounded-full shadow-lg transition-transform duration-200 hover:scale-105"
          >
            m4rshazzila4ura@gmail.com
          </a>
        </div>

        {/* Message Form Card */}
        <div
          ref={formCardRef}
          className="bg-white rounded-3xl sm:rounded-[36px] p-8 sm:p-10 md:p-12 max-w-2xl mx-auto shadow-2xl mt-14 text-left text-gray-900"
        >
          <span className="text-xs uppercase font-bold text-[#0F3B6C] tracking-wider block mb-1.5">
            SEND A MESSAGE
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0F3B6C] leading-tight mb-8">
            I 
            HEAR YOUU
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="budi@email.com"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0F3B6C] focus:ring-1 focus:ring-[#0F3B6C] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-[#0F3B6C] focus:ring-1 focus:ring-[#0F3B6C] transition-all cursor-pointer"
                >
                  <option value="">Select a topic...</option>
                  <option value="freelance">Freelance Project</option>
                  <option value="fulltime">Full-time Job</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-2">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                rows={4}
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0F3B6C] focus:ring-1 focus:ring-[#0F3B6C] transition-all resize-none"
              />
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#0F3B6C] hover:bg-[#0B2C52] text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all duration-200 hover:scale-105"
              >
                SEND MESSAGE
              </button>
            </div>
          </form>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <a
            href="https://www.linkedin.com/in/aura-marsha-azzila/"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="text-sm" />
          </a>
          <a
            href="https://github.com/cawleylac"
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            aria-label="GitHub"
          >
            <FaGithub className="text-base" />
          </a>
        </div>
      </div>
    </section>
  );
}




