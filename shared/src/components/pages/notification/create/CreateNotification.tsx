'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Flex, Box, Grid } from '@radix-ui/themes';

import { Input } from '../../../ui/input';

import { Image } from '../../../ui/image';

import { FormControl, FormField, FormItem, FormLabel } from '../../../ui/form';

import { LanguageData } from '../../../../types/language.types';
import { BotWrapper } from '../../../shared/BotWrapper';
import ImagePicker from '../../../shared/ImagePicker';
import { BotTextEditor } from '../../../shared/bot-management/BotTextEditor';
import { useGetPlayerLevelsQuery } from '../../../../stores/reducers/player-level.reducer';
import { Checkbox } from '../../../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  createNotificationSchema,
  NotificationAppFunctionListData,
} from '../../../../types/notification.types';
import { PocketMoneyListData } from '../../../../types/pocket-money.type';
import { useCreateNotificationMutation } from '../../../../stores/reducers/notification.reducer';
import { toast } from 'sonner';
import { getTextContentLength } from '../../../../utils/getEditorTextLength';
import { useRouter } from 'next/navigation';

interface CreateNotificationProps {
  languageData: LanguageData[];
  selectedType: string;
  appFunctionData: NotificationAppFunctionListData[];
  activePocketMoneyData: PocketMoneyListData[];
}

const CreateNotification: React.FC<CreateNotificationProps> = ({
  languageData,
  selectedType,
  appFunctionData,
  activePocketMoneyData,
}) => {
  const validationSchema = z.object({
    notification: z.array(
      z
        .object({
          langId: z.string(),
          label: z.string(),
          flag: z.string(),
          id: z.string().optional(),
          notificationType: z.string().optional(),
          title: z.string().min(1, { message: 'Title is Required' }),
          description: z
            .string()
            .min(10, { message: 'Description is Required' }),
          file: z
            .object({
              id: z.string().optional(),
              url: z.string().optional(),
            })
            .optional(),
          playerLevelIds: z.array(
            z
              .object({
                id: z.string().optional(),
                name: z.string().optional(),
                isChecked: z.boolean().optional().catch(false),
              })
              .optional()
          ),
          redirectTo: z.string().optional().catch('None'),
          buttonText: z.string().optional(),
          appFunctionId: z.string().optional(),
          externalLink: z.string().optional(),
          isPinned: z.boolean().catch(false),
          activePocketMoneyId: z.string().optional(),
        })
        .superRefine((data, ctx) => {
          if (data.redirectTo === 'App_Function' && !data.appFunctionId) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'App Function is Required',
              path: ['appFunctionId'],
            });
          }
          if (data.redirectTo === 'External_Link' && !data.externalLink) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'External Link is Required',
              path: ['externalLink'],
            });
          }
        })
    ),
  });

  type NotificationForm = z.infer<typeof validationSchema>;
  const [enableEditMode, setEnableEditMode] = useState(true);
  const [selectAll, setSelectAll] = useState(true);
  const [unSelectOne, setUnSelectOne] = React.useState(true);
  const [localKey, setLocalKey] = useState(0);
  const [selectedPM, setSelectedPM] = useState<PocketMoneyListData>();

  const router = useRouter();

  const { data: playerLevelData } = useGetPlayerLevelsQuery();

  const welcomeDefaultData: NotificationForm = {
    notification: languageData.map((item, index) => {
      return {
        langId: item.id,
        label: item.value,
        flag: item.flag,
        id: '',
        notificationType: selectedType,
        title: '',
        description: '',
        file: {
          id: '',
          url: '',
        },
        playerLevelIds:
          playerLevelData?.body?.data?.map((level) => ({
            id: level.id,
            name: level.name,
            isChecked: false,
          })) || [],
        redirectTo: 'None',
        isPinned: false,
      };
    }),
  };

  const form = useForm<NotificationForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: welcomeDefaultData,
  });

  const { fields } = useFieldArray({
    name: 'notification',
    control: form.control,
  });

  const [createAction, { isLoading: formSubmitting }] =
    useCreateNotificationMutation();

  const submit = async (data: NotificationForm) => {
    const isValid = !data.notification.some((item, index) => {
      if (getTextContentLength(item.description) > 200) {
        form.setError(`notification.${index}.description`, {
          message: 'Kindly enter maximum 200 chars.',
        });
        return true; // Exceeds character limit
      }
      return false; // Valid
    });
    const updatedData = data.notification.map((item) => {
      if (selectedType === 'POCKET_MONEY') {
        return {
          notificationType: selectedType,
          fileId: item?.file?.id ?? '',
          label: item.title,
          description: item.description,
          playerLevelIds: data.notification[0].playerLevelIds,
          externalLink: '',
          buttonText: '',
          languageId: item.langId,
          appFunctionId: '',
          isPinned: data.notification[0].isPinned,
          activePocketMoneyId: data.notification[0].activePocketMoneyId,
        };
      } else if (selectedType === 'ANNOUNCEMENT') {
        return {
          notificationType: selectedType ?? 'ANNOUNCEMENT',
          fileId: item?.file?.id ?? '',
          label: item.title ?? '',
          description: item.description ?? '',
          playerLevelIds: data.notification[0].playerLevelIds ?? [],
          externalLink: '',
          buttonText: item.buttonText,
          languageId: item.langId,
          appFunctionId: '',
          isPinned: data.notification[0].isPinned ?? false,
          activePocketMoneyId: '',
        };
      } else {
        if (item.redirectTo === 'App_Function') {
          return {
            notificationType: selectedType ?? 'PROMOTION',
            fileId: item?.file?.id ?? '',
            label: item.title ?? '',
            description: item.description ?? '',
            playerLevelIds: data.notification[0].playerLevelIds ?? [],
            externalLink: '',
            buttonText: item.buttonText,
            languageId: item.langId,
            appFunctionId: data.notification[0].appFunctionId ?? '',
            isPinned: data.notification[0].isPinned ?? false,
            activePocketMoneyId: '',
          };
        } else if (item.redirectTo === 'External_Link') {
          return {
            notificationType: selectedType ?? 'PROMOTION',
            fileId: item?.file?.id ?? '',
            label: item.title ?? '',
            description: item.description ?? '',
            playerLevelIds: data.notification[0].playerLevelIds ?? [],
            externalLink: data.notification[0].externalLink,
            buttonText: item.buttonText,
            languageId: item.langId,
            appFunctionId: '',
            isPinned: data.notification[0].isPinned ?? false,
            activePocketMoneyId: '',
          };
        } else {
          return {
            notificationType: selectedType ?? 'PROMOTION',
            fileId: item?.file?.id ?? '',
            label: item.title ?? '',
            description: item.description ?? '',
            playerLevelIds: data.notification[0].playerLevelIds ?? [],
            externalLink: '',
            buttonText: '',
            languageId: item.langId,
            appFunctionId: '',
            isPinned: data.notification[0].isPinned ?? false,
            activePocketMoneyId: '',
          };
        }
      }
    });

    const items = updatedData.map((item) =>
      createNotificationSchema.parse(item)
    );
    if (isValid) {
      try {
        const response = await createAction({ notifications: items });
        if (response.data?.meta?.success) {
          toast('Successfully created notification');
          setEnableEditMode(!enableEditMode);
          router.push('/notification');
        } else {
          const errorResponse: any = response;
          toast(errorResponse?.error?.data?.meta?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong!');
      }
    }
  };

  React.useEffect(() => {
    if (playerLevelData?.body?.data) {
      form.setValue(
        'notification.0.playerLevelIds',
        playerLevelData.body.data.map(
          (level: { id: string; name: string }) => ({
            id: level.id,
            name: level.name,
            isChecked: false,
          })
        )
      );
    }
  }, [playerLevelData, form]);

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      const playerLevels = playerLevelData?.body?.data ?? [];
      setSelectAll(checked);
      setUnSelectOne(false);
      form.setValue(
        'notification.0.playerLevelIds',
        playerLevels.map((level) => ({
          id: level?.id,
          name: level?.name,
          isChecked: checked,
        }))
      );
    },
    [form, playerLevelData?.body?.data]
  );

  const playerLevelIds = form.watch('notification.0.playerLevelIds');
  useEffect(() => {
    const allSelected =
      playerLevelIds.every((level) => level?.isChecked) &&
      playerLevelIds?.length === playerLevelData?.body?.data?.length;
    setSelectAll(allSelected);
    setLocalKey((prevKey) => prevKey + 1);
  }, [playerLevelIds, playerLevelData]);

  console.log(form.formState.errors, 'errors');

  return (
    <Box key={localKey}>
      <BotWrapper
        title="Welcome Message"
        subTitle="Contents"
        description="The following content will be shown in Bot when menu is selected."
        form={form}
        submit={submit}
        loading={formSubmitting}
        enableEditMode={true}
        setEnableEditMode={setEnableEditMode}
        hideAccordion
        hideContent
        okBtn="Create"
        externalRender={() => (
          <Flex className="flex-wrap">
            <FormField
              control={form.control}
              name={`notification.0.isPinned`}
              render={({ field }) => (
                <FormItem>
                  <Flex align="center" className="space-x-1">
                    <FormControl className="w-4">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                        }}
                        className="border border-secondary "
                      />
                    </FormControl>
                    <FormLabel>Pin Notification</FormLabel>
                  </Flex>
                </FormItem>
              )}
            />
          </Flex>
        )}
      >
        <Box className="col-span-3">
          <Grid
            columns={{ initial: '1', sm: '2', lg: '3' }}
            className="gap-4 w-full py-4"
          >
            {fields.map((item, index) => (
              <Box
                className="border border-border-secondary rounded-lg"
                key={index}
              >
                <Box className="border-b border-border-secondary p-2">
                  <Flex
                    align="center"
                    justify="center"
                    gap="2"
                    className="space-x-2"
                  >
                    <Image
                      src={item.flag}
                      width={20}
                      height={20}
                      alt="Logo Picture"
                      className="w-[20px] h-[20px] rounded"
                    />
                    <div className="font-semibold">{item.label}</div>
                  </Flex>
                </Box>
                <Box className="p-2">
                  <FormField
                    control={form.control}
                    name={`notification.${index}.file`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <ImagePicker
                            image={field?.value?.url ?? ''}
                            onClick={field.onChange}
                            deleteHandler={field.onChange}
                            editMode={enableEditMode}
                            hideControl={false}
                            hideDownUpControl={true}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Box>
                <Box className="p-2">
                  <FormField
                    control={form.control}
                    name={`notification.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter notification label"
                            readOnly={!enableEditMode}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Box>

                <Box className="p-2">
                  <FormField
                    control={form.control}
                    name={`notification.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <BotTextEditor
                            editMode={enableEditMode}
                            value={field.value}
                            setValue={field.onChange}
                            maxChar={200}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Box>
              </Box>
            ))}
          </Grid>
        </Box>
        {selectedPM?.type === 'PLAYER' ? (
          <Box className="col-span-3 ">
            <div className="font-medium pb-4">Notify Player List</div>
            <Grid
              columns={{ initial: '2', sm: '3', md: '4' }}
              className="w-full gap-4"
            >
              {selectedPM?.playerDetail?.map((player, index) => (
                <div className="text-sm">
                  <p>
                    {index + 1}.
                    <span className="font-semibold">{player.name}</span>
                  </p>
                  <p className="text-text-secondary">{player.playerCode}</p>
                </div>
              ))}
            </Grid>
          </Box>
        ) : (
          <Box className="col-span-3 ">
            <div className="font-medium pb-4">Notify User Levels</div>
            <Flex align="center" className="mb-4 gap-3">
              <Checkbox
                checked={selectAll}
                onCheckedChange={handleSelectAll}
                className="border border-secondary"
              />
              <FormLabel>All Levels</FormLabel>
            </Flex>
            <Grid
              columns={{ initial: '2', sm: '3', md: '4' }}
              className="w-full gap-4"
            >
              {playerLevelData?.body?.data &&
                playerLevelData?.body?.data?.map((level, playerIndex) => (
                  <Box key={level.id}>
                    <FormField
                      control={form.control}
                      name={`notification.0.playerLevelIds.${playerIndex}`}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <Flex
                              align="center"
                              justify={'start'}
                              className="space-x-1 flex-grow"
                            >
                              <FormControl className="w-6">
                                <Checkbox
                                  checked={
                                    unSelectOne
                                      ? field.value?.isChecked
                                      : selectAll
                                  }
                                  onCheckedChange={(checked) => {
                                    const updatedData = {
                                      id: level.id,
                                      name: level.name,
                                      isChecked: checked,
                                    };
                                    field.onChange(updatedData);
                                    setUnSelectOne(true);
                                    const selectedItems = form
                                      .watch('notification.0.playerLevelIds')
                                      .filter((item) => item?.isChecked);
                                    if (
                                      selectedItems.length ===
                                      playerLevelData?.body?.data.length
                                    ) {
                                      setSelectAll(true);
                                    } else {
                                      setSelectAll(false);
                                    }
                                  }}
                                  className="border border-secondary "
                                />
                              </FormControl>

                              <FormLabel>{level.name}</FormLabel>
                            </Flex>
                          </FormItem>
                        );
                      }}
                    />
                  </Box>
                ))}
            </Grid>
          </Box>
        )}
        {selectedType === 'PROMOTION' && (
          <Box className="col-span-3 py-6">
            <div className="text-base font-medium">Redirect to</div>
            <FormField
              control={form.control}
              name="notification.0.redirectTo"
              render={({ field }) => (
                <FormItem className="space-y-3 ">
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => {
                        field.onChange(value);
                        fields.forEach((_, index) => {
                          form.setValue(
                            `notification.${index}.redirectTo`,
                            value
                          );
                        });
                      }}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap gap-4 lg:gap-6 pt-2"
                    >
                      <Box>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl className="w-4">
                            <RadioGroupItem value="None" />
                          </FormControl>
                          <FormLabel className="font-normal">None</FormLabel>
                        </FormItem>
                      </Box>
                      <Box>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl className="w-4">
                            <RadioGroupItem value="App_Function" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            App Functions
                          </FormLabel>
                        </FormItem>
                      </Box>
                      <Box>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl className="w-4">
                            <RadioGroupItem value="External_Link" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            External Link
                          </FormLabel>
                        </FormItem>
                      </Box>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </Box>
        )}

        {selectedType === 'PROMOTION' &&
          form.watch('notification.0.redirectTo') === 'App_Function' && (
            <Box className="col-span-3 pb-4">
              <FormField
                control={form.control}
                name="notification.0.appFunctionId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select App Function</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        fields.forEach((_, index) => {
                          form.setValue(
                            `notification.${index}.appFunctionId`,
                            value
                          );
                        });
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {appFunctionData.map((item, index) => (
                          <SelectItem value={item.id} key={index}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </Box>
          )}
        {selectedType === 'PROMOTION' &&
          form.watch('notification.0.redirectTo') === 'External_Link' && (
            <Box className="col-span-3 pb-4">
              <FormField
                control={form.control}
                name="notification.0.externalLink"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        fields.forEach((_, index) => {
                          form.setValue(
                            `notification.${index}.externalLink`,
                            event.target.value
                          );
                        });
                      }}
                      value={field.value}
                      placeholder="Paste Link Here"
                      readOnly={!enableEditMode}
                    />
                  </FormItem>
                )}
              />
            </Box>
          )}

        {selectedType === 'POCKET_MONEY' && (
          <Box className="col-span-3 py-4">
            <FormField
              control={form.control}
              name="notification.0.activePocketMoneyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Active Pocket Money</FormLabel>
                  <Select
                    onValueChange={(id) => {
                      field.onChange(id);
                      // Get level IDs for the selected pocket money
                      const selectedPM = activePocketMoneyData?.find(
                        (pm) => pm.id === id
                      );
                      const selectedPMLevelIds = selectedPM?.levelIds || [];

                      // Map all player levels, setting `isChecked` based on inclusion in selectedPMLevelIds
                      const mappedLevels =
                        playerLevelData?.body?.data.map((pmLevel) => ({
                          id: pmLevel.id,
                          name: pmLevel.name,
                          isChecked:
                            selectedPM?.type === 'PLAYER' ||
                            selectedPMLevelIds.includes(pmLevel.id),
                        })) ?? [];

                      // Update the form field with mapped levels
                      form.setValue(
                        'notification.0.playerLevelIds',
                        mappedLevels
                      );

                      // Update selected pocket money
                      setSelectedPM(selectedPM);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {activePocketMoneyData.map((item, index) => (
                        <SelectItem value={item.id} key={index}>
                          <div className="flex items-end justify-between gap-2">
                            <p>{item.title}</p>
                            <p className="text-text-secondary capitalize">
                              ({item.type.toLocaleLowerCase()})
                            </p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </Box>
        )}
        <Box className="col-span-3">
          <Grid
            columns={{ initial: '1', sm: '2', lg: '3' }}
            className="gap-4 w-full py-4"
          >
            {selectedType === 'PROMOTION' &&
              form.watch('notification.0.redirectTo') !== 'None' &&
              fields.map((item, index) => (
                <Box
                  className="border border-border-secondary rounded-lg"
                  key={index}
                >
                  <Box className="border-b border-border-secondary p-2">
                    <Flex
                      align="center"
                      justify="center"
                      gap="2"
                      className="space-x-2"
                    >
                      <Image
                        src={item.flag}
                        width={20}
                        height={20}
                        alt="Logo Picture"
                        className="w-[20px] h-[20px] rounded"
                      />
                      <div className="font-semibold">{item.label}</div>
                    </Flex>
                  </Box>

                  <Box className="p-2">
                    <FormField
                      control={form.control}
                      name={`notification.${index}.buttonText`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Button Text</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter Button Text"
                              readOnly={!enableEditMode}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </Box>
                </Box>
              ))}
          </Grid>
        </Box>
      </BotWrapper>
    </Box>
  );
};

export default CreateNotification;
