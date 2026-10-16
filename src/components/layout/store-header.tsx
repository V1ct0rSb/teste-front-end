import logo from '../../assets/Logo.png'
import creditCardIcon from '../../assets/CreditCard.png'
import shieldCheckIcon from '../../assets/ShieldCheck.png'
import truckIcon from '../../assets/Truck.png'
import './store-header.css'

interface StoreHeaderProps {
  cartCount: number
  search: string
  onSearchChange: (value: string) => void
}

export function StoreHeader({ cartCount, search, onSearchChange }: StoreHeaderProps) {
  const categoriasMenu = [
    'Todas categorias',
    'Supermercado',
    'Livros',
    'Moda',
    'Lançamentos',
    'Ofertas do dia',
    'Assinatura',
  ]

  return (
    <div className="topo-container">
      <div className="faixa-beneficios">
        <div className="faixa-beneficios__conteudo">
          <span>
            <img className="icone" src={shieldCheckIcon} alt="" aria-hidden="true" /> Compra <strong>100% segura</strong>
          </span>
          <span>
            <img className="icone" src={truckIcon} alt="" aria-hidden="true" /> <strong>Frete grátis</strong> acima de R$ 200
          </span>
          <span>
            <img className="icone" src={creditCardIcon} alt="" aria-hidden="true" /> <strong>Parcele</strong> suas compras
          </span>
        </div>
      </div>

      <header className="cabecalho">
        <a className="cabecalho__logo" href="#inicio" aria-label="Econverse - início">
          <img src={logo} alt="Econverse" />
        </a>
        <label className="busca">
          <span className="sr-only">Buscar produtos</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="O que você está buscando?"
          />
        </label>
        <div className="cabecalho__acoes">
          <button type="button" aria-label="Pedidos">
          </button>
          <button type="button" aria-label="Favoritos">
          </button>
          <button type="button" aria-label="Minha conta">
          </button>
          <button
            type="button"
            className="acao-carrinho"
            aria-label={`Carrinho com ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}
          >
            {cartCount > 0 && <span className="contador-carrinho">{cartCount}</span>}
          </button>
        </div>
      </header>

      <nav className="menu-principal" aria-label="Categorias principais">
        {categoriasMenu.map((categoria) => (
          <a
            key={categoria}
            className={categoria === 'Ofertas do dia' ? 'menu-principal__destaque' : ''}
            href="#produtos"
          >
            {categoria}
          </a>
        ))}
      </nav>
    </div>
  )
}