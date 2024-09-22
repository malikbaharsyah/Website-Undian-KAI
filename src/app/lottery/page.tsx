"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ComboBox from "../components/ComboBox";
import Sidebar from "../components/Sidebar";

const events = [
  { value: "event1", label: "Event 1" },
  { value: "event2", label: "Event 2" },
  { value: "event3", label: "Event 3" },
];

const prizes = [
    { value: "prize1", label: "Prize 1" },
    { value: "prize2", label: "Prize 2" },
    { value: "prize3", label: "Prize 3" },
    ];

export default function Lottery() {
  const [step, setStep] = useState(1); // Manage step in the flow

  return (
    <div className="flex flex-row font-poppins bg-white text-black">
      <Sidebar />

      {step === 1 ? (
        <div className="p-6 space-y-6 flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-[#000072]">Lottery</h1>
          <p className="text-muted-foreground">
            Make sure the events and participants already exist.
          </p>

          <div className="space-y-4 flex-1">
            <h2 className="text-xl font-semibold">Select Event</h2>
            <ComboBox name="Event" comboBoxContents={events} />
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="border-[#000072] text-[#000072] hover:bg-[#000072] hover:text-white"
              onClick={() => setStep(step - 1)} // Disable or add functionality if needed
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              className="bg-[#000072] hover:bg-[#000072]/90 text-white"
              onClick={() => setStep(2)} // Go to the next step
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-6 flex-1 flex flex-col">
          <h1 className="text-3xl font-bold text-[#000072]">
            Jalan Sehat 17 Agustus
          </h1>

          <div className="space-y-4 flex-1">
            <h2 className="text-xl font-semibold">Select Prize</h2>
            <ComboBox name="Prize" comboBoxContents={prizes} />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Input Quantity(s)</h2>
              <p className="text-sm text-gray-400">Maximum x pcs.</p>
              <input
                type="number"
                defaultValue="0"
                className="border rounded-md px-3 py-2 w-[50px] text-center"
              />
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              className="border-[#000072] text-[#000072] hover:bg-[#000072] hover:text-white"
              onClick={() => setStep(1)} // Go back to Lottery page
            >
              Back
            </Button>
            <Button className="bg-[#000072] hover:bg-[#000072]/90 text-white">
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
