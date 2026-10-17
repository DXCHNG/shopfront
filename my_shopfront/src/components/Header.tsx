type Props = { cartCount: number; onHome: () => void; onCart: () => void }

export function Header({ cartCount, onHome, onCart }: Props) {
  return <header className="site-header"><div className="header-inner">
    <button className="brand" onClick={onHome} aria-label="ShopFront home">Shop<span>Front</span></button>
    <button className="button cart-link" onClick={onCart}>Cart{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}</button>
  </div></header>
}
