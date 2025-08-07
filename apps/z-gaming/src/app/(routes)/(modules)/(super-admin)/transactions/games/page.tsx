import PageLayout from 'shared/src/components/layout/PageLayout';
import Games from 'shared/src/components/pages/transactions/games';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function GamesPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Transactions', href: '' },
    { label: 'Games', href: '/transactions/games' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <Games />
    </div>
  );
}
