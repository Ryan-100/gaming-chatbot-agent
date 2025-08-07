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
    { label: 'Deposit Bonus', href: '/deposit-bonus' },
    {
      label: `${searchParams.name}`,
      href: `/deposit-bonus/details?name=${searchParams.name}&id=${searchParams.id}`,
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <DepositBonusDetails id={searchParams?.id} />
    </div>
  );
}
