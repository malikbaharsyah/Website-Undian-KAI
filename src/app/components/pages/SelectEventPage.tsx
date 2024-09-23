import ComboBox from "../ComboBox";
import { Button } from "@/components/ui/button";
import Event from "../interfaces/Event";

interface SelectEventPageProps {
  setStep: (step: number) => void;
  events: Event[];
  step: number;
}

export default function SelectEventPage({ setStep, events, step }: SelectEventPageProps): JSX.Element {
    const eventOptions = events.map((event) => ({
        label: event.name,
        value: event.event_id.toString(),
    }));
    return (
        <div className="p-6 space-y-6 flex-1 flex flex-col">
            <h1 className="text-3xl font-bold text-[#000072]">Lottery</h1>
            <p className="text-muted-foreground">
                Make sure the events and participants already exist.
            </p>

            <div className="space-y-4 flex-1">
                <h2 className="text-xl font-semibold">Select Event</h2>
                <ComboBox name="Event" comboBoxContents={eventOptions} />
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

