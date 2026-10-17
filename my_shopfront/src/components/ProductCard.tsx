import type { Product } from "../types";

type Props = {
  product: Product;
  onOpen: (id: number) => void;
  onAdd: (product: Product) => void;
};
export function ProductCard({ product, onOpen, onAdd }: Props) {
  return (
    <article className="product-card">
      <button
        className="product-image"
        onClick={() => onOpen(product.id)}
        aria-label={`View ${product.title}`}
      >
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </button>
      <div className="product-info">
        <span className="category-label">{product.category}</span>
        <button className="product-title" onClick={() => onOpen(product.id)}>
          {product.title}
        </button>
        <span className="rating">
          ★ <span>{product.rating.toFixed(1)}</span>
        </span>
        <div className="product-bottom">
          <strong className="price">${product.price.toFixed(2)}</strong>
          <button
            className="button primary small"
            onClick={() => onAdd(product)}
          >
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
