import React from 'react';

export function CarouselProgress({ count, activeIndex }: { count: number; activeIndex: number }) {
  return (
    <div className="flex items-center justify-center gap-1.5" aria-label={`Slide ${activeIndex + 1} of ${count}`}>
      {Array.from({ length: count }).map((_, index) => (
        <span
          key={index}
          className={`h-2 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-12 bg-[#6E41E2]' : 'w-2 bg-[#A78BFA]/70'
            }`}
        />
      ))}
    </div>
  );
}
