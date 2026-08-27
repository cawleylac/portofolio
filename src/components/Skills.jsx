import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiJavascript,
  SiReact,
  SiVuedotjs,
  SiHtml5,
  SiTailwindcss,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiFigma,
  SiTypescript,
  SiExpo,
} from 'react-icons/si';
import { IoFlashOutline } from 'react-icons/io5';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: 'FRONTEND',
    avatar: '/skill3.png',
    avatarBg: 'bg-[#0B4F9C]',
    borderColor: 'border-[#1D4ED8]',
    rows: [
      [
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'React', icon: SiReact, color: '#61DAFB' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'Vue.js', icon: SiVuedotjs, color: '#4FC08D' },
      ],
      [
        { name: 'HTML/CSS', icon: SiHtml5, color: '#E34F26' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
      ],
    ],
  },
  {
    category: 'BACKEND',
    avatar: '/skill2.png',
    avatarBg: 'bg-[#C53030]',
    borderColor: 'border-[#E11D48]',
    rows: [
      [
        { name: 'Python', icon: SiPython, color: '#3776AB' },
        { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
        { name: 'Express', icon: SiExpress, color: '#000000' },
      ],
      [
        { name: 'SQL', icon: SiPostgresql, color: '#4169E1' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      ],
    ],
  },
  {
    category: 'TOOLS',
    avatar: '/skil1.png',
    avatarBg: 'bg-[#16A34A]',
    borderColor: 'border-[#16A34A]',
    rows: [
      [
        { name: 'Docker', icon: SiDocker, color: '#2496ED' },
        { name: 'Expo', icon: SiExpo, color: '#000020' },
        { name: 'Git', icon: SiGit, color: '#F05032' },
        { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
      ],
      [
        { name: 'Agile', icon: IoFlashOutline, color: '#EAB308' },
      ],
    ],
  },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const minionRef = useRef(null);

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

      tl.fromTo(
        headerRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7 }
      )
        .fromTo(
          minionRef.current,
          { scale: 0.8, opacity: 0, y: -20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          cardsRef.current.children,
          { y: 50, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8 },
          '-=0.4'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative bg-[#FFDD00] min-h-screen w-full flex flex-col justify-center pt-24 pb-28 lg:pt-32 lg:pb-36 skills-angled overflow-visible"
    >
      {/* Surprised Minions Trio Illustration on Top-Right (Desktop only) */}
      <div
        ref={minionRef}
        className="hidden lg:block absolute right-4 sm:right-10 lg:right-24 -top-2 sm:top-0 lg:top-2 w-52 sm:w-72 lg:w-80 z-20 pointer-events-none drop-shadow-xl"
      >
        <img
          src="/minion4.png"
          alt="Surprised Minions Trio"
          className="w-full h-auto object-contain select-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full relative z-10">
        {/* Section Heading */}
        <div ref={headerRef} className="text-center mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F3B6C] tracking-wide mb-2.5">
            SKILLS &amp; TOOLS
          </h2>
          <p className="text-[#1E3A5F] text-sm sm:text-base font-semibold">
            My arsenal for world domination (and web development)
          </p>
        </div>

        {/* 3 Skill Cards with Icons inside Badges */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch"
        >
          {skillsData.map((cat) => (
            <div
              key={cat.category}
              className={`bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 text-center shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-[3px] ${cat.borderColor} flex flex-col items-center justify-between`}
            >
              {/* Circular Avatar with Yellow Rim */}
              <div
                className={`w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden flex items-center justify-center p-1.5 shadow-md mb-5 relative border-2 border-yellow-400 ${cat.avatarBg}`}
              >
                <img
                  src={cat.avatar}
                  alt={cat.category}
                  className="w-full h-full object-contain transform scale-110"
                />
              </div>

              {/* Category Title */}
              <h3 className="text-xl sm:text-2xl font-black text-[#0F3B6C] tracking-wider mb-6">
                {cat.category}
              </h3>

              {/* Skills Tags Rows with Brand Icons */}
              <div className="flex flex-col items-center gap-2.5 w-full">
                {cat.rows.map((row, rIdx) => (
                  <div key={rIdx} className="flex flex-wrap justify-center gap-2">
                    {row.map((skill) => {
                      const Icon = skill.icon;
                      return (
                        <div
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] text-gray-800 font-semibold px-3.5 py-1.5 bg-[#F8FAFC] border border-gray-200/90 rounded-full shadow-2xs hover:border-yellow-400 hover:scale-105 transition-all cursor-default group/pill"
                        >
                          <Icon
                            className="text-sm transition-transform group-hover/pill:scale-115 flex-shrink-0"
                            style={{ color: skill.color }}
                          />
                          <span>{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




