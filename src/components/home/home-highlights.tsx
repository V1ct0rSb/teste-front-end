import parceiros from '../../assets/Parceiros.png'
import './home-highlights.css'

interface HomeHighlightsProps {
  variant?: 'primary' | 'secondary'
}

export function HomeHighlights({ variant = 'primary' }: HomeHighlightsProps) {
  const parcerias = ['Parceiros', 'Parceiros']

  return (
    <section className={`destaques-parceiros${variant === 'secondary' ? ' destaques-parceiros--secundarios' : ''}`} aria-label="Destaques da loja">
      {parcerias.map((titulo, index) => (
        <a
          className={`banner-parceiro banner-parceiro--${index + 1}`}
          href="#produtos"
          key={`${titulo}-${index}`}
        >
          <img className="banner-parceiro__imagem" src={parceiros} alt="" />
          <span className="banner-parceiro__texto">
            <strong>{titulo}</strong>
            <span>Lorem ipsum dolor sit<br />amet, consectetur</span>
            <span className="botao-amarelo">CONFIRA</span>
          </span>
        </a>
      ))}
    </section>
  )
}
