'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Box } from '@radix-ui/themes';
import { toast } from 'sonner';
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import MultiSelect from '../../../../ui/multi-select';
import { IOptions } from '../../../../../types/base.types';
import { useGetPaymentCategoryQuery } from '../../../../../stores/reducers/payment-category.reducer';
import { useUpdateWithdrawAdminMutation } from '../../../../../stores/reducers/withdraw-admin.reducer';
import {
  UpdateWithdrawAdminForm,
  updateWithdrawAdminSchema,
} from '../../../../../types/withdraw-admin.types';
import { useGetPaymentManagementsByCategoryQuery } from '../../../../../stores/reducers/payment-management.reducer';
import { PaymentManagementListData } from '../../../../../types/payment-management.types';
import { WithdrawAdminListData } from '../../../../../types/withdraw-admin.types';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Label } from '../../../../ui/label';
import { ChangePassDialog } from '../../../../shared/dialog/ChangePassDialog';

interface EditWithdrawAdminFormDialogProps {
  data?: WithdrawAdminListData;
  open: boolean;
  onClose: (result: boolean) => void;
}

export const EditWithdrawAdminFormDialog: React.FC<
  EditWithdrawAdminFormDialogProps
> = ({ data, open, onClose }) => {
  const form = useForm<UpdateWithdrawAdminForm>({
    resolver: zodResolver(
      updateWithdrawAdminSchema.refine(
        (data) => data.minAmount < data.maxAmount,
        {
          message: 'Minimum amount cannot exceed maximum amount.',
          path: ['minAmount'],
        }
      )
    ),
    defaultValues: {
      name: data?.name,
      agentCode: data?.agentCode,
      category:
        data?.WithdrawAccountHolder[0]?.PaymentAccount.paymentCategoryId,
      paymentAccountIds: data?.WithdrawAccountHolder.map((account) => ({
        value: account.PaymentAccount.id,
        label: account.PaymentAccount.accountNumber,
      })),
      minAmount: data?.WithdrawAccountHolder[0]?.minAmount,
      maxAmount: data?.WithdrawAccountHolder[0]?.maxAmount,
      isActive: data?.AdminStatus === 'ACTIVE',
    },
  });

  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string>(
    data?.WithdrawAccountHolder[0]?.PaymentAccount?.paymentCategoryId || ''
  );

  const { data: paymentCategoryData } = useGetPaymentCategoryQuery({});
  const [updateWithdrawAdmin] = useUpdateWithdrawAdminMutation();

  const { data: paymentManagementAccountsByCategory } =
    useGetPaymentManagementsByCategoryQuery({ id: selectedCategoryId });

  const submit = async (submittedData: UpdateWithdrawAdminForm) => {
    const adminData: UpdateWithdrawAdminForm = {
      name: submittedData.name,
      password: '',
      paymentAccountIds: submittedData.paymentAccountIds.map(
        (account) => account.value
      ) as string[],
      minAmount: submittedData.minAmount,
      maxAmount: submittedData.maxAmount,
      isActive: submittedData.isActive,
    };
    try {
      const response = await updateWithdrawAdmin({
        id: data?.id || '',
        data: adminData,
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

  const handlerChangePass = async (password: string) => {
    const adminData: UpdateWithdrawAdminForm = {
      name: data?.name ?? '',
      password: password,
      paymentAccountIds:
        data?.WithdrawAccountHolder.flatMap((item) => item.PaymentAccount.id) ??
        [],
      minAmount: data?.WithdrawAccountHolder[0]?.minAmount ?? 0,
      maxAmount: data?.WithdrawAccountHolder[0]?.maxAmount ?? 0,
      isActive: data?.isActive ?? true,
    };
    try {
      const response = await updateWithdrawAdmin({
        id: data?.id || '',
        data: adminData,
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
        <Flex justify={'between'} align={'center'}>
          <DialogTitle>Edit Withdraw Admin</DialogTitle>
          <Button
            variant={'link'}
            className="p-0"
            onClick={() => onClose(false)}
          >
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <ChangePassDialog onSubmit={handlerChangePass} />
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
              name="agentCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login ID</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Login ID" disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <FormField
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
            /> */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Category</FormLabel>
                  <FormControl  className="w-fit min-w-[270px] max-w-[270px] md:w-[432px] md:max-w-full">
                    <Select
                      value={field.value}
                      onValueChange={(id) => {
                        field.onChange(id);
                        setSelectedCategoryId(id);
                        form.setValue('paymentAccountIds', []);
                      }}
                      disabled
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
                  <FormControl  className="w-fit min-w-[270px] max-w-[270px] md:w-[432px] md:max-w-full">
                    <MultiSelect
                      data={
                        paymentManagementAccountsByCategory?.body
                          ? paymentManagementAccountsByCategory.body.data.map(
                              (account: PaymentManagementListData) => ({
                                value: account.id,
                                label: account.accountNumber,
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
            <Flex className="gap-4 flex-col sm:flex-row">
              <FormField
                control={form.control}
                name="minAmount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>From Amount</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        type="number"
                        placeholder="Enter start value"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAmount"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>To Amount</FormLabel>
                    <FormControl>
                      <Input
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event.target.value))
                        }
                        type="number"
                        placeholder="Enter end value"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Flex>
            <DialogFooter>
              <Button
                type="button"
                variant="link"
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
