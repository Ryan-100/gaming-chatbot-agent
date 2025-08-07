'use client';
import React from 'react';
import { Reorder } from 'framer-motion';
import { toast } from 'sonner';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import { Icons } from '../../../ui/icons';
import { Card } from '../../../ui/card';
import { Image } from '../../../ui/image';
import { Button } from '../../../ui/button';
import Loading from '../../../ui/loading';
import { cn } from '../../../../utils/cn';
import { OnboardingUploadDialog } from './components/OnboardingUploadDialog';
import {
  useGetOnboardingQuery,
  useGetSplashScreenQuery,
  useUpdateOnboardingMutation,
} from '../../../../stores/reducers/themes.reducer';
import { OnboardingUpdateDialog } from './components/OnboardingUpdateDialog';
import EditButton from '../../../shared/buttons/EditButton';

type ImageProps = {
  id: string;
  url: string;
  order: number;
  headline: string;
  description: string;
};

type SplashScreenProps = {
  id: string;
  url: string;
  type?: string;
};

type ColorCodeProps = {
  type: string;
  colorCode: string;
};

const Onboarding = () => {
  const { data, isLoading, isSuccess } = useGetOnboardingQuery({});

  const {
    data: backgroundData,
    isLoading: backgroundLoading,
    isSuccess: backgroundSuccess,
  } = useGetSplashScreenQuery({});
  const splashScreenData = backgroundData?.body?.data;

  const [backgroundImage, setBackgroundImage] =
    React.useState<SplashScreenProps | null>();

  const [logo, setLogo] = React.useState<SplashScreenProps | null>();

  const [colorCode, setColorCode] = React.useState<ColorCodeProps | null>();

  const [defaultState, setDefaultState] = React.useState(false);
  const [addImageDialog, setAddImageDialog] = React.useState(false);
  const [ads, setAds] = React.useState<ImageProps[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageToReplace, setImageToReplace] =
    React.useState<ImageProps | null>();

  const [updateOnboarding, { isLoading: isUpdating }] =
    useUpdateOnboardingMutation();

  const resetHandler = () => {
    setAds([]);
  };

  React.useEffect(() => {
    setAds(data?.body?.data?.images ?? []);
  }, [isSuccess, data, defaultState]);

  React.useEffect(() => {
    const logoData = splashScreenData?.images?.find(
      (data) => data.type === 'LOGO'
    ) as ImageProps | undefined;

    const backgroundData = splashScreenData?.images?.find(
      (data) => data.type === 'BACKGROUND'
    );

    if (logoData) {
      setLogo(logoData);
    }

    if (backgroundData) {
      if ('colorCode' in backgroundData && backgroundData.colorCode) {
        setColorCode({
          type: backgroundData.type,
          colorCode: backgroundData.colorCode,
        });
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
  }, [backgroundSuccess, splashScreenData]);

  const imageAddHandler = (
    id: string,
    url: string,
    headline: string,
    description: string
  ) => {
    if (ads.length === 5) return;
    setAds((p) => [
      ...p,
      {
        id,
        url,
        order: ads.length + 1,
        headline,
        description,
      },
    ]);
  };

  const imageReplaceHandler = (
    id: string,
    url: string,
    order: number,
    headline: string,
    description: string
  ) => {
    const updatedAds = ads.map((ad) =>
      ad.order === order ? { ...ad, id, url, headline, description } : ad
    );

    setAds(updatedAds);
  };

  const imageDeleteHandler = (id: string) => {
    const filteredData = ads.filter((image) => image.id !== id);
    setAds(filteredData);
  };

  const goBackward = () => {
    if (currentIndex !== 0) {
      setCurrentIndex((p) => p - 1);
    }
  };
  const goForward = () => {
    if (currentIndex !== ads.length - 1) {
      setCurrentIndex((p) => p + 1);
    }
  };

  const updateOrder = (newOrder: ImageProps[]) => {
    const updatedAds = newOrder.map((ad, index) => ({
      ...ad,
      order: index + 1,
    }));
    setAds(updatedAds);
  };

  const updateHandler = async () => {
    const dataToSend = {
      id: data?.body?.data?.id ?? '',
      themeType: data?.body?.data?.themeType ?? 'ONBOARDING',
      images: ads,
    };
    try {
      const response = await updateOnboarding(dataToSend);
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

  if (isLoading || backgroundLoading) {
    return <Loading />;
  }

  return (
    <Flex direction={'column'} className="gap-4 bg-secondary">
      <Card className="w-full flex items-start rounded-lg bg-background p-4 gap-[10px]">
        <div className="w-6 h-6">
          <Icons.Info className="text-surface-link w-6 h-6" />
        </div>
        <Text className="text-surface-link text-sm">
          Short explanation of your service will appear here.
        </Text>
      </Card>
      <Grid
        columns={{
          initial: '1',
          sm: '2',
        }}
        className="gap-4"
      >
        <Card className="col-span-1 flex flex-col justify-between p-6 rounded-2xl">
          <Flex direction={'column'} className="gap-10">
            <Flex direction={'column'} className="gap-4 text-sm h-full">
              <Text className="font-semibold">Upload Image Here</Text>
              <Flex
                justify={'between'}
                align={'start'}
                className="w-full h-full flex-wrap gap-4"
              >
                <Flex direction={'column'}>
                  <Text className="text-sm">File Format : JPG, JPEG</Text>
                  <Text className="text-sm">Image Size : 1980 x 2340px</Text>
                  <Text className="text-sm">File Size : Maximum 10 MB </Text>
                </Flex>

                <Flex
                  align={'center'}
                  justify={'center'}
                  className={cn(
                    'border border-dashed border-spacing-10 rounded-lg w-20 h-20',
                    ads?.length < 5 ? 'cursor-pointer' : 'cursor-not-allowed'
                  )}
                  onClick={() => {
                    ads?.length < 5 && setAddImageDialog(true);
                  }}
                >
                  <Icons.ImgUpload className="w-8 h-8" />
                </Flex>
              </Flex>
            </Flex>
            <Flex direction={'column'} className="gap-4 w-full">
              <Text className="font-semibold text-sm">
                {ads?.length > 0 && `All ADs (${ads.length}/5)`}
              </Text>
              <Reorder.Group
                axis="y"
                values={ads}
                onReorder={updateOrder}
                className="flex flex-col gap-4"
              >
                {ads?.map((image, index) => (
                  <Reorder.Item
                    key={image.id}
                    value={image}
                    className="gap-4 flex justify-between flex-wrap cursor-grab"
                  >
                    <Flex align={'start'} className="gap-4 w-full lg:w-2/3">
                      <div className="w-5 h-5">
                        <Icons.Drag className="w-5 h-5" />
                      </div>
                      <Flex
                        direction={'column'}
                        justify={'start'}
                        className="gap-1 text-sm max-w-full"
                      >
                        <Text className="text-sm">Onboarding {index + 1}</Text>
                        <Text className="whitespace-normal break-words font-semibold">
                          {image?.headline}
                        </Text>
                        <Text className="whitespace-normal break-words">
                          {image?.description}
                        </Text>
                      </Flex>
                    </Flex>
                    <Flex className="relative gap-4" align={'start'}>
                      <Flex className="relative w-20 h-20">
                        <Image
                          src={image?.url}
                          alt="background"
                          width={80}
                          height={80}
                          className="rounded-lg object-cover z-0"
                        />
                      </Flex>
                      <Flex
                        direction={'column'}
                        align={'center'}
                        className="gap-1"
                      >
                        <Icons.Edit2
                          className="w-7 h-7 p-1 rounded-sm bg-surface-secondary cursor-pointer"
                          onClick={() => setImageToReplace(image)}
                        />
                        <Icons.Trash
                          className="w-7 h-7 p-1 rounded-sm bg-surface-brandLight text-text-brand cursor-pointer"
                          onClick={() => imageDeleteHandler(image.id)}
                        />
                      </Flex>
                    </Flex>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </Flex>
          </Flex>
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
                onClick={updateHandler}
                loading={isUpdating}
              />
            </Flex>
          </Flex>
        </Card>
        <Card className="col-span-1 p-6 rounded-2xl">
          <div className="flex flex-col gap-6 items-center justify-start scale-75 sm:scale-[80%] lg:scale-100">
            <Flex align={'center'} className="gap-2">
              <Icons.Eye className="w-4 h-4" />
              <Text className="text-sm ">Preview</Text>
            </Flex>
            <Flex align={'center'} className="justify-between gap-4 lg:gap-8">
              <Flex
                align={'center'}
                justify={'center'}
                className={cn(
                  'w-8 h-8 rounded-full',
                  currentIndex === 0 || ads?.length === 0
                    ? 'bg-surface-secondary cursor-not-allowed'
                    : 'bg-ring cursor-pointer'
                )}
                onClick={goBackward}
              >
                <Icons.BackwardArrow className="w-6 h-6 text-text-invert" />
              </Flex>
              <Flex
                direction={'column'}
                align={'center'}
                justify={'center'}
                className={cn(
                  'border-[10px] border-ring rounded-3xl w-[220px] h-[453px]'
                )}
                style={{
                  background: `url(https://zgbox.click/upload/images/bg-onboarding.png)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {ads?.length > 0 && (
                  <Flex
                    direction={'column'}
                    justify={'between'}
                    className="gap-4 h-full py-4"
                  >
                    <Flex align={'start'} justify={'between'}>
                      <Image
                        src={logo?.url ?? ''}
                        width={80}
                        height={30}
                        alt="Logo Picture"
                        className="object-cover"
                      />
                      <Flex
                        align={'center'}
                        justify={'center'}
                        className="rounded-lg w-10 h-4 bg-black/30 p-1 text-white gap-1"
                      >
                        <Text className="text-[8px]">Skip</Text>
                        <Icons.DoubleNextArrow className="w-2 h-2" />
                      </Flex>
                    </Flex>
                    <Flex
                      direction={'column'}
                      align={'center'}
                      justify={'center'}
                      className="w-[180px] h-[160px]"
                    >
                      <Image
                        src={
                          ads?.length === 0
                            ? '/upload/images/themes_default.png'
                            : ads[currentIndex]?.url
                        }
                        alt="No uploaded files"
                        width={160}
                        height={160}
                        className="object-cover"
                      />
                      <Flex
                        align={'center'}
                        justify={'center'}
                        className="gap-1 mt-4"
                      >
                        {ads?.map((_, index) => (
                          <Box
                            key={index}
                            className={cn(
                              index === currentIndex
                                ? 'w-[6px] h-[6px]'
                                : 'w-1 h-1',
                              'bg-white rounded-full'
                            )}
                          />
                        ))}
                      </Flex>
                    </Flex>
                    <Flex
                      style={{
                        // backgroundImage: `url('/upload/images/message-box.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      direction={'column'}
                      align={'center'}
                      justify={'center'}
                      className="bg-text-accent min-w-[180px] max-w-[180px] min-h-[140px] mx-auto text-center p-4 rounded-2xl gap-2"
                    >
                      <Text className="text-[10px] font-bold break-words whitespace-normal max-w-[148px]">
                        {ads[currentIndex]?.headline}
                      </Text>
                      <Text className="text-[6px] break-words whitespace-normal max-w-[148px]">
                        {ads[currentIndex]?.description}
                      </Text>
                      <Flex
                        align={'center'}
                        justify={'center'}
                        className="w-12 h-5 bg-primary text-white rounded-lg text-[10px]"
                      >
                        Next
                      </Flex>
                    </Flex>
                  </Flex>
                )}
                {ads?.length === 0 && (
                  <>
                    <Image
                      src={'/upload/images/themes_default.png'}
                      alt="No uploaded files"
                      width={160}
                      height={160}
                      className="object-cover"
                    />
                    <Text className="text-[10px] mt-4">
                      Updates will appear here
                    </Text>
                  </>
                )}
              </Flex>
              <Flex
                align={'center'}
                justify={'center'}
                className={cn(
                  'w-8 h-8 rounded-full',
                  currentIndex === ads?.length - 1 || ads?.length === 0
                    ? 'bg-surface-secondary cursor-not-allowed'
                    : 'bg-ring cursor-pointer'
                )}
                onClick={goForward}
              >
                <Icons.ForwardArrow className="w-6 h-6 text-text-invert" />
              </Flex>
            </Flex>
            <Text className="text-sm font-medium">
              Onboarding {currentIndex + 1}
            </Text>
          </div>
        </Card>
      </Grid>
      <OnboardingUploadDialog
        open={addImageDialog}
        onClose={setAddImageDialog}
        setImage={imageAddHandler}
      />
      {imageToReplace?.url && (
        <OnboardingUpdateDialog
          open={!!imageToReplace}
          imageToReplace={imageToReplace}
          onClose={() => setImageToReplace(null)}
          setImage={imageReplaceHandler}
        />
      )}
    </Flex>
  );
};

export default Onboarding;
