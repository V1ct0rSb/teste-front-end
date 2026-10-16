import banner from '../../assets/Banner.png'
import './hero-banner.css'

export function HeroBanner() {
  return (
    <section className="banner-principal" id="inicio" style={{ backgroundImage: `url(${banner})` }}>
      <div className="banner-principal__conteudo">
        <h1>Venha conhecer nossas<br />promoções</h1>
        <p><strong>50% Off</strong> nos produtos</p>
        <a className="botao-amarelo" href="#produtos">Ver produto</a>
      </div>
    </section>
  )
}
