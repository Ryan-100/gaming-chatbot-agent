import PageLayout from 'shared/src/components/layout/PageLayout';
import ExchangeRates from 'shared/src/components/pages/payment-category/exchange-rate';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function ExchangeRatesPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Payment Category', href: '/payment-category' },
    { label: 'Exchange Rate', href: '/exchange-reate' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <ExchangeRates />
    </div>
  );
}
