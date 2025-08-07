import PageLayout from 'shared/src/components/layout/PageLayout';
import PocketMoneyHistory from 'shared/src/components/pages/pocket-money/history';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PocketMoneyHistoryPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Pocket Money', href: '/pocket-money/history' },
    { label: 'History', href: '/pocket-money/history' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <PocketMoneyHistory />
    </div>
  );
}
