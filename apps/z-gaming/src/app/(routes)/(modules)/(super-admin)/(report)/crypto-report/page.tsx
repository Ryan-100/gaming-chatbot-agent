import CryptoReport from 'shared/src/components/pages/report/crypto-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function CryptoReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '' },
    { label: 'Crypto Report', href: '' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <CryptoReport />
    </div>
  );
}
