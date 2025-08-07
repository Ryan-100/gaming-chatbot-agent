'use client';

import { useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../ui/table';
import { Pagination } from './Pagination';
import { PaginationTypes } from '../../../types/base.types';

type ExportFunction<TData> = (data: TData[]) => Promise<void>;

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  query?: PaginationTypes;
  onChange?: (page: number) => void;
  hidePagination?: boolean;
  isShowNo?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  query,
  onChange,
  hidePagination = false,
  isShowNo = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: query?.rowPerPage || 200,
    pageIndex: 0,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const pageStartIndex =
    ((query?.pageIndex ?? 1) - 1) * (query?.rowPerPage ?? 20);

  // Conditionally add the "No." column
  const displayColumns = isShowNo
    ? [
        {
          accessorKey: 'no',
          header: 'No.',
          cell: ({ row }: { row: Row<TData> }) => (
            <span>{pageStartIndex + row.index + 1}</span>
          ),
        },
        ...columns,
      ]
    : columns;

  const table = useReactTable<TData>({
    data,
    columns: displayColumns,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      pagination,
      columnFilters,
      rowSelection,
    },
    defaultColumn: {
      size: 200, //starting column size
      minSize: 50, //enforced during column resizing
      maxSize: 500, //enforced during column resizing
    },
  });

  return (
    <div>
      {/* Data Table */}
      <div className="rounded-xl bg-white p-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-black break-words whitespace-normal"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-xs">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={index % 2 != 0 ? 'bg-surface-secondary' : ''}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pagination Controls */}
      {!hidePagination && query && onChange && (
        <Pagination
          totalPageCount={query.pageCount}
          currentPage={query?.pageIndex}
          onChange={onChange}
        />
      )}
    </div>
  );
}
