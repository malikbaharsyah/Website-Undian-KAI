import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";

interface ComboBoxContent {
  value: string;
  label: string;
}

interface ComboBoxProps {
  name: string;
  comboBoxContents: ComboBoxContent[];
  onChange: (value: number | null) => void;
}

export default function ComboBox({ name, comboBoxContents, onChange }: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  if (!Array.isArray(comboBoxContents) || comboBoxContents.length === 0) {
    return <div className="text-center pt-4">
      No {name} available.</div>;
  }

  const handleSelect = (selectedValue: string) => {
    const newValue = selectedValue === value ? "" : selectedValue;
    setValue(newValue);
    onChange(newValue ? parseInt(newValue, 10) : null);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[400px] justify-between"
        >
          {value
            ? comboBoxContents.find((item) => item.value === value)?.label || `Select ${name}...`
            : `Select ${name}...`}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${name}...`} />
          <CommandList>
            <CommandEmpty>No {name} found.</CommandEmpty>
            <CommandGroup>
              {comboBoxContents.map((comboBoxContent) => (
                <CommandItem
                  key={comboBoxContent.value}
                  onSelect={() => handleSelect(comboBoxContent.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === comboBoxContent.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {comboBoxContent.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
