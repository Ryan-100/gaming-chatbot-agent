'use client';
import React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../ui/dialog';
import { Button } from '../../../../../ui/button';
import { Input } from '../../../../../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import {
  PaymentSettingData,
  paymentSettingEditSchema,
} from '../../../../../../types/payment-settings.types';
import { unitOptions } from '../../../../../../data/UnitList';
import { useUpdatePaymentSettingMutation } from '../../../../../../stores/reducers/payment-settings.reducer';
type PaymentForm = z.infer<typeof paymentSettingEditSchema>;

interface PaymentSettingEditDialogProps {
  data?: PaymentSettingData;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const PaymentSettingEditDialog: React.FC<
  PaymentSettingEditDialogProps
> = ({ data, open, onClose }) => {
  const form = useForm<PaymentForm>({
    resolver: zodResolver(paymentSettingEditSchema),
    defaultValues: {
      paymentChangeTime: data?.paymentChangeTime,
      paymentChangeType: data?.paymentChangeType,
    },
  });

  const [updatePaymentSetting] = useUpdatePaymentSettingMutation();

  const submit = async (submittedData: PaymentForm) => {
    try {
      const response = await updatePaymentSetting({ data: submittedData });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    onClose(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent className="w-fit min-w-[270px] md:w-[480px] max-w-[480px]">
        <DialogTitle>Payment</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >
            <Flex align="end" className="gap-4">
              <FormField
                control={form.control}
                name="paymentChangeTime"
                render={({ field }) => (
                  <FormItem className="w-2/3">
                    <FormLabel>Payment Change Time</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        type="number"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentChangeType"
                render={({ field }) => (
                  <FormItem className="w-1/3">
                    <FormLabel>Unit</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value || ''}
                        onValueChange={(value) => field.onChange(value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {unitOptions.map((data) => (
                              <SelectItem key={data.value} value={data.value}>
                                {data.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Flex>
            <DialogFooter>
              <Button
                variant="link"
                type="button"
                onClick={() => onClose(false)}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" autoFocus>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
