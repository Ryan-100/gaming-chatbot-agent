import CryptoReportWithdrawAccount from 'shared/src/components/pages/report/crypto-report/details/withdraw';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function CryptoReportWithdrawAccountPage({
  searchParams,
}: {
  searchParams: {
    name: string;
    accountName: string;
    categoryId: string;
    type: string;
    time: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '' },
    {
      label: 'Crypto Report',
      href: `/crypto-report?type=${searchParams.type}&time=${searchParams.time}`,
    },
    {
      label: `${searchParams.name}`,
      href: `/crypto-report/${searchParams.categoryId}?name=${searchParams.name}&type=${searchParams.type}&time=${searchParams.time}&categoryId=${searchParams.categoryId}`,
    },
    {
      label: `${searchParams.accountName}`,
      href: ``,
    },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <CryptoReportWithdrawAccount />
    </div>
  );
}
