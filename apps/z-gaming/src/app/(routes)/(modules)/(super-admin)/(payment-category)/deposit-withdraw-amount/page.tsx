import DepositWithdrawAmount from 'shared/src/components/pages/payment-category/deposit-withdraw-amount';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositWithdrawAmountPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Payment Category', href: '/payment-category' },
    { label: 'Deposit/Withdraw Amount', href: '/deposit-withdraw-amount' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DepositWithdrawAmount />
    </div>
  );
}
