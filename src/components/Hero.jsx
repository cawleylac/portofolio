import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { heroData } from '../data/content';
import { BsEmojiSmile, BsStarFill } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import ParticleText from './ParticleText';
import TiltedCard from './TiltedCard';

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ isLoading = false }) {
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const cardRef = useRef(null);
  const bottomMinionRef = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    // Keep elements hidden while preloader is covering the screen
    if (isLoading) {
      gsap.set(
        [
          badgeRef.current,
          titleRef.current,
          descRef.current,
          ctaRef.current,
          cardRef.current,
          starRef.current,
          bottomMinionRef.current,
        ],
        { opacity: 0 }
      );
      return;
    }

    // Trigger smooth entrance animation as soon as preloader finishes
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      tl.fromTo(
        badgeRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay: 0.15 }
      )
        .fromTo(
          titleRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          '-=0.6'
        )
        .fromTo(
          descRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          cardRef.current,
          { scale: 0.9, opacity: 0, y: 35 },
          { scale: 1, opacity: 1, y: 0, duration: 1.1 },
          '-=0.8'
        )
        .fromTo(
          starRef.current,
          { scale: 0, opacity: 0, rotate: -25 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.0 },
          '-=0.7'
        )
        .fromTo(
          bottomMinionRef.current,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0 },
          '-=0.7'
        );

      // Re-animate when scrolling down and scrolling back up to top
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        onLeave: () => {
          gsap.to(
            [
              badgeRef.current,
              titleRef.current,
              descRef.current,
              ctaRef.current,
              cardRef.current,
              starRef.current,
              bottomMinionRef.current,
            ],
            { opacity: 0, y: -20, duration: 0.4, stagger: 0.04 }
          );
        },
        onEnterBack: () => {
          gsap.to(
            [
              badgeRef.current,
              titleRef.current,
              descRef.current,
              ctaRef.current,
              cardRef.current,
              starRef.current,
              bottomMinionRef.current,
            ],
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
            }
          );
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isLoading]);


  return (
    <section
      ref={sectionRef}
      className="relative bg-[#FFDD00] min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 z-10">
        {/* Left Content */}
        <div className="flex-1 max-w-xl text-left">
          {/* Badge with sketch arc & React Icon */}
          <div className="relative inline-block mb-4">
            {/* Sketch arc stroke accent */}
            <svg
              className="absolute -top-3.5 -left-2 w-20 h-8 text-[#262626]/40 pointer-events-none"
              viewBox="0 0 100 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d="M 5 35 Q 35 5 95 20" />
            </svg>

            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 border border-[#262626] rounded-full px-4 py-1.5 bg-[#FFDD00] shadow-2xs cursor-default"
            >
              <BsEmojiSmile className="text-sm sm:text-base text-[#262626] stroke-[0.5]" />
              <span className="text-xs sm:text-sm font-bold text-[#262626] tracking-tight">
                {heroData.badge}
              </span>
            </div>
          </div>

          {/* Particle Text Headline */}
          <div ref={titleRef} className="mb-3 -ml-1">
            <ParticleText
              lines={[heroData.titleLine1, heroData.titleLine2]}
              particleColor="#262626"
              particleSize={2.7}
              gridGap={3}
              mouseRadius={90}
              pushStrength={14}
              ease={0.09}
              friction={0.89}
            />
          </div>

          {/* Description */}
          <p
            ref={descRef}
            className="text-base sm:text-lg text-[#333333] max-w-lg mb-6 leading-relaxed font-normal"
          >
            {heroData.description}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4">
            {/* Blue pill button with React Icon dots */}
            <a
              href="#projects"
              className="inline-flex items-center justify-center gap-1.5 px-8 py-3.5 bg-[#144272] text-white font-bold text-sm sm:text-base rounded-full hover:bg-[#0D2D52] transition-all duration-200 shadow-md hover:scale-105"
            >
              <GoDotFill className="text-[10px]" />
              <span>{heroData.ctaPrimary}</span>
              <GoDotFill className="text-[10px]" />
            </a>

            {/* White pill button */}
            <a
              href="#connect"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#144272] font-bold text-sm sm:text-base rounded-full hover:bg-gray-50 transition-all duration-200 shadow-sm hover:scale-105"
            >
              {heroData.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Right — Tilted Card Hero Image with Golden Star */}
        <div className="flex-1 flex justify-center lg:justify-end w-full max-w-lg relative">
          <div
            ref={cardRef}
            className="w-full max-w-[380px] lg:max-w-[420px] aspect-[9/16] relative z-10"
          >
            <TiltedCard
              imageSrc={heroData.heroImage}
              altText="Minions pyramid"
              captionText="Software Engineer"
              containerHeight="100%"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={16}
              scaleOnHover={1.05}
              showTooltip={true}
              displayOverlayContent={false}
            />
          </div>

          {/* Golden Star React Icon to the right of the card */}
          <div
            ref={starRef}
            className="absolute -right-4 sm:-right-8 bottom-4 sm:bottom-8 text-[#F4B400] text-6xl sm:text-7xl lg:text-8xl z-0 drop-shadow-sm select-none pointer-events-none"
          >
            <BsStarFill />
          </div>
        </div>
      </div>

      {/* Bottom Overlapping 3-Minions Stacks across Hero & About boundary (Desktop only) */}
      <div
        ref={bottomMinionRef}
        className="hidden lg:block absolute left-6 sm:left-12 lg:left-20 -mb-20 -bottom-40 sm:-bottom-36 lg:-bottom-40 w-80 sm:w-[28rem] lg:w-80 z-20 pointer-events-none drop-shadow-2xl"
      >
        <img
          src="/minion2.png"
          alt="Minion trio"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}



