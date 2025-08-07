'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex } from '@radix-ui/themes';
import { toast } from 'sonner';
import { unitOptions } from '../../../../../data/UnitList';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Label } from '../../../../ui/label';
import { Input } from '../../../../ui/input';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { Icons } from '../../../../ui/icons';
import { DatePicker } from '../../../../ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import {
  RegisterBonusListData,
  UpdateRegisterBonusForm,
  updateRegisterBonusSchema,
} from '../../../../../types/bonus.types';
import { useUpdateRegisterBonusMutation } from '../../../../../stores/reducers/bonus.reducer';
import { isGreaterToday } from '../../components/dayChecker';
import { DeleteRegisterBonusDialog } from './DeleteRegisterBonusDialog';

const DATE_FORMAT = 'YYYY-MM-DD';

interface UpdateRegisterBonusDialogProps {
  data: RegisterBonusListData;
  open: boolean;
  onClose: () => void;
}

export const UpdateRegisterBonusDialog: React.FC<
  UpdateRegisterBonusDialogProps
> = ({ data, open, onClose }) => {
  const [isOverTime, setIsOverTime] = React.useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);

  const form = useForm<UpdateRegisterBonusForm>({
    resolver: zodResolver(updateRegisterBonusSchema),
  });

  const [updateRegisterBonus] = useUpdateRegisterBonusMutation();

  React.useEffect(() => {
    if (data) {
      form.setValue('bonusTitle', data?.bonusTitle);
      form.setValue('bonusAmount', data?.bonusAmount);
      form.setValue('startDate', data?.startDate);
      form.setValue('endDate', data?.endDate);
      form.setValue('expireTime', data?.expireTime);
      form.setValue('expireType', data?.expireType);
      form.setValue('turnOverRate', data?.turnOverRate);
      form.setValue('bonusStatus', data?.bonusStatus ? 'true' : 'false');
    }
  }, [data]);

  React.useEffect(() => {
    if (!isGreaterToday(data?.startDate)) {
      setIsOverTime(true);
    }
  }, [data]);

  const submit = async (submittedData: UpdateRegisterBonusForm) => {
    const dataToSend = {
      ...submittedData,
      bonusStatus: submittedData?.bonusStatus === 'true',
    };

    try {
      const response = await updateRegisterBonus({
        id: data?.id ?? '',
        data: dataToSend,
      });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        form.reset();
        onClose();
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent className="py-0 w-[calc(100%-32px)] max-w-[800px] rounded-md">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle> Edit Register Bonus </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
            <FormField
              control={form.control}
              name="bonusStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={String(field.value)}
                      onValueChange={field.onChange}
                      className="flex items-center space-x-10 text-base"
                    >
                      <Flex className="items-center space-x-2">
                        <RadioGroupItem value="true" id="active" />
                        <Label htmlFor="active">Active</Label>
                      </Flex>
                      <Flex className="items-center space-x-2">
                        <RadioGroupItem value="false" id="inactive" />
                        <Label htmlFor="inactive">Inactive</Label>
                      </Flex>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bonusTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isOverTime}
                      {...field}
                      type="text"
                      placeholder="Enter description"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bonusAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Amount </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isOverTime}
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value))
                      }
                      placeholder="Enter amount"
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      postFix
                      disabled={isOverTime}
                      label="Start from"
                      className="w-full"
                      setDate={(date) => {
                        field.onChange(new Date(date || '').toISOString());
                      }}
                      dateFormat={DATE_FORMAT}
                      date={new Date(field.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker
                      postFix
                      label="End on"
                      disabled={isOverTime}
                      className="w-full"
                      setDate={(date) => {
                        field.onChange(new Date(date || '').toISOString());
                      }}
                      dateFormat={DATE_FORMAT}
                      date={new Date(field.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Flex align="center" className="w-full gap-4">
              <FormField
                control={form.control}
                name="expireTime"
                render={({ field }) => (
                  <FormItem className="w-3/4">
                    <FormLabel>Expired Time</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isOverTime}
                        value={field.value}
                        onChange={(event) =>
                          field.onChange(parseInt(event?.target?.value))
                        }
                        type="number"
                        placeholder="Enter expired time"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expireType"
                render={({ field }) => (
                  <FormItem className="w-1/4">
                    <FormLabel>Time Unit</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isOverTime}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Time unit" />
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

            <FormField
              control={form.control}
              name="turnOverRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Turn Over Rate</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isOverTime}
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value))
                      }
                      placeholder="Enter turn over rate"
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
              <Flex align={'center'} justify={'between'} className="w-full">
                <Button
                  variant={'outline'}
                  type="button"
                  className="text-text-error border-border-error"
                  disabled={isOverTime}
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Delete Bonus
                </Button>
                <Flex align={'center'}>
                  <Button
                    variant="link"
                    type="button"
                    onClick={onClose}
                    className="text-gray-700 font-semibold mr-4"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update</Button>
                </Flex>
              </Flex>
            </DialogFooter>
          </form>
        </Form>
        {deleteModalOpen && (
          <DeleteRegisterBonusDialog
            id={data?.id}
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onCloseTwoSteps={() => {
              onClose();
              setDeleteModalOpen(false);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
