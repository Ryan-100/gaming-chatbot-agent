'use client';
import React, { useState } from 'react';

import { Box, Flex } from '@radix-ui/themes';
import MediaPreview from './MediaPreview';

interface PropsType {
  url: string;
  type: string;
  mediaList: { name: string; url: string; date: Date }[];
  index: number;
}

const MediaDialog = (props: PropsType) => {
  const [openImagePreview, setOpenImagePreview] = useState(false);

  const imageData = props.mediaList?.flatMap((item) => {
    const fileType = item.name.match(/\.(mp4|mov)$/i) ? 'video' : 'image';
    return { url: item.url, name: item.name, type: fileType };
  });

  return (
    <Box className="z-0">
      <Flex
        className="relative bg-border-secondary p-1 rounded-xl"
        onClick={() => setOpenImagePreview(true)}
      >
        {props.type === 'video' ? (
          <video
            src={props.url}
            className="rounded-xl w-full h-[70px] object-cover"
          />
        ) : (
          <img
            src={props.url}
            alt=" "
            className="h-[70px] w-full object-cover bg-slate-300 rounded-lg"
          />
        )}
      </Flex>

      <MediaPreview
        open={openImagePreview}
        handleClose={() => setOpenImagePreview(false)}
        imageList={imageData}
        initialSlide={props.index}
      />
    </Box>
  );
};

export default MediaDialog;
