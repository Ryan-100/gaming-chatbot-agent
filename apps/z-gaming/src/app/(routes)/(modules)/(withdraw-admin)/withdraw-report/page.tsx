import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawReport from 'shared/src/components/pages/withdraw-admin/withdraw-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/withdraw-report' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <WithdrawReport />
    </div>
  );
}
