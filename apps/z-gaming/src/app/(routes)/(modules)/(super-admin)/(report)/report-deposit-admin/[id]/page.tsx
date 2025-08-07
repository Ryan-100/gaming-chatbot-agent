import PageLayout from 'shared/src/components/layout/PageLayout';
import DepositAdminDetails from 'shared/src/components/pages/report/deposit-admin-report/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositAdminReportPage({
  searchParams,
}: {
  searchParams: {
    name: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/report-deposit-admin' },
    { label: 'Deposit Admin Report', href: '/report-deposit-admin' },
    { label: `${searchParams.name}`, href: '' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <DepositAdminDetails />
    </div>
  );
}
