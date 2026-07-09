import { useParams, useNavigate } from 'react-router-dom';
import { useEventDetailViewModel } from '../viewmodels/useEventDetailViewModel';
import { ArrowLeft, ChevronDown } from 'lucide-react';

export function EventDetailView() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { eventDetail, loading, activeTab, setActiveTab, showMore, setShowMore } = useEventDetailViewModel(eventId);

  if (loading || !eventDetail) {
    return (
      <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-[#0A3055] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-[#0A3055] font-bold">Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans overflow-x-hidden">
      {/* Header Section (Dark Blue Background) */}
      <div className="bg-[#0A3055] text-white pt-16 pb-12 px-4 sm:px-8 relative">
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-white/80 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start mt-8">
          {/* Poster Image */}
          <div className="w-48 md:w-64 shrink-0 rounded-lg overflow-hidden shadow-2xl border-4 border-white/10">
            <img 
              src={eventDetail.heroImage} 
              alt={eventDetail.title} 
              className="w-full h-auto aspect-[2/3] object-cover"
            />
          </div>

          {/* Event Info */}
          <div className="flex-1 w-full pt-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight mb-2">
                  {eventDetail.title}
                </h1>
                <p className="text-lg text-white/80 font-medium mb-6">
                  {eventDetail.venue}
                </p>

                <div className="bg-[#15b292] inline-block px-4 py-3 rounded text-sm font-bold shadow-lg">
                  <div className="mb-0.5">{eventDetail.date}</div>
                  <div className="text-xs opacity-90">{eventDetail.time}</div>
                </div>
              </div>
            </div>

            {/* About Section (Moved to Header) */}
            <div className="mt-10 overflow-hidden">
              <div className="flex items-center gap-6 border-b border-white/10 pb-4 mb-6">
                <h2 className="text-xl font-black uppercase tracking-wide text-white m-0">
                  ABOUT
                </h2>
                <button 
                  onClick={() => setShowMore(!showMore)}
                  className="flex items-center gap-1 text-xs font-bold text-[#15b292] hover:text-white transition-colors"
                >
                  {showMore ? 'SHOW LESS' : 'SHOW MORE'} <ChevronDown className={`w-3 h-3 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                </button>
              </div>
              <div 
                className="prose prose-invert prose-zinc max-w-none prose-p:text-sm prose-li:text-sm text-white/90"
                dangerouslySetInnerHTML={{ __html: eventDetail.aboutHtml }} 
              />
              
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showMore ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'}`}>
                <div className="text-sm text-white/80 leading-relaxed text-justify">
                  {(eventDetail as any).moreDetails}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#0A3055] border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 flex gap-8">
          {['SEAT PLAN', 'TICKETS'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-4 text-sm font-bold tracking-wider relative transition-colors ${
                activeTab === tab ? 'text-white' : 'text-white/60 hover:text-white/90'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-white rounded-t-sm" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column (Content) */}
        <div className="flex-1">

          {activeTab === 'SEAT PLAN' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <img 
                src={eventDetail.seatPlanImage} 
                alt="Seat Plan" 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-sm border border-gray-200"
              />
            </div>
          )}

          {activeTab === 'TICKETS' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-200">
                <span className="text-sm font-bold text-gray-500 uppercase">Location</span>
                <span className="text-sm font-bold text-gray-500 uppercase">Price</span>
              </div>
              
              <div className="space-y-4">
                {eventDetail.pricingTiers.map((tier) => (
                  <div key={tier.id} className="flex justify-between items-center bg-[#F8F9FA] p-5 rounded-lg border border-gray-100 hover:border-[#0A3055]/30 transition-colors cursor-pointer group">
                    <div>
                      <h4 className="font-bold text-[#0A3055] text-sm uppercase tracking-wide group-hover:text-[#6E41E2] transition-colors">{tier.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{tier.type}</p>
                    </div>
                    <div className="font-bold text-[#111827]">
                      ₱ {tier.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Sidebar / Notice) */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-24">
            <h3 className="text-[#0A3055] font-black uppercase tracking-wide mb-6">
              Notice to all online customers
            </h3>
            <p className="text-sm font-bold text-[#111827] mb-4">
              Guidelines for Online Ticket Purchase.
            </p>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              To protect all users from fraud and unintended misuse of credit cards, please note that the following should ALL bear the SAME NAME when buying tickets online:
            </p>
            
            <ol className="list-decimal pl-4 space-y-3 text-sm text-gray-600 mb-6">
              {eventDetail.guidelines.map((guideline, idx) => (
                <li key={idx} className="pl-1">{guideline}</li>
              ))}
            </ol>

            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Ticket redemption through a representative is NOT allowed. Only the cardholder who transacted online can redeem the ticket. To avoid any inconvenience, we request our patrons to comply with the above guidelines. The safety and security of our customers is always our top priority. By proceeding to payment, you agree with the above redemption process. Price is inclusive of standard ticket charges.
            </p>

            {activeTab !== 'TICKETS' && (
              <div className="mt-8">
                <p className="text-sm text-gray-600 italic">
                  To buy or to view price availability, please navigate to the TICKETS tab.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
