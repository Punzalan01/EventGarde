import { cn } from "@/utils/cn";
import React from "react";

export function LatestBlog() {
  return (
    <div className="flex flex-col items-center w-full py-16 bg-white font-sans">
      <h2 className="text-3xl font-semibold tracking-tight text-[#111827]">Latest Blog</h2>
      <p className="text-sm text-slate-500 mt-2 max-w-lg text-center">
        Stay ahead of the curve with fresh content on code, design, startups, and everything in between.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-8">
        <div className="max-w-72 w-full hover:-translate-y-1 transition duration-300 cursor-pointer">
          <img
            className="rounded-xl object-cover h-48 w-full shadow-sm"
            src="https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=1200&h=800&auto=format&fit=crop&q=60"
            alt="Color Psychology"
          />
          <h3 className="text-base text-slate-900 font-bold mt-4 leading-tight">
            Color Psychology in UI: How to Choose the Right Palette
          </h3>
          <p className="text-xs text-[#6E41E2] font-bold mt-2 uppercase tracking-wider">UI/UX design</p>
        </div>

        <div className="max-w-72 w-full hover:-translate-y-1 transition duration-300 cursor-pointer">
          <img
            className="rounded-xl object-cover h-48 w-full shadow-sm"
            src="https://images.unsplash.com/photo-1714974528646-ea024a3db7a7?w=1200&h=800&auto=format&fit=crop&q=60"
            alt="Typography"
          />
          <h3 className="text-base text-slate-900 font-bold mt-4 leading-tight">
            Understanding Typography: Crafting a Visual Voice for Your Brand
          </h3>
          <p className="text-xs text-[#6E41E2] font-bold mt-2 uppercase tracking-wider">Branding</p>
        </div>

        <div className="max-w-72 w-full hover:-translate-y-1 transition duration-300 cursor-pointer">
          <img
            className="rounded-xl object-cover h-48 w-full shadow-sm"
            src="https://images.unsplash.com/photo-1713947501966-34897f21162e?w=1200&h=800&auto=format&fit=crop&q=60"
            alt="Design Thinking"
          />
          <h3 className="text-base text-slate-900 font-bold mt-4 leading-tight">
            Design Thinking in Practice: How to Solve Real User Problems
          </h3>
          <p className="text-xs text-[#6E41E2] font-bold mt-2 uppercase tracking-wider">Product Design</p>
        </div>
      </div>
    </div>
  );
}
