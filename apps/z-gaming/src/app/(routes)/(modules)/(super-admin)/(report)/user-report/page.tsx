import PageLayout from 'shared/src/components/layout/PageLayout';
import UserReport from 'shared/src/components/pages/report/user-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function UserReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/user-report' },
    { label: 'User Report', href: '/user-report' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <UserReport />
    </div>
  );
}
