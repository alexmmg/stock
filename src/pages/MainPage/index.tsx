import { useState, useEffect, useCallback } from "react";
import { SearchBar } from "../../features/SearchBar";
import { StockTable } from "../../entities/StockTable";
import { Pagination } from "../../features/Pagination";
import { fetchStockItems } from "../../shared/api/stockApi";
import "./styles.scss";
import { StockItem } from "../../shared/api/types";

export const MainPage = () => {
  const [items, setItems] = useState<StockItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await fetchStockItems(
        searchQuery,
        currentPage,
        itemsPerPage
      );

      if (data && data.result) {
        setItems(data.result.items);
        setTotalItems(data.result.totalItems || 0);
      } else {
        setItems([]);
        setTotalItems(0);
      }
    } catch (err: unknown) {
      let errorMessage = "Произошла ошибка при загрузке данных.";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      ) {
        errorMessage = (err as { message: string }).message;
      }

      setError(errorMessage);
      setItems([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, currentPage, itemsPerPage]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const handleSearch = useCallback((search: string, limit: number) => {
    setSearchQuery(search);
    setItemsPerPage(limit);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="main-page">
      <div className="container">
        <SearchBar
          onSearch={handleSearch}
          isLoading={isLoading}
          initialSearch={searchQuery}
          initialLimit={itemsPerPage}
        />

        {error ? (
          <div className="main-page__error">
            <p>
              <b>Ошибка:</b> {error}
            </p>{" "}
            {/* Выводим сообщение об ошибке */}
            <button
              className="main-page__retry-button"
              onClick={loadItems}
              disabled={isLoading}
            >
              Повторить попытку
            </button>
          </div>
        ) : (
          <>
            <div className="main-page__total">
              Найдено элементов: {totalItems}
            </div>

            <StockTable items={items} isLoading={isLoading} />

            {!isLoading && items.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
