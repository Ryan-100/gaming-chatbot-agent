'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Icons } from '../../../../ui/icons';
import { useUpdateDepositWithdrawAmountMutation } from '../../../../../stores/reducers/deposit-withdraw-amount.reducer';
import {
  DepositWithdrawAmountListData,
  UpdateDepositWithdrawAmountForm,
  updateDepositWithdrawAmountSchema,
} from '../../../../../types/deposit-withdraw-amount.types';

interface UpdateAmountDialogProps {
  data: DepositWithdrawAmountListData;
  open: boolean;
  onClose: () => void;
}

export const UpdateAmountDialog: React.FC<UpdateAmountDialogProps> = ({
  data,
  open,
  onClose,
}) => {
  const form = useForm<UpdateDepositWithdrawAmountForm>({
    resolver: zodResolver(updateDepositWithdrawAmountSchema),
    defaultValues: {
      amount: data?.amount,
    },
  });

  const [updateDepositWithdrawAmount, { isLoading }] =
    useUpdateDepositWithdrawAmountMutation();

  const submit = async (submittedData: { amount: number }) => {
    console.log('submit work');
    try {
      const response = await updateDepositWithdrawAmount({
        id: data?.id ?? '',
        data: submittedData,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        onClose();
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Deposit/ withdraw amount</DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {data?.type === 'FIAT'
                      ? data.type.toLocaleLowerCase()
                      : 'USDT'}{' '}
                    amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(parseFloat(event.target.value))
                      }
                      type="number"
                      placeholder="Enter amount"
                      step={'0.01'}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                variant="link"
                type="button"
                onClick={onClose}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form?.formState?.isValid}
                loading={isLoading}
              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
