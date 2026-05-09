# 🎬 Marquee API

> ⚠️ **Aviso:** Esta API foi criada exclusivamente para fins de estudo e prática de desenvolvimento backend. **Não deve ser consumida em produção ou por aplicações externas.**

---

## 📖 Sobre

A **Marquee API** é um projeto pessoal de prática, desenvolvido com o objetivo de aprender e consolidar conceitos de desenvolvimento backend com Node.js, Express, TypeScript e Prisma ORM.

Não há garantias de estabilidade, segurança ou disponibilidade. O projeto pode sofrer alterações a qualquer momento sem aviso prévio.

---

## 🛠️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [tsx](https://github.com/privatenumber/tsx)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js instalado
- PostgreSQL instalado e rodando

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/marquee.git

# Acesse a pasta
cd marquee

# Instale as dependências
npm install

# Configure o .env
cp .env.example .env
# Edite o .env com as credenciais do seu banco de dados
```

### Configuração do banco

```bash
# Gere o Prisma Client
npx prisma generate

# Caso queira sincronizar o schema com o banco
npx prisma db pull
```

### Rodando o servidor

```bash
npm run dev
```

O servidor será iniciado em `http://localhost:3000`.

---

## 📄 Documentação

A documentação dos endpoints está disponível via Swagger em:

```
http://localhost:3000/docs
```

### Endpoints disponíveis

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/movies` | Retorna todos os filmes |
| POST | `/movies` | Cria um novo filme |
| PUT | `/movies/:id` | Atualiza um filme existente |

---

## ⚙️ Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

---

## ⚠️ Disclaimer

Este projeto **não é uma API pública** e **não deve ser utilizado em produção**. Foi desenvolvido apenas para praticar conceitos de backend, como:

- Criação de rotas REST com Express
- Integração com banco de dados via Prisma
- Tipagem com TypeScript
- Documentação com Swagger
- Organização e versionamento de código com Git

---

## 👤 Autor

Desenvolvido por **Cledeocir Marafão** como projeto de aprendizado pessoal.