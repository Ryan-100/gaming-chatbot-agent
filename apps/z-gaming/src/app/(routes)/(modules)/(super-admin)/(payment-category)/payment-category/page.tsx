import PaymentCategory from 'shared/src/components/pages/payment-category/payment-category';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PaymentCategoryPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Payment Category', href: '/payment-category' },
    { label: 'Payment Category List', href: '/payment-category' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <PaymentCategory />
    </div>
  );
}
