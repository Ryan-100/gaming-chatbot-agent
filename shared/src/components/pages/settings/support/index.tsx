'use client';
import React from 'react';
import { Box } from '@radix-ui/themes';
import SupportIntro from './sections/support-intro';
import PhoneEmail from './sections/contact';
import SocialPlatform from './sections/social';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import Loading from '../../../ui/loading';
import { useGetLanguageQuery } from '../../../../stores/reducers/language.reducer';
import { useGetSettingSupportQuery } from '../../../../stores/reducers/settings-support.reducer';

const Support = () => {
  const { data, isLoading: languageLoading } = useGetLanguageQuery();
  const { data: supportData } = useGetSettingSupportQuery({});

  if (languageLoading) {
    return <Loading />;
  }

  return (
    <Box className="space-y-6 ">
      <Tabs defaultValue="support" className="w-full flex flex-col relative">
        <TabsList className="w-fit sm:w-[400px] scale-75 sm:scale-100 -ml-12 sm:ml-0">
          <TabsTrigger value="support">Support Intro</TabsTrigger>
          <TabsTrigger value="contact">Phone & Email</TabsTrigger>
          <TabsTrigger value="social">Social Platforms</TabsTrigger>
        </TabsList>
        <TabsContent value="support" className="my-6 w-full">
          {supportData?.body?.data && (
            <SupportIntro
              languageData={data?.body?.data ?? []}
              data={supportData?.body?.data ?? []}
            />
          )}
        </TabsContent>
        <TabsContent value="contact" className="my-6">
          <PhoneEmail />
        </TabsContent>
        <TabsContent value="social" className="my-6">
          <SocialPlatform />
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default Support;
