import ActiveBonus from 'shared/src/components/pages/bonus/active-bonus';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function ActiveBonusPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Bonus', href: '' },
    { label: 'Active Bonus', href: '/bonus/active-bonus' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <ActiveBonus />
    </div>
  );
}
