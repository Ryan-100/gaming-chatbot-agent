'use client';
import React from 'react';
import { Flex, Text, Box } from '@radix-ui/themes';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';

import Loading from '../../../ui/loading';

import { useGetLanguageQuery } from '../../../../stores/reducers/language.reducer';
import {
  useGetNotificationAppFunctionQuery,
  useGetNotificationDetailQuery,
} from '../../../../stores/reducers/notification.reducer';
import { useGetActivePMQuery } from '../../../../stores/reducers/pocket-money.reducer';
import DetailNotification from './DetailNotification';
import { useParams } from 'next/navigation';

const DetailNotificationMain = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading: languageLoading } = useGetLanguageQuery();
  const { data: appFunctionData } = useGetNotificationAppFunctionQuery();
  const { data: activePocketMoneyData } = useGetActivePMQuery({
    type: 'NOTI',
  });

  const { data: notificationData } = useGetNotificationDetailQuery({
    id: id ?? '',
  });

  const languageData = data?.body?.data ?? [];

  return (
    <Flex direction="column" className="space-y-6 mb-6">
      <Box className="space-y-2">
        <Text className="text-base font-medium">Type</Text>
        <RadioGroup
          className="flex items-center space-x-6 text-base"
          value={notificationData?.body?.data.notificationType}
        >
          <Flex className="items-center space-x-2">
            <RadioGroupItem
              value={
                notificationData?.body?.data.notificationType ?? 'ANNOUNCEMENT'
              }
              id={notificationData?.body?.data.notificationType}
            />
            <div className="text-sm lg:text-base capitalize font-bold">
              {notificationData?.body?.data.notificationType.toLocaleLowerCase()}
            </div>
          </Flex>
        </RadioGroup>
      </Box>
      {languageLoading ? (
        <Loading />
      ) : (
        notificationData?.body?.data && (
          <DetailNotification
            languageData={languageData}
            selectedType={
              notificationData?.body?.data.notificationType ?? 'ANNOUNCEMENT'
            }
            appFunctionData={appFunctionData?.body?.data ?? []}
            activePocketMoneyData={activePocketMoneyData?.body?.data ?? []}
            notificationData={notificationData?.body?.data}
          />
        )
      )}
    </Flex>
  );
};

export default DetailNotificationMain;
