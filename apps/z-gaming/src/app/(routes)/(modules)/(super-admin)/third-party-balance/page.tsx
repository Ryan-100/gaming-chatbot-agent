import PageLayout from 'shared/src/components/layout/PageLayout';
import ThirdPartyBalance from 'shared/src/components/pages/third-party-balance';
import {
  BreadcrumbLink,
  PageBreadcrumb,
} from 'shared/src/components/shared/PageBreadCrumb';

export default function ExamplePage() {
  const breadCrumbs: BreadcrumbLink[] = [
    { label: 'Third Party Balance', href: '/third-party-balance' },
  ];

  return (
    <div>
      <PageBreadcrumb links={breadCrumbs} />
      <ThirdPartyBalance />
    </div>
  );
}
