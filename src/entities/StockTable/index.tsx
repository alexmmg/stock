import { useState, useEffect } from "react";
import { StockItem } from "../../shared/api/types";
import "./styles.scss";

interface StockTableProps {
  items: StockItem[];
  isLoading: boolean;
}

export const StockTable = ({ items, isLoading }: StockTableProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isLoading) {
    return <div className="stock-table-loader">Загрузка...</div>;
  }

  if (!items.length) {
    return (
      <div className="empty-state">
        <div className="empty-state__title">Нет данных</div>
        <div className="empty-state__description">
          Попробуйте изменить параметры поиска
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div>
        <div className="stock-table">
          {items.map((item) => (
            <div key={item.code} className="stock-table__item">
              <div className="stock-table__item-row">
                <span className="stock-table__item-label">Код:</span>
                <span className="stock-table__item-value">{item.code}</span>
              </div>
              <div className="stock-table__item-row">
                <span className="stock-table__item-label">Название:</span>
                <span className="stock-table__item-value">{item.title}</span>
              </div>
              <div className="stock-table__item-row">
                <span className="stock-table__item-label">Производитель:</span>
                <span className="stock-table__item-value">
                  {item.manufacturer}
                </span>
              </div>
              <div className="stock-table__item-row">
                <span className="stock-table__item-label">Описание:</span>
                <span className="stock-table__item-value">
                  {item.description}
                </span>
              </div>
              <div className="stock-table__item-row">
                <span className="stock-table__item-label">Цена:</span>
                <span className="stock-table__item-value">{item.price}</span>
              </div>
              <div className="stock-table__item-row">
                <span className="stock-table__item-label">Количество:</span>
                <span className="stock-table__item-value">{item.stock}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="stock-table-wrapper">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Код</th>
              <th>Название</th>
              <th>Производитель</th>
              <th>Описание</th>
              <th>Цена</th>
              <th>Количество</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.code}>
                <td>{item.code}</td>
                <td>{item.title}</td>
                <td>{item.manufacturer}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};
