interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isFirst: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  isFirst,
  isLast,
  onPrev,
  onNext,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Employee pagination" className="d-flex justify-content-center mt-3">
      <ul className="pagination mb-0">
        <li className={`page-item ${isFirst ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={onPrev}
            disabled={isFirst}
          >
            Previous
          </button>
        </li>

        <li className="page-item disabled">
          <span className="page-link">
            Page {currentPage + 1} of {totalPages}
          </span>
        </li>

        <li className={`page-item ${isLast ? "disabled" : ""}`}>
          <button
            type="button"
            className="page-link"
            onClick={onNext}
            disabled={isLast}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;