import { useState } from 'react';
import { useScrollReveal } from '../hooks/useGSAP';
import { FaGithub, FaInstagram, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { sanitize } from '../utils/sanitize';

export default function Contact() {
  const formRef = useScrollReveal({ y: 60 });
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
    <section id="contact" className="py-20 lg:py-28 bg-blue-950">
      <div className="max-w-3xl mx-auto px-6">
        <div className="flex justify-center gap-4 mb-10">
          <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors" aria-label="GitHub">
            <FaGithub className="text-lg" />
          </a>
          <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors" aria-label="Instagram">
            <FaInstagram className="text-lg" />
          </a>
        </div>

        <div ref={formRef} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 lg:p-10">
          <p className="text-yellow-400 text-sm font-semibold tracking-wider mb-2">SEND A MESSAGE</p>
          <h2 className="text-3xl lg:text-4xl font-black text-white mb-8 leading-tight">WE&apos;D LOVE<br />TO HEAR FROM YOU</h2>

          {sent ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center text-white">
              <div className="w-14 h-14 bg-yellow-400/20 text-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <FaCheckCircle className="text-3xl" />
              </div>
              <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
              <p className="text-gray-300 text-sm mb-6">Thank you! Your message has been sent directly to the spreadsheet.</p>
              <button type="button" onClick={() => setSent(false)} className="px-6 py-2.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-sm rounded-full shadow transition-all hover:scale-105">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="text" name="hp_website" className="hidden" tabIndex={-1} autoComplete="off" />

              {error && <p className="text-xs font-semibold text-red-300 bg-red-500/20 p-3 rounded-lg border border-red-500/30">{error}</p>}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Email Address <span className="text-yellow-400">*</span></label>
                  <input type="email" name="email" required maxLength={100} placeholder="budi@email.com" disabled={loading} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors disabled:opacity-60" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">Subject <span className="text-yellow-400">*</span></label>
                  <select name="subject" required disabled={loading} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors cursor-pointer disabled:opacity-60">
                    <option value="" className="bg-blue-950">Select a topic...</option>
                    <option value="Collaboration" className="bg-blue-950">Collaboration</option>
                    <option value="Hiring" className="bg-blue-950">Hiring</option>
                    <option value="Freelance" className="bg-blue-950">Freelance</option>
                    <option value="Other" className="bg-blue-950">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-white mb-2">Your Message <span className="text-yellow-400">*</span></label>
                <textarea name="message" required minLength={5} maxLength={2000} rows={5} disabled={loading} placeholder="Tell us how we can help you..." className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-colors resize-none disabled:opacity-60" />
              </div>

              <button type="submit" disabled={loading} className="px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-full hover:bg-yellow-300 transition-all hover:scale-105 shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer">
                {loading ? <FaSpinner className="animate-spin text-sm" /> : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
