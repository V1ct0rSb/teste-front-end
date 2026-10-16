import { useMemo, useState } from 'react'
import type { Product } from '../../data/products'
import leftArrowIcon from '../../assets/Left.png'
import rightArrowIcon from '../../assets/Right.png'
import './product-showcase.css'
import { ProductCard } from './product-card'

interface ProductShowcaseProps {
  products: Product[]
  onSelectProduct: (product: Product) => void
  showCategoryTabs?: boolean
  showViewAll?: boolean
}

const productTabs = ['Celular', 'Acessórios', 'Tablets', 'Notebooks', 'TVs', 'Ver todos']

export function ProductShowcase({
  products,
  onSelectProduct,
  showCategoryTabs = false,
  showViewAll = false,
}: ProductShowcaseProps) {
  const [activeTab, setActiveTab] = useState('Celular')
  const [offset, setOffset] = useState(0)
  const visibleProducts = useMemo(() => {
    const matchingProducts = products.filter((product) => (
      activeTab === 'Ver todos' ||
      activeTab === 'Celular' ||
      product.productName.toLocaleLowerCase('pt-BR').includes(activeTab.toLocaleLowerCase('pt-BR'))
    ))

    if (matchingProducts.length === 0) return []
    const start = offset % matchingProducts.length
    return [...matchingProducts.slice(start), ...matchingProducts.slice(0, start)]
  }, [activeTab, offset, products])

  return (
    <section className="vitrine">
      <div className="titulo-secao">
        <span />
        <h2>Produtos relacionados</h2>
        <span />
      </div>

      {showCategoryTabs && (
        <div className="abas-produtos" role="tablist" aria-label="Categorias de produtos">
          {productTabs.map((tab) => (
            <button
              className={activeTab === tab ? 'aba-produto aba-produto--ativa' : 'aba-produto'}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setOffset(0)
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {showViewAll && <a className="vitrine__ver-todos" href="#produtos">Ver todos</a>}

      {visibleProducts.length > 0 ? (
        <div className="carrossel-produtos">
          <button
            className="seta-carrossel seta-carrossel--esquerda"
            type="button"
            aria-label="Produtos anteriores"
            disabled={offset === 0}
            onClick={() => setOffset((current) => Math.max(current - 1, 0))}
          >
            <img className="icone" src={leftArrowIcon} alt="" aria-hidden="true" />
          </button>
          <div className="grade-produtos">
            {visibleProducts.slice(0, 4).map((product) => (
              <ProductCard
                product={product}
                key={product.productName}
                onSelect={() => onSelectProduct(product)}
              />
            ))}
          </div>
          <button
            className="seta-carrossel seta-carrossel--direita"
            type="button"
            aria-label="Próximos produtos"
            disabled={visibleProducts.length <= 4}
            onClick={() => setOffset((current) => (current + 1) % visibleProducts.length)}
          >
            <img className="icone" src={rightArrowIcon} alt="" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <p className="mensagem-estado">Nenhum produto encontrado nesta categoria.</p>
      )}
    </section>
  )
}
