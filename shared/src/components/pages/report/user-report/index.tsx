'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { Box, Flex, Grid, Text } from '@radix-ui/themes';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import Loading from '../../../ui/loading';
import { Card, CardContent } from '../../../ui/card';
import MonthPicker from '../../../ui/month-picker';
import PropsTable from '../../../shared/PropsTable';
import { useGetReportUserQuery } from '../../../../stores/reducers/report-user.reducer';

const UserReport = () => {
  const [selectedType, setSelectedType] = React.useState('MONTHLY');

  const [query, setQuery] = React.useState({
    type: selectedType,
    time: dayjs().format('YYYY-MM'),
    pageIndex: 1,
    rowPerPage: 200,
  });
  const { data, isLoading } = useGetReportUserQuery(query);

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    setQuery((prevQuery) => ({
      ...prevQuery,
      type: value,
      time:
        value === 'MONTHLY'
          ? dayjs().format('YYYY-MM')
          : dayjs().format('YYYY'),
      pageIndex: query.pageIndex,
      rowPerPage: query.rowPerPage,
    }));
  };

  const handleMonthChange = (value: Date | null) => {
    setQuery({
      type: selectedType,
      time:
        selectedType === 'MONTHLY'
          ? dayjs(value).format('YYYY-MM')
          : dayjs(value).format('YYYY'),
      pageIndex: query.pageIndex,
      rowPerPage: query.rowPerPage,
    });
  };

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Flex direction={'column'} className="space-y-4">
      <Flex gap="2" className="flex-col sm:flex-row w-full">
        <Box className="text-xs font-medium">
          <Select
            value={selectedType}
            onValueChange={(value) => handleTypeChange(value)}
          >
            <SelectTrigger className="w-full sm:w-[120px] bg-primary text-text-invert">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-background w-full sm:w-[120px]">
              <SelectGroup>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Box>
        <Box className="w-full">
          <MonthPicker
            enableMonth={selectedType === 'MONTHLY' ? true : false}
            date={new Date(query.time)}
            onChange={handleMonthChange}
            className="w-full bg-background"
          />
        </Box>
      </Flex>

      <Card className="min-w-[250px]">
        <CardContent className="pt-4">
          <PropsTable
            rows={[
              {
                key: 'Total Users',
                value: data?.body?.data?.totalUserCount,
              },
              {
                key: 'New Users',
                value: data?.body?.data?.newUserCount,
              },
            ]}
          />
        </CardContent>
      </Card>

      <Card className="min-w-[250px]">
        <CardContent className="pt-4">
          <Box className="border-b border-b-surface-secondary py-4">
            <Grid columns="2" align="center" justify="center">
              <Text className="text-sm font-semibold">Date</Text>
              <Text className="text-sm font-semibold">New Users</Text>
            </Grid>
          </Box>
          {data?.body?.data?.UserList?.map((item, index) => (
            <Box
              className="border-b border-b-surface-secondary py-4"
              key={index}
            >
              <Grid columns="2" align="center" justify="center">
                <Text className="text-xs">{item.createdAtDate}</Text>
                <Text className="text-xs">{item.userCount}</Text>
              </Grid>
            </Box>
          ))}
        </CardContent>
      </Card>
    </Flex>
  );
};

export default UserReport;
