import React from 'react';
import { Clock, Copy, QrCode } from 'lucide-react';

export const IdentityCard = () => {
  return (
    <div className="w-[280px] xl:w-[320px] bg-[#F9FAFB] rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-5 xl:p-6 font-sans">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-8 gap-2">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          <div className="w-12 h-12 xl:w-14 xl:h-14 rounded-full overflow-hidden shrink-0 bg-gray-100">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* QR Code */}
        <div className="shrink-0">
          <QrCode className="w-24 h-24 xl:w-28 xl:h-28 text-[#111827]" strokeWidth={1.5} />
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-50 mb-6" />

      {/* Grid Details */}
      <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-[13px]">Client Name</span>
          <span className="text-[#111827] font-semibold text-[15px]">Jeremy Allen White</span>
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-[13px]">Date of Birth</span>
          <span className="text-[#111827] font-semibold text-[15px]">09 Jan 1992</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-[13px]">City of Residence</span>
          <span className="text-[#111827] font-semibold text-[15px]">Los Angeles, CA</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-gray-400 text-[13px]">ID Number</span>
          <span className="text-[#111827] font-semibold text-[15px]">756872004</span>
        </div>

      </div>

      {/* Action Button */}
      <button className="w-full text-gray-500 hover:text-[#111827] font-medium py-2 transition-colors text-sm">
        Edit
      </button>
    </div>
  );
};
