import CryptoReportWithdrawAccountDetail from 'shared/src/components/pages/report/crypto-report/details/withdraw/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function CryptoReportWithdrawAccountDetailPage({
  searchParams,
}: {
  searchParams: {
    name: string;
    accountName: string;
    categoryId: string;
    accountId: string;
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
      href: `/crypto-report/${searchParams.accountId}/withdraw?name=${searchParams.name}&type=${searchParams.type}&time=${searchParams.time}&accountName=${searchParams.accountName}&categoryId=${searchParams.categoryId}&accountId=${searchParams.accountId}`,
    },
    {
      label: 'Detail',
      href: '',
    },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <CryptoReportWithdrawAccountDetail />
    </div>
  );
}
