import PageLayout from 'shared/src/components/layout/PageLayout';
import PocketMoneyEdit from 'shared/src/components/pages/pocket-money/upcoming-pocket-money/edit';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function PocketMoneyEditPage({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Pocket Money', href: '/pocket-money' },
    {
      label: 'Upcoming Pocket Money',
      href: '/pocket-money/upcoming-pocket-money',
    },
    {
      label: 'Edit Pocket Money',
      href: '/pocket-money/upcoming-pocket-money/edit',
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <PocketMoneyEdit id={searchParams?.id} />
    </div>
  );
}
