import { Box } from '@radix-ui/themes';
import ChattingRoom from 'shared/src/components/pages/chat';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function InboxPage() {
  const breadCrumbs: BreadcrumbLink[] = [{ label: 'Inbox', href: '#' }];

  return (
    <>
      <Box className="px-4">
        <PageBreadcrumb links={breadCrumbs} />
      </Box>
      <ChattingRoom />
    </>
  );
}
