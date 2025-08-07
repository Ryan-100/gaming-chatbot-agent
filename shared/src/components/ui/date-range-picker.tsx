'use client';

import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Button } from './button';
import { Calendar } from './calendar';
import { cn } from '../../utils/cn';
import { DateTime } from 'luxon';
import { TIME_ZONE } from '../../lib/api';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  dates?: DateRange | undefined;
  setDates?: (dates: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  dates,
  setDates,
}: DateRangePickerProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !dates && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dates?.from ? (
              dates.to ? (
                <>
                  {format(dates.from, 'LLL dd, y')} -{' '}
                  {format(dates.to, 'LLL dd, y')}
                </>
              ) : (
                format(dates.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dates?.from}
            selected={
              dates && {
                from: dates.from
                  ? DateTime.fromJSDate(dates.from, { zone: TIME_ZONE })
                      .setZone('local', { keepLocalTime: true })
                      .toJSDate()
                  : undefined,
                to: dates.to
                  ? DateTime.fromJSDate(dates.to, { zone: TIME_ZONE })
                      .setZone('local', { keepLocalTime: true })
                      .toJSDate()
                  : undefined,
              }
            }
            onSelect={setDates}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
