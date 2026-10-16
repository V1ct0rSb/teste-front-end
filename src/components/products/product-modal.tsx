import { useEffect, useRef, useState } from 'react'
import decreaseIcon from '../../assets/Min.png'
import increaseIcon from '../../assets/Max.png'
import type { Product } from '../../data/products'
import { ProductImage } from './product-image'
import './product-modal.css'

interface ProductModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (quantity: number) => void
}

const moedaBrasileira = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const closeButton = useRef<HTMLButtonElement>(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const elementoAnterior = document.activeElement
    const overflowAnterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()

    function fecharComEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', fecharComEscape)
    return () => {
      window.removeEventListener('keydown', fecharComEscape)
      document.body.style.overflow = overflowAnterior
      if (elementoAnterior instanceof HTMLElement) elementoAnterior.focus()
    }
  }, [onClose])

  return (
    <div
      className="modal-fundo"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section className="modal-produto" role="dialog" aria-modal="true" aria-labelledby="modal-produto-titulo">
        <button className="modal-produto__fechar" type="button" aria-label="Fechar detalhes do produto" onClick={onClose} ref={closeButton}>
          ×
        </button>
        <div className="modal-produto__imagem">
          <ProductImage source={product.photo} alt={product.productName} loading="eager" />
        </div>
        <div className="modal-produto__informacoes">
          <p className="modal-produto__categoria">Tecnologia</p>
          <h2 id="modal-produto-titulo">{product.productName.toUpperCase()}</h2>
          <p className="modal-produto__preco">{moedaBrasileira.format(product.price)}</p>
          <p className="modal-produto__descricao">{product.descriptionShort}</p>
          <a className="modal-produto__mais-detalhes" href="#produtos" onClick={onClose}>Veja mais detalhes do produto &gt;</a>
          <div className="modal-produto__acoes">
            <div className="seletor-quantidade" aria-label="Quantidade do produto">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                disabled={quantity <= 1}
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <img className="icone" src={decreaseIcon} alt="" aria-hidden="true" />
              </button>
              <span aria-live="polite">{String(quantity).padStart(2, '0')}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantity((current) => current + 1)}
              >
                <img className="icone" src={increaseIcon} alt="" aria-hidden="true" />
              </button>
            </div>
            <button className="botao-comprar modal-produto__comprar" type="button" onClick={() => onAddToCart(quantity)}>
              COMPRAR
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
