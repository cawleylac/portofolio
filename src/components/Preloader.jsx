import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const words = [
  'Hello',
  'Bonjour',
  'Ciao',
  'Olà',
  'やあ',
  'Hallå',
  'Guten Tag',
  'Halo',
  'Bello!',
];

export default function Preloader({ onComplete }) {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {

    const handleResize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Words cycling effect - fast & snappy
  useEffect(() => {
    if (index === words.length - 1) return;

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, index === 0 ? 800 : 160);

    return () => clearTimeout(timeout);
  }, [index]);

  // Exit animation once words reach the end
  useEffect(() => {
    if (index < words.length - 1 || dimension.width === 0) return;

    const timeout = setTimeout(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // 1. Fade out the text quickly
      tl.to(textRef.current, {
        opacity: 0,
        y: -25,
        duration: 0.25,
        ease: 'power2.in',
      });

      // 2. Animate SVG curved path (curving down as it slides up)
      const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 350} 0 ${dimension.height} L0 0`;
      const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0 L0 0`;

      tl.to(
        pathRef.current,
        {
          attr: { d: initialPath },
          duration: 0.25,
          ease: 'power2.in',
        },
        '-=0.08'
      )
        .to(
          pathRef.current,
          {
            attr: { d: targetPath },
            duration: 0.55,
            ease: 'power4.inOut',
          }
        )
        // 3. Slide container up swiftly
        .to(
          containerRef.current,
          {
            y: '-100%',
            duration: 0.55,
            ease: 'power4.inOut',
          },
          '-=0.55'
        );
    }, 150);

    return () => clearTimeout(timeout);
  }, [index, dimension, onComplete]);

  // Initial SVG flat path
  const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height} L0 0`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center cursor-wait select-none overflow-hidden"
      style={{ height: '100vh', width: '100vw' }}
    >
      {/* Background SVG for liquid curved exit */}
      {dimension.width > 0 && (
        <svg className="absolute top-0 left-0 w-full h-[calc(100%+350px)] pointer-events-none fill-[#141516]">
          <path ref={pathRef} d={initialPath} />
        </svg>
      )}

      {/* Centered Word Transition */}
      <div
        ref={textRef}
        className="relative z-10 flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
      >
        <span>{words[index]}</span>
      </div>
    </div>
  );
}
