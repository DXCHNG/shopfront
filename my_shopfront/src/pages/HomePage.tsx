import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { productApi } from "../api/products";
import { ProductCard } from "../components/ProductCard";
import type { Product } from "../types";

type Props = {
  onOpenProduct: (id: number) => void;
  onAddToCart: (product: Product) => void;
};

export function HomePage({ onOpenProduct, onAddToCart }: Props) {
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const limit = 12;

  useEffect(() => {
    const timer = window.setTimeout(() => setQuery(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);

  const { data: categories = [] } = useQuery({
    queryKey: ["product-categories"],
    queryFn: productApi.categories,
    staleTime: 5 * 60 * 1000,
  });
  const { data, isPending, isError, error, isFetching } = useQuery({
    queryKey: ["products", { page, limit, category, query, sort }],
    queryFn: () =>
      productApi.list({ page, limit, category, search: query, sort }),
  });
  const products = data?.products ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <main className="catalog page-width">
      <div className="page-heading">
        <h1>ShopFront</h1>
      </div>
      <div className="toolbar">
        <input
          className="search-input"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
          placeholder="Search products..."
          aria-label="Search products"
        />
        <select
          className="sort-select"
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
            setPage(1);
          }}
          aria-label="Sort products"
        >
          <option value="featured">Sort: Featured</option>
          <option value="price">Price: Low to high</option>
          <option value="rating">Top rated</option>
        </select>
      </div>
      <div className="category-scroller">
        <button
          className={`chip ${category === "" ? "selected" : ""}`}
          onClick={() => {
            setCategory("");
            setPage(1);
          }}
        >
          All
        </button>
        {categories.map((item) => (
          <button
            key={item.slug}
            className={`chip ${category === item.slug ? "selected" : ""}`}
            onClick={() => {
              setCategory(item.slug);
              setPage(1);
            }}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="result-count">
        {isFetching && !isPending ? "Updating products…" : `${total} products`}
      </div>
      {isError && (
        <div className="notice error">
          {error instanceof Error ? error.message : "Could not load products."}{" "}
          Check your API URL and connection, then try again.
        </div>
      )}
      {isPending ? (
        <div className="loading-grid">
          {Array.from({ length: 8 }, (_, i) => (
            <div className="skeleton" key={i} />
          ))}
        </div>
      ) : products.length ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={onOpenProduct}
              onAdd={onAddToCart}
            />
          ))}
        </div>
      ) : (
        !isError && (
          <div className="empty-state">
            No products found. Try another search or category.
          </div>
        )
      )}
      {totalPages > 1 && (
        <nav className="pagination" aria-label="Product pages">
          <button
            className="button"
            disabled={page === 1}
            onClick={() => {
              setPage((n) => n - 1);
              window.scrollTo(0, 0);
            }}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            className="button"
            disabled={page === totalPages}
            onClick={() => {
              setPage((n) => n + 1);
              window.scrollTo(0, 0);
            }}
          >
            Next
          </button>
        </nav>
      )}
    </main>
  );
}
