# SPS React - Sistema de Gerenciamento de Usuários

Uma aplicação React moderna para gerenciamento de usuários com autenticação JWT, controle de acesso baseado em funções e operações CRUD completas.

## 🚀 Funcionalidades

### Autenticação e Segurança

- ✅ Autenticação baseada em JWT com expiração de 24 horas
- ✅ Rotas protegidas com redirecionamento automático
- ✅ Controle de acesso baseado em funções (Admin/Usuário Padrão)
- ✅ Validação de formulários com React Hook Form

### Gerenciamento de Usuários (CRUD)

- ✅ Criar novos usuários (somente Admin)
- ✅ Visualizar listagem de usuários
- ✅ Editar usuários existentes (somente Admin)
- ✅ Excluir usuários (somente Admin)
- ✅ Validação de email duplicado
- ✅ Gerenciamento de tipos de usuário (Admin/Padrão)

### Interface do Usuário

- ✅ Design responsivo com interface limpa
- ✅ Notificações em tempo real usando React Toastify
- ✅ Suporte a múltiplos idiomas (Português, Inglês, Espanhol)
- ✅ Estados de carregamento e tratamento de erros
- ✅ Gerenciamento de estado baseado em Context API

## 🛠 Tecnologias Utilizadas

- **React.js 18** - Biblioteca de interface do usuário
- **React Router DOM** - Roteamento do lado do cliente
- **React Hook Form** - Gerenciamento de formulários
- **React Toastify** - Sistema de notificações
- **Axios** - Cliente HTTP para comunicação com a API
- **Context API** - Gerenciamento de estado global

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Backend SPS rodando em `http://localhost:3001`

## 🚀 Instalação e Configuração

### 1. Instalar Dependências

```bash
# Navegar para o diretório do projeto
cd test-sps-react

# Instalar dependências
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```env
REACT_APP_API_URL=http://localhost:3001
```

### 3. Executar a Aplicação

```bash
# Iniciar o servidor de desenvolvimento
npm start
```

A aplicação será iniciada em `http://localhost:3000`

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start

# Criar build de produção
npm run build

# Executar testes
npm test

# Ejetar configuração (irreversível)
npm run eject
```

## 🔐 Credenciais Padrão do Administrador

O sistema vem com uma conta de administrador pré-registrada:

- **Email:** `admin@sps.com`
- **Senha:** `admin123`

## 🌐 Suporte a Idiomas

A aplicação suporta três idiomas:

- **Português (pt-BR)** - Padrão
- **Inglês (en)**
- **Espanhol (es)**

O usuário pode alternar entre os idiomas usando o seletor no cabeçalho da aplicação.

## 🏗 Estrutura do Projeto

```
test-sps-react/
├── src/
│   ├── components/
│   │   ├── LanguageSwitcher.js    # Seletor de idiomas
│   │   ├── Layout.js              # Layout principal
│   │   ├── PrivateRoute.js        # Componente de rota protegida
│   │   └── UserForm.js            # Formulário de usuário
│   ├── contexts/
│   │   ├── AuthContext.js         # Contexto de autenticação
│   │   └── I18nContext.js         # Contexto de internacionalização
│   ├── pages/
│   │   ├── Home.js                # Página inicial
│   │   ├── SignIn.js              # Página de login
│   │   ├── Users.js               # Listagem de usuários
│   │   ├── UserCreate.js          # Criação de usuário
│   │   └── UserEdit.js            # Edição de usuário
│   ├── services/
│   │   └── UserService.js         # Serviços de API
│   ├── index.js                   # Ponto de entrada
│   └── routes.js                  # Configuração de rotas
├── package.json
└── README.md
```

## 🔗 Conexão com o Backend

Esta aplicação React consome a API do backend SPS. Certifique-se de que o backend esteja rodando em `http://localhost:3001` antes de iniciar o frontend.

### Endpoints Utilizados:

- `POST /auth/login` - Autenticação de usuário
- `GET /auth/profile` - Perfil do usuário atual
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `GET /users/:id` - Obter usuário por ID
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Excluir usuário

## 🔒 Funcionalidades de Segurança

1. **Autenticação JWT**: Tokens seguros com expiração automática
2. **Rotas Protegidas**: Redirecionamento automático para login quando não autenticado
3. **Controle de Acesso**: Operações administrativas restritas a usuários admin
4. **Validação de Formulários**: Validação completa no frontend
5. **Tratamento de Erros**: Feedback claro para o usuário em caso de erros

## 🎯 Funcionalidades por Tipo de Usuário

### Usuário Padrão

- ✅ Fazer login/logout
- ✅ Visualizar próprio perfil
- ✅ Visualizar lista de usuários

### Administrador

- ✅ Todas as funcionalidades do usuário padrão
- ✅ Criar novos usuários
- ✅ Editar usuários existentes
- ✅ Excluir usuários
- ✅ Gerenciar tipos de usuário

## 🚀 Deploy

Para fazer o deploy da aplicação:

```bash
# Criar build de produção
npm run build

# Os arquivos estarão na pasta 'build/'
# Configure seu servidor web para servir os arquivos estáticos
```

## 📞 Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento ou crie uma issue no repositório.

---

**Desenvolvido com ❤️ para o Sistema de Gerenciamento de Usuários SPS**
