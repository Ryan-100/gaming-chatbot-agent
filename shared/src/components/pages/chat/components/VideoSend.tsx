'use client';
import React from 'react';

import { Flex } from '@radix-ui/themes';
import VideoPreview from './VideoPreview';
import { cn } from '../../../../utils/cn';
import { Play } from 'lucide-react';

const VideoSend = (props: { video: string; time: string; caption: string }) => {
  const [openVideoPreview, setOpenVideoPreview] = React.useState(false);

  const handleVideoClick = (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setOpenVideoPreview(true);
  };

  return (
    <Flex justify="end">
      <div className="w-[250px] md:w-[400px]">
        <Flex
          direction="column"
          justify={'start'}
          align={'end'}
          className="z-0"
        >
          <div
            className={cn(
              'relative bg-border-secondary p-1 rounded-xl cursor-pointer'
            )}
            onClick={handleVideoClick}
          >
            <div className="absolute top-[45%] left-[45%] bg-gray-400 p-2 rounded-full">
              <Play className="z-2 text-white" />
            </div>
            <video
              src={props.video}
              className="rounded-xl w-[250px] md:w-[400px] h-[300px] object-cover"
            />
            <div className="pt-1 text-sm max-w-[300px]">
              {props.caption ?? ''}
            </div>
          </div>
          <Flex className="px-2" justify={'center'} align={'center'}>
            <div className="text-[10px] text-text-secondary text-left pt-[1px]">
              {props.time}
            </div>
          </Flex>
        </Flex>

        {openVideoPreview && (
          <VideoPreview
            open={openVideoPreview}
            handleClose={() => setOpenVideoPreview(false)}
            video={props.video}
            time={props.time}
            caption={props.caption}
          />
        )}
      </div>
    </Flex>
  );
};

export default VideoSend;
