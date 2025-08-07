'use client';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import React, { useState } from 'react';
import { Image } from '../../../../ui/image';
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
import { Input } from '../../../../ui/input';
import { Icons } from '../../../../ui/icons';
import { Label } from '../../../../ui/label';
import { BotManagementList } from '../../../../../types/bot-management.types';
import { getTextContentLength } from '../../../../../utils/getEditorTextLength';

const validationSchema = z.object({
  menu: z.array(
    z.object({
      langId: z.string(),
      label: z.string(),
      flag: z.string(),
      id: z.string().optional(),
      message: z.string().min(10, { message: 'Message 1 is Required' }),
    })
  ),
});

type WelcomeFrom = z.infer<typeof validationSchema>;

interface WelcomeMessageProps {
  languageData: LanguageData[];
  data: BotManagementList;
}

const PlayStoreLinks: React.FC<WelcomeMessageProps> = ({
  languageData,
  data,
}) => {
  const [enableEditMode, setEnableEditMode] = useState(false);
  const [link, setLink] = useState(data[0]?.link ?? '');
  const [linkError, setLinkError] = useState('');

  const welcomeDefaultData: WelcomeFrom = {
    menu: languageData.map((item) => {
      return {
        langId: item.id,
        label: item.value,
        flag: item.flag,
        id: data?.find((it) => it.langId === item?.id)?.id ?? '',
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
    if (link) {
      setLinkError('');
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
          name: BOT_MANAGEMENT_TYPE.APP_LINK,
          message: item.message,
          fileId: '',
          langId: item.langId,
          botManagementType: BOT_MANAGEMENT_TYPE.APP_LINK,
          link: link,
          downloadType: DOWNLOAD_TYPE.PLAY_STORE,
          showDownloadType: false,
        };
      });
      if (isValid) {
        try {
          const response = await updateAction({ botMangements: updatedData });
          if (response.data?.meta?.success) {
            toast('Successfully updated play store link');
            setEnableEditMode(!enableEditMode);
          } else {
            const errorResponse: any = response;
            toast(errorResponse?.error?.data?.meta?.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      setLinkError('Link is required');
    }
  };

  return (
    <Box>
      <BotWrapper
        title="Play Store Links"
        subTitle="Contents"
        description="The following content will be shown in Bot when menu is selected."
        form={form}
        submit={submit}
        enableEditMode={enableEditMode}
        setEnableEditMode={setEnableEditMode}
      >
        <Box className="col-span-3 px-[1px]">
          <Label>Link</Label>
          <Input
            placeholder="Enter play store link"
            readOnly={!enableEditMode}
            className="mt-1"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          {linkError && enableEditMode && (
            <div className="text-xs text-red-600 flex items-center mt-1">
              <div className="me-1">
                <Icons.Error />
              </div>
              {linkError}
            </div>
          )}
        </Box>
        <Box className="col-span-3">
          <Grid
            columns={{ initial: '1', sm: '2', lg: '3' }}
            className="gap-4 w-full py-2"
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
          </Grid>
        </Box>
      </BotWrapper>
    </Box>
  );
};

export default PlayStoreLinks;
