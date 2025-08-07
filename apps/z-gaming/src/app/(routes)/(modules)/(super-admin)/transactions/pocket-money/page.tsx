import PageLayout from 'shared/src/components/layout/PageLayout';
import PocketMoney from 'shared/src/components/pages/transactions/pocket-money';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PocketMoneyPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Transactions', href: '' },
    { label: 'Pocket Money', href: '/transactions/pocket-money' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <PocketMoney />
    </div>
  );
}
