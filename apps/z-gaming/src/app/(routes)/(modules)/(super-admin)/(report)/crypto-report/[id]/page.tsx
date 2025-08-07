import CryptoReportDetails from 'shared/src/components/pages/report/crypto-report/details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function CryptoReportDetailsPage({
  searchParams,
}: {
  searchParams: {
    name: string;
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
      href: ``,
    },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <CryptoReportDetails />
    </div>
  );
}
