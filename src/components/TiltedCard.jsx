import { useRef, useState } from 'react';

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '100%',
  containerWidth = '100%',
  imageHeight = '100%',
  imageWidth = '100%',
  scaleOnHover = 1.06,
  rotateAmplitude = 14,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = true,
  className = '',
}) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) * 100;
    const yPct = (mouseY / height) * 100;

    const rX = -((mouseY - height / 2) / (height / 2)) * rotateAmplitude;
    const rY = ((mouseX - width / 2) / (width / 2)) * rotateAmplitude;

    setRotateX(rX);
    setRotateY(rY);
    setGlare({ x: xPct, y: yPct, opacity: 0.35 });
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setScale(scaleOnHover);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <figure
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none [perspective:1000px] flex items-center justify-center ${className}`}
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
    >
      <div
        className="relative w-full h-full overflow-hidden rounded-[32px] sm:rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.18)] transition-all duration-200 ease-out will-change-transform bg-white flex items-center justify-center border-4 border-white"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main Image */}
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            height: imageHeight,
            width: imageWidth,
          }}
        />

        {/* Dynamic Light Glare Effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[32px] sm:rounded-[40px] transition-opacity duration-300 z-10"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 280px at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)`,
          }}
        />

        {/* Overlay Content */}
        {displayOverlayContent && overlayContent && (
          <div
            className="absolute inset-0 z-20 pointer-events-none p-6 flex flex-col justify-between"
            style={{ transform: 'translateZ(30px)' }}
          >
            {overlayContent}
          </div>
        )}
      </div>

      {/* Floating Tooltip / Caption following Cursor or Card */}
      {showTooltip && captionText && (
        <figcaption
          className={`pointer-events-none absolute z-30 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold shadow-lg transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            left: `${mousePos.x + 12}px`,
            top: `${mousePos.y + 12}px`,
          }}
        >
          {captionText}
        </figcaption>
      )}
    </figure>
  );
}
