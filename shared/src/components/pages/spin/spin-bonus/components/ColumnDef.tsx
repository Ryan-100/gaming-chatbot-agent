'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { SpinBonusListData } from '../../../../../types/spin-bonus.types';
import CreateUpdateSpinBonusModal from './CreateUpdateSpinBonusFormDialog';
import DeleteSpinBonusDialog from './DeleteSpinBonusDialog';
import { useDeleteSpinBonusMutation } from '../../../../../stores/reducers/spin-bonus.reducer';
import { toast } from 'sonner';
import EditButton from '../../../../shared/buttons/EditButton';
import DeleteButton from '../../../../shared/buttons/DeleteButton';

function SpinActions(props: { target: SpinBonusListData }) {
  const { target } = props;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteSpinBonus] = useDeleteSpinBonusMutation();

  const handleDelete = async () => {
    try {
      const response = await deleteSpinBonus({
        id: target.id,
      });
      if (response.data?.meta?.success) {
        toast('Successfully Deleted spin bonus');
      } else {
        const errorResponse: any = response;
        toast.error(errorResponse?.error.data?.meta?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setDeleteModalOpen(false);
  };

  return (
    <Flex gap="2" className="justify-end ">
      <EditButton
        size={'sm'}
        variant="success"
        onClick={() => setEditModalOpen(true)}
      />
      <DeleteButton
        size={'sm'}
        variant="destructive"
        onClick={() => setDeleteModalOpen(true)}
      />
      {editModalOpen && (
        <CreateUpdateSpinBonusModal
          title="Update Spin Bonus"
          data={target}
          yesLabel="Update"
          onClose={() => setEditModalOpen(false)}
          open={editModalOpen}
        />
      )}
      {deleteModalOpen && (
        <DeleteSpinBonusDialog
          open={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </Flex>
  );
}

export const columnDef: ColumnDef<SpinBonusListData>[] = [
  {
    accessorKey: 'spinCount',
    header: 'Spin Count',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    header: 'Actions',
    size: 100,
    cell: ({ row }) => <SpinActions target={row.original} />,
  },
];
