// import { ApiResponse } from "./types";

// const API_URL = "http://fakestock.everys.com/v1/Stock";

// const AUTH = {
//   username: "candidate",
//   password: "candidate321",
// };

// export const fetchStockItems = async (
//   search: string = "",
//   page: number = 1,
//   limit: number = 4
// ): Promise<ApiResponse> => {
//   try {
//     const params = new URLSearchParams({
//       Skip: ((page - 1) * limit).toString(),
//       Take: limit.toString(),
//       Filter: search,
//     });

//     const response = await fetch(`${API_URL}?${params}`, {
//       method: "GET",
//       headers: {
//         Authorization: `Basic ${btoa(`${AUTH.username}:${AUTH.password}`)}`,
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(errorText || "Ошибка получения данных");
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Ошибка получения данных: ${error.message}`);
//     }
//     throw new Error("Неизвестная ошибка");
//   }
// };

// shared/api/stockApi.ts
import { ApiResponse } from "./types";

const API_URL = "http://fakestock.everys.com/v1/Stock";

const AUTH = {
  username: "candidate",
  password: "candidate321",
};

export const fetchStockItems = async (
  search: string = "",
  page: number = 1,
  limit: number = 4
): Promise<ApiResponse> => {
  try {
    const params = new URLSearchParams({
      Skip: ((page - 1) * limit).toString(),
      Take: limit.toString(),
      Filter: search,
    });

    const response = await fetch(`${API_URL}?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${AUTH.username}:${AUTH.password}`)}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Ошибка получения данных");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Ошибка получения данных: ${error.message}`);
    }
    throw new Error("Неизвестная ошибка");
  }
};
