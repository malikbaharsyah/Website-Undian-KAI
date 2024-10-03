"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

import SelectEventPage from "../components/pages/SelectEventPage";
import SelectPrizePage from "../components/pages/SelectPrizePage";

export default function Lottery() {
  const [step, setStep] = useState(1);
  const [selectedEventId, setSelectedEventId] = useState(0);

  return (
    <div className="flex flex-row font-poppins bg-white text-black">
      <Sidebar />

      {step === 1 ? (
        <SelectEventPage setStep={setStep} step={step} setSelectedEventId={setSelectedEventId} />
      ) : (
        <SelectPrizePage setStep={setStep} step={step} selectedEventId={selectedEventId}/>
      )}
    </div>
  );
}
