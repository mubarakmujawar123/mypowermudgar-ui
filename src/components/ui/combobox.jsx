/* eslint-disable react/prop-types */
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const getImage = (options, value) => {
  const _imgSrc = options?.find((option) => option.value === value)?.imgSrc;
  if (_imgSrc) {
    return <img src={_imgSrc} height="40" width="40" alt={value} />;
  }
};

export function Combobox({
  options,
  defaultValue,
  placeholder,
  onValueChange,
  disabled = false,
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100%] justify-between font-normal"
          disabled={disabled}
        >
          <span className="flex items-center gap-2">
            {value ? getImage(options, value) : null}
            {value
              ? options?.find((option) => option.value === value)?.label
              : placeholder}
          </span>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height]p-0 popover-content-width-same-as-its-trigger">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No data found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  disabled={option.disabled ? true : false}
                >
                  {option.imgSrc ? (
                    <img
                      src={option.imgSrc}
                      height="50"
                      width="50"
                      alt={value}
                    />
                  ) : null}
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
