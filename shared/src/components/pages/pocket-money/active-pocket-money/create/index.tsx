'use client';
import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, Grid } from '@radix-ui/themes';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createPocketMoneySchema,
  CreatePocketMoneyForm,
} from '../../../../../types/pocket-money.type';
import { RadioGroup, RadioGroupItem } from '../../../../ui/radio-group';
import { Button } from '../../../../ui/button';
import { Label } from '../../../../ui/label';
import { Input } from '../../../../ui/input';
import { Card } from '../../../../ui/card';
import { Checkbox } from '../../../../ui/checkbox';
import { DatePicker } from '../../../../ui/date-picker';
import Combobox from '../../../../shared/combobox';
import Loading from '../../../../ui/loading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../ui/select';
import { useGetPlayerLevelsQuery } from '../../../../../stores/reducers/player-level.reducer';
import { PlayerLevelListData } from '../../../../../types/player-level.types';
import { unitOptions } from '../../../../../data/UnitList';
import {
  useCreatePMMutation,
  useGetPlayerListForPMQuery,
} from '../../../../../stores/reducers/pocket-money.reducer';
import dayjs from '../../../../../utils/dayjs';
// import dayjs from 'dayjs';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const targetOptions = [
  { label: 'Selected Levels', value: 'LEVEL' },
  { label: 'Selected Players', value: 'PLAYER' },
];

const propabilitiesData = [
  { value: 'RANDOM', label: 'Random' },
  { value: 'FAIR', label: 'Fair' },
  { value: 'WEIGHT', label: 'Weight' },
];

const DATE_FORMAT = 'MMM DD, YYYY hh:mm a';

const CreatePocketMoney = () => {
  const router = useRouter();
  const [target, setTarget] = useState('LEVEL');
  const [selectedLevels, setSelectedLevels] = useState<PlayerLevelListData[]>(
    []
  );
  const [type, setType] = useState('RANDOM');
  const [announce, setAnnounce] = useState<boolean | 'indeterminate'>(false);
  const [query, setQuery] = useState({
    name: '',
    levelIds: selectedLevels?.map((item) => item?.id),
  });

  const {
    data: playerLevelData,
    isLoading: levelsFetching,
    isError: isLevelError,
    error: levelError,
  } = useGetPlayerLevelsQuery();
  const levelOptions = playerLevelData?.body?.data || [];

  const [createPM, { isLoading }] = useCreatePMMutation();

  const {
    data: playerListData,
    isLoading: fetchingPlayerList,
    isError: isPlayerListError,
    error: playerListError,
  } = useGetPlayerListForPMQuery(query);

  const playerOptions =
    playerListData?.body?.data.map((item) => ({
      dropdown: (
        <Flex align={'center'} justify={'between'} className="w-full">
          <Flex direction={'column'} className="gap-1">
            <p className="font-semibold">{item?.name}</p>
            <p>
              {item?.id}&nbsp;
              <span className="text-text-secondary">
                {item?.email ? `• ${item?.email}` : ''}
              </span>
            </p>
          </Flex>
          <p className="text-text-secondary">{item?.PlayerLevel?.name}</p>
        </Flex>
      ),
      value: item?.id,
      label: item?.name,
    })) || [];

  const form = useForm<CreatePocketMoneyForm>({
    resolver: zodResolver(createPocketMoneySchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      playerType: 'LEVEL',
      type: 'RANDOM',
      startDate: dayjs().toISOString(),
      endDate: dayjs().toISOString(),
    },
  });

  const convertToTimezoneISO = (date: Date) => {
    if (date) {
      const utcDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
      const offsetMilliseconds = 6.5 * 60 * 60 * 1000;
      const myanmarDate = new Date(utcDate.getTime() - offsetMilliseconds);
      return new Date(myanmarDate);
    } else {
      return date;
    }
  };

  const submit = async (submittedData: CreatePocketMoneyForm) => {
    if (selectedLevels.length < 1) {
      toast.error('Please select player level');
      return;
    }

    let dataToSend = {
      ...submittedData,

      levelIds: selectedLevels.map((item) => item?.id ?? ''),
      levelDetails:
        submittedData?.levelDetails?.map((item, index) => ({
          ...item,
          levelId: selectedLevels[index]?.id,
        })) || [],
      startDate: convertToTimezoneISO(
        new Date(submittedData.startDate)
      ).toISOString(),
      endDate: convertToTimezoneISO(
        new Date(submittedData.endDate)
      ).toISOString(),
    };

    // console.log(
    //   convertToTimezoneISO(new Date(submittedData.startDate)).toISOString()
    // );
    // console.log(new Date(submittedData.startDate).toISOString());
    // console.log(
    //   dayjs(convertToTimezoneISO(new Date(submittedData.startDate))).format(
    //     'DD MMM YYYY hh:mm a'
    //   )
    // );
    // console.log(
    //   dayjs(new Date(submittedData.startDate)).format('DD MMM YYYY hh:mm a')
    // );

    if (submittedData?.playerType === 'LEVEL') {
      if (submittedData?.type === 'RANDOM') {
        dataToSend = {
          ...submittedData,
          levelIds: selectedLevels.map((item) => item?.id),
          playerIds: [],
          levelDetails: [],
          startDate: convertToTimezoneISO(
            new Date(submittedData.startDate)
          ).toISOString(),
          endDate: convertToTimezoneISO(
            new Date(submittedData.endDate)
          ).toISOString(),
        };
      } else if (
        submittedData.type === 'FAIR' ||
        submittedData?.type === 'WEIGHT'
      ) {
        dataToSend = {
          ...submittedData,
          levelIds: selectedLevels.map((item) => item?.id),
          playerIds: [],
          levelDetails:
            submittedData?.levelDetails?.map((item, index) => ({
              ...item,
              levelId: selectedLevels[index]?.id,
            })) || [],
          startDate: convertToTimezoneISO(
            new Date(submittedData.startDate)
          ).toISOString(),
          endDate: convertToTimezoneISO(
            new Date(submittedData.endDate)
          ).toISOString(),
        };
      }
    } else {
      const { type, ...leftType } = submittedData;
      dataToSend = {
        ...leftType,
        levelIds: [],
        playerIds: submittedData.playerIds,
        levelDetails: [],
        startDate: convertToTimezoneISO(
          new Date(submittedData.startDate)
        ).toISOString(),
        endDate: convertToTimezoneISO(
          new Date(submittedData.endDate)
        ).toISOString(),
      };
    }

    if (submittedData?.playerType === 'LEVEL') {
      if (submittedData.type === 'FAIR' || submittedData?.type === 'WEIGHT') {
        const totalAmount = dataToSend.totalAmount;
        const totalLevelAmount = dataToSend.levelDetails.reduce(
          (sum, levelDetail) => {
            return sum + (levelDetail.amount || 0);
          },
          0
        );

        const totalCount = dataToSend.totalCount ?? 0;
        const totalLevelCount = dataToSend.levelDetails.reduce(
          (sum, levelDetail) => {
            return sum + (levelDetail.count || 0);
          },
          0
        );

        if (totalLevelAmount !== totalAmount) {
          toast.error(
            `Total of all level amounts (${totalLevelAmount}) should be same with total PM value (${totalAmount})`
          );
          form.setError('totalAmount', {
            message: `Total PM Value doesn't match.`,
          });
          return;
        }

        if (totalLevelCount !== totalCount) {
          toast.error(
            `Total of all level counts (${totalLevelCount}) should be same with total PM count (${totalCount})`
          );
          form.setError('totalCount', {
            message: `Total PM Count doesn't match.`,
          });
          return;
        }
      }

      if (submittedData?.type === 'FAIR') {
        for (let x = 0; x < selectedLevels.length; x++) {
          const levelDetail = dataToSend.levelDetails[x];

          // Ensure the necessary fields are defined
          if (
            levelDetail.amount === undefined ||
            levelDetail.count === undefined ||
            levelDetail.min === undefined ||
            levelDetail.max === undefined
          ) {
            toast.error(
              `Missing required values for level ${selectedLevels[x]?.name}`
            );
            return;
          }

          const minResult = (levelDetail.amount * 0.6) / levelDetail.count;
          const maxResult = levelDetail.amount + levelDetail.amount * 0.2;
          const maxTotal = levelDetail.max * levelDetail.count;

          // Min check
          if (levelDetail.min < minResult) {
            toast.error(
              `Min value of ${selectedLevels[x].name} should be greater than ${minResult}`
            );
            form.setError(`levelDetails.${x}.min`, {
              message: `Min Value should be greater than ${minResult}`,
            });
            return;
          }

          // Max check
          if (maxTotal < maxResult) {
            const calculatedMax = maxResult / levelDetail.count;
            toast.error(
              `Max value of ${selectedLevels[x].name} should be greater than or equal to ${calculatedMax}`
            );
            form.setError(`levelDetails.${x}.max`, {
              message: `Max Value should be greater than ${calculatedMax}`,
            });
            return;
          }
        }
      }
    }

    try {
      const response = await createPM(dataToSend);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        form.reset();
        if (announce) {
          handleAnnounce();
        } else {
          router.back();
        }
      } else {
        const error: any = response?.error;
        toast.error(error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
    console.log(dataToSend, 'dataToSend');
  };

  const handleSelectAll = (isCheck: boolean) => {
    if (isCheck) {
      const selectedValues = levelOptions.map((item) => ({
        ...item,
        isChecked: true,
      }));
      setSelectedLevels(selectedValues);

      // Calculate totalAmount and totalCount based on selected levels
      const existingLevelDetails = form.getValues('levelDetails') || [];
      let totalAmount = 0;
      let totalCount = 0;

      selectedValues.forEach((level, index) => {
        const existingDetails = existingLevelDetails[index] || {};

        totalAmount += existingDetails.amount || 0;
        totalCount += existingDetails.count || 0;
      });
      form.setValue('totalAmount', totalAmount);
      form.setValue('totalCount', totalCount);
      form.setValue('levelDetails', existingLevelDetails);
    } else {
      setSelectedLevels([]);
      form.setValue('totalAmount', 0);
      form.setValue('totalCount', 0);
      form.setValue('levelDetails', []);
    }

    // Sync query levelIds
    setQuery((prev) => ({
      ...prev,
      levelIds: isCheck ? levelOptions.map((item) => item?.id) : [],
    }));
  };

  const handleAnnounce = () => {
    router.push(`/notification/create?type=POCKET_MONEY`);
  };

  const handleLevelSelect = (isCheck: string | boolean, id: string) => {
    const selectedValue =
      isCheck && levelOptions.find((item) => item.id === id);
    setSelectedLevels((prev) => {
      let updatedLevels;

      if (isCheck && selectedValue) {
        updatedLevels = [...prev, selectedValue];
      } else {
        // Remove deselected value
        updatedLevels = prev.filter((item) => item.id !== id);
      }

      // Update form levelDetails to remove unselected level
      const updatedLevelDetails = form
        .getValues('levelDetails')
        ?.filter((_, index) => {
          return updatedLevels.some(
            (level) => level.id === selectedLevels[index]?.id
          );
        });

      form.setValue('levelDetails', updatedLevelDetails);
      const updatedIds = updatedLevels.map((item) => item.id);

      setQuery({
        name: query.name,
        levelIds: updatedIds,
      });

      return updatedLevels;
    });
  };

  const handleSearch = (name: string) => {
    setQuery((prev) => ({
      ...prev,
      name: name,
    }));
  };

  if (levelsFetching) {
    return <Loading />;
  }

  if (isLevelError) {
    const error: any = levelError;
    toast.error(error?.data?.meta?.message);
  }

  if (isPlayerListError) {
    const error: any = playerListError;
    toast.error(error?.data?.meta?.message);
  }

  return (
    <Flex direction="column" className="space-y-6 mb-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col space-y-4 text-xs"
        >
          <FormField
            control={form.control}
            name="playerType"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel> Send to</FormLabel>
                <FormControl>
                  <RadioGroup
                    defaultValue={target}
                    className="flex flex-col md:flex-row items-start md:items-center md:space-x-10 text-base"
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                      setTarget(value);
                      if (value === 'PLAYER') {
                        setType('RANDOM');
                      }
                    }}
                  >
                    {targetOptions.map((target, index) => (
                      <Flex className="items-center space-x-2" key={index}>
                        <RadioGroupItem
                          value={target.value}
                          id={target.value}
                        />
                        <Label className="text-base" htmlFor={target.value}>
                          {target.label}
                        </Label>
                      </Flex>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            )}
          />

          <Card className="p-4 space-y-1">
            <Box className="pb-2 border-b border-border-secondary">
              <Text className="text-base font-bold"> Pocket Money </Text>
            </Box>
            <Flex direction="column" className="py-4 space-y-4">
              <Text className="text-sm font-semibold">
                Pocket Money Information
              </Text>
              <Flex
                justify="between"
                align="center"
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-10 "
              >
                {/* title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel> Title </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter title for pocket money"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* type */}
                {target === 'LEVEL' && (
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormLabel> Pocket Money Propability </FormLabel>
                        <FormControl>
                          <Select
                            value={type}
                            onValueChange={(value) => {
                              setType(value);
                              field.onChange(value);
                            }}
                            defaultValue="RANDOM"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select propabilty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {propabilitiesData.map((data) => (
                                  <SelectItem
                                    key={data.value}
                                    value={data.value}
                                  >
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
                )}
              </Flex>

              {/* levelIds */}
              <FormLabel>Valid Player Levels</FormLabel>
              <Flex align="center" className="col-span-1 space-x-2 py-2">
                <Checkbox
                  id="all"
                  className="border border-secondary text-text-invert"
                  checked={selectedLevels.length === levelOptions.length}
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="all" className="font-medium text-sm">
                  All Levels
                </Label>
              </Flex>

              <Box className="!grid grid-cols-2 md:grid-cols-4 gap-4">
                {levelOptions &&
                  levelOptions?.map((level, index) => (
                    <Flex align="center" className="col-span-1 space-x-2">
                      <Checkbox
                        id={level?.id}
                        className="border border-secondary text-text-invert"
                        checked={selectedLevels.some(
                          (obj) => obj.id === level.id
                        )}
                        onCheckedChange={(isCheck) =>
                          handleLevelSelect(isCheck, level?.id)
                        }
                      />
                      <Label
                        htmlFor={level?.id}
                        className="font-medium text-sm"
                      >
                        {level.name}
                      </Label>
                    </Flex>
                  ))}
              </Box>
            </Flex>

            {/* explain text */}
            {target === 'LEVEL' && (
              <Flex
                direction="column"
                className="bg-surface-accentLight p-4 gap-1 rounded-lg"
                style={{ marginBottom: 16 }}
              >
                <p className="text-sm">
                  Pocket Money is{' '}
                  <span className="capitalize">{type.toLocaleLowerCase()}</span>
                  !
                </p>
                <Text className="text-xs">
                  {type.toLocaleLowerCase() === 'weight'
                    ? 'All players will get First Come First Serve pocket money value.'
                    : `All players will get ${type.toLocaleLowerCase()} pocket money
                  value specified as the following.`}
                </Text>
              </Flex>
            )}

            {/* select player*/}
            {target === 'PLAYER' && (
              <FormField
                control={form.control}
                name="playerIds"
                render={({ field }) => (
                  <FormItem
                    className="flex-1 w-full flex flex-col "
                    style={{ marginBottom: 16 }}
                  >
                    <FormLabel> Player </FormLabel>
                    <FormControl>
                      <Combobox
                        options={fetchingPlayerList ? [] : playerOptions}
                        onSearch={handleSearch}
                        setValue={(value) => field.onChange(value)}
                        value={field.value}
                        className="w-full"
                        multiple
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}

            <Flex
              direction="column"
              className="py-4 space-y-4 border-t border-border-secondary"
            >
              <Text className="text-sm font-semibold">Pocket Money Period</Text>
              <Flex
                justify="between"
                align="center"
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-10 "
              >
                {/* start date */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel> Start Date </FormLabel>
                      <FormControl>
                        <Flex>
                          <DatePicker
                            postFix
                            label="Start from"
                            className="w-full bg-surface-secondary"
                            setDate={(value) =>
                              field.onChange(
                                new Date(value || '').toISOString()
                              )
                            }
                            dateFormat={DATE_FORMAT}
                            showTimePicker
                            date={
                              field.value ? new Date(field.value) : undefined
                            }
                          />
                          {/* <TimePicker setDate={handleTimeChange} date={timeToDate(value.startTime)} /> */}
                        </Flex>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* end date */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel> End Date </FormLabel>
                      <FormControl>
                        <DatePicker
                          postFix
                          label="End on"
                          className="w-full bg-surface-secondary"
                          setDate={(value) =>
                            field.onChange(new Date(value || '').toISOString())
                          }
                          dateFormat={DATE_FORMAT}
                          date={field.value ? new Date(field.value) : undefined}
                          showTimePicker
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </Flex>
              <Flex
                justify="between"
                align="end"
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-10 "
              >
                <Flex
                  justify="between"
                  align="center"
                  className="space-x-4 flex-1 w-full"
                >
                  {/* expire time */}
                  <Flex align="end" className="w-full gap-2 md:gap-4">
                    <FormField
                      control={form.control}
                      name="expireTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>
                            {' '}
                            Pocket Money Reward Will Be Expired AFter{' '}
                          </FormLabel>
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
                    {/* expire type */}
                    <FormField
                      control={form.control}
                      name="expireType"
                      render={({ field }) => (
                        <FormItem className="w-1/4 mt-6">
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
                                    <SelectItem
                                      key={data.value}
                                      value={data.value}
                                    >
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
                </Flex>

                {/* turn over rate */}
                <FormField
                  control={form.control}
                  name="turnOverRate"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
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
              </Flex>
            </Flex>

            <Flex direction="column" className="py-4 space-y-4">
              <Text className="text-sm font-semibold">PM Value & Count</Text>
              <Flex
                justify="between"
                align="center"
                className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-10 "
              >
                {/* total amount */}
                <FormField
                  control={form.control}
                  name="totalAmount"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <FormLabel> Total PM Value</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value}
                          onChange={(event) => {
                            field.onChange(parseInt(event.target.value));
                          }}
                          placeholder="Enter value"
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* total count */}
                {target !== 'PLAYER' && (
                  <FormField
                    control={form.control}
                    name="totalCount"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-full">
                        <FormLabel> Total Count </FormLabel>
                        <FormControl>
                          <Input
                            value={field.value}
                            onChange={(event) =>
                              field.onChange(parseInt(event.target.value))
                            }
                            placeholder="Enter count"
                            type="number"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
              </Flex>
            </Flex>

            {/* levelDetails */}
            {type !== 'RANDOM' &&
              selectedLevels.map((item, index) => (
                <Flex
                  justify="between"
                  align="center"
                  className="flex flex-col md:flex-row items-start md:items-center md:space-x-10 "
                  key={index}
                >
                  <Flex className="bg-surface-secondary px-4 h-[44px] w-[80px] justify-center items-center rounded-md mt-6">
                    <Text className="text-center">{item?.name}</Text>
                  </Flex>

                  <Grid
                    columns={{ initial: '1', md: '2', lg: '4' }}
                    className="w-full gap-2"
                  >
                    {type !== 'WEIGHT' && (
                      <FormField
                        control={form.control}
                        name={`levelDetails.${index}.min`}
                        render={({ field }) => (
                          <FormItem className="flex-1 w-full">
                            <FormLabel> Min. Value</FormLabel>
                            <FormControl>
                              <Input
                                value={field.value}
                                onChange={(event) => {
                                  field.onChange(parseInt(event.target.value));
                                }}
                                placeholder="Enter min values"
                                type="number"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    {type !== 'WEIGHT' && (
                      <FormField
                        control={form.control}
                        name={`levelDetails.${index}.max`}
                        render={({ field }) => (
                          <FormItem className="flex-1 w-full">
                            <FormLabel> Max. Value</FormLabel>
                            <FormControl>
                              <Input
                                value={field.value}
                                onChange={(event) => {
                                  field.onChange(parseInt(event.target.value));
                                }}
                                placeholder="Enter max values"
                                type="number"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name={`levelDetails.${index}.amount`}
                      render={({ field }) => (
                        <FormItem className="flex-1 w-full">
                          <FormLabel> PM Value</FormLabel>
                          <FormControl>
                            <Input
                              value={field.value}
                              onChange={(event) => {
                                field.onChange(parseInt(event.target.value));
                                form.trigger();
                              }}
                              placeholder="Enter pm values"
                              type="number"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {(type === 'FAIR' || type === 'WEIGHT') && (
                      <FormField
                        control={form.control}
                        name={`levelDetails.${index}.count`}
                        render={({ field }) => (
                          <FormItem className="flex-1 w-full">
                            <FormLabel> Count </FormLabel>
                            <FormControl>
                              <Input
                                value={field.value}
                                onChange={(event) => {
                                  field.onChange(parseInt(event.target.value));
                                  form.trigger();
                                }}
                                placeholder="Enter Count"
                                type="number"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    )}
                  </Grid>
                </Flex>
              ))}

            {/* announce */}
            <Box className="!flex flex-col md:flex-row gap-x-4 gap-y-2 items-end md:items-center md:justify-end md:ml-auto">
              <Flex align="center" className="space-x-2 md:mr-4 ">
                <Checkbox
                  className="border border-secondary text-text-invert"
                  checked={announce}
                  onCheckedChange={setAnnounce}
                />
                <Label htmlFor="announce" className="font-medium text-sm">
                  Announce in channel
                </Label>
              </Flex>
              <Box className="flex flex-row items-center gap-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  // disabled={!form.formState?.isValid}
                  loading={isLoading}
                  className="ml-2"
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Card>
        </form>
      </Form>
    </Flex>
  );
};

export default CreatePocketMoney;
