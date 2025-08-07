import React, { useEffect, useState } from 'react';

import { Image } from '../../../ui/image';
import { Flex } from '@radix-ui/themes';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '../../../ui/carousel';
import { Dialog, DialogContent } from '../../../ui/dialog';
import { X } from 'lucide-react';
import { Icons } from '../../../ui/icons';
import useDownloader from 'react-use-downloader';
import Loading from '../../../ui/loading';

interface ImageObjectType {
  url: string;
  name?: string;
}

interface Props {
  open: boolean;
  imageList: ImageObjectType[];
  handleClose: () => void;
  initialSlide: number;
}

const ImagePreview = ({
  open,
  imageList,
  initialSlide,
  handleClose,
}: Props) => {
  const [currentIndex, setCurrentIndex] = useState(initialSlide);
  const [api, setApi] = useState<CarouselApi>();
  const [count, setCount] = useState(imageList.length);
  const { download, isInProgress, percentage, cancel, error } = useDownloader();

  const handleDownload = () => {
    download(imageList[0].url ?? '', imageList[0].name ?? '');
  };

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    api.scrollTo(initialSlide); // Scroll to the initial slide
    setCurrentIndex(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap() + 1);
    });
  }, [api, initialSlide]);

  useEffect(() => {
    if (open && api) {
      api.scrollTo(initialSlide);
    }
  }, [open, api, initialSlide]);

  return (
    <Dialog open={open}>
      <DialogContent className="min-w-[100dvw] min-h-[100dvh] bg-black bg-opacity-70">
        <Flex
          direction="column"
          justify="center"
          align="center"
          className="relative w-full h-full"
        >
          <Flex justify="between" align="start" className=" w-full">
            <Flex
              direction={'row'}
              className="absolute top-0 cursor-pointer gap-x-3 text-white"
              onClick={handleClose}
              gap="3"
            >
              <X />
              Close
            </Flex>
            <Flex
              direction={'row'}
              className="absolute right-0 cursor-pointer gap-x-3 "
              gap="3"
              onClick={handleDownload}
            >
              {isInProgress ? (
                <Loading />
              ) : (
                <Icons.Download className="w-6 h-6 text-white" />
              )}
            </Flex>
          </Flex>

          <div className="mt-[30px] w-full">
            <Pagination current={currentIndex} total={count} />
            <div className="h-4" />
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent className="w-full">
                {imageList.map((image, index) => (
                  <CarouselItem key={index} className="w-full">
                    <Flex justify="center" align="center" className="w-full">
                      <Image
                        src={image.url}
                        className="w-[80dvw] h-[80dvh] object-contain"
                        alt="image"
                        width={500}
                        height={500}
                      />
                    </Flex>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </Flex>
      </DialogContent>
    </Dialog>
  );
};

const Pagination = ({ current, total }: { current: number; total: number }) => {
  return (
    <div className="w-full text-center text-white">
      <div className="text-[18px]">{`${current}/${total}`}</div>
    </div>
  );
};

export default ImagePreview;
