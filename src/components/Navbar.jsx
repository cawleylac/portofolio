import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#connect' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const linksRef = useRef([]);
  const tlRef = useRef(null);

  // Detect scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize GSAP animation for fullscreen menu
  useEffect(() => {
    const menuEl = menuRef.current;
    const items = linksRef.current.filter(Boolean);

    tlRef.current = gsap.timeline({ paused: true });
    tlRef.current
      .set(menuEl, { display: 'flex' })
      .fromTo(
        menuEl,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      .fromTo(
        items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.04, duration: 0.4, ease: 'power3.out' },
        '-=0.15'
      );

    return () => tlRef.current?.kill();
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tlRef.current?.reverse();
      document.body.style.overflow = 'auto';
    } else {
      tlRef.current?.play();
      document.body.style.overflow = 'hidden';
    }
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (href) => {
    if (isOpen) {
      tlRef.current?.reverse().eventCallback('onReverseComplete', () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
        scrollToSection(href);
      });
    } else {
      scrollToSection(href);
    }
  };

  const scrollToSection = (href) => {
    if (!href || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Dynamic Header Wrapper */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 pointer-events-none ${scrolled ? 'top-2.5 sm:top-4 px-3 sm:px-6 md:px-8' : 'top-0 px-4 py-3 sm:px-8 sm:py-5 md:px-12'
          }`}
      >
        {/* Floating Capsule / Pill Nav Container */}
        <div
          className={`pointer-events-auto mx-auto flex items-center justify-between transition-all duration-500 ${scrolled
            ? 'max-w-4xl lg:max-w-5xl bg-white/95 backdrop-blur-xl rounded-full px-4 sm:px-6 md:px-7 py-2 sm:py-2.5 md:py-3 shadow-[0_12px_40px_rgba(0,0,0,0.08)] border border-gray-200/80'
            : 'w-full max-w-7xl bg-transparent border-transparent py-0'
            }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('#');
            }}
            className="flex items-center gap-1.5 sm:gap-2 group cursor-pointer max-w-[75%] sm:max-w-none"
          >
            {scrolled ? (
              <span className="text-sm sm:text-base md:text-lg font-black tracking-tight text-[#1E293B] truncate">
                Aura Marsha<span className="text-[#FFC107]">Azzila</span>
              </span>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                <span className="text-base sm:text-xl md:text-2xl font-black tracking-tighter text-black">
                  Aura Marsha Azzila
                  <span className="text-[#FFC107]">.</span>
                </span>
                <span className="inline-block text-[7.5px] sm:text-[9px] uppercase tracking-[0.15em] sm:tracking-[0.3em] font-black text-black bg-[#FFDE17] px-1.5 sm:px-2 py-0.5 rounded-[4px] transform -translate-y-[1px]">
                  PORTFOLIO
                </span>
              </div>
            )}
          </a>

          {/* Center Navigation Links (Desktop Capsule Mode) */}
          <nav
            className={`hidden md:flex items-center gap-6 lg:gap-8 transition-all duration-500 ${scrolled
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 pointer-events-none -translate-y-2'
              }`}
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.href);
                }}
                className="text-xs lg:text-sm font-semibold text-gray-600 hover:text-black transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Scrolled Pill CTA button */}
            <a
              href="#connect"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#connect');
              }}
              className={`hidden sm:inline-flex items-center justify-center font-bold text-xs px-4 sm:px-5 py-1.5 sm:py-2 rounded-full transition-all duration-300 shadow-xs cursor-pointer ${scrolled
                ? 'bg-[#FFDE17] hover:bg-[#FED136] text-[#1E293B] hover:scale-105'
                : 'hidden'
                }`}
            >
              Contact Me
            </a>

            {/* Morphing Hamburger Menu (Always accessible for fullscreen overlay or mobile) */}
            <button
              onClick={toggleMenu}
              className={`relative z-[60] flex flex-col justify-center items-end gap-[4.5px] sm:gap-[5px] w-9 h-9 sm:w-10 sm:h-10 group cursor-pointer focus:outline-hidden p-1 ${scrolled ? 'md:hidden' : 'flex'
                }`}
              aria-label="Toggle navigation menu"
            >
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${isOpen
                  ? 'w-6 bg-[#144272] rotate-45 translate-y-[6.5px]'
                  : 'w-6 bg-black'
                  }`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${isOpen ? 'w-0 opacity-0' : 'w-3.5 group-hover:w-6 bg-black'
                  }`}
              />
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${isOpen
                  ? 'w-6 bg-[#144272] -rotate-45 -translate-y-[6.5px]'
                  : 'w-6 bg-black'
                  }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu (Responsive for Mobile & Desktop) */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 hidden flex-col bg-white/98 backdrop-blur-2xl px-5 sm:px-10 md:px-20 lg:px-36 pt-20 sm:pt-24 pb-8 sm:pb-10 overflow-y-auto overflow-x-hidden"
      >
        {/* Top subtle accent gradient */}
        <div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FFDE17] to-transparent opacity-70 z-50 pointer-events-none" />

        <div className="max-w-5xl w-full mx-auto my-auto flex flex-col justify-between min-h-full">
          <div>
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-zinc-400 mb-3 sm:mb-6 md:mb-8">
              01 — NAVIGATION
            </p>

            <nav className="flex flex-col">
              {navItems.map((item, index) => (
                <div key={item.label} className="group/item overflow-hidden">
                  <div className="h-[1px] w-full bg-black/5" />
                  <button
                    ref={(el) => (linksRef.current[index] = el)}
                    onClick={() => handleLinkClick(item.href)}
                    className="flex items-center justify-between w-full py-2.5 sm:py-3.5 md:py-5 lg:py-6 text-left group cursor-pointer"
                  >
                    <span className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter text-black group-hover:text-[#144272] group-hover:translate-x-2 sm:group-hover:translate-x-4 transition-all duration-300">
                      {item.label}
                    </span>
                    <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-black/30 group-hover:text-[#144272] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 font-light">
                      ↗
                    </span>
                  </button>
                </div>
              ))}
              <div className="h-[1px] w-full bg-black/5" />
            </nav>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 sm:gap-6 md:gap-8 mt-6 sm:mt-8 pt-4 border-t border-black/5">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aura-marsha-azzila/' },
              { label: 'GitHub', href: 'https://github.com/cawleylac' },
              { label: 'Email', href: 'mailto:m4rshazzila4ura@gmail.com' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] sm:text-xs md:text-sm font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-zinc-400 hover:text-[#144272] transition-colors"
              >
                {social.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}