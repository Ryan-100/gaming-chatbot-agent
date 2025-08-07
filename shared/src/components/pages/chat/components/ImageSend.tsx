'use client';
import React, { useState } from 'react';
import dayjs from '../../../../utils/dayjs';

import { Flex } from '@radix-ui/themes';
import ImagePreview from './ImagePreview';
import { Image } from '../../../ui/image';

interface PropsType {
  url: string[];
  time?: string;
  caption?: string;
}

const ImageSend = (props: PropsType) => {
  const time = dayjs(props.time).format('h:mm A');
  const [openImagePreview, setOpenImagePreview] = useState(false);

  const imageData = props.url?.flatMap((item) => {
    return { url: item, name: item };
  });

  const renderImages = () => {
    const imageCount = imageData.length;
    if (imageCount === 1) {
      return (
        <Image
          src={imageData[0].url}
          width={400}
          height={200}
          className={
            'h-[300px] w-[250px] md:w-[400px] z-1 rounded-lg object-cover'
          }
          alt="uploaded image"
        />
      );
    }
    if (imageCount === 2) {
      return (
        <Flex className="grid grid-cols-2 gap-1">
          {imageData.map((item, index) => (
            <Image
              key={index}
              src={item.url}
              width={200}
              height={150}
              className={
                'h-[300px] w-[125px] md:w-[200px] rounded-lg object-cover'
              }
              alt="uploaded image"
            />
          ))}
        </Flex>
      );
    }
    if (imageCount >= 3) {
      return (
        <Flex className="grid grid-cols-2 gap-1">
          {imageData.slice(0, 1).map((item, index) => (
            <Image
              key={index}
              src={item.url}
              width={200}
              height={150}
              className={
                'h-[300px] w-[125px] md:w-[200px] rounded-lg object-cover'
              }
              alt="uploaded image"
            />
          ))}
          <div className="relative h-[300px] w-[125px] md:w-[200px] rounded-lg bg-gray-300 overflow-hidden">
            <Image
              src={imageData[1].url}
              width={200}
              height={150}
              className={'h-full w-full object-cover blur-sm'}
              alt="uploaded image"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold">
              {`+${imageCount - 2} more`}
            </div>
          </div>
        </Flex>
      );
    }
  };

  return (
    <Flex direction="column" justify={'start'} className="z-0">
      <Flex
        direction="column"
        className="relative bg-border-secondary p-1 rounded-xl"
        onClick={() => setOpenImagePreview(true)}
      >
        {renderImages()}
        {props.caption && (
          <div className="pt-1 px-4 text-sm text-black w-[250px] md:w-[400px]">
            {props.caption ?? ''}
          </div>
        )}
      </Flex>

      <Flex className="px-2" justify={'center'} align={'center'}>
        <div className="text-[10px] text-text-secondary text-right pt-[1px] w-full">
          {time}
        </div>
      </Flex>
      <ImagePreview
        open={openImagePreview}
        handleClose={() => setOpenImagePreview(false)}
        imageList={imageData}
        initialSlide={0}
      />
    </Flex>
  );
};

export default ImageSend;
