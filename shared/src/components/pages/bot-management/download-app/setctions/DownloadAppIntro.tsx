'use client';
import { Box, Flex } from '@radix-ui/themes';
import React, { useState } from 'react';
import { Image } from '../../../../ui/image';
import { Input } from '../../../../ui/input';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { BotWrapper } from '../../../../shared/BotWrapper';
import { LanguageData } from '../../../../../types/language.types';
import { BotTextEditor } from '../../../../shared/bot-management/BotTextEditor';
import { useUpdateBotManagementMutation } from '../../../../../stores/reducers/bot-management.reducer';
import {
  BOT_MANAGEMENT_TYPE,
  DOWNLOAD_TYPE,
} from '../../../../../utils/constants';
import { toast } from 'sonner';
import { BotManagementList } from '../../../../../types/bot-management.types';
import { getTextContentLength } from '../../../../../utils/getEditorTextLength';

const validationSchema = z.object({
  menu: z.array(
    z.object({
      langId: z.string(),
      label: z.string(),
      flag: z.string(),
      id: z.string().optional(),
      name: z.string().min(1, { message: 'Name is Required' }),
      message: z.string().min(10, { message: 'Message 1 is Required' }),
    })
  ),
});

type WelcomeFrom = z.infer<typeof validationSchema>;

interface WelcomeMessageProps {
  languageData: LanguageData[];
  data: BotManagementList;
}

const DownloadAppIntro: React.FC<WelcomeMessageProps> = ({
  languageData,
  data,
}) => {
  const [enableEditMode, setEnableEditMode] = useState(false);

  const welcomeDefaultData: WelcomeFrom = {
    menu: languageData.map((item, index) => {
      return {
        langId: item.id,
        label: item.value,
        flag: item.flag,
        id: item.id,
        name: data?.find((it) => it.langId === item?.id)?.name ?? '',
        message: data?.find((it) => it.langId === item?.id)?.message ?? '',
      };
    }),
  };

  const form = useForm<WelcomeFrom>({
    resolver: zodResolver(validationSchema),
    defaultValues: welcomeDefaultData,
  });

  const { fields } = useFieldArray({
    name: 'menu',
    control: form.control,
  });

  const [updateAction] = useUpdateBotManagementMutation();

  const submit = async (data: WelcomeFrom) => {
    const isValid = !data.menu.some((item, index) => {
      if (getTextContentLength(item.message) > 200) {
        form.setError(`menu.${index}.message`, {
          message: 'Kindly enter maximum 200 chars.',
        });
        return true; // Exceeds character limit
      }
      return false; // Valid
    });
    const updatedData = data.menu.map((item, index) => {
      return {
        id: item.id ?? '',
        name: item.name,
        message: item.message,
        fileId: '',
        langId: item.langId,
        botManagementType: BOT_MANAGEMENT_TYPE.DOWNLOAD,
        link: '',
        downloadType: DOWNLOAD_TYPE.NONE,
        showDownloadType: false,
      };
    });
    if (isValid) {
      try {
        const response = await updateAction({ botMangements: updatedData });
        if (response.data?.meta?.success) {
          toast('Successfully updated download app intro');
          setEnableEditMode(!enableEditMode);
        } else {
          const errorResponse: any = response;
          toast(errorResponse?.error?.data?.meta?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box>
      <BotWrapper
        title="Download App Intro"
        subTitle="Contents"
        description="The following content will be shown in Bot when menu is selected."
        form={form}
        submit={submit}
        enableEditMode={enableEditMode}
        setEnableEditMode={setEnableEditMode}
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
                  className="w-[20px] h-[20px]"
                />
                <div className="font-semibold">{item.label}</div>
              </Flex>
            </Box>
            <Box className="p-2">
              <FormField
                control={form.control}
                name={`menu.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu Button Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter menu button name"
                        readOnly={!enableEditMode}
                        maxLength={50}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Box>
            <Box className="p-2">
              <FormField
                control={form.control}
                name={`menu.${index}.message`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message 1</FormLabel>
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
      </BotWrapper>
    </Box>
  );
};

export default DownloadAppIntro;
