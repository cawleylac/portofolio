import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SvgFollowScroll() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const trackRef = useRef(null);
  const headRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  // Define the master SVG path curve winding across all sections
  // Using relative coordinate system (width: 1000, height: 5000)
  const pathData =
    'M 820 200 ' +
    'C 820 600, 180 800, 180 1200 ' +
    'C 180 1600, 850 1800, 850 2200 ' +
    'C 850 2600, 150 2800, 150 3200 ' +
    'C 150 3600, 750 3800, 750 4200 ' +
    'C 750 4600, 500 4800, 500 5000';

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    setPathLength(length);

    // Initial stroke state
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;

    const updateHeadPosition = (progress) => {
      if (!path || !headRef.current) return;
      try {
        const point = path.getPointAtLength(progress * length);
        headRef.current.setAttribute('cx', point.x);
        headRef.current.setAttribute('cy', point.y);
      } catch {
        // fallback
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const drawLength = length * progress;
          path.style.strokeDashoffset = `${length - drawLength}`;
          updateHeadPosition(progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1000 5000"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <defs>
          {/* Glowing Line Gradient */}
          <linearGradient id="skiperLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDE17" stopOpacity="0.9" />
            <stop offset="25%" stopColor="#FFC107" stopOpacity="1" />
            <stop offset="50%" stopColor="#144272" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#FFDE17" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFDE17" stopOpacity="0.9" />
          </linearGradient>

          {/* Filter for glowing line effect */}
          <filter id="skiperGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Tracer Head Glow */}
          <radialGradient id="headGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFDE17" stopOpacity="1" />
            <stop offset="60%" stopColor="#FFC107" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFC107" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint Background Track Line */}
        <path
          ref={trackRef}
          d={pathData}
          fill="none"
          stroke="rgba(20, 66, 114, 0.08)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="8 8"
        />

        {/* Dynamic Glow Layer */}
        <path
          d={pathData}
          fill="none"
          stroke="url(#skiperLineGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#skiperGlow)"
          opacity="0.5"
          style={{
            strokeDasharray: pathLength ? `${pathLength} ${pathLength}` : 'none',
            strokeDashoffset: pathLength,
          }}
        />

        {/* Main Follow Scroll Path */}
        <path
          ref={pathRef}
          d={pathData}
          fill="none"
          stroke="url(#skiperLineGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Glowing Head Tracer Dot */}
        <circle
          ref={headRef}
          cx="820"
          cy="200"
          r="10"
          fill="url(#headGlow)"
          className="transition-opacity duration-300"
        />
        <circle
          cx="820"
          cy="200"
          r="4.5"
          fill="#FFFFFF"
          stroke="#05182C"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
