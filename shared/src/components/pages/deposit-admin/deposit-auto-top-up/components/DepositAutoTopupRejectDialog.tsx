import React from 'react';
import dayjs from '../../../../../utils/dayjs';
import { toast } from 'sonner';
import { Flex, Text, Tooltip } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Label } from '../../../../ui/label';
import { Icons } from '../../../../ui/icons';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Input } from '../../../../ui/input';
import { DepositRecordHistoryListData } from '../../../../../types/deposit-auto-top-up.types';
import { useRejectTransactionsDepositMutation } from '../../../../../stores/reducers/transactions-deposit.reducer';

interface DepositAutoTopupRejectDialogProps {
  data: DepositRecordHistoryListData;
  open: boolean;
  onClose: () => void;
}

const radioOptions = [
  { label: 'Fake Payment Screenshot', value: 'Fake Payment Screenshot' },
  { label: 'Wrong Transaction ID', value: 'Wrong Transaction ID' },
  { label: 'Server Maintenance', value: 'Server Maintenance' },
  { label: 'Wallet Error', value: 'Wallet Error' },
  { label: 'Other', value: 'Other' },
];

export const DepositAutoTopupRejectDialog: React.FC<
  DepositAutoTopupRejectDialogProps
> = ({ data, open, onClose }) => {
  const [selectedReason, setSelectedReason] = React.useState('');
  const [detail, setDetail] = React.useState('');

  const [rejectAction, { isLoading }] = useRejectTransactionsDepositMutation();

  const rejectHandler = async (reason: string) => {
    try {
      const response = await rejectAction({
        id: data.id,
        data: { reason: reason },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Deposit Reject</DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <div>
          <div className="text-xs pb-4">
            Are you sure you want to reject this deposit amount?
          </div>

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
        </div>
        <DialogFooter>
          <Flex gap="4">
            <Button
              variant="link"
              className="text-text-primary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={selectedReason === 'Other' ? !detail : !selectedReason}
              loading={isLoading}
              variant={'destructive'}
              onClick={() => {
                if (selectedReason === 'Other') {
                  if (detail.length <= 100) {
                    rejectHandler(detail);
                  } else {
                    toast.error('Detail should be maximum 100 chars.');
                  }
                } else {
                  rejectHandler(selectedReason);
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
