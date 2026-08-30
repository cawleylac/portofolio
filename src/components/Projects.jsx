import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BsArrowUpRight, BsCodeSlash, BsLaptop } from 'react-icons/bs';
import { projectsData } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

function ProjectPreview({ project }) {
  return (
    <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-100 group-hover:border-[#FFDE17] transition-all duration-300 shadow-inner">
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Top Overlay Badge */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/60">
          {project.badge || 'Project'}
        </span>
      </div>
      {/* Ambient Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <div className="project-card group bg-white rounded-[32px] sm:rounded-[36px] border border-gray-100 p-6 shadow-[0_12px_36px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_50px_rgba(20,66,114,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* Top Preview Image */}
      <ProjectPreview project={project} />

      {/* Content Body */}
      <div className="mt-6 text-left flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <h3 className="text-xl sm:text-2xl font-black text-[#1E293B] group-hover:text-[#144272] transition-colors">
              {project.title}
            </h3>
            <a
              href={project.githubUrl || 'https://github.com/cawleylac'}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-[#144272] text-gray-400 group-hover:text-white flex items-center justify-center transition-all duration-300 shadow-2xs"
            >
              <BsArrowUpRight className="text-sm font-bold" />
            </a>
          </div>
          <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed mb-6 font-normal">
            {project.description}
          </p>
        </div>

        <div>
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11px] sm:text-xs font-bold rounded-full bg-[#FAFAFA] text-[#1E293B] border border-gray-200/80 group-hover:border-[#FFDE17] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Button */}
          <div className="grid grid-cols-1">
            {/* <a
              href={project.liveUrl || '#connect'}
              className="py-3 px-4 rounded-xl sm:rounded-2xl bg-[#144272] text-white hover:bg-[#0D2D52] font-bold text-xs text-center shadow-xs transition-all flex items-center justify-center gap-1.5"
            >
              <BsLaptop className="text-sm" />
              <span>Live Demo</span>
            </a> */}
            <a
              href={project.githubUrl || 'https://github.com/cawleylac'}
              target="_blank"
              rel="noreferrer"
              className="py-3 px-4 rounded-xl sm:rounded-2xl bg-gray-50 hover:bg-gray-100 text-[#1E293B] font-bold text-xs text-center border border-gray-200 transition-all flex items-center justify-center gap-1.5"
            >
              <BsCodeSlash className="text-sm" />
              <span>Code</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

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
      ).fromTo(
        gridRef.current.children,
        { y: 50, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8 },
        '-=0.4'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center py-20 lg:py-28 bg-[#FAFAFA] overflow-hidden"
    >
      {/* Background Decorative Glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-[#FFDD00]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#144272]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 border border-[#144272]/20 rounded-full px-4 py-1.5 bg-white shadow-2xs mb-4">
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#144272]">
              PORTFOLIO SHOWCASE
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1E293B] tracking-tight uppercase mb-4">
            MY <span className="text-[#144272]">PROJECTS</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
            High-impact software engineering projects, modern web architectures, and scalable applications.
          </p>
        </div>

        {/* Project Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
