import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { AnimatedTooltip } from '@/shared/components/ui/animated-tooltip';

const REVIEWS = [
  {
    name: "Sarah Jenkins",
    role: "Event Organizer",
    review: "EventGarde completely transformed how we handle our massive music festivals. The digital ticketing is flawless and the attendees love the interactive maps.",
  },
  {
    name: "David Chen",
    role: "Corporate Director",
    review: "The B2B networking tools are unmatched. We've seen a 300% increase in attendee engagement at our summits since switching to this platform.",
  },
  {
    name: "Elena Rodriguez",
    role: "Tech Conference Lead",
    review: "Managing 10,000+ attendees used to be a nightmare. Now it's a breeze with their seamless operations dashboard. Highly recommended!",
  },
  {
    name: "Michael Chang",
    role: "Festival Goer",
    review: "The app is so easy to use! Having all my tickets and itineraries in one place made my weekend stress-free. Best event app out there.",
  }
];

const ORGANIZERS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    designation: "Festival Director",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "David Chen",
    designation: "Corporate Events Lead",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    designation: "Tech Conference Organizer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Michael Chang",
    designation: "Community Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
  }
];

export function ReviewsSection() {
  const [items, setItems] = useState(REVIEWS);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const newItems = [...prev];
        const last = newItems.pop();
        if (last) newItems.unshift(last);
        return newItems;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full py-16 mb-8 mt-12 relative z-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-md border border-[#E9D8FD] text-[#6E41E2] rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                Real Feedback
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111827] tracking-tighter leading-[1.1]">
                Trusted by <br className="hidden md:block"/> Top Creators
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed max-w-md">
              Join thousands of organizers and attendees who are experiencing the future of seamless event operations.
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 mt-8">
              <div className="flex pl-2">
                <AnimatedTooltip items={ORGANIZERS} />
              </div>
              <div className="flex flex-col">
                <div className="flex text-yellow-400 gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <span className="text-sm font-bold text-[#111827]">4.9/5 from 2,000+ reviews</span>
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Cards UI */}
          <div className="relative h-[320px] md:h-[400px] w-full flex items-center justify-center pointer-events-none lg:pointer-events-auto">
            {items.map((review, idx) => {
              return (
                <div
                  key={review.name}
                  className="absolute w-full max-w-[420px] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                  style={{
                    transform: `translateY(${idx * 24}px) scale(${1 - idx * 0.05})`,
                    zIndex: REVIEWS.length - idx,
                    opacity: 1 - idx * 0.2,
                    filter: `blur(${idx > 0 ? idx * 1 : 0}px)`
                  }}
                >
                  <div className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] relative overflow-hidden group hover:border-[#E9D8FD] transition-colors">
                    <Quote className="absolute top-6 right-6 w-16 h-16 text-[#6E41E2]/5 transition-transform group-hover:scale-110 duration-500" />
                    
                    <div className="flex items-center gap-4 mb-5 relative z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6E41E2] to-[#4318FF] flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-[#111827] text-lg leading-tight">{review.name}</h4>
                        <p className="text-sm font-medium text-[#6E41E2]">{review.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed font-medium relative z-10 text-[15px]">
                      "{review.review}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
