import React from 'react';
import { useVendorDashboardViewModel } from '../viewmodels/useVendorDashboardViewModel';
import { Settings, MessageSquare, Calendar as CalendarIcon, CheckCircle2, XCircle, Send, Plus, Lock } from 'lucide-react';

export function VendorDashboardView() {
  const { 
    activeMessageId, setActiveMessageId,
    storeProfile, bookingRequests, messages, activeChat 
  } = useVendorDashboardViewModel();

  return (
    <div className="min-h-screen font-sans text-[#4B5563] relative overflow-hidden will-change-transform" style={{ contain: 'paint' }}>
      {/* Background with mesh gradient */}
      <div className="landing-mesh-section absolute inset-0 -z-10 h-full w-full will-change-transform" />

      <div className="max-w-7xl mx-auto p-8 space-y-8 relative z-10">
        
        {/* Header */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-4xl mb-2">
              Vendor Operations
            </h1>
            <p className="text-lg leading-relaxed">Manage your storefront, bookings, and availability.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-[#F0EBFF] text-[#5833B5] rounded-xl font-medium text-sm">
              Status: {storeProfile.status}
            </span>
            <button className="bg-[#6E41E2] hover:bg-[#5833B5] text-white px-6 py-2 rounded-xl font-medium transition-colors shadow-soft">
              Publish Updates
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Booking Contract Management Board */}
          <div className="xl:col-span-8 bg-white rounded-3xl shadow-soft p-8">
            <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl mb-6">
              Booking Requests
            </h2>
            <div className="space-y-4">
              {bookingRequests.map((req) => (
                <div key={req.id} className={`bg-[#FAFAFC] rounded-2xl p-5 transition-all ${req.selected ? 'vendor-gradient-border' : 'border border-gray-100 hover:border-gray-300'}`}>
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <div className="text-[#111827] font-bold text-lg leading-[1.1] mb-1">{req.event}</div>
                      <div className="text-sm flex items-center gap-2">
                        <span className="font-medium">{req.client}</span>
                        <span>•</span>
                        <span>{req.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#6E41E2] font-bold text-lg mb-2">{req.value}</div>
                      <div className="flex gap-2">
                        <button className="p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors">
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marketplace Storefront Content Editor */}
          <div className="xl:col-span-4 bg-white rounded-3xl shadow-soft p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl">
                Storefront Setup
              </h2>
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">Display Name</label>
                <input 
                  type="text" 
                  defaultValue={storeProfile.name}
                  className="w-full bg-[#FAFAFC] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6E41E2]/50 text-[#111827]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">Base Pricing Grid</label>
                <input 
                  type="text" 
                  defaultValue={storeProfile.baseRate}
                  className="w-full bg-[#FAFAFC] border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6E41E2]/50 text-[#111827]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#111827] mb-2">Service Tags</label>
                <div className="flex flex-wrap gap-2">
                  {storeProfile.services.map(tag => (
                    <span key={tag} className="bg-[#F0EBFF] text-[#5833B5] px-3 py-1 rounded-lg text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                  <button className="px-3 py-1 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 flex items-center text-sm">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Client Communication Pane */}
          <div className="xl:col-span-7 bg-white rounded-3xl shadow-soft overflow-hidden flex h-[500px]">
            <div className="w-1/3 border-r border-gray-100 bg-[#FAFAFC] p-4 overflow-y-auto">
              <h3 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-lg mb-4 pl-2">Inbox</h3>
              <div className="space-y-2">
                {messages.map(msg => (
                  <div 
                    key={msg.id}
                    onClick={() => setActiveMessageId(msg.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-colors ${activeMessageId === msg.id ? 'bg-[#F0EBFF] text-[#5833B5]' : 'hover:bg-gray-100 text-[#4B5563]'}`}
                  >
                    <div className="font-bold text-[#111827] mb-1">{msg.sender}</div>
                    <div className="text-xs font-medium mb-2 opacity-80">{msg.event}</div>
                    <div className="text-sm truncate opacity-90">{msg.preview}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-2/3 flex flex-col bg-white">
              <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <div className="font-bold text-[#111827]">Alice Walker</div>
                  <div className="text-xs text-green-500 font-medium">Online</div>
                </div>
                <button className="text-[#6E41E2] hover:bg-[#F0EBFF] p-2 rounded-lg transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {activeChat.map(chat => (
                  <div key={chat.id} className={`flex ${chat.sender === 'vendor' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-4 ${chat.sender === 'vendor' ? 'bg-[#6E41E2] text-white' : 'bg-[#F0EBFF] text-[#111827]'}`}>
                      <div className="text-sm leading-relaxed">{chat.text}</div>
                      <div className={`text-xs mt-2 ${chat.sender === 'vendor' ? 'text-white/70' : 'text-gray-500'}`}>{chat.time}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-gray-100 bg-[#FAFAFC]">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-[#6E41E2]/50 shadow-sm"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#6E41E2] text-white rounded-lg hover:bg-[#5833B5] transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Automated Availability Calendar */}
          <div className="xl:col-span-5 bg-white rounded-3xl shadow-soft p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl">
                Availability Calendar
              </h2>
              <CalendarIcon className="w-5 h-5 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-gray-400">
              {['S','M','T','W','T','F','S'].map((d,i) => <div key={i}>{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 30 }).map((_, i) => {
                const isGated = i === 11 || i === 23;
                const isActive = i === 23;
                return (
                  <div 
                    key={i} 
                    className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium relative border cursor-pointer transition-colors
                      ${isActive ? 'vendor-gradient-border bg-[#F0EBFF] text-[#5833B5] z-10' : 'border-gray-100 hover:border-[#6E41E2]/50 text-[#111827] bg-[#FAFAFC]'}
                    `}
                  >
                    <span className="relative z-10">{i + 1}</span>
                    {isGated && (
                      <Lock className="absolute top-1 right-1 w-3 h-3 text-[#5833B5] opacity-60 z-10" />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#F0EBFF] border border-[#5833B5] rounded-sm"></div> Booked</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#FAFAFC] border border-gray-200 rounded-sm"></div> Open</div>
              <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-gray-400" /> Payment Gated</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
