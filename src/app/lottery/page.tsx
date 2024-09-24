"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";

import SelectEventPage from "../components/pages/SelectEventPage";
import SelectPrizePage from "../components/pages/SelectPrizePage";
import StartLotteryPage from "../components/pages/StartLotteryPage";

const events = [
  { event_id: 1, name: "Jalan Sehat 17 Agustus", list_prize_id: 1, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 2, name: "Jalan Sehat 18 Agustus", list_prize_id: 2, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 3, name: "Jalan Sehat 19 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 4, name: "Jalan Sehat 20 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 5, name: "Jalan Sehat 21 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 6, name: "Jalan Sehat 22 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 7, name: "Jalan Sehat 23 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 8, name: "Jalan Sehat 24 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 9, name: "Jalan Sehat 25 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 10, name: "Jalan Sehat 26 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 11, name: "Jalan Sehat 27 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 12, name: "Jalan Sehat 28 Agustus", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
  { event_id: 13, name: "Jalan Sehat 29 Maret", list_prize_id: 3, operating_area: "Jakarta", start_date: new Date(), end_date: new Date() },
];

const prizes = [
    { prize_id: 1, name: "Honda Civic", quantity: 2, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 2, name: "Toyota Avanza", quantity: 1, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 3, name: "Suzuki Ertiga", quantity: 3, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 4, name: "Daihatsu Xenia", quantity: 5, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 5, name: "Mitsubishi Xpander", quantity: 1, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 6, name: "Honda Brio", quantity: 7, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 7, name: "Toyota Agya", quantity: 1, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 8, name: "Suzuki Ignis", quantity: 2, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 9, name: "Daihatsu Sigra", quantity: 2, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 10, name: "Mitsubishi Mirage", quantity: 2, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 11, name: "Honda Jazz", quantity: 2, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 12, name: "Toyota Yaris", quantity: 2, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 13, name: "Suzuki Baleno", quantity: 2, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
    { prize_id: 14, name: "Daihatsu Sirion", quantity: 2, image: "https://via.placeholder.com/150", operating_area: "Jakarta" },
];

export default function Lottery() {
  const [step, setStep] = useState(1);

  return (
    <div className="flex flex-row font-poppins bg-white text-black">
      <Sidebar />

      {step === 1 && (
        <SelectEventPage setStep={setStep} events={events} step={step} />
      ) }
      {step === 2 && (
        <SelectPrizePage setStep={setStep} prizes={prizes} step={step}/>
      ) }
      {step === 3 && (
        <StartLotteryPage setStep={setStep} step={step} numOfWinners={6}/>
      )}
    </div>
  );
}
