import PageLayout from 'shared/src/components/layout/PageLayout';
import NotificationCreate from 'shared/src/components/pages/notification/create';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function NotificationCreatePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Notification', href: '/notification' },
    { label: 'Create', href: '/notification/create' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <NotificationCreate />
    </div>
  );
}
