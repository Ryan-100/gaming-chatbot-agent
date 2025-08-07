import RegisterBonus from 'shared/src/components/pages/bonus/register-bonus';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function RegisterBonusPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Bonus', href: '' },
    { label: 'Register Bonus', href: '/register-bonus' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <RegisterBonus />
    </div>
  );
}
