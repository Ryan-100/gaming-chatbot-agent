'use client';
import React from 'react';
import { Flex, Text, Box } from '@radix-ui/themes';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { Checkbox } from '../../../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { DatePicker } from '../../../ui/date-picker';
import { Card } from '../../../ui/card';

const propabilitiesData = [
  {
    label: 'Random',
    value: 'random',
  },
  {
    label: 'Fair',
    value: 'fair',
  },
  {
    label: 'Weight',
    value: 'weight',
  },
];

const timeUnits = [
  {
    label: 'Days',
    value: 'days',
  },
  {
    label: 'Hours',
    value: 'hours',
  },
  {
    label: 'Minutes',
    value: 'minutes',
  },
];
interface PocketMoneyFormProps {
  title: string;
}

export const PocketMoneyForm: React.FC<PocketMoneyFormProps> = ({ title }) => {
  const [selectedValue, setSelectedValue] = React.useState('Levels');
  return (
    <Flex direction="column" className="space-y-6 mb-6">
      <Box className="space-y-2">
        <Text className="text-base font-medium">Send to</Text>
        <RadioGroup
          className="flex items-center space-x-10 text-base"
          value={selectedValue}
          onValueChange={setSelectedValue}
        >
          <Flex className="items-center space-x-2">
            <RadioGroupItem value="Levels" id="Levels" />
            <Label className="text-base" htmlFor="Levels">
              Selected Levels
            </Label>
          </Flex>
          <Flex className="items-center space-x-2">
            <RadioGroupItem value="Players" id="Players" />
            <Label className="text-base" htmlFor="Players">
              Selected Players
            </Label>
          </Flex>
        </RadioGroup>
      </Box>
      <form className="space-y-6">
        <Card className="p-4 divide-y divide-input space-y-1">
          <Box className="pb-2">
            <Text className="text-base font-bold">{title}</Text>
          </Box>
          <Flex direction="column" className="py-4 space-y-4">
            <Text className="text-sm font-semibold">
              Pocket Money Information
            </Text>
            <Flex justify="between" align="center" className="space-x-10">
              <Box className="space-y-2 flex-1">
                <Text className="text-xs">Title</Text>
                <Input placeholder="Enter title for pocket money" />
              </Box>
              {selectedValue === 'Levels' && (
                <Box className="space-y-2 flex-1">
                  <Text className="text-xs">Pocket Money Propability</Text>
                  <Select defaultValue="random">
                    <SelectTrigger>
                      <SelectValue placeholder="Select propabilty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {propabilitiesData.map((data) => (
                          <SelectItem key={data.value} value={data.value}>
                            {data.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Box>
              )}
            </Flex>
            <Box className="space-y-2">
              <Text className="text-xs">Valid Player Levels</Text>
              <Flex align="center" className="col-span-1 space-x-2 py-2">
                <Checkbox
                  id="all"
                  className="border border-secondary text-text-invert"
                  // checked={selectAll}
                  // onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="all" className="font-medium text-xs">
                  All Levels
                </Label>
              </Flex>
              <Box className="!grid !grid-cols-4 gap-4">
                {[...Array(8)].map((_, index) => (
                  <Box className="col-span-1 !flex items-center space-x-2">
                    <Checkbox
                      id={`check-box-${index + 1}`}
                      className="border border-secondary text-text-invert"
                    />
                    <Label
                      htmlFor={`check-box-${index + 1}`}
                      className="font-medium text-xs"
                    >
                      Level - {index + 1}
                    </Label>
                  </Box>
                ))}
              </Box>
            </Box>
            {selectedValue === 'Levels' && (
              <Flex
                direction="column"
                className="bg-surface-accentLight p-4 space-y-1"
              >
                <Text className="text-sm">Pocket Money is Random!</Text>
                <Text className="text-xs">
                  All players will get random pocket money value specified as
                  the following.
                </Text>
              </Flex>
            )}
            {selectedValue === 'Players' && (
              <Box className="space-y-2 flex-1">
                <Text className="text-xs">Players</Text>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Players" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="undefined">No Data</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Box>
            )}
          </Flex>
          <Flex direction="column" className="py-4 space-y-4">
            <Text className="text-sm font-semibold">Pocket Money Period</Text>
            <Flex justify="between" align="center" className="space-x-10">
              <Box className="space-y-2 flex-1">
                <Text as="p" className="text-xs">
                  Start Date
                </Text>
                <DatePicker
                  postFix
                  label="Start from"
                  className="w-full bg-surface-secondary"
                />
              </Box>
              <Box className="space-y-2 flex-1">
                <Text as="p" className="text-xs">
                  End Date
                </Text>
                <DatePicker
                  postFix
                  label="End to"
                  className="w-full bg-surface-secondary"
                />
              </Box>
            </Flex>
            <Flex justify="between" align="end" className="space-x-2">
              <Box className="space-y-2 flex-1">
                <Text className="text-xs">
                  Pocket Money Reward Will Be Expired AFter
                </Text>
                <Input placeholder="Enter expired time" />
              </Box>
              <Box className="space-y-2 flex-2">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Time Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {timeUnits.map((data) => (
                        <SelectItem key={data.value} value={data.value}>
                          {data.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Box>
            </Flex>
          </Flex>
          <Flex direction="column" className="py-4 space-y-4">
            <Text className="text-sm font-semibold">PM Value & Count</Text>
            <Flex justify="between" align="center" className="space-x-10">
              <Box className="space-y-2 flex-1">
                <Text as="p" className="text-xs">
                  Total PM Value
                </Text>
                <Input placeholder="Enter value" />
              </Box>
              <Box className="space-y-2 flex-1">
                <Text as="p" className="text-xs">
                  Total Count
                </Text>
                <Input placeholder="Enter chance" />
              </Box>
            </Flex>
          </Flex>
        </Card>

        <Flex justify="end" align="center" className="space-x-4">
          <Flex align="center" className="space-x-2 mr-4">
            <Checkbox id="announce" className="border border-secondary text-text-invert" />
            <Label htmlFor="announce" className="font-medium text-sm">
              Announce in channel
            </Label>
          </Flex>
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={true}>Create</Button>
        </Flex>
      </form>
      {selectedValue === 'Players' && (
        <Box className="mt-4">
          <Text>Content for Selected Players</Text>
        </Box>
      )}
    </Flex>
  );
};

export default PocketMoneyForm;
