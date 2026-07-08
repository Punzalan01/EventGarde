import React from 'react';
import { useOrganizerDashboardViewModel } from '../viewmodels/useOrganizerDashboardViewModel';
import { Plus, Briefcase, ChevronRight, CheckCircle2, Clock, Check } from 'lucide-react';
import { useAuth } from '@/shared/hooks/useAuth';
import { AnimatedList } from '@/shared/components/ui/AnimatedList';
import { TestimonialMarquee } from '@/components/ui/demo';
import { useSearchParams } from 'react-router-dom';

export function OrganizerDashboardView() {
  const { stats, teamMembers, vendorPipeline } = useOrganizerDashboardViewModel();
  const { defaultWorkspace, profile, isDemoAccount } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDismissed, setIsDismissed] = React.useState(false);

  // Re-show plan modal when ?showPlan=true is in the URL
  React.useEffect(() => {
    if (searchParams.get('showPlan') === 'true') {
      setIsDismissed(false);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const isUnauthorized = defaultWorkspace?.tier === 'free' && profile?.primary_intent !== 'organizer' && !isDemoAccount && !isDismissed;

  return (
    <div className="min-h-screen font-sans text-[#4B5563] relative overflow-hidden will-change-transform" style={{ contain: 'paint' }}>
      {/* Background with mesh gradient */}
      <div className="landing-mesh-section absolute inset-0 -z-10 h-full w-full will-change-transform" />

      <div className="max-w-7xl mx-auto p-8 space-y-8 relative z-10">

        {isUnauthorized && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-white/30">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-8 md:p-12 max-w-5xl w-full text-center">
              <h2 className="text-[#111827] font-extrabold text-3xl md:text-4xl tracking-tight mb-4">
                Upgrade to Organizer Access
              </h2>
              <p className="text-gray-500 mb-10 max-w-2xl mx-auto text-sm md:text-base">
                Unlock powerful event creation, vendor management, and ticketing tools. Choose a plan that scales with your events.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {/* Starter Tier */}
                <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col">
                  <h3 className="font-bold text-xl text-[#111827] mb-2">Starter</h3>
                  <div className="text-3xl font-extrabold text-[#111827] mb-1"><span className="text-2xl">₱</span>1,499<span className="text-base text-gray-500 font-medium">/mo</span></div>
                  <p className="text-sm text-gray-500 mb-6">For independent coordinators and milestone hosts running private social events.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {['Private and unlisted events only', 'Strict RSVP matching by verified email or mobile', 'Up to 300 PAX per event', 'Full access to browse and book marketplace vendors', 'Optional customization add-ons for advanced layouts'].map(feature => (
                      <li key={feature} className="flex items-start text-sm text-gray-600 gap-3">
                        <Check className="w-4 h-4 text-[#6E41E2] shrink-0 mt-0.5" /> <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="w-full py-3 rounded-xl border border-gray-200 font-bold text-[#111827] hover:bg-gray-50 transition-colors"
                    onClick={() => setIsDismissed(true)}
                  >
                    Get Started
                  </button>
                </div>

                {/* Professional Tier */}
                <div className="p-6 rounded-2xl border-2 border-[#6E41E2] bg-[#FAFAFC] shadow-md flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#6E41E2] text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-lg tracking-wider">
                    Recommended
                  </div>
                  <h3 className="font-bold text-xl text-[#111827] mb-2">Professional</h3>
                  <div className="text-3xl font-extrabold text-[#111827] mb-1"><span className="text-2xl">₱</span>4,999<span className="text-base text-gray-500 font-medium">/mo</span></div>
                  <p className="text-sm text-gray-500 mb-6">For corporations, campuses, SMEs, and agencies that need public or internal events.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {['Internal or public Discovery Page listing option', 'Custom registration and feedback forms', 'Ticket tiers, attendee analytics, and revenue tracking', 'Multi-user collaboration with up to 5 Admin seats', 'Vendor inquiries, chat, booking requests, and payments'].map(feature => (
                      <li key={feature} className="flex items-start text-sm text-gray-600 gap-3">
                        <Check className="w-4 h-4 text-[#6E41E2] shrink-0 mt-0.5" /> <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-xl bg-[#6E41E2] text-white font-bold hover:bg-[#5833B5] transition-colors shadow-soft">
                    Choose Professional
                  </button>
                </div>

                {/* Enterprise Tier */}
                <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col">
                  <h3 className="font-bold text-xl text-[#111827] mb-2">Enterprise</h3>
                  <div className="text-3xl font-extrabold text-[#111827] mb-1"><span className="text-2xl">₱</span>14,999<span className="text-base text-gray-500 font-medium">/mo</span></div>
                  <p className="text-sm text-gray-500 mb-6">For festivals, expos, trade fairs, and large public event operations.</p>
                  <ul className="space-y-3 mb-8 flex-1">
                    {['Unlimited PAX capacity', 'Global Discovery Page spotlight listing', 'Public ticket sales through PayMongo', 'Advanced RBAC and unlimited workspace seats', 'Enterprise-scale ticketing, analytics, and QR scanning'].map(feature => (
                      <li key={feature} className="flex items-start text-sm text-gray-600 gap-3">
                        <Check className="w-4 h-4 text-[#111827] shrink-0 mt-0.5" /> <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-xl bg-[#111827] text-white font-bold hover:bg-black transition-colors">
                    Plan Enterprise
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        <div className={isUnauthorized ? 'pointer-events-none' : ''}>
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

            {/* Marketplace Booking Feed */}
            <div className="md:col-span-3 lg:col-span-4 bg-white rounded-3xl shadow-soft p-8 h-[600px] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl">
                  Marketplace Feed
                </h2>
                <button className="text-[#6E41E2] text-sm font-medium flex items-center hover:text-[#5833B5]">
                  View All <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden -mx-4 px-4">
                <AnimatedList
                  items={vendorPipeline}
                  displayScrollbar={false}
                  renderItem={(vendor) => (
                    <div className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white shadow-sm w-full">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#F0EBFF] rounded-xl text-[#6E41E2]">
                          <Briefcase className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-[#111827] font-bold text-lg leading-[1.1] mb-1">{vendor.vendor}</div>
                          <div className="text-sm text-gray-500 font-medium">{vendor.event}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-bold px-3 py-1.5 rounded-lg bg-amber-50 text-amber-600">
                        <Clock className="w-4 h-4" />
                        {vendor.status}
                      </div>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* Event Creation Suite / Action Panels - Large Span */}
            <div className="md:col-span-3 lg:col-span-4 bg-white rounded-3xl shadow-soft p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#111827] font-extrabold tracking-tight leading-[1.1] text-2xl">
                  Event Creation Suite
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { step: 1, title: 'Event Details', desc: 'Set date, time, and core information.' },
                  { step: 2, title: 'Ticketing & Pricing', desc: 'Configure ticket tiers and capacity.' },
                  { step: 3, title: 'Vendor Management', desc: 'Invite and manage event vendors.' }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4 p-5 rounded-2xl hover:bg-[#F0EBFF] transition-colors cursor-pointer group border border-gray-100 hover:border-[#F0EBFF] shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-[#FAFAFC] text-[#111827] flex items-center justify-center font-bold text-base shrink-0 group-hover:bg-white group-hover:text-[#6E41E2]">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-[#111827] font-bold text-lg leading-[1.1] mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
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

      {/* Footer Replacements */}
      <div className="flex flex-col border-t border-gray-100 bg-white relative z-10 w-full mt-12">
        <TestimonialMarquee />
      </div>
    </div>
  );
}
