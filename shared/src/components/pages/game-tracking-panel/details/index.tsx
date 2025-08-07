'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Box } from '@radix-ui/themes';
import Loading from '../../../ui/loading';
import { BreadcrumbLink, PageBreadcrumb } from '../../../shared/PageBreadCrumb';
import PropsTable from '../../../shared/PropsTable';
import { useGetTrackPanelDetailQuery } from '../../../../stores/reducers/track-panel.reducer';

const GameTrackingPanelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetTrackPanelDetailQuery({ id });
  const detailData = data?.body?.data;

  const breadCrumbs: BreadcrumbLink[] = [
    {
      label: 'Third Party Balance Game Tracking Panel',
      href: '/game-tracking',
    },
    { label: detailData?.mainGames?.game_name ?? '', href: '' },
  ];
  if (isLoading) {
    return <Loading />;
  }
  const propsTable = (
    <PropsTable
      className="text-center"
      rows={[
        {
          key: 'Main Game',
          value: detailData?.mainGames?.game_name,
        },
        {
          key: 'Operator',
          value: detailData?.operator_name,
        },
        {
          key: 'URL',
          value: detailData?.url,
          enableCopy: true,
        },
        {
          key: 'Username',
          value: detailData?.user_name,
          enableCopy: true,
        },
        {
          key: 'Password',
          value: detailData?.password,
          enableCopy: true,
        },
        {
          key: 'Merchant code',
          value: detailData?.merchant_code,
        },
        {
          key: 'VPN Requirement',
          value: detailData?.vpn_required ? 'Yes' : 'No',
        },
      ]}
    />
  );

  return (
    <Box>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <Box className="bg-white rounded-lg px-4">{propsTable}</Box>
    </Box>
  );
};

export default GameTrackingPanelDetails;
