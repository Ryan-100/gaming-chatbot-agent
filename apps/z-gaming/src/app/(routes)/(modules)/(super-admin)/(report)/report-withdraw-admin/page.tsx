import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawAdminReport from 'shared/src/components/pages/report/withdraw-admin-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawAdminReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/report-withdraw-admin' },
    { label: 'Withdraw Admin Report', href: '/report-withdraw-admin' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <WithdrawAdminReport />
    </div>
  );
}
