'use client';
import React from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Box } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import { Icons } from '../../../../ui/icons';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import MultiSelect from '../../../../ui/multi-select';
import { IOptions } from '../../../../../types/base.types';
import { useGetPaymentCategoryQuery } from '../../../../../stores/reducers/payment-category.reducer';
import { useCreateDepositAdminMutation } from '../../../../../stores/reducers/deposit-admin.reducer';
import {
  CreateDepositAdminForm,
  createDepositAdminSchema,
} from '../../../../../types/deposit-admin.types';
import { useGetPaymentManagementsByCategoryQuery } from '../../../../../stores/reducers/payment-management.reducer';
import { PaymentManagementListData } from '../../../../../types/payment-management.types';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Label } from '../../../../ui/label';

interface CreateDepositAdminDialogProps {
  open: boolean;
  onClose: (result: boolean) => void;
}

const validationSchema = createDepositAdminSchema.extend({
  category: z.string().min(1),
});
export const CreateDepositAdminDialog: React.FC<
  CreateDepositAdminDialogProps
> = ({ open, onClose }) => {
  const form = useForm<CreateDepositAdminForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      isActive: true,
    },
  });

  const [selectedCategoryId, setSelectedCategoryId] = React.useState('');

  const { data: paymentCategoryData } = useGetPaymentCategoryQuery({});
  const [createDepositAdmin] = useCreateDepositAdminMutation();

  const { data: paymentManagementAccountsByCategory } =
    useGetPaymentManagementsByCategoryQuery({ id: selectedCategoryId });

  const resetForm = () => {
    form.reset({
      name: '',
      password: '',
      category: '',
      paymentAccountIds: [],
      isActive: false,
    });
    setSelectedCategoryId('');
  };

  const closeHandler = () => {
    resetForm();
    onClose(false);
  };

  const submit = async (data: CreateDepositAdminForm) => {
    const adminData: CreateDepositAdminForm = {
      name: data.name,
      password: data.password,
      paymentAccountIds: data.paymentAccountIds.map(
        (account) => account.value
      ) as string[],
      isActive: data.isActive,
    };
    try {
      const response = await createDepositAdmin(adminData);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    closeHandler();
  };

  return (
    <Dialog open={open}>
      <DialogContent className="">
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Create Deposit Admin</DialogTitle>
          <Button
            variant={'link'}
            className="p-0"
            onClick={() => closeHandler()}
          >
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
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex items-center justify-between"
                      value={String(field.value)}
                      onValueChange={(value) =>
                        field.onChange(value === 'true')
                      }
                    >
                      <Box className="w-1/2 flex items-center space-x-2">
                        <RadioGroupItem value="true" id="Yes" />
                        <Label className="text-xs" htmlFor="Yes">
                          Active
                        </Label>
                      </Box>
                      <Box className="w-1/2 flex items-center space-x-2 justify-start">
                        <RadioGroupItem value="false" id="No" />
                        <Label className="text-xs" htmlFor="No">
                          Inactive
                        </Label>
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Name" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="Enter Password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Category</FormLabel>
                  <FormControl className="w-fit min-w-[270px] max-w-[270px] md:w-[432px] md:max-w-full">
                    <Select
                      value={field.value}
                      onValueChange={(id) => {
                        field.onChange(id);
                        setSelectedCategoryId(id);
                        form.setValue('paymentAccountIds', []);
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {paymentCategoryData?.body &&
                            paymentCategoryData.body.data.map((category) => (
                              <SelectItem value={category?.id}>
                                {category?.accountType}
                              </SelectItem>
                            ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentAccountIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Account</FormLabel>
                  <FormControl className="w-fit min-w-[270px] max-w-[270px] md:w-[432px] md:max-w-full">
                    <MultiSelect
                      data={
                        selectedCategoryId &&
                        paymentManagementAccountsByCategory?.body
                          ? paymentManagementAccountsByCategory.body.data.map(
                              (account: PaymentManagementListData) => ({
                                value: account.id,
                                label: (
                                  <Flex align={'center'} justify={'between'}>
                                    <p>
                                      {account.accountNumber}&nbsp;•&nbsp;
                                      {account?.accountName}
                                    </p>
                                    <p className="text-text-secondary">
                                      {account?.PlayerLevel?.name}
                                    </p>
                                  </Flex>
                                ),
                              })
                            )
                          : []
                      }
                      value={field.value as IOptions[]}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="link"
                onClick={() => closeHandler()}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                autoFocus
                disabled={!form.formState.isValid}
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
