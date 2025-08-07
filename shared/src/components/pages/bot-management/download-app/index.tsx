'use client';
import { Box } from '@radix-ui/themes';
import React from 'react';

import { useGetLanguageQuery } from '../../../../stores/reducers/language.reducer';
import Loading from '../../../ui/loading';
import DownloadAppIntro from './setctions/DownloadAppIntro';
import ApplicationLinks from './setctions/ApplicationLinks';
import PlayStoreLinks from './setctions/PlayStoreLinks';
import AppStoreLinks from './setctions/AppStoreLinks';
import { useGetBotManagementQuery } from '../../../../stores/reducers/bot-management.reducer';

const DownloadApp = () => {
  const { data, isLoading: languageLoading } = useGetLanguageQuery();
  const { data: downloadData } = useGetBotManagementQuery({
    type: 'DOWNLOAD',
  });
  const { data: playStoreLink } = useGetBotManagementQuery({
    type: 'APP_LINK',
    downloadType: 'PLAY_STORE',
  });
  const { data: appStoreLink } = useGetBotManagementQuery({
    type: 'APP_LINK',
    downloadType: 'APP_STORE',
  });
  const { data: directLink } = useGetBotManagementQuery({
    type: 'APP_LINK',
    downloadType: 'DIRECT_DOWNLOAD',
  });
  const languageData = data?.body?.data ?? [];

  return (
    <Box>
      {languageLoading ? (
        <Loading />
      ) : (
        <Box className="space-y-2">
          {downloadData?.body?.data && (
            <DownloadAppIntro
              languageData={languageData}
              data={downloadData?.body?.data ?? []}
            />
          )}
          {playStoreLink && (
            <PlayStoreLinks
              languageData={languageData}
              data={playStoreLink.body?.data ?? []}
            />
          )}
          {appStoreLink && (
            <AppStoreLinks
              languageData={languageData}
              data={appStoreLink.body?.data ?? []}
            />
          )}
          {directLink && (
            <ApplicationLinks
              languageData={languageData}
              data={directLink.body?.data ?? []}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default DownloadApp;
