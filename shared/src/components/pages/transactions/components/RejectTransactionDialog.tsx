'use client';
import React, { useState } from 'react';
import { Box, Flex, Text } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../ui/dialog';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { Label } from '../../../ui/label';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Icons } from '../../../ui/icons';
import { toast } from 'sonner';

interface RejectTransactionDialogProps {
  open: boolean;
  title: string;
  message?: string;
  onClose: (result: boolean) => void;
  onSubmit: (result: string) => void;
  isLoading?: boolean;
}

const radioOptions = [
  { label: 'Fake Payment Screenshot', value: 'Fake Payment Screenshot' },
  { label: 'Wrong Transaction ID', value: 'Wrong Transaction ID' },
  { label: 'Server Maintenance', value: 'Server Maintenance' },
  { label: 'Wallet Error', value: 'Wallet Error' },
  { label: 'Other', value: 'Other' },
];

export const RejectTransactionDialog: React.FC<
  RejectTransactionDialogProps
> = ({ open, title, message, onClose, onSubmit, isLoading = false }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [detail, setDetail] = useState('');

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>{title}</DialogTitle>

          <Button
            variant={'link'}
            className="p-0"
            onClick={() => onClose(false)}
          >
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Box>
          <div className="text-xs pb-4">{message}</div>

          <Text className="font-semibold text-xs">
            Please provide some valid reasons for rejection.
          </Text>
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
          {selectedReason === 'Other' && (
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
              disabled={selectedReason === 'Other' ? !detail : !selectedReason}
              loading={isLoading}
              onClick={() => {
                if (selectedReason === 'Other') {
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
              Reject
            </Button>
          </Flex>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
