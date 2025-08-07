import PaymentType from 'shared/src/components/pages/payment-category/payment-category/type';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PaymentTypePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Payment Category', href: '/payment-category' },
    { label: 'Payment Category List', href: '/payment-category' },
    { label: 'Type', href: '/type' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <PaymentType />
    </div>
  );
}
