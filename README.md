# Poupa+

Aplicação para organização financeira pessoal. Nesta etapa, o projeto oferece cadastro, login, sessão protegida e consulta/edição do próprio perfil.

## Requisitos

- Node.js 20+
- PostgreSQL configurado e acessível

## Configuração

1. Copie `.env.example` para `.env` e preencha as credenciais do banco e uma chave JWT segura.
2. Instale as dependências na raiz: `npm install`.
3. Instale as dependências do frontend: `npm install --prefix web/frontend`.
4. Aplique as migrations: `npx prisma migrate deploy`.

## Executar

Use `npm run dev` para iniciar backend (`http://localhost:3001`) e frontend (`http://localhost:5173`).

## Rotas atuais da API

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (Bearer token)
- `PATCH /api/auth/me` (Bearer token)
