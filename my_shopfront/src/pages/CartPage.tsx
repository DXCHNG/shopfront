import type { CartLine } from "../types";

type Props = {
  cart: CartLine[];
  onOpenProduct: (id: number) => void;
  onChangeQuantity: (id: number, amount: number) => void;
  onClear: () => void;
  onBrowse: () => void;
};
export function CartPage({
  cart,
  onOpenProduct,
  onChangeQuantity,
  onClear,
  onBrowse,
}: Props) {
  return (
    <main className="cart-page">
      <div className="cart-heading">
        <h1>Your Cart</h1>
        {cart.length > 0 && (
          <button className="text-button" onClick={onClear}>
            Clear cart
          </button>
        )}
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="button primary" onClick={onBrowse}>
            Browse products
          </button>
        </div>
      ) : (
        <>
          <div className="cart-lines">
            {cart.map(({ product, quantity }) => (
              <article className="cart-line" key={product.id}>
                <button
                  className="cart-thumb"
                  onClick={() => onOpenProduct(product.id)}
                >
                  <img src={product.thumbnail} alt={product.title} />
                </button>
                <div className="cart-product">
                  <button
                    className="product-title"
                    onClick={() => onOpenProduct(product.id)}
                  >
                    {product.title}
                  </button>
                  <strong className="price">${product.price.toFixed(2)}</strong>
                </div>
                <div className="quantity-control">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => onChangeQuantity(product.id, -1)}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => onChangeQuantity(product.id, 1)}
                  >
                    +
                  </button>
                </div>
                <strong className="line-total">
                  ${(product.price * quantity).toFixed(2)}
                </strong>
                <button
                  className="text-button remove"
                  onClick={() => onChangeQuantity(product.id, -quantity)}
                >
                  Remove
                </button>
              </article>
            ))}
          </div>
          <section className="summary">
            <div className="summary-total">
              <span>Total</span>
              <strong>
                $
                {cart
                  .reduce(
                    (sum, line) => sum + line.product.price * line.quantity,
                    0,
                  )
                  .toFixed(2)}
              </strong>
            </div>
            <button
              className="button primary checkout"
              onClick={() =>
                window.alert(
                  "This is a demo store, so checkout does not charge anything.",
                )
              }
            >
              Checkout
            </button>
            <p>This is a demo store, createed by DXCHNG. So checkout does not charge anything.</p>
          </section>
        </>
      )}
    </main>
  );
}
