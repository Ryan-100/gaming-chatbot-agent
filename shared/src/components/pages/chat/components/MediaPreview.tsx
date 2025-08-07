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
import { ChevronLeft } from 'lucide-react';

interface ImageObjectType {
  url: string;
  name?: string;
  type: string;
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

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    api.scrollTo(initialSlide);
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
      <DialogContent className="max-w-[500px]">
        <Flex
          direction="column"
          justify="center"
          align="center"
          className="relative"
        >
          <Flex
            direction={'row'}
            className="absolute top-0 cursor-pointer gap-x-3 w-full"
            onClick={handleClose}
            gap="3"
          >
            <ChevronLeft />
            Back
          </Flex>

          <div className="w-full">
            <Pagination current={currentIndex} total={count} />
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {imageList.map((image, index) => (
                  <CarouselItem key={index}>
                    {image.type === 'image' ? (
                      <img
                        src={image.url}
                        className="w-[500px] h-[500px] rounded-lg object-cover"
                        alt="image"
                        width={500} // Match the actual display size here
                        height={500}
                        // Optionally add srcSet if you're fetching multiple resolutions
                        srcSet={`${image.url}?w=250 250w, ${image.url}?w=500 500w, ${image.url}?w=1000 1000w`}
                        sizes="(max-width: 500px) 100vw, 500px" // Ensures the right size is loaded
                      />
                    ) : (
                      <video
                        src={image.url}
                        controls
                        className="w-[500px] h-[500px] rounded-lg"
                      />
                    )}
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
    <div className="w-full text-center">
      <div className="text-[18px]">{`${current}/${total}`}</div>
    </div>
  );
};

export default ImagePreview;
