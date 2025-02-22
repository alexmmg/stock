import { useState } from "react";
import "./styles.scss";

export interface SearchBarProps {
  onSearch: (search: string, limit: number) => void;
  isLoading?: boolean;
  totalItems?: number;
  initialSearch?: string;
  initialLimit?: number;
}

export const SearchBar = ({
  onSearch,
  isLoading = false,
  totalItems = 0,
  initialSearch = "",
  initialLimit = 4,
}: SearchBarProps) => {
  const [search, setSearch] = useState(initialSearch);
  const [limit, setLimit] = useState(initialLimit.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search, parseInt(limit) || 4);
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <div className="search-bar__group">
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

        <div className="search-bar__group search-bar__group--small">
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

        <button
          type="submit"
          className="search-bar__button"
          disabled={isLoading}
        >
          Поиск
        </button>
      </form>
    </div>
  );
};
