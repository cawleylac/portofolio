import { useState } from 'react';
import { useScrollReveal } from '../hooks/useGSAP';
import { FaLinkedinIn, FaGithub, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { sanitize } from '../utils/sanitize';

export default function Connect() {
  const contentRef = useScrollReveal({ y: 30 });
  const formCardRef = useScrollReveal({ y: 40, delay: 0.2 });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);

    // 1. Anti-bot honeypot
    if (fd.get('hp_website')) return setSent(true);

    // 2. Cooldown check (30s)
    const last = Number(localStorage.getItem('porto_contact_last') || 0);
    if (Date.now() - last < 30000) {
      return setError(`Please wait ${Math.ceil((30000 - (Date.now() - last)) / 1000)}s before sending again.`);
    }

    setLoading(true);
    setError('');

    const payload = {
      email: sanitize(fd.get('email')),
      subject: sanitize(fd.get('subject')),
      message: sanitize(fd.get('message')),
      submittedAt: new Date().toISOString(),
    };

    const url = import.meta.env.VITE_GOOGLE_SHEETS_SCRIPT_URL;

    try {
      if (url && !url.includes('YOUR_DEPLOYMENT_ID')) {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        });
      }
      localStorage.setItem('porto_contact_last', String(Date.now()));
      setSent(true);
      e.target.reset();
    } catch {
      setError('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="connect" className="py-20 lg:py-28 bg-[#0F4C81] text-white relative overflow-visible">
      {/* Bob with Teddy Bear */}
      <div className="hidden lg:block absolute -mt-25 left-4 sm:left-12 lg:left-24 -top-24 sm:-top-32 lg:-top-44 w-64 sm:w-72 lg:w-80 z-20 pointer-events-none drop-shadow-2xl">
        <img src="/minion1.png" alt="Minion Bob" className="w-full h-auto object-contain select-none" />
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
            I HEAR YOUU
          </h3>

          {sent ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheckCircle className="text-3xl" />
              </div>
              <h4 className="text-lg font-bold text-green-900 mb-1">Message Sent!</h4>
              <p className="text-sm text-green-700 mb-6">Thank you! Your message has been sent directly to the spreadsheet.</p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="px-6 py-2.5 bg-[#0F3B6C] hover:bg-[#0B2C52] text-white font-bold text-xs sm:text-sm rounded-full shadow transition-all duration-200 hover:scale-105"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input type="text" name="hp_website" className="hidden" tabIndex={-1} autoComplete="off" />

              {error && <p className="text-xs font-semibold text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    maxLength={100}
                    placeholder="budi@email.com"
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#0F3B6C] focus:ring-1 focus:ring-[#0F3B6C] rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    required
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#0F3B6C] focus:ring-1 focus:ring-[#0F3B6C] rounded-xl text-sm text-gray-700 focus:outline-none transition-all cursor-pointer disabled:opacity-60"
                  >
                    <option value="">Select a topic...</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Full-time Job">Full-time Job</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other Inquiry">Other Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-2">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  minLength={5}
                  maxLength={2000}
                  rows={4}
                  disabled={loading}
                  placeholder="Tell us how we can help you..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#0F3B6C] focus:ring-1 focus:ring-[#0F3B6C] rounded-xl text-sm text-gray-800 placeholder-gray-400 focus:outline-none transition-all resize-none disabled:opacity-60"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-[#0F3B6C] hover:bg-[#0B2C52] text-white font-bold text-xs sm:text-sm rounded-full shadow-md transition-all duration-200 hover:scale-105 disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? <FaSpinner className="animate-spin text-sm" /> : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mt-10">
          <a
            href="www.linkedin.com/in/aura-marsha-azzila"
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
