import PageLayout from 'shared/src/components/layout/PageLayout';
import NotificationCreate from 'shared/src/components/pages/notification/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function NotificationCreatePage({
  searchParams,
}: {
  searchParams: {
    name: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Notification', href: '/notification' },
    {
      label: `${searchParams.name}`,
      href: `/notification/details?name=${searchParams.name}`,
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <NotificationCreate />
    </div>
  );
}
