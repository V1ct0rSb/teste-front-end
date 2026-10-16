# Loja Econverse

Loja virtual feita com React, TypeScript e Vite. A página apresenta categorias, produtos, destaques, marcas e formulário de newsletter.

## Executar localmente

```bash
npm install
npm run dev
```

## Comandos

- `npm run dev`: inicia o servidor de desenvolvimento.
- `npm run build`: valida TypeScript e gera a versão de produção.
- `npm run lint`: executa o ESLint.
- `npm run preview`: abre localmente a versão de produção.

## Estrutura

```text
src/
  assets/       imagens e ícones
  components/
    home/       seções da página inicial
    layout/     cabeçalho e rodapé
    products/   vitrine, cards e modal de produto
  data/         catálogo local e acesso aos produtos
  styles/       estilos globais e da aplicação
  App.tsx       composição da página e estado principal
  main.tsx      inicialização do React
```
