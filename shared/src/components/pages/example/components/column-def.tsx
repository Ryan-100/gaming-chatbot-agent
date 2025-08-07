'use client';
import { ColumnDef } from '@tanstack/react-table';
import { AppsData } from './types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import { Button } from '../../../ui/button';
import { EyeIcon, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

function UserActions(props: { target: AppsData }) {
  const { target } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="text-xs">
        <Link href={`/user-management/${target.id}`}>
          <DropdownMenuItem>
            <EyeIcon className="h-4 w-4 mr-2" />
            View User Details
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const appsColumnDef: ColumnDef<AppsData>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'category.name',
    header: 'Category',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created on',
  },
  {
    accessorKey: 'download',
    header: 'Download',
  },
  {
    accessorKey: 'rating',
    header: 'Rating',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      return <UserActions target={row.original} />;
    },
    enableHiding: false,
  },
];
