import FirstTimeDepositBonusDetails from 'shared/src/components/pages/bonus/first-time-deposit-details';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function FirstTimeDepositBonusDetailsPage({
  searchParams,
}: {
  searchParams: {
    name: string;
    id: string;
  };
}) {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Bonus', href: '' },
    { label: 'First Time Deposit Bonus', href: '/first-time-deposit-bonus' },
    {
      label: `${searchParams.name}`,
      href: `/first-time-deposit-bonus/details?name=${searchParams.name}&id=${searchParams.id}`,
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <FirstTimeDepositBonusDetails id={searchParams?.id} />
    </div>
  );
}
