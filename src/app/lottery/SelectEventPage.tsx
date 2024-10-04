import ComboBox from "../components/ComboBox";
import { Button } from "@/components/ui/button";
import Event from "../components/interfaces/Event";
import { useEffect, useState } from "react";
import fetchAPI from "../components/hooks/fetchAPI";
import { useLottery } from "./LotteryContext";

// interface SelectEventPageProps {
//   setStep: (step: number) => void;
//   step: number;
// }


export default function SelectEventPage(): JSX.Element {
    const [events, setEvents] = useState<Event[]>([]);
    const [eventOptions, setEventOptions] = useState([]);
    const { setStep, step, setSelectedEvent } = useLottery();

    useEffect(() => {
        fetchAPI("/events")
        .then((data) => {
            setEvents(data.data);
            const eventOptions = data.data.map((event: Event) => ({
                label: event.name,
                value: event.event_id.toString(),
            }));
            setEventOptions(eventOptions);
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);
    
    const handleEventChange = (value: number | null) => {
        if (value !== null) {
            const selectedEvent = events.find((event) => event.event_id === value);
            setSelectedEvent(selectedEvent ?? null);
        }
    }

    return (
        <div className="p-6 space-y-6 flex-1 flex flex-col">
            <h1 className="text-3xl font-bold text-[#000072]">Lottery</h1>
            <p className="text-muted-foreground">
                Make sure the events and participants already exist.
            </p>

            <div className="space-y-4 flex-1">
                <h2 className="text-xl font-semibold">Select Event</h2>
                <ComboBox
                    name="Event"
                    comboBoxContents={eventOptions}
                    onChange={handleEventChange}
                />
            </div>

            <div className="flex justify-between mt-8">
                <Button
                variant="outline"
                className="border-[#000072] text-[#000072] hover:bg-[#000072] hover:text-white"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                >
                Back
                </Button>
                <Button
                className="bg-[#000072] hover:bg-[#000072]/90 text-white"
                onClick={() => setStep(2)}
                >
                Next
                </Button>
            </div>
        </div>
    );
}
