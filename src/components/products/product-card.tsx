import type { Product } from '../../data/products'
import { ProductImage } from './product-image'
import './product-card.css'

interface ProductCardProps {
  product: Product
  onSelect: () => void
}

const moedaBrasileira = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const precoAntigo = product.price * 1.07
  const valorParcela = product.price / 2

  return (
    <article className="cartao-produto">
      <button
        className="cartao-produto__detalhes"
        type="button"
        aria-label={`Ver detalhes de ${product.productName}`}
        onClick={onSelect}
      >
        <span className="cartao-produto__imagem">
          <ProductImage source={product.photo} alt={product.productName} />
        </span>
        <span className="cartao-produto__descricao">{product.descriptionShort}</span>
        <span className="cartao-produto__bloco-preco">
          <span className="cartao-produto__preco-antigo">{moedaBrasileira.format(precoAntigo)}</span>
          <span className="cartao-produto__preco">{moedaBrasileira.format(product.price)}</span>
        </span>
        <span className="cartao-produto__parcelamento">
          ou 2x de {moedaBrasileira.format(valorParcela)} sem juros
        </span>
        <span className="cartao-produto__frete">Frete grátis</span>
      </button>
      <button className="botao-comprar" type="button" onClick={onSelect}>
        COMPRAR
      </button>
    </article>
  )
}