'use client';
import React from 'react';
import { Box } from '@radix-ui/themes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import DownloadGuide from './sections/DownloadGuide';
import LoginGuide from './sections/LoginGuide';
import RegisterGuide from './sections/RegisterGuide';
import { useGetLanguageQuery } from '../../../../stores/reducers/language.reducer';
import Loading from '../../../ui/loading';
import {
  useGetDownloadGuideQuery,
  useGetLoginGuideQuery,
  useGetRegisterGuideQuery,
} from '../../../../stores/reducers/guide.reducer';

const Guide = () => {
  const { data, isLoading: languageLoading } = useGetLanguageQuery();
  const { data: downloadData } = useGetDownloadGuideQuery({});
  const { data: loginData } = useGetLoginGuideQuery({});
  const { data: registerData } = useGetRegisterGuideQuery({});
  const languageData = data?.body?.data ?? [];

  return (
    <Box className="space-y-6 my-2">
      {languageLoading ? (
        <Loading />
      ) : (
        <Tabs defaultValue="download" className="w-full flex flex-col relative">
          <TabsList className="w-fit sm:w-[400px] scale-75 sm:scale-100 -ml-12 sm:ml-0">
            <TabsTrigger value="download">Download Guide</TabsTrigger>
            <TabsTrigger value="login">Login Guide</TabsTrigger>
            <TabsTrigger value="register">Register Guide</TabsTrigger>
          </TabsList>
          <TabsContent value="download" className="my-6 w-full">
            {downloadData?.body?.data && (
              <DownloadGuide
                languageData={languageData}
                data={downloadData?.body.data}
              />
            )}
          </TabsContent>
          <TabsContent value="login" className="my-6">
            {loginData?.body?.data && (
              <LoginGuide
                languageData={languageData}
                data={loginData?.body.data}
              />
            )}
          </TabsContent>
          <TabsContent value="register" className="my-6">
            {registerData?.body?.data && (
              <RegisterGuide
                languageData={languageData}
                data={registerData?.body.data}
              />
            )}
          </TabsContent>
        </Tabs>
      )}
    </Box>
  );
};

export default Guide;
