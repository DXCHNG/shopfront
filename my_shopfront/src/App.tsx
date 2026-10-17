import { useCallback, useEffect, useMemo, useState } from 'react'
import { Header } from './components/Header'
import { CartPage } from './pages/CartPage'
import { DetailsPage } from './pages/DetailsPage'
import { HomePage } from './pages/HomePage'
import type { CartLine, Product } from './types'
import './App.css'

type Route = { page: 'home' | 'detail' | 'cart'; id?: string }
const readRoute = (): Route => {
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts[0] === 'products' && parts[1]) return { page: 'detail', id: parts[1] }
  if (parts[0] === 'cart') return { page: 'cart' }
  return { page: 'home' }
}

function App() {
  const [route, setRoute] = useState<Route>(readRoute)
  const [cart, setCart] = useState<CartLine[]>(() => { try { return JSON.parse(localStorage.getItem('shopfront-cart') || '[]') as CartLine[] } catch { return [] } })
  const navigate = useCallback((path: string) => { window.history.pushState({}, '', path); setRoute(readRoute()); window.scrollTo(0, 0) }, [])
  useEffect(() => { const pop = () => setRoute(readRoute()); window.addEventListener('popstate', pop); return () => window.removeEventListener('popstate', pop) }, [])
  useEffect(() => { localStorage.setItem('shopfront-cart', JSON.stringify(cart)) }, [cart])

  const cartCount = useMemo(() => cart.reduce((sum, line) => sum + line.quantity, 0), [cart])
  const addToCart = (product: Product) => setCart((current) => {
    const line = current.find((item) => item.product.id === product.id)
    return line ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { product, quantity: 1 }]
  })
  const changeQuantity = (id: number, amount: number) => setCart((current) => current.map((line) => line.product.id === id ? { ...line, quantity: line.quantity + amount } : line).filter((line) => line.quantity > 0))
  const openProduct = (id: number) => navigate(`/products/${id}`)

  return <><Header cartCount={cartCount} onHome={() => navigate('/')} onCart={() => navigate('/cart')} />
    {route.page === 'home' && <HomePage onOpenProduct={openProduct} onAddToCart={addToCart} />}
    {route.page === 'detail' && route.id && <DetailsPage id={route.id} onBack={() => navigate('/')} onAddToCart={addToCart} />}
    {route.page === 'cart' && <CartPage cart={cart} onOpenProduct={openProduct} onChangeQuantity={changeQuantity} onClear={() => setCart([])} onBrowse={() => navigate('/')} />}
  </>
}

export default App
