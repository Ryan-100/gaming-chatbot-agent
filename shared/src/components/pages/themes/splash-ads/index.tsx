'use client';
import React from 'react';
import Link from 'next/link';
import { Reorder } from 'framer-motion';
import { toast } from 'sonner';
import { Flex, Grid, Text } from '@radix-ui/themes';
import { Icons } from '../../../ui/icons';
import { Card } from '../../../ui/card';
import { Image } from '../../../ui/image';
import { Button } from '../../../ui/button';
import Loading from '../../../ui/loading';
import { cn } from '../../../../utils/cn';
import {
  useGetSplashAdsQuery,
  useUpdateSplashAdsMutation,
} from '../../../../stores/reducers/themes.reducer';
import { AdsUploadDialog } from './components/AdsUploadDialog';
import { AdsUpdateDialog } from './components/AdsUpdateDialog';
import EditButton from '../../../shared/buttons/EditButton';

type ImageProps = {
  id: string;
  url: string;
  order: number;
  redirectUrl: string;
};

const SplashAds = () => {
  const { data, isLoading, isSuccess } = useGetSplashAdsQuery({});
  const [defaultState, setDefaultState] = React.useState(false);
  const [addImageDialog, setAddImageDialog] = React.useState(false);
  const [ads, setAds] = React.useState<ImageProps[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [imageToReplace, setImageToReplace] =
    React.useState<ImageProps | null>();

  const [updateSplashAds, { isLoading: isUpdating }] =
    useUpdateSplashAdsMutation();

  const resetHandler = () => {
    setAds([]);
  };

  React.useEffect(() => {
    setAds(data?.body?.data?.images ?? []);
  }, [isSuccess, data, defaultState]);

  const imageAddHandler = (id: string, url: string, redirectUrl: string) => {
    if (ads.length === 5) return;
    setAds((p) => [
      ...p,
      {
        id,
        url,
        order: ads.length + 1,
        redirectUrl,
      },
    ]);
  };

  const imageReplaceHandler = (
    id: string,
    url: string,
    order: number,
    redirectUrl: string
  ) => {
    const updatedAds = ads.map((ad) =>
      ad.order === order ? { ...ad, id, url, redirectUrl } : ad
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
      themeType: data?.body?.data?.themeType ?? 'SPLASH_ADS',
      images: ads,
    };
    try {
      const response = await updateSplashAds(dataToSend);
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
      <Grid
        columns={{
          initial: '1',
          sm: '2',
        }}
        className="gap-4"
      >
        <Card className="col-span-1 flex flex-col justify-between p-6 rounded-2xl min-w-[200px]">
          <Flex direction={'column'} className="gap-10">
            <Flex direction={'column'} className="gap-4 text-sm h-full">
              <Text className="font-semibold">Upload Ads Here</Text>
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
                        <Text className="text-sm">ADS {index + 1}</Text>
                        {/* <Text className="whitespace-normal break-words max-w-[180px] md:max-w-[290px]">
                          {image?.url}
                        </Text> */}
                        <Link
                          href={image?.redirectUrl}
                          className="whitespace-normal break-words text-text-link text-sm"
                        >
                          {image?.redirectUrl}
                        </Link>
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
        <Card className="col-span-1 rounded-2xl p-6">
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
                className="border-[10px] border-ring rounded-3xl w-[220px] h-[453px] bg-surface-secondary"
                style={{
                  backgroundImage: `url(${ads[currentIndex]?.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                {ads?.length === 0 && (
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
            <Text className="text-sm font-medium">Ad {currentIndex + 1}</Text>
          </div>
        </Card>
      </Grid>
      <AdsUploadDialog
        open={addImageDialog}
        onClose={setAddImageDialog}
        setImage={imageAddHandler}
      />
      {imageToReplace?.url && (
        <AdsUpdateDialog
          open={!!imageToReplace}
          imageToReplace={imageToReplace}
          onClose={() => setImageToReplace(null)}
          setImage={imageReplaceHandler}
        />
      )}
    </Flex>
  );
};

export default SplashAds;
