import React from 'react';
import {
  PaginationContent,
  Pagination as SPagination,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '../../ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPageCount,
  onChange,
}: PaginationProps) {
  const renderPaginationItems = (): JSX.Element[] => {
    const items: JSX.Element[] = [];

    if (totalPageCount <= 1) {
      return items;
    }

    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => onChange(Math.max(currentPage - 1, 1))}
        />
      </PaginationItem>
    );

    if (currentPage <= 2) {
      // Always show the first two pages
      for (let i = 1; i <= Math.min(2, totalPageCount); i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => onChange(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (totalPageCount > 2) {
        items.push(
          <PaginationItem key="ellipsis-1">
            <PaginationEllipsis />
          </PaginationItem>
        );

        items.push(
          <PaginationItem key={totalPageCount}>
            <PaginationLink
              isActive={currentPage === totalPageCount}
              onClick={() => onChange(totalPageCount)}
            >
              {totalPageCount}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Handle other cases with ellipsis in the middle
      items.push(
        <PaginationItem key="1">
          <PaginationLink
            isActive={currentPage === 1}
            onClick={() => onChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis-2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPageCount - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i}
              onClick={() => onChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPageCount - 2) {
        items.push(
          <PaginationItem key="ellipsis-3">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={totalPageCount}>
          <PaginationLink
            isActive={currentPage === totalPageCount}
            onClick={() => onChange(totalPageCount)}
          >
            {totalPageCount}
          </PaginationLink>
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() => onChange(Math.min(currentPage + 1, totalPageCount))}
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <SPagination>
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
    </SPagination>
  );
}
