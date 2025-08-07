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
import { useCreateDepositWithdrawAmountMutation } from '../../../../../stores/reducers/deposit-withdraw-amount.reducer';
import {
  CreateDepositWithdrawAmountForm,
  createDepositWithdrawAmountSchema,
} from '../../../../../types/deposit-withdraw-amount.types';

interface CreateAmountDialogProps {
  type: string;
  open: boolean;
  onClose: () => void;
}

export const CreateAmountDialog: React.FC<CreateAmountDialogProps> = ({
  type,
  open,
  onClose,
}) => {
  const form = useForm<CreateDepositWithdrawAmountForm>({
    resolver: zodResolver(createDepositWithdrawAmountSchema),
  });

  const [createDepositWithdrawAmount, { isLoading }] =
    useCreateDepositWithdrawAmountMutation();

  const resetForm = () => {
    form.reset({
      amount: 0,
      type: '',
    });
    onClose();
  };

  const submit = async (submittedData: { amount: number }) => {
    try {
      const response = await createDepositWithdrawAmount({
        ...submittedData,
        type,
        deposit: true,
        withdraw: true,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        resetForm();
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

          <Button variant={'link'} className="p-0" onClick={resetForm}>
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
                    {type === 'FIAT' ? type.toLocaleLowerCase() : 'USDT'} amount
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
                onClick={resetForm}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form?.formState?.isValid}
                loading={isLoading}
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
