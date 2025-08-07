import DepositDashboard from 'shared/src/components/pages/deposit-admin/deposit-dashboard';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositDashboardPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Dashboard', href: '/deposit-dashboard' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DepositDashboard />
    </div>
  );
}
