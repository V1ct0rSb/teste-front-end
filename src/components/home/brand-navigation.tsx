import logo from '../../assets/Logo.png'
import './brand-navigation.css'

export function BrandNavigation() {
  return (
    <section className="marcas" aria-labelledby="titulo-marcas">
      <h2 id="titulo-marcas">Navegue por marcas</h2>
      <div className="marcas__lista">
        {Array.from({ length: 5 }, (_, index) => (
          <a className="marca" href="#produtos" key={index} aria-label={`Conheça a marca Econverse ${index + 1}`}>
            <img src={logo} alt="Econverse" />
          </a>
        ))}
      </div>
    </section>
  )
}
