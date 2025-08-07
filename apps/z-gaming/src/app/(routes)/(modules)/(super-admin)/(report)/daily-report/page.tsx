import DailyReport from 'shared/src/components/pages/report/daily-report';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function DailyReportPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Report', href: '/daily-report' },
    { label: 'Daily Report', href: '/daily-report' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <DailyReport />
    </div>
  );
}
