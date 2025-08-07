import PageLayout from 'shared/src/components/layout/PageLayout';
import PocketMoney from 'shared/src/components/pages/pocket-money/upcoming-pocket-money';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PocketMoneyPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Pocket Money', href: '/pocket-money/upcoming-pocket-money' },
    {
      label: 'Upcoming Pocket Money',
      href: '/pocket-money/upcoming-pocket-money',
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <PocketMoney />
    </div>
  );
}
