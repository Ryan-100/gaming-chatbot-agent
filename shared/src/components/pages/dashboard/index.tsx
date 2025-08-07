'use client';
import React from 'react';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import {
  hotGameColumnDefs,
  winnerColumnDefs,
  winningGameColumnDefs,
} from './components/columnDef';
import { dummyMetaData } from './components/mock';
import { Image } from '../../ui/image';
import Loading from '../../ui/loading';
import { BreadcrumbLink, PageBreadcrumb } from '../../shared/PageBreadCrumb';
import { MetaBox } from './components/MetaBox';
import { DataTable } from '../../shared/data-table';
import { API_URL } from '../../../lib/api';
import { CurrencyFormat } from '../../../utils/currencyFormat';
import { useGetReportDashboardQuery } from '../../../stores/reducers/report-dashboard.reducer';
import { useGetTopWinningPlayersQuery } from '../../../stores/reducers/top-winning-players.reducer';
import { useGetHotGameQuery } from '../../../stores/reducers/hot-games.reducer';
import { useGetTopWinningGameQuery } from '../../../stores/reducers/top-winning-games.reducer';

const Dashboard = () => {
  const breadCrumbs: BreadcrumbLink[] = [{ label: 'Welcome', href: '#' }];
  const query = {
    pageIndex: 1,
    rowPerPage: 10,
  };
  const { data: reportDashboard, isLoading: DashboardDataFetching } =
    useGetReportDashboardQuery();
  const { data: topWinningPlayer, isLoading: TopWinningPlayerFetching } =
    useGetTopWinningPlayersQuery(query);
  const { data: hotGames, isLoading: HotGamesFetching } =
    useGetHotGameQuery(query);
  const { data: topGames, isLoading: TopGamesFetching } =
    useGetTopWinningGameQuery(query);

  const DashboardData = reportDashboard?.body?.data;

  const metaList = [
    {
      icon: '/upload/images/dashboard-user.png',
      label: 'Today New Players',
      value: DashboardData?.newPlayerCount,
      path: '/players/all-players',
    },
    {
      icon: '/upload/images/dashboard-deposit.png',
      label: 'Today Deposit',
      value: CurrencyFormat(DashboardData?.totalDepositAmount ?? 0),
      path: '/transactions/deposit',
    },
    {
      icon: '/upload/images/dashboard-withdraw.png',
      label: 'Today Withdraw',
      value: `${CurrencyFormat(DashboardData?.totalWithdrawalAmount ?? 0)}`,
      path: '/transactions/withdraw',
    },
    {
      icon: '/upload/images/dashboard-game.png',
      label: 'Today Main Game',
      value: DashboardData?.todayMainGamesCount,
      path: '/main-games',
    },
  ];

  console.log('API_URL', API_URL);

  if (
    DashboardDataFetching ||
    TopWinningPlayerFetching ||
    HotGamesFetching ||
    TopGamesFetching
  ) {
    return <Loading />;
  }

  return (
    <Flex
      direction={'column'}
      className="divide-y divide-border-secondary"
      gap="5"
    >
      <Box>
        <Flex align="center" wrap={'wrap'}>
          <div className="pr-8">
            <PageBreadcrumb links={breadCrumbs} />
          </div>
          <Flex className="gap-x-2 font-medium text-sm pb-4" align={'center'}>
            <Text> Your Currency Shown: </Text>
            <Image
              src={dummyMetaData.currency.icon}
              alt={dummyMetaData.currency.label}
              width={22}
              height={16}
            />
            <Text> {DashboardData?.currency} </Text>
          </Flex>
        </Flex>
        <Flex className="flex-wrap flex-grow gap-4">
          {metaList.map((item, index) => (
            <MetaBox
              key={index}
              icon={item.icon}
              label={item.label}
              value={item.value}
              path={item.path}
            />
          ))}
        </Flex>
      </Box>

      <Box>
        <Flex align={'center'} justify={'between'} className="py-4">
          <Text className="text-base font-bold"> Top 10 Winning Players </Text>
        </Flex>
        <DataTable
          columns={winnerColumnDefs}
          data={topWinningPlayer?.body?.data ?? []}
        />
      </Box>
      <Box>
        <Flex align={'center'} justify={'between'} className="py-4">
          <Text className="text-base font-bold">
            Popular Games (Admin's Recommendation)
          </Text>
        </Flex>
        <DataTable
          columns={hotGameColumnDefs}
          data={hotGames?.body?.data ?? []}
        />
      </Box>
      <Box>
        <Flex align={'center'} justify={'between'} className="py-4">
          <Text className="text-base font-bold">Top Winning Games</Text>
        </Flex>

        <DataTable
          columns={winningGameColumnDefs}
          data={topGames?.body?.data ?? []}
        />
      </Box>
    </Flex>
  );
};

export default Dashboard;
