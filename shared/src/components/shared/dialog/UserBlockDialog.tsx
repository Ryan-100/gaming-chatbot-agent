'use client';
import React from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../ui/dialog';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { Box, Flex, Text } from '@radix-ui/themes';
import { toast } from 'sonner';

const radioOptions = [
  {
    value: 'Harassment or Toxic Behavior',
    label: 'Harassment or Toxic Behavior',
  },
  { value: 'Cheating or Exploiting', label: 'Cheating or Exploiting' },
  { value: 'Incompatibility', label: 'Incompatibility' },
  {
    value: 'Spamming or Excessive Communication',
    label: 'Spamming or Excessive Communication',
  },
  { value: 'other', label: 'Other' },
];

interface UserBlockProps {
  open: boolean;
  title: string;
  message: string;
  onClose: (result: boolean) => void;
  onSubmit: (result: string) => void;
  isLoading?: boolean;
}

export const UserBlockDialog: React.FC<UserBlockProps> = ({
  open,
  title,
  message,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [selectedReason, setSelectedReason] = React.useState('');
  const [detail, setDetail] = React.useState('');
  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle>{title}</DialogTitle>
        <Box>
          <Flex direction={'column'} className="">
            <Text className="text-xs pb-4">{message}</Text>
            <Text className="font-semibold text-xs">
              Please provide some valid reasons for blocking.
            </Text>
          </Flex>
          <RadioGroup
            value={selectedReason}
            onValueChange={setSelectedReason}
            className="mt-4"
          >
            {radioOptions.map((item, key) => (
              <Flex className="items-center space-x-2" key={key}>
                <RadioGroupItem value={item.value} />
                <Label className="text-xs">{item.label}</Label>
              </Flex>
            ))}
          </RadioGroup>
          {selectedReason === 'other' && (
            <Input
              placeholder="Can you give more details?"
              value={detail}
              max={100}
              maxLength={100}
              onChange={(e) => setDetail(e.target.value)}
              className="mt-2"
            />
          )}
        </Box>
        <DialogFooter>
          <Flex gap="4">
            <Button
              variant="link"
              className="text-text-primary"
              onClick={() => onClose(false)}
            >
              Cancel
            </Button>
            <Button
              disabled={selectedReason === 'other' ? !detail : !selectedReason}
              loading={isLoading}
              onClick={() => {
                if (selectedReason === 'other') {
                  if (detail.length <= 100) {
                    onSubmit(detail);
                  } else {
                    toast.error('Detail should be maximum 100 chars.');
                  }
                } else {
                  onSubmit(selectedReason);
                }
              }}
            >
              Block
            </Button>
          </Flex>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
