import React, { useState } from 'react';
import { toast } from 'sonner';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { Image } from '../../../../ui/image';
import { GuideListData } from '../../../../../../src/types/guide.types';
import { useUpdateGuideMutation } from '../../../../../stores/reducers/guide.reducer';
import { LanguageData } from '../../../../../types/language.types';
import { z } from 'zod';
import { GUIDE_TYPE } from '../../../../../utils/constants';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BotWrapper } from '../../../../shared/BotWrapper';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../../ui/form';
import ImagePicker from '../../../../shared/ImagePicker';
import { Switch } from '../../../../ui/switch';
import VideoPicker from '../../../../shared/VideoPicker';

const mediaSchema = z.object({
  id: z.string(),
  url: z.string(),
  order: z.number().optional(),
});

type MediaForm = z.infer<typeof mediaSchema>;

const validationSchema = z.object({
  guides: z.array(
    z.object({
      langId: z.string(),
      label: z.string(),
      flag: z.string(),
      guideType: z.string(),
      id: z.string().optional(),
      images: z.array(mediaSchema),
      videos: z.array(mediaSchema),
      showImages: z.boolean(),
      showVideos: z.boolean(),
    })
  ),
});

type LoginGuideForm = z.infer<typeof validationSchema>;

interface LoginGuideProps {
  languageData: LanguageData[];
  data: GuideListData[];
}

const LoginGuide: React.FC<LoginGuideProps> = ({ data, languageData }) => {
  const [enableEditMode, setEnableEditMode] = useState(false);
  const [localKey, setLocalKey] = useState(0);

  const downDefaultData: LoginGuideForm = {
    guides: languageData.map((item) => {
      return {
        langId: item.id,
        label: item.value,
        flag: item.flag,
        guideType:
          data?.find((it) => it.langId === item?.id)?.guideType ??
          GUIDE_TYPE.LOGIN,
        id: data?.find((it) => it.langId === item?.id)?.id ?? '',
        showImages:
          data?.find((it) => it.langId === item?.id)?.showImages ?? false,
        showVideos:
          data?.find((it) => it.langId === item?.id)?.showVideos ?? false,
        images:
          data?.find((it) => it.langId === item?.id)?.images ??
          Array(4).fill({ id: '', order: 1, url: '' }),
        videos: data?.find((it) => it.langId === item?.id)?.videos ?? [
          { id: '', order: 1, url: '' },
        ],
      };
    }),
  };

  const form = useForm<LoginGuideForm>({
    resolver: zodResolver(validationSchema),
    defaultValues: downDefaultData,
  });

  const { fields, update } = useFieldArray({
    name: 'guides',
    control: form.control,
  });

  const [updateGuideForm] = useUpdateGuideMutation();

  const submit = async (data: LoginGuideForm) => {
    const updatedData = data.guides.map((item, index) => {
      return {
        id: item.id ?? '',
        langId: item.langId,
        guideType: GUIDE_TYPE.LOGIN,
        showImages: data.guides[0]?.showImages ?? false,
        showVideos: data.guides[0]?.showVideos ?? false,
        images: item.images.map((img, index) => {
          return {
            id: img.id,
            url: img.url,
            order: index + 1,
          };
        }),
        videos: item.videos.map((img, index) => {
          return {
            id: img.id,
            url: img.url,
            order: index + 1,
          };
        }),
      };
    });
    try {
      const response = await updateGuideForm({
        guides: updatedData,
      });
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

  const swapHandler = (guideIndex: number, imgIndex: number) => {
    if (imgIndex <= 0) return;

    const oldImages = form.getValues(
      `guides.${guideIndex}.images`
    ) as MediaForm[];

    if (imgIndex >= oldImages.length) return;

    const newImages = [...oldImages];
    [newImages[imgIndex - 1], newImages[imgIndex]] = [
      newImages[imgIndex],
      newImages[imgIndex - 1],
    ];
    form.setValue(`guides.${guideIndex}.images`, newImages, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setLocalKey((prevKey) => prevKey + 1);
  };

  const deleteHandler = (guideIndex: number, imgIndex: number) => {
    const oldImages = form.getValues(
      `guides.${guideIndex}.images`
    ) as MediaForm[];
    const newImages = oldImages.map((image, index) =>
      index === imgIndex ? { id: '', url: '', order: image.order } : image
    );
    update(guideIndex, {
      ...form.getValues(`guides.${guideIndex}`),
      images: newImages,
    });
    setLocalKey((prevKey) => prevKey + 1);
    console.log(form.watch(`guides.${guideIndex}.images`));
  };

  return (
    <Box key={localKey}>
      <BotWrapper
        title="Download Guide"
        subTitle="Contents"
        description="The following content will be shown in Bot when menu is selected."
        form={form}
        submit={submit}
        enableEditMode={enableEditMode}
        setEnableEditMode={setEnableEditMode}
        hideAccordion
      >
        <Box className="col-span-3">
          <Box className="col-span-3 px-[1px]">
            <FormField
              control={form.control}
              name={`guides.${0}.showImages`}
              render={({ field }) => (
                <Flex align="center" justify="between">
                  <FormLabel>Image Guide</FormLabel>
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!enableEditMode}
                      />
                    </FormControl>
                  </FormItem>
                </Flex>
              )}
            />
          </Box>
          <Grid
            columns={{ initial: '1', sm: '2', lg: '3' }}
            className="gap-4 w-full py-4"
          >
            {form.watch(`guides.0.showImages`) &&
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
                        className="w-[20px] h-[20px]"
                      />
                      <div className="font-semibold">{item.label}</div>
                    </Flex>
                  </Box>
                  <Box className="p-2 space-y-2">
                    {item.images.map((image, imgIndex) => (
                      <FormField
                        key={imgIndex}
                        control={form.control}
                        name={`guides.${index}.images.${imgIndex}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                              <ImagePicker
                                image={field.value?.url}
                                onClick={field.onChange}
                                editMode={enableEditMode}
                                upHandler={() =>
                                  swapHandler(index, imgIndex + 1)
                                }
                                downHandler={() =>
                                  swapHandler(index, imgIndex + 1)
                                }
                                deleteHandler={() =>
                                  deleteHandler(index, imgIndex)
                                }
                                hideControl={false}
                                hideDownUpControl={
                                  imgIndex === item.images.length - 1
                                }
                                disableDown={
                                  imgIndex === item.images.length - 1
                                }
                                disableUp={imgIndex === 0}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
          </Grid>

          <Box className="col-span-3 px-[1px] border-t border-t-border-secondary pt-4 mt-2">
            <FormField
              control={form.control}
              name={`guides.${0}.showVideos`}
              render={({ field }) => (
                <Flex align="center" justify="between">
                  <FormLabel>Video Guide</FormLabel>
                  <FormItem>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                </Flex>
              )}
            />
          </Box>
          <Grid
            columns={{ initial: '1', sm: '2', lg: '3' }}
            className="gap-4 w-full py-4"
          >
            {form.watch(`guides.0.showVideos`) &&
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
                        className="w-[20px] h-[20px]"
                      />
                      <div className="font-semibold">{item.label}</div>
                    </Flex>
                  </Box>
                  <Box className="p-2 space-y-2">
                    {item.videos.map((video, imgIndex) => (
                      <FormField
                        key={imgIndex}
                        control={form.control}
                        name={`guides.${index}.videos.${imgIndex}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Video</FormLabel>
                            <FormControl>
                              <VideoPicker
                                video={field.value.url}
                                onClick={field.onChange}
                                editMode={enableEditMode}
                                deleteHandler={field.onChange}
                                hideControl={false}
                                hideDownUpControl={true}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
          </Grid>
        </Box>
      </BotWrapper>
    </Box>
  );
};

export default LoginGuide;
