import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawAdminDetails from 'shared/src/components/pages/report/withdraw-admin-report/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawAdminDetailsPage({
  searchParams,
}: Readonly<{
  searchParams: {
    name: string;
  };
}>) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/report-withdraw-admin' },
    { label: 'Withdraw Admin Report', href: '/report-withdraw-admin' },
    { label: `${searchParams.name}`, href: `` },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawAdminDetails />
    </div>
  );
}
