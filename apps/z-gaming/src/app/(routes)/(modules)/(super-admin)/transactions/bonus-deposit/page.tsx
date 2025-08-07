import PageLayout from 'shared/src/components/layout/PageLayout';
import DepositBonus from 'shared/src/components/pages/transactions/deposit-bonus';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositBonusPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Transactions', href: '' },
    { label: 'Deposit Bonus', href: '/transactions/deposit-bonus' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DepositBonus />
    </div>
  );
}
