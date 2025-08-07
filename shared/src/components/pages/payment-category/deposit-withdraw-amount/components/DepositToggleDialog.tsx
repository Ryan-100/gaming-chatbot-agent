'use client';
import React from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { useUpdateDepositWithdrawAmountMutation } from '../../../../../stores/reducers/deposit-withdraw-amount.reducer';
import { DepositWithdrawAmountListData } from '../../../../../types/deposit-withdraw-amount.types';

interface DepositToggleDialogProps {
  data: DepositWithdrawAmountListData;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const DepositToggleDialog: React.FC<DepositToggleDialogProps> = ({
  data,
  open,
  onClose,
}) => {
  const [updateDepositWithdrawAmount, { isLoading }] =
    useUpdateDepositWithdrawAmountMutation();

  const handleToggleAmount = async () => {
    try {
      const response = await updateDepositWithdrawAmount({
        id: data?.id,
        data: {
          amount: data?.amount,
          withdraw: data?.withdraw,
          deposit: !data?.deposit,
        },
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    onClose(true);
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogTitle>{`${
          data?.deposit ? 'Hide' : 'Unhide'
        } Notification`}</DialogTitle>
        <DialogDescription>{`Would you like to ${
          data?.deposit ? 'hide' : 'unhide'
        } this amount for deposit?`}</DialogDescription>
        <DialogFooter>
          <Button
            variant="link"
            onClick={() => onClose(false)}
            className="text-gray-700 font-semibold mr-4"
          >
            Cancel
          </Button>
          <Button onClick={handleToggleAmount} loading={isLoading} autoFocus>
            {`${data?.deposit ? 'Hide' : 'Unhide'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
