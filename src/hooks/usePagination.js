import { useEffect, useState } from "react";

export default function usePagination(item, total) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = total;
  const lastIndex = recordPerPage * currentPage;
  const firstIndex = lastIndex - recordPerPage;
  const record = item.slice(firstIndex, lastIndex);
  const npage = Math.ceil(item.length / recordPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changePage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== numbers.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  return { prePage, changePage, nextPage, record, numbers, currentPage };
}
