import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const Paginated = ({ currentPage, totalPages, onPageChange }) => {
  
  const goToFirstPage = () => {
    onPageChange(1);
  };

  const goToLastPage = () => {
    onPageChange(totalPages);
  };

  const goToPreviousPage = () => {
    const previousPage = currentPage - 1;
    if (previousPage >= 1) {
      onPageChange(previousPage);
    }
  };

  const goToNextPage = () => {
    const nextPage = currentPage + 1;
    if (nextPage <= totalPages) {
      onPageChange(nextPage);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="bg-violetahome hover:bg-white border px-4 py-2 rounded-md"
        onClick={goToFirstPage}
      >
        First
      </button>
      <button
        className="bg-violetahome hover:bg-white border px-4 py-2 rounded-md"
        onClick={goToPreviousPage}
      >
        <GrPrevious />
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="bg-violetahome hover:bg-white border px-4 py-2 rounded-md"
        onClick={goToNextPage}
      >
        <GrNext />
      </button>
      <button
        className="bg-violetahome hover:bg-white border px-4 py-2 rounded-md"
        onClick={goToLastPage}
      >
        Last
      </button>
    </div>
  );
};

export default Paginated;
