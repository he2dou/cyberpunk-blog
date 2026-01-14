import { useState, useEffect } from 'react';

export function usePagination<T>(items: T[], itemsPerPage: number = 5, resetKey?: string) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when resetKey changes (e.g. category/tag change)
  useEffect(() => {
    setCurrentPage(1);
  }, [resetKey]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage
  };
}
