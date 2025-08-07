import PageLayout from 'shared/src/components/layout/PageLayout';
import RulesAndRegulations from 'shared/src/components/pages/settings/rules-regulations';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function RulesAndRegulationsPage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Settings', href: '/settings/rules-regulations' },
    { label: 'Rules & Regulations', href: '/settings/rules-regulations' },
  ];
  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <RulesAndRegulations />
    </div>
  );
}
