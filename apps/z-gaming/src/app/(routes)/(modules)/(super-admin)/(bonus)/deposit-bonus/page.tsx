import DepositBonus from 'shared/src/components/pages/bonus/deposit-bonus';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositBonusPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Bonus', href: '' },
    { label: 'Deposit Bonus', href: '/deposit-bonus' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DepositBonus />
    </div>
  );
}
