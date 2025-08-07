'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Flex } from '@radix-ui/themes';
import { BotWrapper } from '../../../../../shared/BotWrapper';
import { BotTextEditor } from '../../../../../shared/bot-management/BotTextEditor';
import { Image } from '../../../../../ui/image';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../../ui/form';
import { Input } from '../../../../../ui/input';
import Loading from '../../../../../ui/loading';
import { useUpdateSettingSupportMutation } from '../../../../../../stores/reducers/settings-support.reducer';
import { SettingSupportListData } from '../../../../../../types/settings-support.types';
import { LanguageData } from '../../../../../../types/language.types';
import { getTextContentLength } from '../../../../../../utils/getEditorTextLength';

const validationSchema = z.object({
  menu: z.array(
    z.object({
      langId: z.string(),
      label: z.string(),
      flag: z.string(),
      id: z.string().optional(),
      buttonName: z.string().min(1, { message: 'Button Name is Required' }),
      message: z.string().min(10, { message: 'Message is Required' }),
    })
  ),
});

type SupportFrom = z.infer<typeof validationSchema>;

interface SupportMessageProps {
  languageData: LanguageData[];
  data: SettingSupportListData[];
}

const SupportIntro: React.FC<SupportMessageProps> = ({
  languageData,
  data,
}) => {
  const [enableEditMode, setEnableEditMode] = useState(false);

  const [updateSettingSupport, { isLoading: formSubmitting }] =
    useUpdateSettingSupportMutation();

  const supportDefaultData: SupportFrom = {
    menu: languageData.map((item, index) => {
      return {
        langId: item.id,
        label: item.value,
        flag: item.flag,
        id: data?.find((it) => it.langId === item?.id)?.id ?? '',
        buttonName:
          data?.find((it) => it.langId === item?.id)?.buttonName ?? '',
        message: data?.find((it) => it.langId === item?.id)?.message ?? '',
      };
    }),
  };

  const form = useForm<SupportFrom>({
    resolver: zodResolver(validationSchema),
    defaultValues: supportDefaultData,
  });

  const { fields } = useFieldArray({
    name: 'menu',
    control: form.control,
  });

  const submit = async (data: SupportFrom) => {
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
        buttonName: item.buttonName,
        message: item.message,
        langId: item.langId,
      };
    });
    if (isValid) {
      try {
        const response = await updateSettingSupport({
          supportIntros: updatedData,
        });
        if (response.data?.meta?.success) {
          toast.success(response.data?.meta.message);
          setEnableEditMode(false);
        } else {
          const errorResponse: any = response;
          toast.error(errorResponse?.error.data?.meta?.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Box>
      <BotWrapper
        title="Support Intro"
        subTitle="Contents"
        description="The following content will be shown in Bot when supportIntros is selected."
        loading={formSubmitting}
        hideAccordion={true}
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
                name={`menu.${index}.buttonName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Menu Button Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter Your title here"
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
                name={`menu.${index}.message`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message&nbsp;{index + 1}</FormLabel>
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

export default SupportIntro;
