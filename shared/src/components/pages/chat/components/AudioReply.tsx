import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { Flex } from '@radix-ui/themes';

const AudioReply = ({ audioSrc, time }: { audioSrc: string; time: string }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Progress in percentage
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Toggle Play/Pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Update progress bar as the audio plays
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const { currentTime, duration } = audioRef.current;
    setCurrentTime(currentTime);
    setProgress((currentTime / duration) * 100);
  };

  // Set the total duration of the audio
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Handle clicking on the progress bar to seek
  const handleProgressClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!audioRef.current || !duration) return;

    const boundingRect = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - boundingRect.left;
    const newProgress = (clickX / boundingRect.width) * duration;

    audioRef.current.currentTime = newProgress;
    setProgress((newProgress / duration) * 100);
  };

  // Format time (e.g., 0:30)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Flex direction="column" justify="start">
      <div className="audio-player w-[250px] md:w-[400px] p-4 bg-surface-brandLight rounded-lg shadow-md">
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
        />

        <div className="flex items-center justify-between">
          <button
            onClick={togglePlayPause}
            className="text-white bg-primary p-2 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6" />
            )}
          </button>

          <div className="w-full ml-4">
            <div
              className="relative w-full h-2 bg-gray-200 rounded cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>
      <Flex justify={'start'} align={'center'}>
        <div className="text-[10px] text-text-secondary text-left pt-[2px]">
          {time}
        </div>
      </Flex>
    </Flex>
  );
};

export default AudioReply;
