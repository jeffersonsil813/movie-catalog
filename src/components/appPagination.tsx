import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface AppPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const AppPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: AppPaginationProps) => {
  const getPages = () => {
    const pages = [];
    if (currentPage > 1) pages.push(currentPage - 1);
    pages.push(currentPage);
    if (currentPage < totalPages) pages.push(currentPage + 1);
    return pages;
  };

  return (
    <Pagination className="bg-gray-800/50 backdrop-blur-sm w-fit rounded-lg p-1 fixed bottom-5 left-1/2 -translate-x-1/2 z-20">
      <PaginationContent className="gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>

        {getPages().map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(p)}
              isActive={currentPage === p}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <span className="px-2 text-sm text-gray-100">...</span>
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={() => onPageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default AppPagination;
