import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BsArrowUpRight, BsCheckCircleFill } from 'react-icons/bs';
import { aboutData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const collageRef = useRef(null);
  const textRef = useRef(null);
  const statCardRef = useRef(null);
  const ratingCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance reveal timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        collageRef.current.children,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, stagger: 0.15 }
      ).fromTo(
        textRef.current.children,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12 },
        '-=0.6'
      );

      // Subtle floating levitation for stat & rating badges
      gsap.to(statCardRef.current, {
        y: -10,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.to(ratingCardRef.current, {
        y: 8,
        duration: 2.7,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center justify-center py-20 lg:py-28 bg-[#FAFAFA] overflow-visible"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#FFDD00]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#144272]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Photo Collage & Floating Stat Cards */}
          <div
            ref={collageRef}
            className="lg:col-span-6 xl:col-span-7 relative w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[540px] mx-auto min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center mb-10 lg:mb-0"
          >
            {/* Top-Left Main Image Card */}
            <div className="w-44 h-60 sm:w-80 sm:h-96 md:w-96 md:h-[420px] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.08)] bg-gradient-to-br from-[#FFDE17]/20 to-[#FFC107]/30 border-4 border-white relative z-10 -translate-x-12 sm:-translate-x-12 lg:-translate-x-14 -translate-y-4 sm:-translate-y-8 lg:-translate-y-12">
              <img
                src="/poto2.jpeg"
                alt="Workspace & Creative Engineering"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Bottom-Right Secondary Image Card */}
            <div className="w-44 h-60 sm:w-80 sm:h-[400px] md:w-96 md:h-[460px] rounded-[24px] sm:rounded-[36px] overflow-hidden shadow-[0_25px_50px_rgba(20,66,114,0.12)] bg-gradient-to-br from-[#144272]/10 to-[#144272]/20 border-4 border-white absolute right-1 sm:right-4 lg:right-6 bottom-0 sm:bottom-4 lg:-bottom-20 z-20">
              <img
                src={aboutData.profileImage || '/poto1.jpeg'}
                alt="Software Engineer"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Top-Right Stat Card */}
            <div
              ref={statCardRef}
              className="absolute -top-3 right-1 sm:right-4 z-30 bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-[0_15px_35px_rgba(0,0,0,0.09)] border border-gray-100 max-w-[155px] sm:max-w-[220px]"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-base sm:text-2xl font-black text-[#1E293B] tracking-tight">
                  Semangat!
                </span>
              </div>
              <p className="text-[9px] sm:text-[11px] text-gray-500 font-medium leading-tight mb-2 sm:mb-3">
                Software engineering is a detailed study of engineering to the design, development, deployment, and maintenance of software application
              </p>

              <div className="h-[1px] bg-gray-100 w-full my-1.5 sm:my-2" />
            </div>

          </div>

          {/* Right Column: Editorial Typography & Story */}
          <div ref={textRef} className="lg:col-span-6 xl:col-span-5 text-left">
            {/* Category Tag */}
            <p className="text-xs sm:text-sm font-extrabold tracking-[0.3em] uppercase text-[#144272] mb-3 sm:mb-4 flex items-center gap-2">
              A BIT
            </p>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1E293B] uppercase mb-5 sm:mb-8 leading-tight">
              ABOUT <span className="text-[#144272]">ME</span>
            </h2>

            {/* Editorial Paragraph */}
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8 max-w-lg font-normal">
              {aboutData.description ||
                'Passionate Software Engineer dedicated to crafting robust, high-performance web applications and creative digital experiences. Combining technical precision with intuitive frontend craftsmanship to deliver seamless, scalable solutions.'}
            </p>

            {/* Key Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-8 sm:mb-10 max-w-lg">
              {[
                'Web Development',
                'UI/UX Interaction Design',
                'Microsoft Office',
                'Cyber Security (Basic)',
              ].map((highlight) => (
                <div key={highlight} className="flex items-center gap-2.5">
                  <BsCheckCircleFill className="text-[#FFC107] text-sm flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button matching the mockup */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-2 px-8 sm:px-9 py-3.5 sm:py-4 bg-[#144272] hover:bg-[#0D2D52] text-white font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-2xl shadow-[0_12px_30px_rgba(20,66,114,0.3)] transition-all duration-300 hover:scale-105 hover:shadow-[0_16px_36px_rgba(20,66,114,0.4)] cursor-pointer"
            >
              <span>EXPLORE MORE</span>
              <BsArrowUpRight className="text-sm" />
            </a>
          </div>
        </div>
      </div>

      {/* Minion Stack on the Right Side (Hidden on mobile/tablet, shown on desktop) */}
      <div className="hidden lg:block absolute right-4 sm:right-10 lg:right-16 -bottom-16 sm:-bottom-24 lg:-bottom-32 w-52 sm:w-64 lg:w-80 z-20 pointer-events-none drop-shadow-2xl">
        <img
          src="/minion3.png"
          alt="Minion stack team"
          className="w-full h-auto object-contain select-none"
        />
      </div>
    </section>
  );
}



