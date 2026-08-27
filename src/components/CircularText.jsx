import { useState } from 'react';

export default function CircularText({
  text = "AURA MARSHA AZZILA • SOFTWARE ENGINEER • BANANALABS • ",
  spinDuration = 18,
  onHover = 'speedUp',
  className = '',
  avatar = '/skil1.png',
}) {
  const [isHovered, setIsHovered] = useState(false);

  let currentDuration = spinDuration;
  if (isHovered) {
    if (onHover === 'speedUp') currentDuration = spinDuration / 3.5;
    if (onHover === 'slowDown') currentDuration = spinDuration * 2;
    if (onHover === 'pause') currentDuration = 0;
  }

  const pathId = 'circular-text-path-minion';
  const clipId = 'center-minion-clip';

  return (
    <div
      className={`relative inline-flex items-center justify-center aspect-square rounded-full select-none cursor-pointer transition-transform duration-300 hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes spinCircularText {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .circular-text-spin {
          transform-origin: 100px 100px;
          transform-box: view-box;
          animation-name: spinCircularText;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full aspect-square overflow-visible"
      >
        <defs>
          {/* Circular Text Path */}
          <path
            id={pathId}
            d="M 100, 100 m -62, 0 a 62,62 0 1,1 124,0 a 62,62 0 1,1 -124,0"
          />

          {/* Clip path for center Minion avatar circle */}
          <clipPath id={clipId}>
            <circle cx="100" cy="100" r="30" />
          </clipPath>
        </defs>

        {/* Outer Yellow Perfect Circle Disc */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="#FFDE17"
        />

        {/* Rotating Circular Text Group - WHITE TEXT */}
        <g
          className="circular-text-spin"
          style={{
            animationDuration: `${currentDuration}s`,
            animationPlayState: currentDuration === 0 ? 'paused' : 'running',
          }}
        >
          <text
            fill="#FFFFFF"
            fontSize="14.5"
            fontWeight="900"
            letterSpacing="3.5"
            className="uppercase font-sans drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
          >
            <textPath href={`#${pathId}`} startOffset="0%">
              {text}
            </textPath>
          </text>
        </g>

        {/* Center Circle Background - WHITE */}
        <circle
          cx="100"
          cy="100"
          r="32"
          fill="#FFFFFF"
          stroke="#FFDE17"
          strokeWidth="2.5"
        />

        {/* Center Minion Avatar Image */}
        <image
          href={avatar}
          x="68"
          y="68"
          width="64"
          height="64"
          clipPath={`url(#${clipId})`}
          preserveAspectRatio="xMidYMid meet"
        />
      </svg>
    </div>
  );
}
