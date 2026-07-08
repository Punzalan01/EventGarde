"use client";

import React from "react";
import { BadgeCheck } from "lucide-react";

type CardT = {
  image: string;
  name: string;
  handle: string;
  date?: string;
  review?: string;
};

const ROW1_DATA: CardT[] = [
  {
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    name: "Briar Martin",
    handle: "@neilstellar",
    review: "EventGarde made organizing all of our corporate events an absolute breeze. Highly recommended!",
  },
  {
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    name: "Avery Johnson",
    handle: "@averywrites",
    review: "The vendor management tools alone saved us hours of back-and-forth. Incredible platform.",
  },
  {
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60",
    name: "Jordan Lee",
    handle: "@jordantalks",
    review: "We ran a 500-person gala flawlessly thanks to EventGarde's ticketing system. Truly seamless.",
  },
  {
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60",
    name: "Elena Rodriguez",
    handle: "@elenadesigns",
    review: "As a solo organizer, having everything in one dashboard is a game-changer. Love it!",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
    name: "Marcus Webb",
    handle: "@marcuswebb",
    review: "EventGarde's RSVP tracking is chef's kiss. No more spreadsheets!",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    name: "Sofia Reyes",
    handle: "@sofiareyes",
    review: "I organized three weddings this month and EventGarde handled them all without a hiccup.",
  },
  {
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=60",
    name: "Daniel Park",
    handle: "@danielparkhq",
    review: "The real-time analytics during our festival were invaluable. EventGarde is a must.",
  },
];

const ROW2_DATA: CardT[] = [
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60",
    name: "Priya Nair",
    handle: "@priyanair",
    review: "Switched from three different tools to just EventGarde. Never looking back.",
  },
  {
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=60",
    name: "Tom Hadley",
    handle: "@tomhadley",
    review: "Our venue was fully booked in under 48 hours. EventGarde's reach is unmatched.",
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=60",
    name: "Lily Chen",
    handle: "@lilychen_co",
    review: "The UI is so clean and intuitive — even our non-tech staff picked it up immediately.",
  },
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=60",
    name: "Mia Thompson",
    handle: "@miathompson",
    review: "From planning to execution, EventGarde covered every single detail. Absolutely flawless.",
  },
  {
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=60",
    name: "Luca Ferrari",
    handle: "@lucaferrari",
    review: "Managed a multi-day conference with 1,200 attendees. EventGarde didn't miss a beat.",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60",
    name: "Zara Ahmed",
    handle: "@zaraahmed",
    review: "The vendor marketplace alone is worth it. Found amazing suppliers I never knew existed.",
  },
  {
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&auto=format&fit=crop&q=60",
    name: "Chris Murphy",
    handle: "@chrismurphy",
    review: "Event check-in used to take 30 mins. With EventGarde's QR system, it took 5. Amazing.",
  },
];

const Card = ({ card }: { card: CardT }) => (
  <div className="p-4 rounded-xl mx-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 w-72 shrink-0 bg-white">
    <div className="flex gap-3">
      <img className="size-12 object-cover rounded-full shadow-sm" src={card.image} alt={card.name} />
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <p className="font-bold text-sm text-[#111827]">{card.name}</p>
          <BadgeCheck className="w-4 h-4 text-blue-500" />
        </div>
        <span className="text-xs font-medium text-slate-500">{card.handle}</span>
      </div>
    </div>
    <p className="text-sm pt-4 leading-relaxed text-gray-700">
      {card.review ?? "EventGarde made organizing all of our corporate events an absolute breeze. Highly recommended!"}
    </p>
  </div>
);

function MarqueeRow({
  data,
  reverse = false,
  speed = 25,
}: {
  data: CardT[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = React.useMemo(() => [...data, ...data], [data]);
  return (
    <div className="relative w-full mx-auto max-w-full overflow-hidden isolation-isolate">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 md:w-32 z-10 bg-gradient-to-r from-[#FAFAFC] to-transparent" />
      <div
        className={`flex transform-gpu min-w-[200%] ${
          reverse ? "pt-5 pb-10" : "pt-10 pb-5"
        }`}
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((c, i) => (
          <Card key={i} card={c} />
        ))}
      </div>
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 md:w-32 z-10 bg-gradient-to-l from-[#FAFAFC] to-transparent" />
    </div>
  );
}

export function TestimonialMarquee({
  row1 = ROW1_DATA,
  row2 = ROW2_DATA,
}: {
  row1?: CardT[];
  row2?: CardT[];
}) {
  return (
    <div className="bg-[#FAFAFC] py-16 w-full font-sans overflow-hidden">
      <div className="max-w-3xl mx-auto text-center mb-6 px-6">
        <h2 className="text-3xl font-bold tracking-tight text-[#111827]">Loved by thousands of organizers</h2>
        <p className="text-slate-500 mt-2">See what our community has to say about their experience.</p>
      </div>
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div className="flex flex-col gap-2">
        <MarqueeRow data={row1} reverse={false} speed={35} />
        <MarqueeRow data={[...row2].reverse()} reverse={true} speed={30} />
      </div>
    </div>
  );
}
