import { useState, useEffect } from "react";
import "./styles.scss";
import { useDebounce } from "../../shared/hooks/useDebounce";

interface SearchFormProps {
  initialSearch?: string;
  initialLimit?: number;
  onSubmit: (search: string, limit: number) => void;
  isLoading?: boolean;
  totalItems?: number;
}

export const SearchForm = ({
  initialSearch = "",
  initialLimit = 4,
  onSubmit,
  isLoading,
  totalItems,
}: SearchFormProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [limit, setLimit] = useState(initialLimit.toString());

  const debouncedSearch = useDebounce(search, 300);
  const debouncedLimit = useDebounce(limit, 300);

  useEffect(() => {
    onSubmit(debouncedSearch, parseInt(debouncedLimit));
  }, [debouncedSearch, debouncedLimit, onSubmit]);

  return (
    <div className="search-form-container">
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <div className="search-form__group">
          <label htmlFor="search">Поиск</label>
          <input
            type="text"
            id="search"
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Введите строку поиска"
            disabled={isLoading}
          />
        </div>

        <div className="search-form__group search-form__group--small">
          <label htmlFor="limit">Кол-во</label>
          <input
            type="number"
            id="limit"
            className="input"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            min="1"
            max="100"
            disabled={isLoading}
          />
        </div>
      </form>

      {typeof totalItems === "number" && (
        <div className="search-form__total">
          Найдено элементов: {totalItems}
        </div>
      )}
    </div>
  );
};
