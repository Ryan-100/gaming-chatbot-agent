'use client';
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Flex, Grid, Text } from '@radix-ui/themes';
import { Icons } from '../../../ui/icons';
import { Card } from '../../../ui/card';
import { Image } from '../../../ui/image';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '../../../ui/form';
import Loading from '../../../ui/loading';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import ColorCycle from './components/ColorCycle';
import { ImageUploadDialog } from '../components/ImageUploadDialog';
import {
  useGetSplashScreenQuery,
  useUpdateSplashScreenMutation,
} from '../../../../stores/reducers/themes.reducer';
import { toast } from 'sonner';
import EditButton from '../../../shared/buttons/EditButton';

const initialPrimaryColors = [
  { type: 'BACKGROUND', colorCode: '#B00203' },
  { type: 'BACKGROUND', colorCode: '#FD9432' },
  { type: 'BACKGROUND', colorCode: '#EBEB1A' },
  { type: 'BACKGROUND', colorCode: '#09E508' },
  { type: 'BACKGROUND', colorCode: '#0D50E9' },
  { type: 'BACKGROUND', colorCode: '#7209AB' },
  { type: 'BACKGROUND', colorCode: '#FF3CAA' },
  { type: 'BACKGROUND', colorCode: '#CC7191' },
  { type: 'BACKGROUND', colorCode: '#FFF191' },
];
const validationSchema = z.object({
  newColorCode: z.string(),
});

type CreateColorCodeForm = z.infer<typeof validationSchema>;

type ImageProps = {
  id: string;
  url: string;
  type?: string;
};

type ColorCodeProps = {
  type: string;
  colorCode: string;
};
const SplashScreen = () => {
  const [backgroundDialogOpen, setBackgroundDialogOpen] =
    React.useState<boolean>(false);
  const [logoDialogOpen, setLogoDialogOpen] = React.useState<boolean>(false);

  const [defaultState, setDefaultState] = React.useState(false);

  const [tabValue, SetTabValue] = React.useState<string>('image-only');
  const [backgroundImage, setBackgroundImage] =
    React.useState<ImageProps | null>();

  const [logo, setLogo] = React.useState<ImageProps | null>();
  const [primaryColors, setPrimaryColors] =
    React.useState(initialPrimaryColors);

  const [colorCode, setColorCode] = React.useState<ColorCodeProps | null>();
  const [imageOrColor, setImageOrColor] = React.useState<string>('IMAGE');

  const { data, isLoading, isSuccess } = useGetSplashScreenQuery({});
  const [updateSplashScreen, { isLoading: isUpdating }] =
    useUpdateSplashScreenMutation();
  const splashScreenData = data?.body?.data;

  React.useEffect(() => {
    const logoData = splashScreenData?.images?.find(
      (data) => data.type === 'LOGO'
    ) as ImageProps | undefined;

    const backgroundData = splashScreenData?.images?.find(
      (data) => data.type === 'BACKGROUND'
    );

    if (logoData) {
      setLogo(logoData);
      SetTabValue('logo-background');
    }

    if (backgroundData) {
      if ('colorCode' in backgroundData && backgroundData.colorCode) {
        setColorCode({
          type: backgroundData.type,
          colorCode: backgroundData.colorCode,
        });
        if (
          !primaryColors.find(
            (data) => data.colorCode === backgroundData.colorCode
          )
        ) {
          setPrimaryColors((p) => [
            ...p,
            {
              type: backgroundData.type,
              colorCode: backgroundData.colorCode,
            },
          ]);
        }
        setImageOrColor('COLOR');
      } else if (
        'url' in backgroundData &&
        backgroundData.url &&
        backgroundData.id
      ) {
        setBackgroundImage({
          type: backgroundData.type,
          id: backgroundData.id,
          url: backgroundData.url,
        });
      }
    }
  }, [isSuccess, splashScreenData, defaultState]);

  const form = useForm<CreateColorCodeForm>({
    resolver: zodResolver(validationSchema),
  });

  const setBackgroundHandler = (id: string, url: string, type?: string) => {
    setBackgroundImage({
      id,
      url,
      type,
    });
  };

  const setLogoHandler = (id: string, url: string, type?: string) => {
    setLogo({
      id,
      url,
      type,
    });
  };

  const ImageOrColorHandler = (value: string) => {
    if (imageOrColor === 'IMAGE') {
      setBackgroundImage(null);
    } else {
      setColorCode(null);
    }
    setImageOrColor(value);
  };

  const tabValueHandler = (value: string) => {
    if (value === 'image-only') {
      setLogo(null);
      setColorCode(null);
    } else {
      setImageOrColor('IMAGE');
    }
    SetTabValue(value);
  };

  const resetBackgroundImage = () => {
    setBackgroundImage(null);
  };
  const resetLogo = () => {
    setLogo(null);
  };
  const resetColorCode = () => {
    setColorCode(null);
  };

  const resetHandler = () => {
    resetBackgroundImage();
    resetLogo();
    resetColorCode();
  };

  const isColorCodeUnique = (newColorCode: string) => {
    return !primaryColors.some(
      (color) => color.colorCode.toUpperCase() === newColorCode.toUpperCase()
    );
  };

  const submit = async (data: CreateColorCodeForm) => {
    if (!isColorCodeUnique(data.newColorCode)) {
      toast.error('This color code already exists.');
      return;
    }

    setPrimaryColors((p) => [
      ...p,
      { type: 'BACKGROUND', colorCode: data.newColorCode },
    ]);
  };

  const updateData = async () => {
    const dataToSend = {
      id: splashScreenData?.id ?? '',
      themeType: splashScreenData?.themeType ?? 'SPLASH_SCREEN',
      images:
        tabValue === 'image-only'
          ? [{ ...backgroundImage }]
          : imageOrColor === 'IMAGE'
          ? [{ ...logo }, { ...backgroundImage }]
          : [{ ...logo }, { ...colorCode }],
    };
    if (!dataToSend.images[0].type) {
      toast.error('Plase upload all the files!');
      return;
    }
    try {
      const response = await updateSplashScreen(dataToSend);
      if (response.data?.meta?.success) {
        toast.success(response.data?.meta?.message);
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} className="gap-4 bg-secondary">
      <Card className="w-full flex items-start rounded-lg bg-background p-4 gap-[10px] min-w-[180px]">
        <div className="w-6 h-6">
          <Icons.Info className="text-surface-link w-6 h-6" />
        </div>
        <Text className="text-surface-link text-sm">
          An introductory screen that appears when you open an app for the best
          positive first impression.
        </Text>
      </Card>
      <Grid
        columns={{
          initial: '1',
          sm: '2',
        }}
        className="gap-4"
      >
        <Card className="col-span-1 flex flex-col justify-between p-4 rounded-2xl">
          <Tabs
            defaultValue="image-only"
            className="w-full h-full"
            value={tabValue}
            onValueChange={tabValueHandler}
          >
            <TabsList className="self-start w-fit scale-75 sm:scale-100 -ml-12 sm:ml-0 mb-4">
              <TabsTrigger value="image-only">Image Only</TabsTrigger>
              <TabsTrigger value="logo-background">
                Logo & Background
              </TabsTrigger>
            </TabsList>
            <TabsContent value="image-only">
              <Flex direction={'column'} className="gap-4 text-sm h-full">
                <Text className="font-semibold">Upload Image Here</Text>
                <Flex
                  justify={'between'}
                  align={'start'}
                  className="w-full h-full"
                >
                  <Flex direction={'column'}>
                    <Text className="text-sm">File Format : JPG, JPEG</Text>
                    <Text className="text-sm">Image Size : 1080 x 2340px</Text>
                    <Text className="text-sm">File Size : Under 20 MB </Text>
                  </Flex>
                  {backgroundImage ? (
                    <Flex className="relative w-20 h-20 group">
                      <Flex
                        align={'center'}
                        justify={'center'}
                        className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 text-white w-4 h-4 rounded-full bg-black/55 cursor-pointer"
                        onClick={resetBackgroundImage}
                      >
                        <Icons.Close />
                      </Flex>
                      <Image
                        src={backgroundImage.url}
                        alt="bg-image"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover z-0"
                      />
                    </Flex>
                  ) : (
                    <Flex
                      align={'center'}
                      justify={'center'}
                      className="border border-dashed border-spacing-10 rounded-lg cursor-pointer w-20 h-20"
                      onClick={() => setBackgroundDialogOpen(true)}
                    >
                      <Icons.ImgUpload className="w-8 h-8" />
                    </Flex>
                  )}
                </Flex>
              </Flex>
            </TabsContent>
            <TabsContent value="logo-background">
              <Flex direction={'column'} className="gap-4 text-sm h-full mb-4">
                <Text className="font-semibold">Upload Logo Here</Text>
                <Flex
                  justify={'between'}
                  align={'start'}
                  className="w-full h-full flex-wrap gap-4"
                >
                  <Flex direction={'column'}>
                    <Text className="text-sm">File Format : JPG, JPEG</Text>
                    <Text className="text-sm">Image Size : 200 x 200px</Text>
                    <Text className="text-sm">File Size : Maximum 10 MB </Text>
                  </Flex>
                  {logo?.url ? (
                    <Flex className="relative w-20 h-20 group">
                      <Flex
                        align={'center'}
                        justify={'center'}
                        className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 text-white w-4 h-4 rounded-full bg-black/55 cursor-pointer"
                        onClick={resetLogo}
                      >
                        <Icons.Close />
                      </Flex>
                      <Image
                        src={logo.url}
                        alt="logo-image"
                        width={80}
                        height={80}
                        className="rounded-lg object-cover z-0"
                      />
                    </Flex>
                  ) : (
                    <Flex
                      align={'center'}
                      justify={'center'}
                      className="border border-dashed border-spacing-10 rounded-lg cursor-pointer w-20 h-20"
                      onClick={() => setLogoDialogOpen(true)}
                    >
                      <Icons.ImgUpload className="w-8 h-8" />
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Flex direction={'column'} className="gap-4 text-sm h-full">
                <Text className="font-semibold">
                  {imageOrColor === 'IMAGE'
                    ? 'Background'
                    : 'Choose Primary Color'}
                </Text>
                <RadioGroup
                  className="flex items-center space-x-6 text-base"
                  value={imageOrColor}
                  onValueChange={(value) => ImageOrColorHandler(value)}
                >
                  <Flex className="items-center space-x-2">
                    <RadioGroupItem value="IMAGE" id="IMAGE" />
                    <Label htmlFor="IMAGE" className="text-xs font-normal">
                      Use Image
                    </Label>
                  </Flex>
                  <Flex className="items-center space-x-2">
                    <RadioGroupItem value="COLOR" id="COLOR" />
                    <Label htmlFor="COLOR" className="text-xs font-normal">
                      Use Color
                    </Label>
                  </Flex>
                </RadioGroup>
                {imageOrColor === 'IMAGE' ? (
                  <Flex
                    justify={'between'}
                    align={'start'}
                    className="w-full h-full flex-wrap gap-4"
                  >
                    <Flex direction={'column'}>
                      <Text className="text-sm">File Format : JPG, JPEG</Text>
                      <Text className="text-sm">Image Size : 200 x 200px</Text>
                      <Text className="text-sm">
                        File Size : Maximum 10 MB{' '}
                      </Text>
                    </Flex>
                    {backgroundImage ? (
                      <Flex className="relative w-20 h-20 group">
                        <Flex
                          align={'center'}
                          justify={'center'}
                          className="absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 text-white w-4 h-4 rounded-full bg-black/55 cursor-pointer"
                          onClick={resetBackgroundImage}
                        >
                          <Icons.Close />
                        </Flex>
                        <Image
                          src={backgroundImage.url}
                          alt="bg-image"
                          width={80}
                          height={80}
                          className="rounded-lg object-cover z-0"
                        />
                      </Flex>
                    ) : (
                      <Flex
                        align={'center'}
                        justify={'center'}
                        className="border border-dashed border-spacing-10 rounded-lg cursor-pointer w-20 h-20"
                        onClick={() => setBackgroundDialogOpen(true)}
                      >
                        <Icons.ImgUpload className="w-8 h-8" />
                      </Flex>
                    )}
                  </Flex>
                ) : (
                  <>
                    <Flex align={'center'} className="flex-wrap gap-6">
                      {primaryColors.map((color) => (
                        <Flex
                          key={color.colorCode}
                          align={'center'}
                          justify={'center'}
                          direction={'column'}
                          className="gap-1"
                        >
                          <ColorCycle
                            color={color.colorCode}
                            isSelected={
                              color?.colorCode === colorCode?.colorCode
                            }
                            setColorCode={() => {
                              resetBackgroundImage();
                              setColorCode({
                                type: 'BACKGROUND',
                                colorCode: color?.colorCode,
                              });
                            }}
                          />
                        </Flex>
                      ))}
                    </Flex>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(submit)}
                        className="flex items-end gap-4 text-xs"
                      >
                        <FormField
                          control={form.control}
                          name="newColorCode"
                          render={({ field }) => (
                            <FormItem className="w-full">
                              <FormLabel>Color Code</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter color code (eg.#FFFFFF)"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button type="submit" autoFocus className="w-20">
                          Add
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </Flex>
            </TabsContent>
          </Tabs>
          <Flex
            justify={'between'}
            align={'center'}
            className="mt-4 flex-wrap gap-4 flex flex-row-reverse min-[400px]:flex-row"
          >
            <Flex
              align={'center'}
              justify={'center'}
              className="text-primary gap-1 cursor-pointer"
              onClick={resetHandler}
            >
              <Icons.Refresh />
              <Text className="text-sm">Reset</Text>
            </Flex>
            <Flex align={'center'} justify={'center'} className="gap-2">
              <Button
                variant="ghost"
                onClick={() => setDefaultState((p) => !p)}
              >
                Cancel
              </Button>
              <EditButton
                name="Update"
                onClick={updateData}
                loading={isUpdating}
              />
            </Flex>
          </Flex>
        </Card>
        <Card className="col-span-1 flex flex-col gap-6 items-center justify-center p-2 sm:p-4 rounded-2xl">
          <Flex align={'center'} className="gap-2">
            <Icons.Eye className="w-4 h-4" />
            <Text className="text-sm ">Preview</Text>
          </Flex>
          <Flex
            direction={'column'}
            align={'center'}
            justify={'center'}
            className="border-[10px] border-ring rounded-3xl w-[180px] h-[380px] sm:w-[220px] sm:h-[453px] bg-surface-secondary"
            style={{
              background: colorCode
                ? colorCode?.colorCode
                : `url(${backgroundImage && backgroundImage?.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {logo && (
              <Image
                src={logo.url}
                alt=" uploaded files"
                width={120}
                height={120}
                className="object-fill"
              />
            )}
            {!backgroundImage && !colorCode && !logo && (
              <>
                <Image
                  src="/upload/images/themes_default.png"
                  alt="No uploaded files"
                  width={120}
                  height={120}
                  className="object-fill"
                />
                <Text className="text-[10px] mt-4">
                  Updates will appear here
                </Text>
              </>
            )}
          </Flex>
        </Card>
      </Grid>
      <ImageUploadDialog
        type="BACKGROUND"
        open={backgroundDialogOpen}
        onClose={setBackgroundDialogOpen}
        setImage={setBackgroundHandler}
      />
      <ImageUploadDialog
        type="LOGO"
        open={logoDialogOpen}
        onClose={setLogoDialogOpen}
        setImage={setLogoHandler}
      />
    </Flex>
  );
};

export default SplashScreen;
