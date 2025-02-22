import "./styles.scss";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}: PaginationProps) => {
  return (
    <div className="pagination">
      <div className="pagination__info">
        Страница: {currentPage} из {totalPages}
      </div>

      <div className="pagination__controls">
        <button
          className="pagination__button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1 || isLoading}
        >
          Предыдущая
        </button>

        <button
          className="pagination__button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages || isLoading}
        >
          Следующая
        </button>
      </div>
    </div>
  );
};
