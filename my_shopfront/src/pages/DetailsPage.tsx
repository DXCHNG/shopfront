import { useQuery } from '@tanstack/react-query'
import { productApi } from '../api/products'
import type { Product } from '../types'

type Props = { id: string; onBack: () => void; onAddToCart: (product: Product) => void }
const titleCase = (value: string) => value.replaceAll('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())

export function DetailsPage({ id, onBack, onAddToCart }: Props) {
  const { data: product, isPending, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.detail(id),
  })

  if (isPending) return <main className="detail-page page-width"><div className="empty-state">Loading product…</div></main>
  if (error || !product) return <main className="detail-page page-width"><div className="notice error">{error instanceof Error ? error.message : 'Product not found.'}</div><button className="back-link" onClick={onBack}>← Back to products</button></main>
  return <main className="detail-page page-width"><button className="back-link" onClick={onBack}>← Back to products</button><section className="detail-layout"><div className="detail-image"><img src={product.images?.[0] || product.thumbnail} alt={product.title} /></div><div className="detail-copy"><div className="category-label">{titleCase(product.category)}{product.brand ? ` · ${product.brand}` : ''}</div><h1>{product.title}</h1><div className="detail-meta"><span className="rating">★ {product.rating.toFixed(1)}</span><span>·</span><span className={product.stock > 0 ? 'in-stock' : 'out-stock'}>{product.stock > 0 ? 'In Stock' : 'Out of stock'}</span></div><div className="detail-price"><strong>${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</strong><del>${product.price.toFixed(2)}</del><span>-{Math.round(product.discountPercentage)}%</span></div><p className="description">{product.description}</p><button className="button primary add-detail" disabled={!product.stock} onClick={() => onAddToCart(product)}>Add to cart</button><div className="facts-grid">{[['Shipping', product.shippingInformation || 'Ships in 3–5 business days'], ['Warranty', product.warrantyInformation || 'Manufacturer warranty'], ['Returns', product.returnPolicy || 'See return policy'], ['In stock', `${product.stock} units`]].map(([label, value]) => <div className="fact" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div></section><section className="reviews"><h2>Reviews</h2>{product.reviews?.length ? product.reviews.map((review, i) => <article className="review" key={`${review.reviewerName}-${i}`}><div><strong>{review.reviewerName}</strong><p>{review.comment}</p></div><span className="rating">★ {review.rating}</span></article>) : <p className="muted">No reviews yet.</p>}</section></main>
}
