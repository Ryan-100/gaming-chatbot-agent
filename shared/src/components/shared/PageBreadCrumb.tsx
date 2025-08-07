'use client';
import { Box, Flex, Text } from '@radix-ui/themes';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { Icons } from '../ui/icons';
import { useRouter } from 'next/navigation';

export interface BreadcrumbLink {
  href: string;
  label: string;
}

export interface PageBreadcrumbProps {
  links: BreadcrumbLink[];
  enableBack?: boolean;
}

export function PageBreadcrumb(props: PageBreadcrumbProps) {
  const router = useRouter();
  const { links, enableBack } = props;
  return (
    <Breadcrumb className="pb-4">
      <BreadcrumbList>
        {enableBack && (
          <Flex
            className="bg-white rounded-sm w-[70px] h-[40px] mr-2 cursor-pointer"
            justify="center"
            align="center"
            gap="2"
            onClick={() => router.back()}
          >
            <Icons.BackArrow />
            <Text className="text-xs md:text-sm text-text-primary">Back</Text>
          </Flex>
        )}
        {links.map((link, index) => {
          return (
            <Flex
              key={index}
              align="center"
              className="text-sm lg:text-[16px] font-bold"
              gap="0"
            >
              <BreadcrumbItem
                onClick={() => {
                  link.href === '-1' && router.back();
                }}
              >
                {link.href === '-1' ? (
                  <Text
                    className={`cursor-pointer hover:text-text-primary
                      ${
                        index == links.length - 1
                          ? 'text-text-primary'
                          : 'text-text-secondary'
                      }
                    `}
                  >
                    {link.label}
                  </Text>
                ) : (
                  <BreadcrumbLink
                    href={link.href}
                    className={
                      index == links.length - 1
                        ? 'text-text-primary'
                        : 'text-text-secondary'
                    }
                  >
                    {' '}
                    {link.label}{' '}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < links.length - 1 && (
                <BreadcrumbSeparator className="p-0" />
              )}
            </Flex>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
