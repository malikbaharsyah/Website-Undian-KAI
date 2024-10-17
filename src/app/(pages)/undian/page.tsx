"use client"

import Sidebar from "../../components/Sidebar";
import SelectEventPage from "./SelectEventPage";
import SelectPrizePage from "./SelectPrizePage";
import StartLotteryPage from "./StartLotteryPage";
import {useLottery, LotteryProvider } from "./LotteryContext";
import React from "react";

export default function Lottery() {
  return (
    <LotteryProvider>
      <div className="flex flex-row font-poppins bg-white text-black">
        <Sidebar />
        <LotteryContent />
      </div>
    </LotteryProvider>
  );
}

function LotteryContent() {
  const { step } = useLottery();

  return (
    <>
      {step === 1 && <SelectEventPage />}
      {step === 2 && <SelectPrizePage />}
      {step === 3 && <StartLotteryPage />}
    </>
  );
}
