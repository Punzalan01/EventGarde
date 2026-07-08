import React, { useState } from "react";
import { motion } from "framer-motion";
// I'll provide a local cn if needed, or assume it's in shared/utils
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function localCn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Card = {
  id: number;
  content: JSX.Element | React.ReactNode | string;
  className: string;
  thumbnail: string;
  title?: string;
  description?: string;
  date?: string;
};

export const LayoutGrid = ({ cards }: { cards: Card[] }) => {
  const [selected, setSelected] = useState<Card | null>(null);
  const [lastSelected, setLastSelected] = useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-4 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={localCn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={localCn(
              card.className,
              "relative overflow-hidden",
              selected?.id === card.id
                ? "rounded-2xl cursor-pointer fixed inset-0 h-1/2 w-full md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col"
                : lastSelected?.id === card.id
                ? "z-40 bg-white rounded-2xl h-full w-full group"
                : "bg-white rounded-2xl h-full w-full group cursor-pointer"
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
            {selected?.id !== card.id && (card.title || card.description) && (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none z-20" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 pointer-events-none flex flex-col justify-end z-30 transition-transform duration-300 group-hover:-translate-y-1">
                  {card.title && <h3 className="text-white font-bold text-xl md:text-2xl drop-shadow-md">{card.title}</h3>}
                  {card.description && <p className="text-white/80 text-sm mt-1 line-clamp-1">{card.description}</p>}
                </div>
                {card.date && (
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md rounded-lg px-3 py-1.5 z-30 pointer-events-none border border-white/10 shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <p className="text-white font-bold text-xs uppercase tracking-wider">{card.date}</p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={localCn(
          "fixed inset-0 z-40",
          selected?.id ? "pointer-events-auto bg-black/40 backdrop-blur-sm" : "pointer-events-none bg-transparent"
        )}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: Card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      className={localCn(
        "object-cover object-center absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105"
      )}
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }: { selected: Card | null }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-2xl shadow-2xl relative z-[60]">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10 rounded-2xl"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 100,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="absolute inset-0 p-4 md:p-8 z-[70] flex flex-col justify-end pointer-events-none"
      >
        <div className="pointer-events-auto w-full h-full relative flex flex-col justify-end">
          {selected?.content}
        </div>
      </motion.div>
    </div>
  );
};
