'use client'
import React, { useState } from 'react'
import { Box, Flex } from '@radix-ui/themes';
import { DataTable } from '../../../shared/data-table';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import Loading from '../../../ui/loading';
import { toast } from 'sonner';
import { registerBonusDetailsColumnDefs } from './components/columnDefs';
import { useGetRegisterBonusDetailsQuery } from '../../../../stores/reducers/bonus.reducer';

interface RegisterBonusDetailsProps {
  id: string
}

const RegisterBonusDetails: React.FC<RegisterBonusDetailsProps> = ({ id }) => {

  const [search, setSearch] = useState('');

  const [query, setQuery] = useState({
    id: id,
    search: "",
    pageIndex: 1,
    rowPerPage: 15,
  });

  const {
    data,
    isLoading,
    isError,
    error: registerError
  } = useGetRegisterBonusDetailsQuery(query);

  if (isLoading) {
    return <div className='w-full h-100vh'>
      <Loading />
    </div>
  }

  if (isError) {
    const error: any = registerError;
    toast.error(error?.data?.meta?.message)
  }

  const handleSearch = () => {
    setQuery(prev => ({
      ...prev,
      search: search
    }))
  }

  const handlePageChange = (page: number) => {
    setQuery(prev => ({
      ...prev,
      pageIndex: page,
    }));
  };

  return (
    <Flex direction="column" gapY="16px" className="">
      <Flex justify="start" align="center">
        <Flex className="gap-2 w-1/3">
          <Input
            placeholder="Search"
            className="bg-background"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <Button
            className="flex items-center space-x-2 text-sm"
            onClick={handleSearch}
          >
            Search
          </Button>
        </Flex>
      </Flex>
      <Box>
        {data?.body?.data && (
          <DataTable
            data={data?.body?.data}
            columns={registerBonusDetailsColumnDefs}
            query={{
              pageIndex: query.pageIndex,
              rowPerPage: query.rowPerPage,
              total: data?.body?.total ?? 0,
              pageCount: data?.body?.pageCount ?? 0,
            }}
            onChange={handlePageChange}
          />
        )}
      </Box>
    </Flex>
  )
}

export default RegisterBonusDetails