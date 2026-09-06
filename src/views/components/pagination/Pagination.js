import "./Pagination.scss"

function Pagination({ currentPage, totalPages, totalItems, onPageChange }) {
  if (totalPages <= 1) return null

  const goToPreviousPage = () => onPageChange(currentPage - 1)
  const goToNextPage = () => onPageChange(currentPage + 1)

  return (
    <nav className="pagination" aria-label="Launch results pagination">
      <button
        type="button"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
      >
        Previous
      </button>
      <span aria-live="polite">
        Page {currentPage} of {totalPages} ({totalItems} launches)
      </span>
      <button
        type="button"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
      >
        Next
      </button>
    </nav>
  )
}

export default Pagination
