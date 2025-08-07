import PaymentManagement from 'shared/src/components/pages/payment-category/payment-management';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PaymentManagementPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Payment Category', href: '/payment-category' },
    { label: 'Payment Management', href: '/payment-management' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <PaymentManagement />
    </div>
  );
}
