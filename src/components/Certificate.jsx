import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  BsAwardFill,
  BsEye,
  BsCheckCircleFill,
  BsShieldCheck,
  BsCodeSlash,
  BsCloudCheckFill,
  BsCpuFill,
  BsArrowUpRight,
  BsFilter,
} from 'react-icons/bs';
import { IoCloseOutline, IoSparkles } from 'react-icons/io5';
import { certificatesData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  'All',
  'Cyber Security',
  'Game Development',
  'Artificial Intelligence',
  'Cloud Computing',
];

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Cyber Security':
      return BsShieldCheck;
    case 'Game Development':
      return BsCodeSlash;
    case 'Artificial Intelligence':
      return BsCpuFill;
    case 'Cloud Computing':
      return BsCloudCheckFill;
    default:
      return BsAwardFill;
  }
};

export default function Certificates() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalCert, setActiveModalCert] = useState(null);

  const filteredCertificates =
    selectedCategory === 'All'
      ? certificatesData
      : certificatesData.filter((c) => c.category === selectedCategory);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveModalCert(null);
    };
    if (activeModalCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalCert]);

  // Entrance GSAP Animation
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

      if (headerRef.current) {
        tl.fromTo(
          headerRef.current.children,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 }
        );
      }

      if (gridRef.current) {
        tl.fromTo(
          gridRef.current.children,
          { y: 40, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6 },
          '-=0.3'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-20 lg:py-28 bg-[#FAFAFA] overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-[#FFDD00]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-[#144272]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 w-full relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 border border-[#144272]/20 rounded px-4 py-1.5 bg-white shadow-2xs mb-4">
            {/* <IoSparkles className="text-xs text-[#FFC107]" /> */}
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#144272]">
              OFFICIAL CREDENTIALS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1E293B] tracking-tight uppercase mb-4">
            MY <span className="text-[#144272]">CERTIFICATES</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Verified certifications, national competition awards, and technical training credentials earned in software engineering and cybersecurity.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${selectedCategory === cat
                  ? 'bg-[#144272] text-white shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:text-[#144272] hover:bg-gray-100 border border-gray-200/80 shadow-2xs'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificates Showcase Grid (Direct Image Display) */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
        >
          {filteredCertificates.map((cert) => {
            const Icon = getCategoryIcon(cert.category);
            return (
              <div
                key={cert.id}
                onClick={() => setActiveModalCert(cert)}
                className="group bg-white rounded-[24px] sm:rounded-[28px] border border-gray-100 p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(20,66,114,0.14)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Certificate Image Frame */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-900 border border-gray-200 shadow-inner group-hover:border-[#FFDE17] transition-all duration-300">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E293B] bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/80 flex items-center gap-1">
                      <Icon className="text-[11px] text-[#FFC107]" />
                      <span>{cert.badge}</span>
                    </span>
                  </div>

                  {/* Year Tag */}
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="text-[10px] font-mono font-bold text-white bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                      {cert.date}
                    </span>
                  </div>

                  {/* Hover Inspect Overlay */}
                  <div className="absolute inset-0 bg-[#05182C]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <span className="px-4 py-2 bg-[#FFDE17] text-[#1E293B] font-bold text-xs rounded-full shadow-lg flex items-center gap-1.5 transform scale-90 group-hover:scale-100 transition-transform">
                      <BsEye className="text-sm" />
                      <span>Lihat Sertifikat</span>
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="mt-4 text-left flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-[#1E293B] group-hover:text-[#144272] transition-colors leading-snug mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-semibold text-[#144272] mb-2.5 flex items-center gap-1">
                      <span>{cert.issuer}</span>
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                      {cert.description}
                    </p>
                  </div>

                  {/* Skills Pills & Action */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-50 text-gray-600 border border-gray-200/60"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>

                    <button
                      className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#144272] text-gray-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs flex-shrink-0"
                      aria-label="Lihat Detail Sertifikat"
                    >
                      <BsArrowUpRight className="text-xs font-bold" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal for Certificate Preview */}
      {activeModalCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-slate-900/80 backdrop-blur-md transition-opacity duration-300 animate-fadeIn"
          onClick={() => setActiveModalCert(null)}
        >
          <div
            className="bg-white rounded-[24px] sm:rounded-[36px] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-200 relative animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#FAFAFA] border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-[#FFDE17] flex items-center justify-center text-[#144272] font-black text-base shadow-xs flex-shrink-0">
                  <BsAwardFill />
                </div>
                <div>
                  <h4 className="text-sm sm:text-lg font-black text-[#1E293B] leading-tight">
                    {activeModalCert.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
                    {activeModalCert.issuer} • {activeModalCert.date}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveModalCert(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                aria-label="Tutup pratinjau sertifikat"
              >
                <IoCloseOutline className="text-2xl" />
              </button>
            </div>

            {/* Modal Image Area */}
            <div className="p-3 sm:p-6 bg-slate-100 flex-1 overflow-y-auto flex items-center justify-center min-h-[260px] max-h-[68vh]">
              <img
                src={activeModalCert.image}
                alt={activeModalCert.title}
                className="max-h-[60vh] w-auto max-w-full rounded-xl shadow-lg object-contain border border-gray-200"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="px-4 sm:px-6 py-3 bg-white border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <BsCheckCircleFill className="text-[#FFC107]" />
                <span className="font-semibold">{activeModalCert.category}</span>
              </div>
              <a
                href={activeModalCert.image}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#144272] hover:bg-[#0D2D52] text-white text-xs font-bold rounded-xl shadow-xs transition-all duration-200"
              >
                <span>Buka Gambar Penuh</span>
                <BsArrowUpRight className="text-xs" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}