//remove this file after details page is implemented in component folder

import DepositBonusDetails from 'shared/src/components/pages/bonus/deposit-details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositBonusDetailsPage({
  searchParams,
}: {
  searchParams: {
    name: string;
    id: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Bonus', href: '' },
    { label: 'Active Bonus', href: '/active-bonus' },
    {
      label: `${searchParams.name}`,
      href: `/active-bonus/deposit?name=${searchParams.name}&id=${searchParams.id}`,
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <DepositBonusDetails id={searchParams?.id} />
    </div>
  );
}
