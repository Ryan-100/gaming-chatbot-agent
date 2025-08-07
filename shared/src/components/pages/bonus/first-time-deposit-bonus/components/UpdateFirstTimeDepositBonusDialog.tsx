'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Box, Text } from '@radix-ui/themes';
import { unitOptions } from '../../../../../data/UnitList';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import { Label } from '../../../../ui/label';
import { Input } from '../../../../ui/input';
import { Checkbox } from '../../../../ui/checkbox';
import Loading from '../../../../ui/loading';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { DatePicker } from '../../../../ui/date-picker';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import {
  FirstTimeDepositBonusListData,
  UpdateFirstTimeDepositBonusForm,
  updateFirstTimeDepositBonusSchema,
} from '../../../../../types/bonus.types';
import { useGetPlayerLevelsQuery } from '../../../../../stores/reducers/player-level.reducer';
import { toast } from 'sonner';
import { useUpdateFirstTimeDepositBonusMutation } from '../../../../../stores/reducers/bonus.reducer';
import { PlayerLevelListData } from '../../../../../types/player-level.types';
import { isGreaterToday } from '../../components/dayChecker';
import { DeleteFirstTimeDepositBonusDialog } from './DeleteFirstTimeDepositBonusDialog';

const DATE_FORMAT = 'YYYY-MM-DD';

interface UpdateFirstTimeDepositBonusDialogProps {
  data: FirstTimeDepositBonusListData;
  open: boolean;
  onClose: () => void;
}

export const UpdateFirstTimeDepositBonusDialog: React.FC<
  UpdateFirstTimeDepositBonusDialogProps
> = ({ data, open, onClose }) => {
  const [selectedLevels, setSelectedLevels] = useState<PlayerLevelListData[]>(
    []
  );
  const [isOverTime, setIsOverTime] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const form = useForm<UpdateFirstTimeDepositBonusForm>({
    resolver: zodResolver(updateFirstTimeDepositBonusSchema),
  });

  const {
    data: playerLevelData,
    isLoading: levelsFetching,
    isError: isLevelError,
    error: levelError,
  } = useGetPlayerLevelsQuery();
  const levelOptions = playerLevelData?.body?.data || [];

  const [updateFirstTimeDepositBonus] =
    useUpdateFirstTimeDepositBonusMutation();

  React.useEffect(() => {
    if (data) {
      setSelectedLevels(
        levelOptions?.filter((option) =>
          data?.levelIds.some((id) => id === option.id)
        )
      );
      form.setValue('bonusTitle', data?.bonusTitle);
      form.setValue('bonusPercentage', data?.bonusPercentage);
      form.setValue('startDate', data?.startDate);
      form.setValue('endDate', data?.endDate);
      form.setValue('expireTime', data?.expireTime);
      form.setValue('expireType', data?.expireType);
      form.setValue('turnOverRate', data?.turnOverRate);
      form.setValue('maxAmount', data?.maxAmount);
      form.setValue('bonusStatus', data?.bonusStatus ? 'true' : 'false');
    }
  }, [data, levelOptions]);

  React.useEffect(() => {
    if (!isGreaterToday(data?.startDate)) {
      setIsOverTime(true);
    }
  }, [data]);

  const submit = async (submittedData: UpdateFirstTimeDepositBonusForm) => {
    if (selectedLevels.length === 0) {
      toast.error('Please select player level');
      return;
    }

    const dataToSend = {
      ...submittedData,
      bonusStatus: submittedData?.bonusStatus === 'true',
      levelIds: selectedLevels.map((item) => item?.id),
    };

    try {
      const response = await updateFirstTimeDepositBonus({
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

  const handleSelectAll = (isCheck: boolean) => {
    const selectedValues = isCheck
      ? levelOptions.map((item) => ({ ...item, isChecked: true }))
      : [];
    setSelectedLevels(selectedValues);
  };

  const handleLevelSelect = (isCheck: string | boolean, id: string) => {
    const selectedValue =
      isCheck && levelOptions.find((item) => item.id === id);
    setSelectedLevels((prev) => {
      if (isCheck && selectedValue) {
        return [...prev, selectedValue];
      } else {
        return prev.filter((item) => item.id !== id);
      }
    });
  };

  if (levelsFetching) {
    return <Loading />;
  }

  if (isLevelError) {
    const error: any = levelError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Dialog open={open}>
      <DialogContent className="py-0 w-[calc(100%-32px)] max-w-[800px] rounded-md">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle> Edit First Time Deposit Bonus </DialogTitle>

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
                      {...field}
                      disabled={isOverTime}
                      type="text"
                      placeholder="Enter description"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bonusPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bonus Percent</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      disabled={isOverTime}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value))
                      }
                      placeholder="Enter percentage"
                      type="number"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max. Amount</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(parseInt(event.target.value))
                      }
                      placeholder="Enter max amount"
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
                      label="Start from"
                      disabled={isOverTime}
                      className="w-full bg-surface-secondary"
                      setDate={(value) =>
                        field.onChange(new Date(value || '').toISOString())
                      }
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
                      label="End on"
                      disabled={isOverTime}
                      className="w-full bg-surface-secondary"
                      setDate={(value) =>
                        field.onChange(new Date(value || '').toISOString())
                      }
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

            <Flex direction={'column'}>
              <Label>Valid User Levels</Label>
              <Flex align="center" className="col-span-1 space-x-2 py-2">
                <Checkbox
                  id="all"
                  className="border border-secondary text-text-invert"
                  checked={selectedLevels.length === levelOptions.length}
                  onCheckedChange={handleSelectAll}
                  disabled={isOverTime}
                />
                <Label htmlFor="all" className="font-medium text-sm">
                  All Levels
                </Label>
              </Flex>
            </Flex>

            <Box className="!grid !grid-cols-2 !md:grid-cols-4 gap-4">
              {levelOptions &&
                levelOptions?.map((level, index) => (
                  <Flex align="center" className="col-span-1 space-x-2">
                    <Checkbox
                      disabled={isOverTime}
                      id={level?.id}
                      className="border border-secondary text-text-invert"
                      checked={selectedLevels.some(
                        (obj) => obj.id === level.id
                      )}
                      onCheckedChange={(isCheck) =>
                        handleLevelSelect(isCheck, level?.id)
                      }
                    />
                    <Label htmlFor={level?.id} className="font-medium text-sm">
                      {level.name}
                    </Label>
                  </Flex>
                ))}
            </Box>

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
          <DeleteFirstTimeDepositBonusDialog
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
