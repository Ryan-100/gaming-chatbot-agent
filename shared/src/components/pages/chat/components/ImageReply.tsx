'use client';
import React, { useState } from 'react';
import dayjs from '../../../../utils/dayjs';
import { Flex } from '@radix-ui/themes';
import { Image } from '../../../ui/image';
import ImagePreview from './ImagePreview';

interface PropsType {
  url: string;
  time?: string;
  width?: number;
  height?: number;
  className?: string;
}

const ImageReply = (props: PropsType) => {
  const time = dayjs(props.time).format('h:mm A');
  const [openImagePreview, setOpenImagePreview] = useState(false);

  const imageData = [{ name: props.url, url: props.url }];

  return (
    <Flex direction="column" justify={'start'} align={'start'} className="z-0">
      <Flex
        className="relative bg-border-secondary p-1 rounded-xl cursor-pointer"
        onClick={() => setOpenImagePreview(true)}
      >
        <Image
          src={imageData[0]?.url}
          width={400}
          height={200}
          className={
            'h-[300px] w-[250px] md:w-[400px] z-1 rounded-lg object-cover'
          }
          alt="uploaded image"
        />
      </Flex>
      <Flex className="px-2" justify={'center'} align={'center'}>
        <div className="text-[10px] text-text-secondary text-left pt-[1px]">
          {time}
        </div>
      </Flex>
      <ImagePreview
        open={openImagePreview}
        handleClose={() => setOpenImagePreview(false)}
        imageList={imageData}
        initialSlide={1}
      />
    </Flex>
  );
};

export default ImageReply;
