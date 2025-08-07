import * as React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { cn } from '../../utils/cn';
import { Calendar } from './calendar';
import convertedTime from '../../utils/dayjs';
import { TIME_ZONE } from '../../lib/api';
import { DateTime } from 'luxon';
import dayjs from 'dayjs';

interface DatePickerProps {
  date?: Date | undefined;
  setDate?: (date: Date | undefined) => void;
  className?: string;
  dateFormat?: string;
  label?: string;
  preFix?: boolean;
  disabled?: boolean;
  postFix?: boolean;
  showTimePicker?: boolean; // New prop to control time picker visibility
}

export const DatePicker: React.FC<DatePickerProps> = ({
  date,
  setDate,
  className,
  dateFormat,
  label,
  disabled,
  preFix = true,
  postFix,
  showTimePicker = false, // Default to false
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date
  );

  const [time, setTime] = React.useState<string | undefined>(undefined);

  const handleDateSelect = (date: Date | undefined) => {
    if (showTimePicker) {
      setSelectedDate(date);
    } else if (setDate) {
      setDate(date); // Set date immediately if no time picker
      setIsOpen(false);
    }
  };
  React.useEffect(() => {
    setSelectedDate(date);
    if (date && showTimePicker) {
      setTime(dayjs(date).format('HH:mm'));
    }
  }, [date]);

  const handleSave = () => {
    if (setDate && selectedDate) {
      const updatedDate = new Date(selectedDate);
      if (time) {
        const [hours, minutes] = time.split(':');
        updatedDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      }
      setDate(updatedDate);
    }
    setIsOpen(false);
  };

  return (
    <Popover modal={true} open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            postFix && 'flex items-center justify-between',
            disabled && 'cursor-not-allowed text-text-secondary',
            className
          )}
        >
          {preFix && !postFix && <CalendarIcon className="mr-2 h-4 w-4" />}
          {date && showTimePicker ? (
            dayjs(date).format(dateFormat ? dateFormat : 'PPP')
          ) : date && !showTimePicker ? (
            convertedTime(date).format(dateFormat ? dateFormat : 'PPP')
          ) : (
            <span>{label ?? 'Pick a date'}</span>
          )}
          {postFix && <CalendarIcon className="ml-2 h-4 w-4" />}
        </Button>
      </PopoverTrigger>
      {!disabled && (
        <PopoverContent className="w-auto p-2 flex flex-col">
          <Calendar
            mode="single"
            disabled={disabled}
            selected={
              selectedDate &&
              DateTime.fromJSDate(selectedDate, { zone: TIME_ZONE })
                .setZone('local', { keepLocalTime: true })
                .toJSDate()
            }
            onSelect={(day) => {
              if (!day) return handleDateSelect(undefined);

              const manipulated = DateTime.fromJSDate(day)
                .setZone(TIME_ZONE, { keepLocalTime: true })
                .toJSDate();
              handleDateSelect(manipulated);
            }}
            initialFocus
          />
          {showTimePicker && (
            <>
              <input
                type="time"
                className="mt-2 w-full border border-gray-300 rounded p-2"
                value={time}
                defaultValue={time}
                onChange={(e) => setTime(e.target.value)}
                disabled={disabled}
              />
              <Button onClick={handleSave} className="mt-2">
                Save
              </Button>
            </>
          )}
        </PopoverContent>
      )}
    </Popover>
  );
};
