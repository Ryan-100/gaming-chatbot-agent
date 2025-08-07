'use client';
import { Box, Flex } from '@radix-ui/themes';
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
import { BotTextEditor } from '../../../../shared/bot-management/BotTextEditor';
import {
  useGetSpinRulesQuery,
  useUpdateSpinRulesMutation,
} from '../../../../../stores/reducers/spin-rules.reducer';
import {
  SpinRulesListData,
  spinRulesSchema,
} from '../../../../../types/spin-rules.types';
import { toast } from 'sonner';
import Loading from '../../../../ui/loading';
import { LanguageData } from '../../../../../types/language.types';
import { getTextContentLength } from '../../../../../utils/getEditorTextLength';

const validationSchema = z.object({
  spinRules: z.array(
    z.object({
      langId: z.string(),
      label: z.string(),
      flag: z.string(),
      id: z.string().optional(),
      message: z.string().min(10, { message: 'Message 1 is Required' }),
    })
  ),
});

type SpinRulesFrom = z.infer<typeof validationSchema>;

interface SpinProps {
  languageData: LanguageData[];
  data: SpinRulesListData[];
}

const SpinRule: React.FC<SpinProps> = ({ languageData, data }) => {
  const [enableEditMode, setEnableEditMode] = useState(false);

  const spinRulesDefaultData: SpinRulesFrom = {
    spinRules: languageData.map((item, index) => {
      return {
        langId: item.id,
        label: item.value,
        flag: item.flag,
        id: data?.find((it) => it.languageId === item?.id)?.id ?? '',
        message: data?.find((it) => it.languageId === item?.id)?.message ?? '',
      };
    }),
  };

  const [updateSpinRules, { isLoading: formSubmitting }] =
    useUpdateSpinRulesMutation();

  const form = useForm<SpinRulesFrom>({
    resolver: zodResolver(validationSchema),
    defaultValues: spinRulesDefaultData,
  });

  const { fields } = useFieldArray({
    name: 'spinRules',
    control: form.control,
  });

  const submit = async (submittedData: SpinRulesFrom) => {
    const isValid = !submittedData.spinRules.some((item, index) => {
      if (getTextContentLength(item.message) > 200) {
        form.setError(`spinRules.${index}.message`, {
          message: 'Kindly enter maximum 200 chars.',
        });
        return true; // Exceeds character limit
      }
      return false; // Valid
    });
    const transformedData = submittedData.spinRules.map((item) => {
      return {
        id: item.id ?? '',
        message: item.message,
        languageId: item.langId,
      };
    });
    if (isValid) {
      try {
        const response = await updateSpinRules({ spinRules: transformedData });
        if (response.data?.meta?.success) {
          toast.success(response.data?.meta.message);
          setEnableEditMode(false);
        } else {
          const errorResponse: any = response;
          toast(errorResponse?.error?.data?.meta?.devMessage);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (formSubmitting) {
    return <Loading />;
  }

  return (
    <Box>
      <BotWrapper
        title="Spin Rule"
        subTitle="Contents"
        description="The following content will be shown in Spin section."
        form={form}
        submit={submit}
        enableEditMode={enableEditMode}
        setEnableEditMode={setEnableEditMode}
        loading={formSubmitting}
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
                  src={item?.flag}
                  width={20}
                  height={20}
                  alt="Logo Picture"
                  className="w-[20px] h-[20px]"
                />
                <div className="font-semibold">{item?.label}</div>
              </Flex>
            </Box>

            <Box className="p-2">
              <FormField
                control={form.control}
                name={`spinRules.${index}.message`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
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

export default SpinRule;
