// eslint-disable-next-line react/prop-types
const Paginated = ({ currentPage, totalPages, onPageChange }) => {

    console.log("esto es total pages: ", totalPages)
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
      <div>
        <button onClick={goToFirstPage} >
          First
        </button>
        <button onClick={goToPreviousPage} >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} >
          Next
        </button>
        <button onClick={goToLastPage} >
          Last
        </button>
      </div>
    );
  };
  
  export default Paginated;