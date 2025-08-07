'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Box, Flex } from '@radix-ui/themes';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import { Image } from '../../../../ui/image';
import { BotTextEditor } from '../../../../shared/bot-management/BotTextEditor';
import { BotWrapper } from '../../../../shared/BotWrapper';
import { LegalListData } from '../../../../../types/legal.types';
import { useUpdateLegalMutation } from '../../../../../stores/reducers/legal.reducer';
import { LanguageData } from '../../../../../types/language.types';
import { LEGAL_TYPE } from '../../../../../utils/constants';

const validationSchema = z.object({
  legals: z.array(
    z.object({
      langId: z.string(),
      label: z.string(),
      flag: z.string(),
      id: z.string().optional(),
      content: z.string().min(1, { message: 'Message is Required' }),
      legalType: z.string(),
    })
  ),
});

type TermsConditionsFrom = z.infer<typeof validationSchema>;

interface TermsConditionsProps {
  languageData: LanguageData[];
  data: LegalListData[];
}

const TermsConditions: React.FC<TermsConditionsProps> = ({
  languageData,
  data,
}) => {
  const [enableEditMode, setEnableEditMode] = useState(false);

  const defaultData: TermsConditionsFrom = {
    legals: languageData.map((item, index) => {
      return {
        langId: item.id,
        label: item.value,
        flag: item.flag,
        id: data?.find((it) => it.langId === item?.id)?.id ?? '',
        content: data?.find((it) => it.langId === item?.id)?.content ?? '',
        legalType: LEGAL_TYPE.TERMS,
      };
    }),
  };

  const form = useForm<TermsConditionsFrom>({
    resolver: zodResolver(validationSchema),
    defaultValues: defaultData,
  });

  const { fields } = useFieldArray({
    name: 'legals',
    control: form.control,
  });

  const [updateLegal, { isLoading: formSubmitting }] = useUpdateLegalMutation();

  const submit = async (submittedData: TermsConditionsFrom) => {
    console.log(submittedData);
    const transformedData = {
      legals: submittedData.legals.map((legal) => ({
        id: legal.id ?? '',
        content: legal.content,
        langId: legal.langId,
        legalType: legal.legalType,
      })),
    };
    try {
      const response = await updateLegal({ data: transformedData });
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta.message);
        setEnableEditMode(false);
      } else {
        const errorResponse: any = response;
        toast(errorResponse?.error?.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <BotWrapper
        title="Terms Conditions"
        subTitle="Contents"
        description="The following content will be shown in Terms Conditions"
        loading={formSubmitting}
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
                name={`legals.${index}.content`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <BotTextEditor
                        editMode={enableEditMode}
                        value={field.value}
                        setValue={field.onChange}
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

export default TermsConditions;
