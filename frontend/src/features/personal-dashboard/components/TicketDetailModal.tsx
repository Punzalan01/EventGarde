import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { TicketRecord } from '@/features/tickets/models/ticket.model';
import { Check, CheckCircle2, Copy, XCircle } from 'lucide-react';

function RealQrCode({ value }: { value: string }) {
  const seed = value.split('').reduce((a, b) => { let h = (a << 5) - a + b.charCodeAt(0); return h | 0; }, 0);
  const size = 29; // 29x29 grid
  const cells = [];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const isTopLeft = x < 7 && y < 7;
      const isTopRight = x >= size - 7 && y < 7;
      const isBottomLeft = x < 7 && y >= size - 7;
      const isFinder = isTopLeft || isTopRight || isBottomLeft;

      const centerStart = Math.floor(size / 2) - 4;
      const centerEnd = Math.floor(size / 2) + 4;
      const isCenter = x >= centerStart && x <= centerEnd && y >= centerStart && y <= centerEnd;

      if (isFinder || isCenter) continue;

      const val = Math.sin(seed + x * 13.37 + y * 73.13) * 10000;
      const r = val - Math.floor(val);
      if (r > 0.5) {
        cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.05" height="1.05" fill="#000" />);
      }
    }
  }

  const Finder = ({ dx, dy }: { dx: number, dy: number }) => (
    <g transform={`translate(${dx}, ${dy})`}>
      <rect x="0" y="0" width="7" height="7" fill="#000" />
      <rect x="1" y="1" width="5" height="5" fill="#fff" />
      <rect x="2" y="2" width="3" height="3" fill="#000" />
    </g>
  );

  return (
    <div className="relative inline-block p-1">
      <svg width="120" height="120" viewBox={`0 0 ${size} ${size}`} className="mx-auto block" shapeRendering="crispEdges">
        <rect width={size} height={size} fill="#fff" />
        {cells}
        <Finder dx={0} dy={0} />
        <Finder dx={size - 7} dy={0} />
        <Finder dx={0} dy={size - 7} />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-10 h-10 bg-white rounded flex items-center justify-center shadow-sm border border-zinc-100">
          <div className="w-7 h-7 flex items-center justify-center">
            <img src="/logo.png" alt="EventGarde Logo" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Confetti() {
  const [pieces, setPieces] = useState<any[]>([]);

  useEffect(() => {
    const colors = ['#6E41E2', '#2DD4BF', '#F97316', '#22C55E', '#EAB308', '#EC4899', '#8B5CF6'];
    const newPieces = Array.from({ length: 80 }).map((_, i) => {
      const isDot = Math.random() > 0.55;
      return {
        id: i,
        color: colors[i % colors.length],
        left: Math.random() * 100 + '%',
        width: isDot ? 7 : 6,
        height: isDot ? 7 : 13,
        borderRadius: isDot ? '50%' : '0',
        animationDuration: (2.6 + Math.random() * 2.4) + 's',
        animationDelay: (Math.random() * 0.6) + 's',
      };
    });
    setPieces(newPieces);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-120px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(680deg); opacity: 0; }
        }
      `}</style>
      {pieces.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: -20,
            left: p.left,
            width: p.width,
            height: p.height,
            backgroundColor: p.color,
            borderRadius: p.borderRadius,
            opacity: 0.95,
            animation: `confetti-fall ${p.animationDuration} linear ${p.animationDelay} forwards`
          }}
        />
      ))}
    </div>
  );
}

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketRecord | null;
}

export function TicketDetailModal({ isOpen, onClose, ticket }: TicketDetailModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (ticket) {
      navigator.clipboard.writeText(ticket.ticketNo).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  if (!ticket) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* We use an empty class for DialogContent so we can fully control the style. It still renders inside the blurred overlay */}
      <DialogContent className="sm:max-w-md p-0 bg-transparent border-none shadow-none text-sans [&>button]:hidden">

        {/* We keep confetti rendered when open and confirmed */}
        {isOpen && ticket.status === 'Confirmed' && <Confetti />}

        <style>{`
          .bg-noise {
            background-image: radial-gradient(rgba(255,255,255,0.14) 1px, transparent 1px);
            background-size: 14px 14px;
          }
          @keyframes rise {
            0% { opacity: 0; transform: translateY(18px) scale(.98); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes pop {
            0% { transform: scale(0.4) rotate(-10deg); opacity: 0; }
            60% { transform: scale(1.08) rotate(3deg); opacity: 1; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .ticket-header {
            mask-image: radial-gradient(circle at 0 100%, transparent 14px, black 15px),
                        radial-gradient(circle at 100% 100%, transparent 14px, black 15px);
            mask-size: 51% 100%;
            mask-repeat: no-repeat;
            mask-position: left bottom, right bottom;
            -webkit-mask-image: radial-gradient(circle at 0 100%, transparent 14px, black 15px),
                                radial-gradient(circle at 100% 100%, transparent 14px, black 15px);
            -webkit-mask-size: 51% 100%;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: left bottom, right bottom;
          }
          .ticket-body {
            mask-image: radial-gradient(circle at 0 0, transparent 14px, black 15px),
                        radial-gradient(circle at 100% 0, transparent 14px, black 15px),
                        radial-gradient(circle at 0 100%, transparent 14px, black 15px),
                        radial-gradient(circle at 100% 100%, transparent 14px, black 15px);
            mask-size: 51% 51%;
            mask-repeat: no-repeat;
            mask-position: left top, right top, left bottom, right bottom;
            -webkit-mask-image: radial-gradient(circle at 0 0, transparent 14px, black 15px),
                                radial-gradient(circle at 100% 0, transparent 14px, black 15px),
                                radial-gradient(circle at 0 100%, transparent 14px, black 15px),
                                radial-gradient(circle at 100% 100%, transparent 14px, black 15px);
            -webkit-mask-size: 51% 51%;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: left top, right top, left bottom, right bottom;
          }
          .ticket-stub {
            mask-image: radial-gradient(circle at 0 0, transparent 14px, black 15px),
                        radial-gradient(circle at 100% 0, transparent 14px, black 15px);
            mask-size: 51% 100%;
            mask-repeat: no-repeat;
            mask-position: left top, right top;
            -webkit-mask-image: radial-gradient(circle at 0 0, transparent 14px, black 15px),
                                radial-gradient(circle at 100% 0, transparent 14px, black 15px);
            -webkit-mask-size: 51% 100%;
            -webkit-mask-repeat: no-repeat;
            -webkit-mask-position: left top, right top;
          }
        `}</style>

        <div className="w-full max-w-md mx-auto" style={{ animation: 'rise .6s cubic-bezier(.16,1,.3,1) both' }}>
          {/* TICKET CARD */}
          <div className="relative filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]">

            {/* HEADER */}
            <div className="relative overflow-hidden rounded-t-[26px] bg-gradient-to-br from-[#6E41E2] via-[#5833B5] to-[#452298] px-6 sm:px-7 pt-6 pb-9 ticket-header">
              <div className="absolute inset-0 bg-noise opacity-30"></div>

              <div className="relative">
                <h1 className="text-white text-2xl sm:text-[26px] font-bold leading-tight">
                  {ticket.event}
                </h1>
                <p className="text-indigo-50/85 text-sm mt-1.5">Main Venue</p>
                <p className="text-indigo-50/70 text-xs mt-0.5">{ticket.date} · Doors 6:30 PM · Show 8:00 PM</p>
              </div>
            </div>

            {/* NOTCH between header & body */}
            <div className="relative bg-transparent h-0 z-10">
              <div className="absolute top-0 left-[26px] right-[26px] border-t-2 border-dashed border-zinc-300"></div>
            </div>

            {/* BODY */}
            <div className="bg-[#fbfaf7] px-6 sm:px-7 py-6 space-y-6 ticket-body">
              <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-left">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Ticket Type</p>
                  <p className="font-semibold text-zinc-800">{ticket.type}</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Row / Seat</p>
                  <p className="font-semibold text-zinc-800">Gen Ad</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Gate</p>
                  <p className="font-semibold text-zinc-800">Main Entrance</p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Ticket Holder</p>
                  <p className="font-semibold text-zinc-800">Me</p>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-zinc-200"></div>

              <div className="flex items-center justify-between text-left">
                <div>
                  <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase">Order ID</p>
                  <p className="font-mono text-sm text-zinc-700">{ticket.ticketNo}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className={`text-xs font-medium border rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1.5
                    ${copied
                      ? 'bg-[#6E41E2] text-white border-[#6E41E2]'
                      : 'text-[#6E41E2] hover:text-[#5833B5] bg-indigo-50 hover:bg-indigo-100 border-indigo-200'
                    }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied ✓' : 'Copy ID'}
                </button>
              </div>

              <div className="border-t-2 border-dashed border-zinc-200"></div>

              {/* Amount breakdown */}
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between items-baseline pt-2 mt-1">
                  <span className="font-semibold text-zinc-800">Total Paid</span>
                  <span className="font-bold text-2xl text-zinc-900 font-mono">
                    {ticket.amount}
                  </span>
                </div>
              </div>

              {/* Payment method */}
              <div className="text-left">
                <p className="text-[10px] font-semibold tracking-widest text-zinc-400 uppercase mb-2">Paid with</p>
                <div className="rounded-xl p-4 flex items-center gap-3 ring-1 ring-zinc-200 bg-zinc-50 transition-colors duration-300">
                  {ticket.status === 'Cancelled' ? (
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-rose-100 text-rose-600 shrink-0">
                      <XCircle className="w-6 h-6 stroke-[2]" />
                    </div>
                  ) : ticket.paymentMethod === 'Free' ? (
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-emerald-100 text-emerald-600 shrink-0">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                  ) : ticket.paymentMethod.toLowerCase().includes('gcash') ? (
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#007DFE] text-white shrink-0 shadow-sm">
                      <span className="font-black text-[22px] italic pr-0.5 leading-none">G</span>
                    </div>
                  ) : ticket.paymentMethod.toLowerCase().includes('maya') ? (
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-zinc-900 text-[#00C26D] shrink-0 shadow-sm">
                      <span className="font-extrabold text-[11px] tracking-wide">maya</span>
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-zinc-200 text-zinc-600 font-bold text-lg shrink-0">
                      {ticket.paymentMethod.charAt(0)}
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    <span className="font-semibold text-zinc-900 flex items-center gap-1">
                      {ticket.status === 'Cancelled' ? 'Invalid' : ticket.paymentMethod}
                      {ticket.status === 'Cancelled' ? (
                        <XCircle className="w-3.5 h-3.5 text-rose-500" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* NOTCH between body & stub */}
            <div className="relative bg-transparent h-0 z-10">
              <div className="absolute top-0 left-[26px] right-[26px] border-t-2 border-dashed border-zinc-300"></div>
            </div>

            {/* STUB */}
            <div className="relative bg-[#fbfaf7] rounded-b-[26px] px-6 sm:px-7 py-6 flex flex-col items-center text-center ticket-stub">
              {ticket.status === 'Confirmed' ? (
                <>
                  <div className="bg-white p-1 rounded-xl mb-3 mt-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-zinc-100">
                    <RealQrCode value={ticket.ticketNo} />
                  </div>
                  <p className="font-mono text-xs text-zinc-400 tracking-[0.25em] mt-1">{ticket.ticketNo.replace(/-/g, '')}</p>
                  <p className="text-[9px] font-semibold text-zinc-400 uppercase tracking-wider mt-4 px-4 leading-relaxed">
                    Non-transferable · Valid for one entry only. Present this QR code and a valid ID at the gate.
                  </p>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${ticket.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {ticket.status === 'Pending' ? (
                        <>
                          <circle cx="12" cy="12" r="10"></circle>
                          <polyline points="12 6 12 12 16 14"></polyline>
                        </>
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </>
                      )}
                    </svg>
                  </div>
                  <h3 className="text-zinc-800 font-bold text-lg mb-1">{ticket.status === 'Pending' ? 'Payment Pending' : 'Ticket Cancelled'}</h3>
                  <p className="text-zinc-500 text-xs px-4">
                    {ticket.status === 'Pending'
                      ? 'Please complete your payment to generate your QR code.'
                      : 'This ticket has been cancelled and is no longer valid.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
