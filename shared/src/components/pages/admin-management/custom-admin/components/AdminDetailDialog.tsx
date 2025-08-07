'use client';
import React from 'react';
import { Flex, Text } from '@radix-ui/themes';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '../../../../ui/dialog';
import { Button } from '../../../../ui/button';
import { Icons } from '../../../../ui/icons';
import PropsTable from '../../../../shared/PropsTable';
import { useGetCustomAdminDetailQuery } from '../../../../../stores/reducers/custom-admin.reducer';

interface AdminDetailsDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
}

export const AdminDetailsDialog: React.FC<AdminDetailsDialogProps> = ({
  id,
  open,
  onClose,
}) => {
  const { data: detailData } = useGetCustomAdminDetailQuery({ id });
  const data = detailData?.body?.data;

  const propsTable = (
    <PropsTable
      rows={[
        {
          key: 'Name',
          value: data?.name,
        },
        {
          key: 'Login ID',
          value: data?.agentCode,
        },
        {
          key: 'Phone',
          value: data?.phone,
        },
        {
          key: 'Role',
          value: data?.Role?.name,
        },
        {
          key: 'Permissions',
          value: (
            <Flex className="flex flex-grow items-center flex-wrap gap-2">
              {data?.Role?.RoleOnPermission?.map((permission) => (
                <Text
                  key={permission.id}
                  className="text-text-brand text-xs w-fit bg-surface-brandLight px-2 py-1 rounded-sm"
                >
                  {permission.Permission.name}
                </Text>
              ))}
            </Flex>
          ),
        },
        {
          key: 'Status',
          value: (
            <Text className="capitalize">
              {data?.AdminStatus?.toLocaleLowerCase()}
            </Text>
          ),
        },
      ]}
    />
  );

  return (
    <Dialog open={open}>
      <DialogContent className="py-0">
        <Flex
          justify={'between'}
          align={'center'}
          className="sticky top-0 left-0 bg-background z-20 pt-4"
        >
          <DialogTitle>Custom Admin Details</DialogTitle>
          <Button variant={'link'} className="p-0" onClick={onClose}>
            <Icons.Cross className="w-6 h-6 text-black" />
          </Button>
        </Flex>
        {propsTable}
        <DialogFooter className="sticky bottom-0 left-0 bg-background pb-4 w-full">
          <Button onClick={onClose} color="primary">
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
