export interface StockItem {
  code: string;
  title: string;
  manufacturer: string;
  description: string;
  price: string;
  stock: number;
}

export interface ApiResponse {
  result: {
    totalItems: number;
    items: StockItem[];
  };
  status: string;
  requestId: string;
}

export interface StockResponse {
  totalItems: number;
  items: StockItem[];
}
