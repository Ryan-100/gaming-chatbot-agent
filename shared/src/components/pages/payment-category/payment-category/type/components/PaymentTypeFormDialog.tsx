'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../../ui/dialog';
import { Button } from '../../../../../ui/button';
import { RadioGroup, RadioGroupItem } from '../../../../../ui/radio-group';
import { Label } from '../../../../../ui/label';
import { Input } from '../../../../../ui/input';
import { Icons } from '../../../../../ui/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import {
  CreatePaymentTypeForm,
  createPaymentTypeSchema,
} from '../../../../../../types/payment-type.types';
import {
  useCreatePaymentTypeMutation,
} from '../../../../../../stores/reducers/payment-type.reducer';
import { toast } from 'sonner';
import {
  Checkbox,
} from '../../../../../ui/checkbox';

interface PaymentTypeFormDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  yesLabel?: string;
}

const currencyOptions = [
  {
    label: "Fiat",
    value: "Fiat",
  },
  {
    label: "Crypto",
    value: "Crypto",
  },
]

export const PaymentTypeFormDialog: React.FC<
  PaymentTypeFormDialogProps
> = ({  open, title, onClose, yesLabel = 'Create' }) => {
  const form = useForm<CreatePaymentTypeForm>({
    resolver: zodResolver(createPaymentTypeSchema),
    // defaultValues: data && createPaymentTypeSchema.parse(data),
  });

  const [createPaymentType] = useCreatePaymentTypeMutation();

  const [selectedCurrency, setSelectedCurrency] = useState<string>("Fiat");

  const submit = async (submittedData: CreatePaymentTypeForm) => {
    try {
      const dataToSend = {
        ...submittedData,
        isCrypto: submittedData.isCrypto === "Crypto",
        useNetwork: submittedData.useNetwork === "true"
      };

      const response = await createPaymentType(dataToSend);

      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        form.reset();
        onClose();
      } else {
        const error: any= response?.error;
        toast.error(error?.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <Dialog open={open}>
      <DialogContent>
        <Flex justify={"between"} align={"center"} >
          <DialogTitle> {title} </DialogTitle>

          <Button
            variant={"link"}
            className='p-0'
            onClick={onClose}
          >
            <Icons.Cross
              className="w-6 h-6 text-black"
            />
          </Button>
        </Flex>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="flex flex-col space-y-4 text-xs"
          >

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter type For payment category" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isCrypto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Accepted Currency</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex items-center justify-between"
                      value={field.value === "Crypto" ? "Crypto"  
                        : field.value === undefined ? "" 
                        : "Fiat"}
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCurrency(value);
                      }}
                    >
                      {
                        currencyOptions.map((item, index) => (
                          <Box
                            className="w-1/2 flex items-center space-x-2"
                            key={index}
                          >
                            <RadioGroupItem value={item.value} id="Yes" />
                            <Label className="text-xs" htmlFor="Yes">
                              {item.label}
                            </Label>
                          </Box>
                        ))
                      }
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            {
              selectedCurrency === "Crypto" && (
                <FormField
                  control={form.control}
                  name="useNetwork"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Flex
                          align="center"
                          className="text-xs font-medium space-x-2"
                        >
                          <Checkbox
                            value={(field.value === "true" || field.value === true) ? "true" : "false"}
                            onCheckedChange={(value) => {
                              field.onChange(value ? "true" : "false");
                            }}
                            id="check-box"
                            className="border-background"
                          />
                          <Label
                            htmlFor="check-box"
                            className="font-medium text-xs"
                          >
                            Use Crypto Network
                          </Label>
                        </Flex>
                      </FormControl>
                    </FormItem>
                  )}
                />
              )
            }

            <DialogFooter>
              <Button
                variant="link"
                type="button"
                onClick={() => {
                  form.reset()
                  onClose()
                }}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" autoFocus>
                {yesLabel}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
