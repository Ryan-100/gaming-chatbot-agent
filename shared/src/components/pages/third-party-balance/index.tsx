'use client';
import React, { useState } from 'react';
import { Box, Grid, Flex, Text } from '@radix-ui/themes';
import { Card, CardContent } from '../../ui/card';
import { Button } from '../../ui/button';
import { Icons } from '../../ui/icons';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import dayjs from '../../../utils/dayjs';
import { CurrencyFormat } from '../../../utils/currencyFormat';
import { useGetThirdPartyBalanceQuery } from '../../../stores/reducers/thire-party-balance';
import Loading from '../../ui/loading';
import { toast } from 'sonner';

const ThirdPartyBalance = () => {
  const {
    data,
    isLoading,
    refetch,
    isError,
    error: apiError,
  } = useGetThirdPartyBalanceQuery();

  if (isError) {
    const error: any = apiError;
    toast.error(error?.data?.meta?.message);
  }

  if (isLoading) {
    return <Loading />;
  }

  const handleRefresh = () => {
    refetch();
  };

  return (
    <Box>
      <Grid columns={'1'} className="gap-4">
        <BalanceCard
          url={''}
          name={'GSC'}
          isLoading={isLoading} //isLoading is not working
          updatedAt={new Date()}
          amount={data?.body?.data?.data ?? 0}
          refresh={handleRefresh}
        />
      </Grid>
    </Box>
  );
};

export interface BalanceCardProps {
  url?: string;
  name: string;
  isLoading: boolean;
  updatedAt: Date;
  amount: number;
  refresh: () => void;
}

const BalanceCard = (props: BalanceCardProps) => {
  return (
    <Card className="w-full min-w-[200px] max-w-[560px]">
      <CardContent className="p-4 ">
        <Flex direction={'column'} justify={'start'} className="gap-y-4">
          <Flex
            justify={'between'}
            align={'center'}
            wrap={'wrap'}
            className="flex-wrap gap-4"
          >
            <Flex className="flex-x flex-wrap gap-4" align={'center'}>
              <Box>
                <Avatar className="w-12 h-12 overflow-hidden rounded-[10px]">
                  <AvatarImage
                    className="w-full h-full object-cover  "
                    src={props.url}
                    alt="profile image"
                  />
                  <AvatarFallback className="rounded-[10px]">CN</AvatarFallback>
                </Avatar>
              </Box>
              <Flex direction={'column'} align={'start'}>
                <Text className="text-[18px] font-medium "> {props.name} </Text>
                <Text className="text-[12px] text-text-secondary">
                  {`Last updated: ${
                    props.updatedAt
                      ? dayjs(props.updatedAt).format('DD MMM YYYY')
                      : dayjs()
                  } `}
                </Text>
              </Flex>
            </Flex>

            <Button
              size={'sm'}
              loading={props.isLoading}
              onClick={props.refresh}
            >
              <Icons.Refresh className="w-4 h-4" />
              <Text className="text-xs pl-2">Refresh</Text>
            </Button>
          </Flex>
          <Text className="text-[18px] font-semibold ">
            {' '}
            {CurrencyFormat(props.amount)}{' '}
          </Text>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default ThirdPartyBalance;
