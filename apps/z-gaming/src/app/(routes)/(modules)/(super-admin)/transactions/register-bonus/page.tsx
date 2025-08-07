import PageLayout from 'shared/src/components/layout/PageLayout';
import RegisterBonus from 'shared/src/components/pages/transactions/register-bonus';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function RegisterBonusPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Transactions', href: '' },
    { label: 'Register Bonus', href: '/transactions/register-bonus' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <RegisterBonus />
    </div>
  );
}
