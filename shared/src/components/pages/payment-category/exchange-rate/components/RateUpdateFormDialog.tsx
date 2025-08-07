'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { InputAdornment } from '../../../../ui/input-adornment';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Icons } from '../../../../ui/icons';
import {
  CreateExchangeRateForm,
  createExchangeRateSchema,
} from '../../../../../types/exchange-rete.types';
import { toast } from 'sonner';
import { useUpdateExchangeRateMutation } from '../../../../../stores/reducers/exchange-rate.reducer';
import { Flex } from '@radix-ui/themes';

interface RateUpdateFormDialogProps {
  type: string;
  currency: string;
  open: boolean;
  onClose: () => void;
}

export const RateUpdateFormDialog: React.FC<RateUpdateFormDialogProps> = ({
  type,
  currency,
  open,
  onClose,
}) => {
  const form = useForm<CreateExchangeRateForm>({
    resolver: zodResolver(createExchangeRateSchema),
  });

  const [updateExchangeRate] = useUpdateExchangeRateMutation();

  const submit = async (submittedData: { amountPerUsdt: number }) => {
    console.log('submit work');
    try {
      const response = await updateExchangeRate({
        ...submittedData,
        action: type === 'Deposit' ? 'DEPOSIT' : 'WITHDRAW',
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        form.reset();
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
          <DialogTitle>Update {type} Rate</DialogTitle>

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
              name="amountPerUsdt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{currency} Amount in 1 USDT</FormLabel>
                  <FormControl>
                    <InputAdornment
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(parseFloat(event.target.value))
                      }
                      type="number"
                      placeholder="Enter amount"
                      endAdornment={currency}
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
              <Button type="submit" disabled={!form?.formState?.isValid}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
