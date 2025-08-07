import PageLayout from 'shared/src/components/layout/PageLayout';
import WithdrawBonusHistory from 'shared/src/components/pages/withdraw-admin/withdraw-accepted/details/bonus-history';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function WithdrawBonusHistoryPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Withdraw Accepted', href: '/withdraw-accepted' },
    {
      label: 'Bonus History',
      href: '',
    },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} enableBack />
      <WithdrawBonusHistory />
    </div>
  );
}
