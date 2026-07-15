# Site Portfólio — Dados, Automação e IA

Site portfólio de consultoria em dados, automação e IA aplicada (Power BI, Power Platform, Python), com estudos de caso demonstrativos baseados em empresas fictícias e dados sintéticos.

## Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- Conteúdo dos cases em MDX (`content/cases/`)
- Deploy na [Vercel](https://vercel.com) + Vercel Analytics

## Rodando localmente

Pré-requisito: Node.js 20+.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Build de produção

```bash
npm run build
npm start
```

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `app/` | Rotas e layouts (App Router) |
| `components/` | Componentes reutilizáveis |
| `content/cases/` | Estudos de caso em MDX |
| `public/` | Assets estáticos (og-images, screenshots, llms.txt) |
| `lab/` | Scripts Python, datasets sintéticos e specs dos cases — **excluída do deploy** via `.vercelignore` |

## Notas

- O deploy é automático via integração GitHub → Vercel (push na `main` publica em produção).
- Todos os estudos de caso usam empresas fictícias e dados sintéticos, sempre rotulados como tal.

Plano completo do projeto: [PLANO_PROJETO.md](PLANO_PROJETO.md).
