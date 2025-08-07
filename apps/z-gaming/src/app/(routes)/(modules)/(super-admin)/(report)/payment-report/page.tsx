import PaymentReport from 'shared/src/components/pages/report/payment-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PaymentReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/payment-report' },
    { label: 'Payment Report', href: '/payment-report' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <PaymentReport />
    </div>
  );
}
