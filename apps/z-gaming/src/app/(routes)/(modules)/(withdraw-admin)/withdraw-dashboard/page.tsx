import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawDashboard from 'shared/src/components/pages/withdraw-admin/withdraw-dashboard';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawDashboardPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Dashboard', href: '/withdraw-dashboard' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <WithdrawDashboard />
    </div>
  );
}
