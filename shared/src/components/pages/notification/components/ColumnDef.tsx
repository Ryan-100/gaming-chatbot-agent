'use client';
import React from 'react';
import dayjs from '../../../../utils/dayjs';
import { ColumnDef } from '@tanstack/react-table';
import { Box, Text, Flex, Tooltip } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { Button } from '../../../ui/button';
import { Image } from '../../../ui/image';
import { Switch } from '../../../ui/switch';
import { PinNotiDialog } from './PinNotiDialog';
import { NotificationListData } from '../../../../types/notification.types';
import { NotificationEnum } from '../../../../types/backend-defined-enum.types';
const notificationValues = NotificationEnum.options;

function getIcon(type: string): string {
  switch (type) {
    case notificationValues[0]:
      return '/upload/icons/noti-announcement-icon.svg';
    case notificationValues[1]:
      return '/upload/icons/noti-promotion-icon.svg';
    case notificationValues[2]:
      return '/upload/icons/noti-pocket-money-icon.svg';
    default:
      return '/upload/icons/default-icon.svg';
  }
}

function Pin(props: { target: NotificationListData }) {
  const { target } = props;
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <Flex align="center" className="space-x-2">
      <Switch
        checked={target.isPinned}
        onCheckedChange={() => setModalOpen(true)}
      />
      {modalOpen && (
        <PinNotiDialog
          id={target.id}
          isPinned={target.isPinned}
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
      )}
    </Flex>
  );
}

function Levels(props: { target: NotificationListData }) {
  const { target } = props;
  const allChecked = target.playerLevelIds.every((level) => level.isChecked);
  return (
    <Flex direction="column" align="start" className="space-y-2">
      {allChecked ? (
        <Text className="text-xs">All Levels</Text>
      ) : (
        target.playerLevelIds
          .filter((player) => player.isChecked === true)
          .map((player) => (
            <Text key={player.name} className="text-xs">
              {player.name}
            </Text>
          ))
      )}
    </Flex>
  );
}

function Label(props: { target: NotificationListData }) {
  const { target } = props;
  return (
    <Flex align="center" className="space-x-2">
      <Image
        src={getIcon(target.notificationType ?? '')}
        alt="Icon"
        width={40}
        height={40}
      />
      <Tooltip content={target.NotiContent.label}>
        <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
          {target.NotiContent.label}
        </p>
      </Tooltip>
    </Flex>
  );
}

function CreatedAt(props: { target: NotificationListData }) {
  const { target } = props;
  return (
    <p className="w-32 min-w-32">
      {dayjs(target.createdAt).format('DD MMM YYYY, h:mm A')}
    </p>
  );
}
function CreatedBy(props: { target: NotificationListData }) {
  const { target } = props;
  return (
    <Tooltip content={target.CreatedBy?.name || '-'}>
      <p className="w-fit max-w-[100px] lg:max-w-32 xl:max-w-60 truncate">
        {target.CreatedBy?.name || '-'}
      </p>
    </Tooltip>
  );
}

function Actions(props: { target: NotificationListData }) {
  const { target } = props;
  const router = useRouter();

  const handleDetailsClick = () => {
    router.push(`/notification/${target.id}?name=${target.NotiContent.label}`);
  };
  return (
    <Box className="space-x-2">
      <Button
        size="sm"
        className="bg-surface-link"
        onClick={handleDetailsClick}
      >
        Details
      </Button>
    </Box>
  );
}

export const columnDefs: ColumnDef<NotificationListData>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
    cell({ row }) {
      return <Label target={row.original} />;
    },
  },
  {
    accessorKey: 'notificationType',
    header: 'Type',
  },
  {
    accessorKey: 'playerLevelIds',
    header: 'Member Level',
    cell({ row }) {
      return <Levels target={row.original} />;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'Created On',
    cell({ row }) {
      return <CreatedAt target={row.original} />;
    },
  },
  {
    accessorKey: 'created_by',
    header: 'Created by',
    cell({ row }) {
      return <CreatedBy target={row.original} />;
    },
  },
  {
    accessorKey: 'isPinned',
    header: 'Pin/Unpin',
    cell({ row }) {
      return <Pin target={row.original} />;
    },
  },
  {
    header: 'Actions',
    cell({ row }) {
      return <Actions target={row.original} />;
    },
  },
];
