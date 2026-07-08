import FlowArt, { FlowSection } from '@/components/ui/story-scroll';

export function AboutSection() {
  return (
    <div id="about" className="w-full relative z-10 bg-white">
      <FlowArt aria-label="About EventGarde">
        <FlowSection aria-label="Who we are" style={{ backgroundColor: '#6E41E2', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em]">01 — The System</p>
          <hr className="my-[2vw] border-none border-t border-white/60 opacity-100" />
          <div>
            <h1 className="text-[clamp(3.5rem,10vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight">
              Unify
              <br />
              Your
              <br />
              Events
            </h1>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/60 opacity-100" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed">
            EventGarde is a comprehensive ecosystem designed to bring together every aspect of event management. Whether you're an organizer, an attendee, or a vendor, everything you need is in one place.
          </p>
        </FlowSection>

        <FlowSection aria-label="For Organizers" style={{ backgroundColor: '#F0EBFF', color: '#111827' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6E41E2]">02 — For Organizers</p>
          <hr className="my-[2vw] border-none border-t border-[#6E41E2]/30" />
          <div>
            <h2 className="text-[clamp(3.5rem,10vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight text-[#111827]">
              Command
              <br />
              With
              <br />
              Precision
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-[#6E41E2]/30" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-[#4B5563]">
            Streamline your workflow with powerful tools designed to make event creation, team collaboration, and real-time management effortless.
          </p>
          <hr className="my-[2vw] border-none border-t border-[#6E41E2]/30" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#111827]">Creation Suite</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#4B5563]">
                Set dates, configure ticket tiers, and define capacity limits with our intuitive step-by-step builder.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#111827]">Real-Time Analytics</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#4B5563]">
                Track ticket sales, revenue, and active registrations as they happen, right from your dashboard.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#111827]">Team Access</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#4B5563]">
                Delegate tasks and manage your team with granular Role-Based Access Control.
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="For Attendees" style={{ backgroundColor: '#111827', color: '#fff' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4B5FD]">03 — For Attendees</p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div>
            <h2 className="text-[clamp(3.5rem,10vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight text-white">
              Discover
              <br />
              Connect
              <br />
              Experience
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-gray-300">
            Find the events that matter to you. From global tech summits to exclusive local workshops, your next experience is just a tap away.
          </p>
          <hr className="my-[2vw] border-none border-t border-white/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Smart Discovery</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-gray-400">
                Browse curated collections and find events tailored to your interests and location.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Seamless Booking</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-gray-400">
                Secure your spot instantly with our streamlined checkout and digital ticketing system.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-white">Personal Dashboard</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-gray-400">
                Keep track of your upcoming events, past experiences, and saved favorites all in one place.
              </p>
            </div>
          </div>
        </FlowSection>

        <FlowSection aria-label="For Vendors" style={{ backgroundColor: '#F5F5FF', color: '#111827' }}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#6E41E2]">04 — For Vendors</p>
          <hr className="my-[2vw] border-none border-t border-[#6E41E2]/30" />
          <div>
            <h2 className="text-[clamp(3.5rem,10vw,14rem)] font-bold leading-[0.85] uppercase tracking-tight text-[#111827]">
              Showcase
              <br />
              Grow
              <br />
              Succeed
            </h2>
          </div>
          <hr className="my-[2vw] border-none border-t border-[#6E41E2]/30" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-[#4B5563]">
            Connect directly with event organizers who need your services. Expand your reach and manage bookings efficiently.
          </p>
          <hr className="my-[2vw] border-none border-t border-[#6E41E2]/30" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#111827]">Marketplace Feed</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#4B5563]">
                Get discovered by organizers actively looking for catering, audiovisual, and venue services.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#111827]">Direct Booking</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#4B5563]">
                Receive requests, negotiate terms, and confirm bookings directly through the platform.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#111827]">Business Growth</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#4B5563]">
                Build your reputation with verified reviews and track your performance over time.
              </p>
            </div>
          </div>
        </FlowSection>
      </FlowArt>
    </div>
  );
}
