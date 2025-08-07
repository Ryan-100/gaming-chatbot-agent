import DepositRecordHistory from 'shared/src/components/pages/deposit-admin/deposit-record-history';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DepositRecordHistoryPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Record History', href: '/deposit-record-history' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DepositRecordHistory />
    </div>
  );
}
