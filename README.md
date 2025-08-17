# Sistema de Gerenciamento de Usuários SPS

Uma aplicação completa de gerenciamento de usuários com autenticação JWT, controle de acesso baseado em funções e operações CRUD completas. O sistema é composto por um frontend React moderno e um backend Express RESTful com persistência de dados em arquivo JSON.

## 🏗 Arquitetura do Sistema

```
sps/
├── test-sps-react/     # Aplicação frontend React
└── test-sps-server/    # API backend Express
```

- **Frontend**: React 18 com Context API, React Router, React Hook Form e React Toastify
- **Backend**: Node.js com Express, autenticação JWT, bcrypt para hash de senhas e documentação Swagger
- **Persistência**: Dados armazenados em `test-sps-server/data/users.json` com cache em memória

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## 📁 Estrutura do Projeto

```
sps/
├── test-sps-react/
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── contexts/       # Contextos de autenticação e internacionalização
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── services/       # Serviços de API
│   │   ├── index.js        # Ponto de entrada
│   │   └── routes.js       # Configuração de rotas
│   ├── package.json
│   └── README.md
└── test-sps-server/
    ├── src/
    │   ├── controllers/    # Controladores de autenticação e usuários
    │   ├── database/       # Persistência e cache em memória
    │   ├── middleware/     # Middleware de autenticação
    │   ├── utils/          # Validadores
    │   ├── config/         # Configuração do Swagger
    │   ├── index.js        # Ponto de entrada
    │   └── routes.js       # Configuração de rotas
    ├── data/
    │   └── users.json      # Dados persistentes
    ├── package.json
    └── readme.md
```

## 🚀 Instalação

### 1. Instalar Dependências

```bash
# Instalar dependências do backend
cd test-sps-server
npm install

# Instalar dependências do frontend (em outro terminal)
cd test-sps-react
npm install
```

### 2. Configurar Variáveis de Ambiente

**Backend** (`test-sps-server/.env`):

```env
PORT=3001
JWT_SECRET=seu_jwt_secret_aqui
NODE_ENV=development
```

**Frontend** (`test-sps-react/.env` - opcional):

```env
REACT_APP_API_URL=http://localhost:3001
```

## ▶️ Como Rodar Localmente

### 1. Iniciar o Backend

```bash
cd test-sps-server
npm run dev
```

O servidor estará disponível em `http://localhost:3001`

### 2. Iniciar o Frontend

```bash
cd test-sps-react
npm start
```

A aplicação estará disponível em `http://localhost:3000`

## 📚 Endpoints da API (Resumo)

A documentação completa está disponível via Swagger UI em `http://localhost:3001/api-docs` quando o backend estiver rodando.

### Autenticação

- `POST /auth/login` - Login do usuário
- `GET /auth/profile` - Perfil do usuário autenticado

### Gerenciamento de Usuários

- `GET /users` - Listar todos os usuários
- `POST /users` - Criar novo usuário (somente admin)
- `GET /users/{id}` - Obter usuário por ID
- `PUT /users/{id}` - Atualizar usuário (somente admin)
- `DELETE /users/{id}` - Excluir usuário (somente admin)

## 🔐 Credenciais Padrão

Administrador:

- **Email:** `admin@sps.com`
- **Senha:** `admin123`

## 💾 Persistência de Dados

Os dados são armazenados em `test-sps-server/data/users.json` com cache em memória. Para resetar todos os dados, exclua este arquivo e reinicie o servidor.

## 📝 Scripts Úteis

### Backend

```bash
npm run dev    # Iniciar servidor com hot reload
npm start      # Iniciar servidor em modo produção
```

### Frontend

```bash
npm start      # Iniciar servidor de desenvolvimento
npm run build  # Criar build de produção
```

## 📝 Notas de Desenvolvimento

- Rotas protegidas redirecionam automaticamente para login quando não autenticadas
- Controle de acesso baseado em funções (Admin/Usuário Padrão)
- Suporte a múltiplos idiomas (Português, Inglês, Espanhol)
- Validação de formulários no frontend e backend
- Tratamento de erros abrangente em ambas as aplicações

## 🚀 Melhorias Futuras

- Persistência em banco de dados (MongoDB/PostgreSQL)
- Permissões avançadas de usuário
- Fotos de perfil
- Verificação de email
- Reset de senha
- Testes unitários e de integração
- Containerização Docker

## 📞 Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento.
