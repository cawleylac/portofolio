import { useState } from 'react';
import { footerLinks } from '../data/content';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import CircularText from './CircularText';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Subscribed to BananaLabs! (Demo)');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#05182C] text-gray-400 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14 max-w-6xl mx-auto">
          {/* Projects */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-widest mb-4">
              PROJECTS
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.projects.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-[#FFDE17] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-bold text-white tracking-widest mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-400 hover:text-[#FFDE17] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter — spans 2 cols on lg */}
          <div className="sm:col-span-2">
            <h4 className="text-xs font-bold text-white tracking-widest mb-3">
              NEWSLETTER SIGNUP
            </h4>
            <form
              onSubmit={handleSubscribe}
              className="bg-white rounded-full p-1 sm:p-1.5 flex items-center shadow-inner w-full max-w-md mb-3"
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="bg-transparent px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-800 placeholder-gray-400 min-w-0 flex-1 outline-none"
              />
              <button
                type="submit"
                className="bg-[#FFDE17] hover:bg-[#FED136] text-[#1E293B] font-bold text-[11px] sm:text-xs uppercase px-4 sm:px-6 py-2 sm:py-2.5 rounded-full transition-all duration-200 flex-shrink-0 whitespace-nowrap cursor-pointer shadow-xs"
              >
                SUBSCRIBE
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              <a
                href="www.linkedin.com/in/aura-marsha-azzila"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
              <a
                href="https://github.com/cawleylac"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-white/30 hover:border-white bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
                aria-label="GitHub"
              >
                <FaGithub className="text-base" />
              </a>
            </div>
          </div>
        </div>

        {/* Center / Bottom Hero Branding */}
        <div className="flex flex-col items-center justify-center pt-8 border-t border-white/5">
          {/* React Bits Circular Text Seal */}
          <div className="mb-6 flex items-center justify-center">
            <CircularText
              text="AURA MARSHA AZZILA • SOFTWARE ENGINEERING • BANANALABS • "
              spinDuration={18}
              onHover="speedUp"
              className="w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_0_25px_rgba(255,222,23,0.35)]"
            />
          </div>

          {/* Large AURA ACA text */}
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-wider sm:tracking-widest text-center uppercase leading-none select-none break-words max-w-full">
            THANK YOU!
          </h2>
        </div>
      </div>
    </footer>
  );
}