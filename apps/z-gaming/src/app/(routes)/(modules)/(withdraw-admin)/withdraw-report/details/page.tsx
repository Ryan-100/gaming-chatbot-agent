import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawReportDetail from 'shared/src/components/pages/withdraw-admin/withdraw-report/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawReportDetailPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Report', href: '/withdraw-report' },
    {
      label: 'Withdraw Report Details',
      href: '/withdraw-report/details',
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawReportDetail />
    </div>
  );
}
