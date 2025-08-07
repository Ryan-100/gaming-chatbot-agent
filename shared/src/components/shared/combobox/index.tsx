'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '../../../utils/cn';
import { Button } from '../../ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';

interface Options {
  value: string;
  label: string;
  dropdown: string | JSX.Element;
}

interface ComboboxProps {
  options: Options[];
  placeholder?: string;
  multiple?: boolean;
  onSearch: (keyword: string) => void;
  value: string[] | undefined;
  setValue: (item: string[]) => void;
  className?: string;
}
const Combobox: React.FC<ComboboxProps> = ({
  options,
  placeholder = 'Select',
  onSearch,
  value = [], // Default to an empty array
  setValue,
  className = '',
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSearch = (keyword: string) => {
    onSearch(keyword);
  };

  const handleSelect = (currentValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(currentValue)
      ? currentValues.filter((v) => v !== currentValue) // Remove if already selected
      : [...currentValues, currentValue]; // Add if not selected
    setValue(newValues); // Always set multiple values
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[200px] justify-between ${className}`}
        >
          {value.length > 0
            ? value
                .map(
                  (val) => options.find((option) => option.value === val)?.label
                )
                .join(', ')
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command className="w-full" shouldFilter={false}>
          <CommandInput
            placeholder={placeholder}
            onValueChange={handleSearch}
            className="w-full"
          />
          <CommandList className="w-full">
            {options.length < 1 ? (
              <CommandEmpty> No Data </CommandEmpty>
            ) : (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                  >
                    <Check
                      className={cn(
                        'mr-2 h-4 w-4',
                        value.includes(option.value)
                          ? 'opacity-100'
                          : 'opacity-0'
                      )}
                    />
                    {option.dropdown}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Combobox;
