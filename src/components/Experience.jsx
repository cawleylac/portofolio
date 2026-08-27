import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BsAwardFill,
  BsFileEarmarkPdf,
  BsEye,
  BsCalendarEvent,
  BsMortarboardFill,
  BsShieldLockFill,
  BsCloudCheckFill,
  BsCpuFill,
  BsArrowUpRight,
  BsDownload,
} from 'react-icons/bs';
import { IoCloseOutline, IoSparklesOutline } from 'react-icons/io5';
import { experienceData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const getCategoryIcon = (step) => {
  switch (step) {
    case '01':
      return BsShieldLockFill;
    case '02':
      return BsCpuFill;
    case '03':
      return BsCloudCheckFill;
    case '04':
      return BsMortarboardFill;
    default:
      return BsAwardFill;
  }
};

const minionAssets = {
  '01': {
    src: '/minion-sertif/minion-sertif-1.png',
    alt: 'Minion Bob Sitting',
    className: 'w-48 sm:w-56 lg:w-64 animate-float',
    hasShadow: true,
  },
  '02': {
    src: '/minion-sertif/minion-sertif-2.png',
    alt: 'Minion Dancing with Tongue Out',
    className: 'w-48 sm:w-56 lg:w-64 hover:rotate-3 transition-transform duration-300',
    hasShadow: true,
  },
  '03': {
    src: '/minion-sertif/minion-sertif-3.png',
    alt: 'Minion Flying with Blue Balloons',
    className: 'w-70 sm:w-78 lg:w-94 xl:w-96 animate-float',
    hasShadow: false,
  },
};

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const minionsRef = useRef([]);
  const pathRef = useRef(null);
  const doodleRef = useRef(null);

  const [activeModal, setActiveModal] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
      }
    };
    if (activeModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal]);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // Animate Section Header
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 }
        );
      }

      // Animate Cards Staggered
      const validCards = cardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        tl.fromTo(
          validCards,
          { y: 60, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.2, duration: 0.8 },
          '-=0.4'
        );
      }

      // Animate Minion Characters
      const validMinions = minionsRef.current.filter(Boolean);
      if (validMinions.length > 0) {
        tl.fromTo(
          validMinions,
          { scale: 0.7, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'back.out(1.5)' },
          '-=0.6'
        );
      }

      // Animate decorative handwritten doodle note
      if (doodleRef.current) {
        tl.fromTo(
          doodleRef.current,
          { scale: 0, opacity: 0, rotate: -15 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.7)' },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-20 lg:py-28 bg-[#FAFAFA] overflow-hidden"
    >
      {/* Background Subtle Grid & Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-[#FFDD00]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-24 w-96 h-96 bg-[#144272]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-left max-w-3xl mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 border border-[#144272]/20 rounded px-4 py-1.5 bg-white shadow-2xs mb-4">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#144272]">
              EXPERIENCE &amp; CREDENTIALS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight uppercase leading-tight mb-4">
            PROVEN TRACK RECORD &amp; <br />
            <span className="text-[#144272]">CERTIFICATIONS</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-2xl">
            A chronological timeline of hands-on software development, competitive achievements in cybersecurity, and official certifications earned through rigorous training.
          </p>
        </div>

        {/* Pathway Container: Desktop Zigzag with SVG connector & Mobile Timeline */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Desktop SVG Connecting Dashed Curve */}
          <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 1200"
              fill="none"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="expCurveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#144272" stopOpacity="0.4" />
                  <stop offset="50%" stopColor="#FFC107" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#144272" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              {/* Zigzag curved dashed path connecting Card 01 -> Card 02 -> Card 03 -> Card 04 */}
              <path
                ref={pathRef}
                d="M 750 140 C 600 220, 250 240, 250 430 C 250 620, 750 640, 750 800 C 750 960, 250 980, 250 1120"
                stroke="url(#expCurveGrad)"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Cards & Minions Rows */}
          <div className="flex flex-col gap-14 lg:gap-20 relative z-10">
            {experienceData.map((item, index) => {
              const IconComponent = getCategoryIcon(item.step);
              const isEven = index % 2 === 1; // 01 is right (false), 02 is left (true), 03 is right (false), 04 is left (true)
              const minion = minionAssets[item.step];

              // Visual rotation tilts matching reference style
              const rotationClass =
                item.step === '01'
                  ? 'lg:rotate-2 lg:hover:rotate-0'
                  : item.step === '02'
                    ? 'lg:-rotate-2 lg:hover:rotate-0'
                    : item.step === '03'
                      ? 'lg:rotate-1.5 lg:hover:rotate-0'
                      : 'lg:-rotate-1.5 lg:hover:rotate-0';

              return (
                <div
                  key={item.step}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
                >
                  {/* Left Column */}
                  {!isEven ? (
                    /* Odd Step (01, 03): Minion on the Left */
                    <div
                      ref={(el) => (minionsRef.current[index] = el)}
                      className="hidden lg:flex lg:col-span-5 items-center justify-center p-4"
                    >
                      {minion && (
                        <div className="relative group/minion transition-transform duration-500 hover:scale-105 flex flex-col items-center">
                          <img
                            src={minion.src}
                            alt={minion.alt}
                            className={`${minion.className} h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] select-none pointer-events-none`}
                          />
                          {minion.hasShadow && (
                            <div className="w-52 sm:w-60 lg:w-72 h-5 bg-black/15 rounded-full mx-auto blur-md -mt-4" />
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Even Step (02, 04): Card on the Left */
                    <div
                      ref={(el) => (cardsRef.current[index] = el)}
                      className="w-full lg:col-span-7 transition-all duration-300"
                    >
                      <PinnedCard
                        item={item}
                        IconComponent={IconComponent}
                        rotationClass={rotationClass}
                        onOpenModal={() => setActiveModal(item)}
                      />
                    </div>
                  )}

                  {/* Right Column */}
                  {!isEven ? (
                    /* Odd Step (01, 03): Card on the Right */
                    <div
                      ref={(el) => (cardsRef.current[index] = el)}
                      className="w-full lg:col-span-7 transition-all duration-300"
                    >
                      <PinnedCard
                        item={item}
                        IconComponent={IconComponent}
                        rotationClass={rotationClass}
                        onOpenModal={() => setActiveModal(item)}
                      />
                    </div>
                  ) : (
                    /* Even Step (02, 04): Minion or Doodle on the Right */
                    <div
                      ref={(el) => (minionsRef.current[index] = el)}
                      className="hidden lg:flex lg:col-span-5 items-center justify-center p-4"
                    >
                      {minion ? (
                        <div className="relative group/minion transition-transform duration-500 hover:scale-105 flex flex-col items-center">
                          <img
                            src={minion.src}
                            alt={minion.alt}
                            className={`${minion.className} h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)] select-none pointer-events-none`}
                          />
                          {minion.hasShadow && (
                            <div className="w-52 sm:w-60 lg:w-72 h-5 bg-black/15 rounded-full mx-auto blur-md -mt-4" />
                          )}
                        </div>
                      ) : (
                        /* Doodle Note on Step 04 */
                        <div
                          ref={doodleRef}
                          className="flex items-center gap-3 text-[#144272] select-none p-4"
                        >
                          <div className="w-12 h-12 border-b-2 border-r-2 border-dashed border-[#144272] rounded-br-2xl transform -rotate-12" />
                          <span className="font-sans italic font-black text-sm tracking-wide bg-[#FFDE17] text-[#1E293B] px-4 py-2 rounded-full shadow-md">
                            Ready for the next opportunity! 🚀
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Viewer Lightbox Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-900/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-200 relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#FAFAFA] border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFDE17] flex items-center justify-center text-[#144272] font-black text-base shadow-xs">
                  <BsAwardFill />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-black text-[#1E293B] leading-tight">
                    {activeModal.title}
                  </h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {activeModal.organization} • {activeModal.period}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setActiveModal(null)}
                className="w-9 h-9 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup pratinjau sertifikat"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            {/* Modal Preview Area */}
            <div className="p-4 sm:p-6 bg-slate-100 flex-1 overflow-y-auto flex items-center justify-center min-h-[350px] max-h-[68vh]">
              {activeModal.certificateType === 'image' ? (
                <img
                  src={activeModal.certificateFile}
                  alt={activeModal.title}
                  className="max-h-[62vh] w-auto max-w-full rounded-xl shadow-lg object-contain border border-gray-200"
                />
              ) : (
                <iframe
                  src={`${activeModal.certificateFile}#view=FitH`}
                  title={activeModal.title}
                  className="w-full h-[62vh] rounded-xl border border-gray-300 shadow-sm bg-white"
                />
              )}
            </div>

            {/* Modal Footer */}
            {/* <div className="px-6 py-4 bg-white border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <div className="text-xs text-gray-500 font-mono">
                Credential No: <span className="font-bold text-gray-700">{activeModal.credentialId}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeModal.certificateFile}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  <BsDownload className="text-xs" />
                  <span>Unduh File</span>
                </a>
                <a
                  href={activeModal.certificateFile}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#144272] hover:bg-[#0D2D52] text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  <span>Buka di Tab Baru</span>
                  <BsArrowUpRight className="text-xs" />
                </a>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </section>
  );
}

function PinnedCard({ item, IconComponent, rotationClass, onOpenModal }) {
  return (
    <div
      className={`group bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(20,66,114,0.12)] border-2 border-gray-100/90 relative transition-all duration-300 ${rotationClass}`}
    >
      {/* Metallic Pin / Grommet at Top Center */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 border-2 border-white shadow-[0_4px_10px_rgba(0,0,0,0.25),inset_0_1px_3px_rgba(255,255,255,0.8)] flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0F172A] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]" />
        </div>
      </div>

      {/* Card Header: Step & Category Badge */}
      <div className="flex items-center justify-between gap-3 mb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl sm:text-3xl font-black text-gray-300 group-hover:text-[#144272] transition-colors font-mono">
            {item.step}
          </span>
          <div className="h-4 w-[1.5px] bg-gray-200" />
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#144272] bg-blue-50/80 border border-blue-100 px-3 py-1 rounded flex items-center gap-1.5">
            <IconComponent className="text-xs text-[#FFC107]" />
            {item.badge}
          </span>
        </div>

        {/* Date / Period */}
        <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
          <BsCalendarEvent className="text-[11px] text-gray-400" />
          <span>{item.period}</span>
        </div>
      </div>

      {/* Inset Memo Content Box */}
      <div className="bg-[#F8FAFC]/90 rounded-[20px] sm:rounded-[24px] p-5 sm:p-6 border border-gray-200/70 group-hover:border-[#FFDE17]/80 group-hover:bg-[#FCFDFE] transition-all">
        {/* Title & Organization */}
        <h3 className="text-lg sm:text-xl font-black text-[#1E293B] group-hover:text-[#144272] transition-colors mb-1">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-[#144272] mb-3.5">
          {item.organization}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 font-normal">
          {item.description}
        </p>

        {/* Tags / Skills */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[10px] sm:text-[11px] font-bold rounded-lg bg-white text-gray-700 border border-gray-200/80 shadow-2xs group-hover:border-[#FFDE17] transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Certificate Action or Credential Status */}
        {item.certificateFile ? (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-200/60">

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#144272] hover:bg-[#0D2D52] text-white text-xs font-bold rounded-xl shadow-xs transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                <BsEye className="text-xs" />
                <span>Lihat Sertifikat</span>
              </button>
              {/* <a
                href={item.certificateFile}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-white hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold transition-all shadow-2xs hover:scale-105 cursor-pointer"
                title="Buka File"
                aria-label="Buka sertifikat di tab baru"
              >
                <BsArrowUpRight className="text-xs" />
              </a> */}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 text-xs text-gray-500 font-medium">
            <span className="inline-flex items-center gap-1 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Status: Aktif Belajar &amp; Berkarya
            </span>
            <span className="text-[11px] font-mono text-gray-400">
              SMK Plus Pelita Nusantara
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
