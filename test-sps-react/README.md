# SPS React - Sistema de Gerenciamento de Usuários (Frontend)

Aplicação React moderna para gerenciamento de usuários com autenticação JWT, controle de acesso baseado em funções e operações CRUD completas. Construída com React 18, Tailwind CSS, React Router e Context API.

## 📋 Descrição do Projeto

Frontend React para o sistema de gerenciamento de usuários SPS, oferecendo uma interface moderna e responsiva para administração de usuários, com autenticação segura e internacionalização.

## 🛠 Tecnologias Utilizadas

- **React.js 18** - Biblioteca principal para construção da interface
- **Tailwind CSS** - Framework CSS para estilização responsiva
- **React Router DOM v6** - Gerenciamento de rotas e navegação
- **Context API** - Gerenciamento de estado global (autenticação e i18n)
- **React Hook Form** - Gerenciamento e validação de formulários
- **React Toastify** - Sistema de notificações toast
- **Axios** - Cliente HTTP para comunicação com a API
- **JavaScript ES6+** - Linguagem de programação

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn
- Backend SPS rodando em `http://localhost:3001`

## 🚀 Instalação

### 1. Clonar o Repositório

```bash
git clone [url-do-repositorio]
cd test-sps-react
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente (Opcional)

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=http://localhost:3001
```

Se não configurado, o padrão é `http://localhost:3001`.

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start
# Aplicação será aberta em http://localhost:3000

# Criar build de produção
npm run build
# Os arquivos otimizados serão gerados na pasta build/

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage

# Ejetar configuração (irreversível)
npm run eject
```

## 🧪 Testes

### Framework de Testes

O projeto migrou completamente de **Jest** para **Cypress** como framework de testes, oferecendo uma solução integrada para testes E2E, de componentes e de API.

### Framework de Testes

| Ambiente     | Framework | Tipos de Teste         |
| ------------ | --------- | ---------------------- |
| **Frontend** | Cypress   | E2E, Component Testing |

### Estrutura dos Testes

```
test-sps-react/
├── cypress/
│   ├── e2e/                    # Testes End-to-End
│   │   ├── auth.cy.js         # Autenticação
│   │   └── users.cy.js        # Gestão de usuários
│   ├── component/              # Testes de Componentes
│   │   └── UserForm.cy.js     # Formulário de usuário
│   ├── fixtures/              # Dados mockados
│   │   ├── auth.json         # Dados de autenticação
│   │   └── users.json        # Lista de usuários
│   └── support/              # Configurações
│       ├── commands.js       # Comandos customizados
│       └── e2e.js           # Setup global
├── package.json              # Scripts e dependências de teste
└── README.md                 # Esta documentação
```

### Configuração

Os testes estão configurados com:

- **Cypress Component Testing** para testes de componentes React
- **Cypress E2E Testing** para testes de ponta a ponta
- **Comandos customizados** para facilitar os testes
- **Fixtures** com dados de teste mockados
- **Intercepts de API** para mock de endpoints

### Scripts de Teste

```bash
# Abrir Cypress UI para desenvolvimento
npm run test:open

# Executar todos os testes em modo headless
npm test

# Executar apenas testes E2E
npm run cy:e2e

# Executar apenas testes de componentes
npm run cy:component
```

### Tipos de Teste Implementados

#### 1. Testes E2E (End-to-End)

- **auth.cy.js**: Testa fluxo de autenticação (login/logout)
- **users.cy.js**: Testa gestão de usuários via interface

#### 2. Testes de Componentes

- **UserForm.cy.js**: Testa componente de formulário de usuário

#### 3. Testes de API (via intercepts)

- **auth.cy.js**: Testa endpoints de autenticação
- **users.cy.js**: Testa endpoints de gestão de usuários

### Estratégias de Teste

#### Testes E2E

```javascript
// Exemplo de teste E2E
describe("Users Management", () => {
  it("should create user successfully", () => {
    cy.login();
    cy.navigateToUsers();
    cy.createUser({ name: "Test User", email: "test@example.com" });
    cy.contains("Test User").should("be.visible");
  });
});
```

#### Testes de Componentes

```javascript
// Exemplo de teste de componente
describe("UserForm", () => {
  it("should validate required fields", () => {
    cy.mount(<UserForm isEdit={false} />);
    cy.get("button").contains("Create User").click();
    cy.contains("Name is required").should("be.visible");
  });
});
```

#### Mock de API

```javascript
// Exemplo de mock de API
cy.intercept("POST", "/users", {
  statusCode: 201,
  body: { user: { id: 999, name: "Mocked User", email: "mock@example.com" } },
}).as("createUser");
cy.wait("@createUser");
```

### Cobertura de Testes

O projeto mantém cobertura de testes para:

- **Autenticação**: Login/logout, validações, sessões
- **Gestão de usuários**: CRUD completo via interface
- **Formulários**: Validações, estados, interações
- **Navegação**: Rotas protegidas, redirecionamentos
- **Internacionalização**: Troca de idiomas
- **Componentes**: Props, estados, renderização

### Comandos Customizados

#### Frontend

```javascript
cy.login(); // Login automático
cy.createUser(userData); // Criar usuário via UI
cy.navigateToUsers(); // Navegar para página
cy.setupApiIntercepts(); // Mock APIs
```

### Execução em Desenvolvimento

Durante o desenvolvimento, use o Cypress UI:

```bash
npm run test:open
```

Este modo:

- ✅ Oferece interface visual para executar testes
- ✅ Permite debugar testes passo a passo
- ✅ Mostra logs e snapshots do DOM
- ✅ Permite filtrar testes por nome

### Debugging de Testes

Para debugar testes:

```bash
# Abrir Cypress UI
npm run test:open

# Executar testes em modo headless com logs
npm test -- --headed --no-exit
```

### Boas Práticas Implementadas

- ✅ **Queries semânticas**: Usar `getByRole`, `getByLabelText`
- ✅ **waitFor**: Aguardar atualizações assíncronas
- ✅ **User events**: Simular interações reais do usuário
- ✅ **Accessibility**: Testar elementos acessíveis
- ✅ **Isolation**: Cada teste é independente
- ✅ **Cleanup**: Limpeza automática entre testes
- ✅ **Meaningful assertions**: Verificações específicas e claras

### Exemplos de Teste por Categoria

#### Teste de Form

```javascript
test("should submit form with valid data", async () => {
  const user = userEvent.setup();
  render(<UserForm />);

  await user.type(screen.getByLabelText(/name/i), "John Doe");
  await user.type(screen.getByLabelText(/email/i), "john@example.com");
  await user.click(screen.getByRole("button", { name: /create/i }));

  expect(mockCreateUser).toHaveBeenCalledWith({
    name: "John Doe",
    email: "john@example.com",
  });
});
```

#### Teste de Navigation

```javascript
test("should navigate to users page", async () => {
  const user = userEvent.setup();
  render(<Layout />);

  await user.click(screen.getByRole("link", { name: /users/i }));

  expect(mockNavigate).toHaveBeenCalledWith("/users");
});
```

#### Teste de API Error

```javascript
test("should display error message on API failure", async () => {
  UserService.list.mockRejectedValue(new Error("Network error"));

  render(<Users />);

  await waitFor(() => {
    expect(screen.getByText(/network error/i)).toBeInTheDocument();
  });
});
```

### CI/CD Integration

Os testes são executados automaticamente em:

- **Pull Requests**
- **Deploy pipelines**
- **Pre-commit hooks** (opcional)

Comando para CI:

```bash
# Executar testes em modo headless
npm test
```

## 🏗 Estrutura do Projeto

```
test-sps-react/
├── public/
│   ├── index.html           # Template HTML principal
│   ├── favicon.ico          # Ícone da aplicação
│   └── manifest.json        # Manifesto PWA
├── src/
│   ├── components/
│   │   ├── LanguageSwitcher.js   # Seletor de idiomas
│   │   ├── Layout.js             # Layout principal com navegação
│   │   ├── PrivateRoute.js       # Componente de rota protegida
│   │   └── UserForm.js           # Formulário reutilizável de usuário
│   ├── contexts/
│   │   ├── AuthContext.js        # Contexto de autenticação (login, logout, token)
│   │   └── I18nContext.js        # Contexto de internacionalização
│   ├── pages/
│   │   ├── Home.js               # Página inicial/dashboard
│   │   ├── SignIn.js             # Página de login
│   │   ├── Users.js              # Listagem de usuários
│   │   ├── UserCreate.js         # Criação de novo usuário
│   │   └── UserEdit.js           # Edição de usuário existente
│   ├── services/
│   │   └── UserService.js        # Serviço de comunicação com API
│   ├── index.css                 # Estilos globais e Tailwind
│   ├── index.js                  # Ponto de entrada da aplicação
│   └── routes.js                 # Configuração de rotas
├── .gitignore
├── package.json                  # Dependências e scripts
├── tailwind.config.js           # Configuração do Tailwind CSS
├── postcss.config.js            # Configuração do PostCSS
└── README.md                    # Este arquivo
```

## 🚀 Funcionalidades Principais

### Autenticação

- Login com email e senha
- Autenticação via JWT com expiração de 24 horas
- Armazenamento seguro do token no localStorage
- Logout com limpeza de sessão
- Redirecionamento automático para login quando não autenticado
- Persistência de sessão entre recarregamentos

### Gerenciamento de Usuários (CRUD)

- **Listagem**: Visualização de todos os usuários cadastrados
- **Criação**: Adicionar novos usuários (Admin apenas)
- **Edição**: Atualizar informações de usuários (Admin apenas)
- **Exclusão**: Remover usuários do sistema (Admin apenas)
- **Validações**: Email único, campos obrigatórios

### Internacionalização (i18n)

- Suporte a 3 idiomas:
  - Português (pt-BR) - padrão
  - Inglês (en)
  - Espanhol (es)
- Troca de idioma em tempo real
- Persistência da preferência no localStorage

### Interface do Usuário

- Design responsivo com Tailwind CSS
- Tema claro e moderno
- Notificações toast para feedback de ações
- Estados de carregamento durante requisições
- Tratamento de erros com mensagens claras
- Navegação intuitiva com menu lateral

## 🔗 Endpoints da API Conectados

O frontend se conecta aos seguintes endpoints do backend:

### Autenticação

- `POST /auth/login` - Realizar login
- `GET /auth/profile` - Obter perfil do usuário autenticado

### Usuários

- `GET /users` - Listar todos os usuários
- `POST /users` - Criar novo usuário
- `GET /users/:id` - Obter usuário específico
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Excluir usuário

## 🔒 Segurança

- Autenticação JWT com Bearer Token
- Rotas protegidas com verificação de autenticação
- Controle de acesso baseado em funções (RBAC)
- Validação de formulários no cliente
- Sanitização de dados antes do envio
- Tratamento seguro de erros sem expor informações sensíveis

## 🌐 Variáveis de Ambiente

| Variável            | Descrição               | Padrão                  |
| ------------------- | ----------------------- | ----------------------- |
| `REACT_APP_API_URL` | URL base da API backend | `http://localhost:3001` |

## 👥 Tipos de Usuário e Permissões

### Usuário Padrão (standard)

- ✅ Fazer login/logout
- ✅ Visualizar próprio perfil
- ✅ Visualizar lista de usuários
- ❌ Criar novos usuários
- ❌ Editar usuários
- ❌ Excluir usuários

### Administrador (admin)

- ✅ Todas as permissões do usuário padrão
- ✅ Criar novos usuários
- ✅ Editar qualquer usuário
- ✅ Excluir usuários
- ✅ Alterar tipo de usuário

## 🔐 Credenciais de Teste

### Administrador

- **Email**: admin@admin.com
- **Senha**: admin123

## 🐛 Solução de Problemas

### Erro de CORS

**Problema**: Requisições bloqueadas por CORS
**Solução**: Verifique se o backend está rodando em `http://localhost:3001`

### Token Expirado

**Problema**: Erro 401 Unauthorized
**Solução**: Faça login novamente para obter um novo token

### Página em Branco

**Problema**: Aplicação não carrega
**Solução**: Verifique o console do navegador e certifique-se que todas as dependências foram instaladas

## 🚀 Deploy

### Build de Produção

```bash
# Gerar build otimizado
npm run build

# Testar build localmente
npx serve -s build
```

## 🔄 Atualizações Futuras

- [ ] Implementar upload de foto de perfil
- [ ] Adicionar paginação na listagem de usuários
- [ ] Implementar busca e filtros avançados
- [ ] Adicionar tema escuro
- [ ] Implementar recuperação de senha
- [ ] Adicionar autenticação com redes sociais
