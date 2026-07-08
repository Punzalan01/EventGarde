import React from 'react';
import { useOrganizerDashboardViewModel } from '../viewmodels/useOrganizerDashboardViewModel';
import { Plus, Briefcase, ChevronRight, CheckCircle2, Clock } from 'lucide-react';

export function OrganizerDashboardView() {
  const { stats, teamMembers, vendorPipeline } = useOrganizerDashboardViewModel();

  return (
    <div className="min-h-screen font-sans text-[#4B5563] relative overflow-hidden will-change-transform" style={{ contain: 'paint' }}>
      {/* Background with mesh gradient */}
      <div className="landing-mesh-section absolute inset-0 -z-10 h-full w-full will-change-transform" />

      <div className="max-w-7xl mx-auto p-8 space-y-8 relative z-10">

        {/* Header */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-4xl mb-2">
              Organizer Workspace
            </h1>
            <p className="text-lg leading-relaxed">Here's what's happening with your events today.</p>
          </div>
          <button className="bg-[#6E41E2] hover:bg-[#5833B5] text-white px-6 py-3 rounded-2xl font-medium transition-colors shadow-soft flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Event
          </button>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {/* Real-Time Management Analytics - Top Row */}
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-soft p-6 flex flex-col justify-between">
              <div className="text-sm font-medium mb-4">{stat.label}</div>
              <div>
                <div className="text-[#111827] font-extrabold text-3xl tracking-tight leading-[1.1] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#6E41E2] font-medium">{stat.change}</div>
              </div>
            </div>
          ))}

          {/* Event Creation Suite / Action Panels - Large Span */}
          <div className="md:col-span-2 lg:col-span-2 bg-white rounded-3xl shadow-soft p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl">
                Event Creation Suite
              </h2>
            </div>
            <div className="space-y-4">
              {[
                { step: 1, title: 'Event Details', desc: 'Set date, time, and core information.' },
                { step: 2, title: 'Ticketing & Pricing', desc: 'Configure ticket tiers and capacity.' },
                { step: 3, title: 'Vendor Management', desc: 'Invite and manage event vendors.' }
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#F0EBFF] transition-colors cursor-pointer group border border-transparent hover:border-[#F0EBFF]">
                  <div className="w-8 h-8 rounded-full bg-[#FAFAFC] text-[#111827] flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-white group-hover:text-[#6E41E2]">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-[#111827] font-bold text-lg leading-[1.1] mb-1">{item.title}</h3>
                    <p className="text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marketplace Booking Feed */}
          <div className="md:col-span-1 lg:col-span-2 bg-white rounded-3xl shadow-soft p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl">
                Marketplace Feed
              </h2>
              <button className="text-[#6E41E2] text-sm font-medium flex items-center hover:text-[#5833B5]">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            <div className="space-y-5">
              {vendorPipeline.map((vendor) => (
                <div key={vendor.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F0EBFF] rounded-xl text-[#6E41E2]">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[#111827] font-bold leading-[1.1] mb-0.5">{vendor.vendor}</div>
                      <div className="text-sm">{vendor.event}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium">
                    <Clock className="w-4 h-4 text-amber-500" />
                    {vendor.status}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team RBAC Control Panel - Full Width Row */}
          <div className="md:col-span-3 lg:col-span-4 bg-white rounded-3xl shadow-soft p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl">
                Team Access Control
              </h2>
              <button className="text-sm font-medium text-[#6E41E2] border border-[#F0EBFF] hover:bg-[#F0EBFF] px-4 py-2 rounded-xl transition-colors">
                Invite Member
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 text-sm font-medium text-gray-400">Name</th>
                    <th className="pb-3 text-sm font-medium text-gray-400">Role</th>
                    <th className="pb-3 text-sm font-medium text-gray-400">Status</th>
                    <th className="pb-3 text-sm font-medium text-gray-400 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-4 text-[#111827] font-bold">{member.name}</td>
                      <td className="py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#F0EBFF] text-[#5833B5]">
                          {member.role}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-1.5 text-sm">
                          {member.status === 'Active' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-gray-400" />
                          )}
                          {member.status}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <button className="text-sm text-[#4B5563] hover:text-[#111827] font-medium">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
