'use client';
import { Box } from '@radix-ui/themes';
import React from 'react';
import MainMenuBeforeLogin from './sections/MainMenuBeforeLogin';
import WelcomeMessage from './sections/WelcomeMessage';
import MainMenuAfterLogin from './sections/MainMenuAfterLogin';
import { useGetLanguageQuery } from '../../../../stores/reducers/language.reducer';
import Loading from '../../../ui/loading';
import { useGetBotManagementQuery } from '../../../../stores/reducers/bot-management.reducer';

const WelcomeMainMenu = () => {
  const { data, isLoading: languageLoading } = useGetLanguageQuery();
  const { data: welcomeData } = useGetBotManagementQuery({ type: 'WELCOME' });
  const { data: beforeLoginData } = useGetBotManagementQuery({
    type: 'BEFORE_LOGIN',
  });
  const { data: afterLoginData } = useGetBotManagementQuery({
    type: 'AFTER_LOGIN',
  });
  const languageData = data?.body?.data ?? [];

  return (
    <Box>
      {languageLoading ? (
        <Loading />
      ) : (
        <Box className="space-y-2">
          {welcomeData?.body?.data && (
            <WelcomeMessage
              languageData={languageData}
              data={welcomeData?.body?.data ?? []}
            />
          )}
          {beforeLoginData?.body?.data && (
            <MainMenuBeforeLogin
              languageData={languageData}
              data={beforeLoginData?.body?.data ?? []}
            />
          )}
          {afterLoginData?.body?.data && (
            <MainMenuAfterLogin
              languageData={languageData}
              data={afterLoginData?.body?.data ?? []}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default WelcomeMainMenu;
