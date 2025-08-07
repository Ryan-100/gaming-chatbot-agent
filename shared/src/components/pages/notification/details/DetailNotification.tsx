'use client';
import React, { useCallback, useEffect, useState } from 'react';
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
  NotificationAppFunctionListData,
  NotificationDetailData,
} from '../../../../types/notification.types';
import { PocketMoneyListData } from '../../../../types/pocket-money.type';

const validationSchema = z.object({
  notification: z.array(
    z.object({
      langId: z.string(),
      label: z.string(),
      flag: z.string(),
      id: z.string().optional(),
      notificationType: z.string().optional(),
      title: z.string(),
      description: z.string(),
      file: z.object({
        id: z.string(),
        url: z.string(),
      }),
      playerLevelIds: z.array(
        z
          .object({
            id: z.string().optional(),
            name: z.string().optional(),
            isChecked: z.boolean().optional().catch(false),
          })
          .optional()
      ),
      redirectTo: z
        .enum(['None', 'App_Function', 'External_Link'])
        .optional()
        .catch('None'),
      buttonText: z.string().optional(),
      appFunctionId: z.string().optional(),
      externalLink: z.string().optional(),
      isPinned: z.boolean().catch(false),
      activePocketMoneyId: z.string().optional(),
    })
  ),
});

type NotificationForm = z.infer<typeof validationSchema>;

interface DetailNotificationProps {
  languageData: LanguageData[];
  selectedType: string;
  appFunctionData: NotificationAppFunctionListData[];
  activePocketMoneyData: PocketMoneyListData[];
  notificationData: NotificationDetailData;
}

const DetailNotification: React.FC<DetailNotificationProps> = ({
  languageData,
  selectedType,
  appFunctionData,
  activePocketMoneyData,
  notificationData,
}) => {
  const [enableEditMode, setEnableEditMode] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [localKey, setLocalKey] = useState(0);
  const [selectedPM, setSelectedPM] = useState<PocketMoneyListData>();

  const { data: playerLevelData } = useGetPlayerLevelsQuery();

  const welcomeDefaultData: NotificationForm = {
    notification: languageData.map((item, index) => {
      return {
        langId: item.id,
        label: item.value,
        flag: item.flag,
        id: notificationData.id ?? '',
        notificationType: selectedType,
        title:
          notificationData?.NotiContent?.find(
            (it) => it.Language.value === item?.value
          )?.label ?? '',
        description:
          notificationData?.NotiContent?.find(
            (it) => it.Language.value === item?.value
          )?.description ?? '',
        file: {
          id:
            notificationData?.NotiContent?.find(
              (it) => it.Language.value === item?.value
            )?.File?.id ?? '',
          url:
            notificationData?.NotiContent?.find(
              (it) => it.Language.value === item?.value
            )?.File?.url ?? '',
        },
        playerLevelIds:
          notificationData?.playerLevelIds?.map((level) => ({
            id: level.id,
            name: level.name,
            isChecked: level.isChecked ?? false,
          })) || [],
        redirectTo: notificationData?.appFunctionId
          ? 'App_Function'
          : notificationData?.externalLink
          ? 'External_Link'
          : 'None',
        appFunctionId: notificationData?.appFunctionId ?? '',
        externalLink: notificationData?.externalLink ?? '',
        buttonText:
          notificationData?.NotiContent?.find(
            (it) => it.Language.value === item?.value
          )?.buttonText ?? '',
        activePocketMoneyId: notificationData?.activePocketMoneyId ?? '',
        isPinned: notificationData?.isPinned ?? false,
      };
    }),
  };

  const form = useForm<NotificationForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: welcomeDefaultData,
  });

  useEffect(() => {
    setSelectedPM(
      activePocketMoneyData?.find(
        (pm) => pm.id === notificationData?.activePocketMoneyId
      )
    );
  }, [notificationData, activePocketMoneyData]);

  const { fields } = useFieldArray({
    name: 'notification',
    control: form.control,
  });

  const submit = async (data: NotificationForm) => {
    console.log('data', data);
  };

  const playerLevelIds = form.watch('notification.0.playerLevelIds');

  const handleSelectAll = useCallback(
    (checked: boolean) => {
      setSelectAll(checked);
      form.setValue(
        'notification.0.playerLevelIds',
        playerLevelIds.map((level) => ({
          ...level,
          isChecked: checked,
        }))
      );
    },
    [form, playerLevelIds]
  );

  useEffect(() => {
    const allSelected = playerLevelIds.every((level) => level?.isChecked);
    setSelectAll(allSelected);
    setLocalKey((prevKey) => prevKey + 1);
  }, [playerLevelIds]);

  return (
    <Box key={localKey}>
      <BotWrapper
        title="Welcome Message"
        subTitle="Contents"
        description="The following content will be shown in Bot when menu is selected."
        form={form}
        submit={submit}
        enableEditMode={false}
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
                  <Flex align="center" className="gap-1">
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
                    className="gap-2"
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
                            image={field.value.url}
                            onClick={field.onChange}
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
                disabled={!enableEditMode}
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
                      render={({ field }) => (
                        <FormItem>
                          <Flex align="center" className="gap-1">
                            <FormControl className="w-6">
                              <Checkbox
                                disabled={!enableEditMode}
                                checked={field.value?.isChecked}
                                onCheckedChange={(checked) => {
                                  const updatedData = {
                                    id: level.id,
                                    name: level.name,
                                    isChecked: checked,
                                  };
                                  field.onChange(updatedData);
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
                      )}
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row flex-wrap gap-6 pt-2"
                      disabled={!enableEditMode}
                    >
                      <Box>
                        <FormItem className="flex items-center gap-2 space-y-0">
                          <FormControl className="w-4">
                            <RadioGroupItem value="None" />
                          </FormControl>
                          <FormLabel className="font-normal">None</FormLabel>
                        </FormItem>
                      </Box>
                      <Box>
                        <FormItem className="flex items-center gap-2 space-y-0">
                          <FormControl className="w-4">
                            <RadioGroupItem value="App_Function" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            App Functions
                          </FormLabel>
                        </FormItem>
                      </Box>
                      <Box>
                        <FormItem className="flex items-center gap-2 space-y-0">
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
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={!enableEditMode}
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
                      {...field}
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
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!enableEditMode}
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
                      className="gap-2"
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

export default DetailNotification;
