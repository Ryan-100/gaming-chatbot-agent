import PageLayout from 'shared/src/components/layout/PageLayout';
import DepositAdminReport from 'shared/src/components/pages/report/deposit-admin-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositAdminReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/report-deposit-admin' },
    { label: 'Deposit Admin Report', href: '/report-deposit-admin' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DepositAdminReport />
    </div>
  );
}
