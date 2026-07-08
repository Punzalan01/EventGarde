import React, { useState } from "react";
import { Badge } from "./badge";
import { GripVertical } from "lucide-react";

export function Feature() {
  const [inset, setInset] = useState<number>(50);
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    setInset(percentage);
  };

  return (
    <div className="w-full py-8 mb-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl lg:max-w-4xl">
            <div
              className="relative aspect-[21/9] w-full h-full overflow-hidden rounded-2xl select-none shadow-lg border border-white/20"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              <div
                className="bg-white/80 backdrop-blur h-full w-1.5 absolute z-20 top-0 -ml-[3px] select-none shadow-md"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-white rounded-full shadow-lg hover:scale-110 transition-transform w-8 h-12 select-none -translate-y-1/2 absolute top-1/2 -ml-4 z-30 cursor-ew-resize flex justify-center items-center border border-gray-200"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <GripVertical className="h-5 w-5 select-none text-[#6E41E2]" />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
                alt="Festivals and B2C Events"
                className="absolute left-0 top-0 z-10 w-full h-full rounded-2xl select-none object-cover"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                }}
              />
              <img
                src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1920&q=80"
                alt="Conferences and B2B Summits"
                className="absolute left-0 top-0 w-full h-full rounded-2xl select-none object-cover"
              />

              {/* Overlay Tags */}
              <div
                className="absolute left-6 bottom-6 z-20 bg-[#111827]/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                }}
              >
                Top B2C Festivals
              </div>
              <div
                className="absolute right-6 bottom-6 z-0 bg-[#111827]/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
              >
                Exclusive B2B Summits
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
