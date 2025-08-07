import FirstTimeDepositBonus from 'shared/src/components/pages/bonus/first-time-deposit-bonus';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function FirstTimeDepositBonusPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Bonus', href: '' },
    { label: 'First Time Deposit Bonus', href: '/first-time-deposit-bonus' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <FirstTimeDepositBonus />
    </div>
  );
}
