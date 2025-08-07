import Network from 'shared/src/components/pages/payment-category/payment-category/network';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function NetworkPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Payment Category', href: '/payment-category' },
    { label: 'Payment Category List', href: '/payment-category' },
    { label: 'Network', href: '/network' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <Network />
    </div>
  );
}
