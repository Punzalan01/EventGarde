import React from 'react';

export function SectionTitle({ eyebrow }: { eyebrow: string }) {
  return (
    <h2 className="text-xl font-black uppercase leading-tight tracking-wider text-[#111827] md:text-3xl">
      {eyebrow}
    </h2>
  );
}
