'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex } from '@radix-ui/themes';
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
  CreateRegisterBonusForm,
  createRegisterBonusSchema,
} from '../../../../../types/bonus.types';
import { useCreateRegisterBonusMutation } from '../../../../../stores/reducers/bonus.reducer';
import { toast } from 'sonner';

const DATE_FORMAT = 'YYYY-MM-DD';

interface CreateRegisterBonusDialogProps {
  open: boolean;
  onClose: () => void;
}

export const CreateRegisterBonusDialog: React.FC<
  CreateRegisterBonusDialogProps
> = ({ open, onClose }) => {
  const form = useForm<CreateRegisterBonusForm>({
    resolver: zodResolver(createRegisterBonusSchema),
  });

  const [createRegisterBonus] = useCreateRegisterBonusMutation();

  const submit = async (submittedData: CreateRegisterBonusForm) => {
    const dataToSend = {
      ...submittedData,
      bonusStatus: submittedData?.bonusStatus === 'true',
    };

    try {
      const response = await createRegisterBonus(dataToSend);
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
          <DialogTitle> New Register Bonus </DialogTitle>

          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
            <FormField
              control={form.control}
              name="bonusTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
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
                      className="w-full"
                      label="Start from"
                      setDate={(date) => {
                        field.onChange(new Date(date || '').toISOString());
                      }}
                      dateFormat={DATE_FORMAT}
                      date={field.value ? new Date(field.value) : undefined}
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
                      className="w-full"
                      label="End on"
                      setDate={(date) => {
                        field.onChange(new Date(date || '').toISOString());
                      }}
                      dateFormat={DATE_FORMAT}
                      date={field.value ? new Date(field.value) : undefined}
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
            <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
              <Button
                variant="link"
                type="button"
                onClick={() => onClose()}
                className="text-gray-700 font-semibold mr-4"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={!form?.formState?.isValid}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
