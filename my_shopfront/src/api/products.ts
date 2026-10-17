import type { Product } from "../types";

const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || "https://dummyjson.com"
).replace(/\/$/, "");

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);
  if (!response.ok)
    throw new Error(`Product request failed (${response.status})`);
  return response.json() as Promise<T>;
}

export const productApi = {
  list: (options: {
    page: number;
    limit: number;
    category?: string;
    search?: string;
    sort?: string;
  }) => {
    const skip = (options.page - 1) * options.limit;
    if (options.search)
      return request<{ products: Product[]; total: number }>(
        `/products/search?q=${encodeURIComponent(options.search)}&limit=${options.limit}&skip=${skip}`,
      );
    if (options.category)
      return request<{ products: Product[]; total: number }>(
        `/products/category/${encodeURIComponent(options.category)}?limit=${options.limit}&skip=${skip}`,
      );
    const sort =
      options.sort && options.sort !== "featured"
        ? `&sortBy=${options.sort}&order=${options.sort === "price" ? "asc" : "desc"}`
        : "";
    return request<{ products: Product[]; total: number }>(
      `/products?limit=${options.limit}&skip=${skip}${sort}`,
    );
  },
  categories: () =>
    request<Array<{ slug: string; name: string }>>("/products/categories"),
  detail: (id: string) =>
    request<Product>(`/products/${encodeURIComponent(id)}`),
};
