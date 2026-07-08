import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const SimpleFooter = () => {
  return (
    <footer className="w-full py-10 bg-white flex flex-col items-center justify-center font-sans mt-10 relative z-10">
      
      {/* Navigation */}
      <nav className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-[17px] text-[#111827] mb-8">
        <a href="#" className="hover:text-gray-500 transition-colors">Home</a>
        <a href="#" className="hover:text-gray-500 transition-colors">About</a>
        <a href="#" className="hover:text-gray-500 transition-colors">Services</a>
        <a href="#" className="hover:text-gray-500 transition-colors">Products</a>
        <a href="#" className="hover:text-gray-500 transition-colors">Contact</a>
      </nav>

      {/* Social Icons */}
      <div className="flex items-center gap-5 mb-8">
        <a href="#" className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-[#111827] hover:bg-gray-50 transition-colors">
          <Facebook className="w-5 h-5" />
        </a>
        <a href="#" className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-[#111827] hover:bg-gray-50 transition-colors">
          <Twitter className="w-5 h-5" />
        </a>
        <a href="#" className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-[#111827] hover:bg-gray-50 transition-colors">
          <Instagram className="w-5 h-5" />
        </a>
        <a href="#" className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-[#111827] hover:bg-gray-50 transition-colors">
          <Linkedin className="w-5 h-5" />
        </a>
      </div>

      {/* Subscribe Form */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-10 w-full max-w-md px-6">
        <div className="flex-1 w-full relative">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="w-full h-12 px-6 rounded-full border border-gray-200 text-[#111827] placeholder-gray-500 focus:outline-none focus:border-[#111827] transition-colors bg-white shadow-sm"
          />
        </div>
        <button className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#111827] hover:bg-black text-white font-bold transition-colors shrink-0 shadow-sm">
          Subscribe
        </button>
      </div>

      {/* Copyright */}
      <div className="text-[#6B7280] text-[15px]">
        © 2026 EventGarde. All rights reserved.
      </div>
    </footer>
  );
};
