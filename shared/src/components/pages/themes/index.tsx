'use client';
import React from 'react';
import { Flex, Grid, Text } from '@radix-ui/themes';
import { Image } from '../../ui';
import Link from 'next/link';

const ThemesOverview = () => {
  return (
    <Grid
      columns={{
        initial: '1',
        md: '2',
        lg: '2',
      }}
      className="gap-4"
    >
      <Link
        href={'/themes/splash-screen'}
        className="flex items-start gap-4 p-4 bg-background rounded-lg"
      >
        <div className="min-w-[150px] min-h-[150px]">
          <Image
            src="/upload/images/splash_screen.png"
            alt="Splash Screen"
            width={150}
            height={150}
            className="rounded-2xl object-fill"
          />
        </div>
        <Flex direction={'column'} align={'start'} className="gap-2">
          <Text className="font-bold text-base">Splash Screen</Text>
          <Text className="text-xs text-text-brand">Customize</Text>
          <Text className="whitespace-normal text-sm">
            A splash screen is an introductory screen that appears when you open
            an app. We recommend full-screen image or animation that shows the
            brand logo to create the best positive first impression.
          </Text>
        </Flex>
      </Link>
      <Link
        href={'/themes/splash-ads'}
        className="flex items-start gap-4 p-4 bg-background rounded-lg"
      >
        <div className="min-w-[150px] min-h-[150px]">
          <Image
            src="/upload/images/splash_ads.png"
            alt="Splash Screen"
            width={150}
            height={150}
            className="rounded-2xl object-fill"
          />
        </div>
        <Flex direction={'column'} align={'start'} className="gap-2">
          <Text className="font-bold text-base">Splash Ads</Text>
          <Text className="text-xs text-text-brand">Maximum 5</Text>
          <Text className="whitespace-normal text-sm">
            Ads that will appear for 10 seconds.
          </Text>
        </Flex>
      </Link>
      <Link
        href={'/themes/onboarding'}
        className="flex items-start gap-4 p-4 bg-background rounded-lg"
      >
        <div className="min-w-[150px] min-h-[150px]">
          <Image
            src="/upload/images/onboarding.png"
            alt="Splash Screen"
            width={150}
            height={150}
            className="rounded-2xl object-fill"
          />
        </div>
        <Flex direction={'column'} align={'start'} className="gap-2">
          <Text className="font-bold text-base">Onboarding</Text>
          <Text className="text-xs text-text-brand">Maximum 5</Text>
          <Text className="whitespace-normal text-sm">
            Short explanation of your service will appear here.
          </Text>
        </Flex>
      </Link>
    </Grid>
  );
};

export default ThemesOverview;
