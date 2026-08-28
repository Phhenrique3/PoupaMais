# Poupa+

Aplicação para organização financeira pessoal. Nesta etapa, o projeto oferece cadastro, login, sessão protegida e consulta/edição do próprio perfil. A parte principal do produto — categorias e lançamentos financeiros — ainda está em desenvolvimento.

## Tecnologias

**Backend**
- Node.js + Express 5 (TypeScript)
- Prisma ORM + PostgreSQL
- JWT (jsonwebtoken) + bcrypt

**Frontend**
- React + Vite
- React Router
- Tailwind CSS

## Estrutura do projeto

```
apps/backend/       # API Express (TypeScript)
  src/
    controllers/
    services/
    models/
    routes/
    middlewares/
    DTOs/
prisma/              # schema e migrations do banco de dados
web/frontend/        # aplicação React
  src/
    pages/
    components/
    services/
```

## Requisitos

- Node.js 20+
- PostgreSQL configurado e acessível

## Configuração

1. Crie um arquivo `.env` na raiz do projeto com base no `.env.example`, preenchendo:
   - `DATABASE_URL` — string de conexão do PostgreSQL
   - `DIRECT_URL` — conexão direta ao banco, usada pelas migrations do Prisma
   - `JWT_SECRET` — chave secreta usada para assinar os tokens JWT
   - `JWT_EXPIRES` — tempo de expiração do token em segundos (opcional, padrão `86400`)
   - `FRONTEND_URL` — origem liberada no CORS (opcional, padrão `http://localhost:5173`)
2. Instale as dependências na raiz: `npm install`.
3. Instale as dependências do frontend: `npm install --prefix web/frontend`.
4. Aplique as migrations: `npx prisma migrate deploy`.

## Executar

`npm run dev` inicia o backend (`http://localhost:3001`) e o frontend (`http://localhost:5173`) juntos.

## Rotas atuais da API

| Método | Rota | Autenticação | Descrição |
|---|---|---|---|
| POST | `/api/auth/register` | - | Cria uma conta |
| POST | `/api/auth/login` | - | Autentica e retorna um token JWT |
| GET | `/api/auth/me` | Bearer token | Retorna os dados do usuário logado |
| PATCH | `/api/auth/me` | Bearer token | Atualiza nome, e-mail e/ou senha |

## Próximos passos

- Modelagem de categorias e lançamentos financeiros no banco de dados
- CRUD de categorias e de lançamentos
- Dashboard com dados reais (hoje é apenas uma tela de boas-vindas pós-login)
- Metas, orçamentos e lançamentos recorrentes
