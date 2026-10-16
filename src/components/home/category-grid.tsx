import bebidasIcon from '../../assets/Bebida_Icon.png'
import ferramentasIcon from '../../assets/Ferramenta_Icon.png'
import modaIcon from '../../assets/Moda_Icon.png'
import supermercadoIcon from '../../assets/Mercado_Icon.png'
import saudeIcon from '../../assets/Saude_Icon.png'
import esportesIcon from '../../assets/Sport_Icon.png'
import tecnologiaIcon from '../../assets/Pc_Icon.png'
import './category-grid.css'

const categories = [
  { name: 'Tecnologia', icon: tecnologiaIcon },
  { name: 'Supermercado', icon: supermercadoIcon },
  { name: 'Bebidas', icon: bebidasIcon },
  { name: 'Ferramentas', icon: ferramentasIcon },
  { name: 'Saúde', icon: saudeIcon },
  { name: 'Esportes e Fitness', icon: esportesIcon },
  { name: 'Moda', icon: modaIcon },
]

export function CategoryGrid() {
  return (
    <nav className="atalhos-categorias" aria-label="Compre por categoria">
      {categories.map(({ name, icon }) => (
        <a className="atalho-categoria" href="#produtos" key={name}>
          <span className={`atalho-categoria__icone${name === 'Tecnologia' ? ' atalho-categoria__icone--ativo' : ''}`}>
            <img src={icon} alt="" aria-hidden="true" />
          </span>
          <span>{name}</span>
        </a>
      ))}
    </nav>
  )
}
