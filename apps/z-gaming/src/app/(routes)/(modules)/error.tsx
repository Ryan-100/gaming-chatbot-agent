'use client'; // Error components must be Client Components

import { useEffect } from 'react';

import { Flex } from '@radix-ui/themes';

export default function CustomError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex justify="center" align="center" direction="column" gap="4">
      <img
        src={'/upload/images/primary-logo.png'}
        alt={''}
        width={1000}
        height={500}
        className="object-contain w-[400px] h-[400px]"
      />
      <div className="text-sm">
        {error.message ??
          'This page is under construction. Please come back later.'}{' '}
      </div>

      <button
        className="rounded bg-primary text-white py-2 px-4"
        onClick={reset}
      >
        Back to Dashboard
      </button>
    </Flex>
  );
}
