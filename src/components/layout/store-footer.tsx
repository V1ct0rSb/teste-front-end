import { useState, type FormEvent } from 'react'
import logo from '../../assets/Logo.png'
import facebookIcon from '../../assets/facebook.png'
import instagramIcon from '../../assets/instagram.png'
import linkedinIcon from '../../assets/linkedin.png'
import './store-footer.css'

export function StoreFooter() {
  const [newsletterMessage, setNewsletterMessage] = useState('')

  function inscreverNaNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNewsletterMessage('Dados validados. Conecte o formulário ao serviço de newsletter para concluir o cadastro.')
  }

  return (
    <footer className="rodape">
      <section className="newsletter" aria-labelledby="titulo-newsletter">
        <div className="newsletter__conteudo">
          <div className="newsletter__texto">
            <h2 id="titulo-newsletter">Inscreva-se na nossa newsletter</h2>
            <p>Assine a nossa newsletter e receba as novidades e conteúdos exclusivos da Econverse.</p>
          </div>
          <form className="formulario-newsletter" onSubmit={inscreverNaNewsletter}>
            <div className="formulario-newsletter__campos">
              <label className="sr-only" htmlFor="nome-newsletter">Digite seu nome</label>
              <input id="nome-newsletter" name="name" placeholder="Digite seu nome" required />
              <label className="sr-only" htmlFor="email-newsletter">Digite seu e-mail</label>
              <input id="email-newsletter" name="email" type="email" placeholder="Digite seu e-mail" required />
              <button className="botao-amarelo" type="submit">INSCREVER</button>
            </div>
            <label className="aceite-termos">
              <input type="checkbox" required />
              <span>Aceito os termos e condições</span>
            </label>
          </form>
        </div>
        {newsletterMessage && <p className="newsletter__mensagem" role="status">{newsletterMessage}</p>}
      </section>

      <div className="rodape__principal">
        <div className="rodape__conteudo">
          <div className="rodape__marca">
            <a href="#inicio" aria-label="Econverse - voltar ao início">
              <img src={logo} alt="Econverse" />
            </a>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <div className="rodape__redes">
              <a href="https://www.instagram.com/" aria-label="Instagram"><img src={instagramIcon} alt="" /></a>
              <a href="https://www.facebook.com/" aria-label="Facebook"><img src={facebookIcon} alt="" /></a>
              <a href="https://www.linkedin.com/" aria-label="LinkedIn"><img src={linkedinIcon} alt="" /></a>
            </div>
          </div>
          <nav className="rodape__links" aria-label="Links do rodapé">
            <div>
              <h3>Institucional</h3>
              <a href="#inicio">Sobre Nós</a>
              <a href="#inicio">Movimento</a>
              <a href="#inicio">Trabalhe conosco</a>
            </div>
            <div>
              <h3>Ajuda</h3>
              <a href="#inicio">Suporte</a>
              <a href="#inicio">Fale Conosco</a>
              <a href="#inicio">Perguntas Frequentes</a>
            </div>
            <div>
              <h3>Termos</h3>
              <a href="#inicio">Termos e Condições</a>
              <a href="#inicio">Política de Privacidade</a>
              <a href="#inicio">Troca e Devolução</a>
            </div>
          </nav>
        </div>
      </div>

      <div className="rodape__assinatura">
        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
      </div>
    </footer>
  )
}