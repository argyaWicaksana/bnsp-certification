import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void
}

export function AppPagination({ currentPage, totalPages, onPageChange }: AppPaginationProps) {
  const renderPagination = () => {
    const items = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              href="#"
              onClick={e => { e.preventDefault(); onPageChange(i); }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            isActive={currentPage === 1}
            href="#"
            onClick={e => { e.preventDefault(); onPageChange(1); }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (currentPage > 4) {
        items.push(
          <PaginationItem key="start-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              href="#"
              onClick={e => { e.preventDefault(); onPageChange(i); }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (currentPage < totalPages - 3) {
        items.push(
          <PaginationItem key="end-ellipsis">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            href="#"
            onClick={e => { e.preventDefault(); onPageChange(totalPages); }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => { e.preventDefault(); if (currentPage > 1) onPageChange(currentPage - 1) }}
          />
        </PaginationItem>
        {renderPagination()}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => { e.preventDefault(); if (currentPage < totalPages) onPageChange(currentPage + 1) }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
