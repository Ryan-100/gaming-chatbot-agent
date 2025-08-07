'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Flex, Text, Box } from '@radix-ui/themes';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';

import Loading from '../../../ui/loading';

import { CancelNotiCreateDialog } from '../components/CancelNotiCreateDialog';

import CreateNotification from './CreateNotification';
import { useGetLanguageQuery } from '../../../../stores/reducers/language.reducer';
import { useGetNotificationAppFunctionQuery } from '../../../../stores/reducers/notification.reducer';
import { useGetActivePMQuery } from '../../../../stores/reducers/pocket-money.reducer';

const notificationValues = [
  { label: 'Announcement', value: 'ANNOUNCEMENT' },
  { label: 'Promotion', value: 'PROMOTION' },
  { label: 'Pocket Money', value: 'POCKET_MONEY' },
];

const CreateNotificationMain = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  const [selectedValue, setSelectedValue] = useState(type ?? 'ANNOUNCEMENT');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const { data, isLoading: languageLoading } = useGetLanguageQuery();
  const { data: appFunctionData } = useGetNotificationAppFunctionQuery();
  const { data: activePocketMoneyData } = useGetActivePMQuery({
    type: 'NOTI',
  });

  const languageData = data?.body?.data ?? [];

  return (
    <Flex direction="column" className="space-y-6 mb-6">
      <Box className="space-y-2">
        <Text className="text-base font-medium">Type</Text>
        <RadioGroup
          className="flex flex-wrap items-center gap-4 lg:gap-6 text-base"
          value={selectedValue}
          onValueChange={setSelectedValue}
        >
          {notificationValues.map((item, index) => (
            <Flex className="items-center gap-2" key={index}>
              <RadioGroupItem value={item.value} id={item.value} />
              <div className="text-sm lg:text-base capitalize font-bold">
                {item.label}
              </div>
            </Flex>
          ))}
        </RadioGroup>
      </Box>
      {languageLoading ? (
        <Loading />
      ) : (
        <CreateNotification
          languageData={languageData}
          selectedType={selectedValue}
          appFunctionData={appFunctionData?.body?.data ?? []}
          activePocketMoneyData={activePocketMoneyData?.body?.data ?? []}
        />
      )}
      <CancelNotiCreateDialog
        open={cancelDialogOpen}
        onClose={setCancelDialogOpen}
      />
    </Flex>
  );
};

export default CreateNotificationMain;
