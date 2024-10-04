"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";
import Prize from "../components/interfaces/Prize";
import Event from "../components/interfaces/Event";
interface LotteryContextType {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  selectedEvent: Event | null;
  setSelectedEvent: Dispatch<SetStateAction<Event | null>>;
  qty: number;
  setQty: Dispatch<SetStateAction<number>>;
  selectedPrize: Prize | null;
  setSelectedPrize: Dispatch<SetStateAction<Prize | null>>;
}

const LotteryContext = createContext<LotteryContextType | undefined>(undefined);

export const useLottery = () => {
  const context = useContext(LotteryContext);
  if (!context) {
    throw new Error("useLottery must be used within a LotteryProvider");
  }
  return context;
};

export const LotteryProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [qty, setQty] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const value: LotteryContextType = {
    step,
    setStep,
    selectedEvent,
    setSelectedEvent,
    selectedPrize,
    setSelectedPrize,
    qty,
    setQty,
  };

  return (
    <LotteryContext.Provider value={value}>
      {children}
    </LotteryContext.Provider>
  );
};
