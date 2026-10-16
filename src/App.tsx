import { useCallback, useEffect, useState } from 'react'
import { BrandNavigation } from './components/home/brand-navigation'
import { CategoryGrid } from './components/home/category-grid'
import { HeroBanner } from './components/home/hero-banner'
import { HomeHighlights } from './components/home/home-highlights'
import { StoreFooter } from './components/layout/store-footer'
import { StoreHeader } from './components/layout/store-header'
import { ProductModal } from './components/products/product-modal'
import { ProductShowcase } from './components/products/product-showcase'
import { fetchProducts } from './data/products'
import type { Product } from './data/products'
import './styles/app.css'

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [loadAttempt, setLoadAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setIsLoading(true)
      setLoadError('')

      try {
        const catalog = await fetchProducts(controller.signal)
        setProducts(catalog.products)
      } catch (error) {
        if (controller.signal.aborted) return
        setLoadError(error instanceof Error ? error.message : 'Não foi possível carregar os produtos.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }

    void loadProducts()
    return () => controller.abort()
  }, [loadAttempt])

  const filteredProducts = products.filter((product) =>
    product.productName.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR')),
  )

  function addToCart(quantity: number) {
    setCartCount((currentCount) => currentCount + quantity)
    setSelectedProduct(null)
  }

  const closeProductModal = useCallback(() => setSelectedProduct(null), [])

  return (
    <main className="loja">
      <StoreHeader cartCount={cartCount} search={search} onSearchChange={setSearch} />
      <HeroBanner />
      <CategoryGrid />
      <div className="conteudo-principal" id="produtos">
        {loadError ? (
          <div className="mensagem-estado mensagem-estado--erro" role="alert">
            <p>{loadError}</p>
            <button type="button" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>Tentar novamente</button>
          </div>
        ) : isLoading ? (
          <p className="mensagem-estado" role="status">Carregando produtos...</p>
        ) : (
          <>
            <ProductShowcase products={filteredProducts} onSelectProduct={setSelectedProduct} showCategoryTabs />
            <HomeHighlights />
            <ProductShowcase
              products={filteredProducts}
              onSelectProduct={setSelectedProduct}
              showViewAll
            />
            <HomeHighlights variant="secondary" />
            <BrandNavigation />
            <ProductShowcase products={filteredProducts} onSelectProduct={setSelectedProduct} showViewAll />
          </>
        )}
      </div>

      <StoreFooter />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeProductModal} onAddToCart={addToCart} />
      )}
    </main>
  )
}

export default App
