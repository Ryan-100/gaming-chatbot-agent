import PageLayout from 'shared/src/components/layout/PageLayout';
import PocketMoneyCreate from 'shared/src/components/pages/pocket-money/active-pocket-money/create';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PocketMoneyCreatePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Pocket Money', href: '/pocket-money' },
    { label: 'Active Pocket Money', href: '/pocket-money/active-pocket-money' },
    {
      label: 'Create Pocket Money',
      href: '/pocket-money/active-pocket-money/create',
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <PocketMoneyCreate />
    </div>
  );
}
