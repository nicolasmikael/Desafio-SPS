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

O projeto utiliza **Jest** com **React Testing Library** para testes unitários e de integração de componentes React.

### Bibliotecas de Teste Incluídas

- **Jest** - Framework de testes JavaScript
- **@testing-library/react** - Utilitários para testes de componentes React
- **@testing-library/jest-dom** - Matchers customizados para Jest
- **@testing-library/user-event** - Simulação de eventos de usuário

### Estrutura dos Testes

```
test-sps-react/
├── src/
│   ├── components/
│   │   └── __tests__/
│   │       ├── UserForm.test.js
│   │       ├── Layout.test.js
│   │       └── LanguageSwitcher.test.js
│   ├── contexts/
│   │   └── __tests__/
│   │       └── AuthContext.test.js
│   ├── services/
│   │   └── __tests__/
│   │       └── UserService.test.js
│   ├── pages/
│   │   └── __tests__/
│   │       ├── SignIn.test.js
│   │       └── Users.test.js
│   └── setupTests.js           # Configuração global dos testes
├── package.json                # Scripts e dependências de teste
└── README.md                   # Esta documentação
```

### Configuração

Os testes estão configurados com:

- **React Testing Library** para renderização de componentes
- **Mock Service Worker (MSW)** para mock de APIs (quando necessário)
- **Mocks automáticos** para localStorage, window.matchMedia, etc.
- **Setup global** em `setupTests.js`

### Scripts de Teste

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (recomendado para desenvolvimento)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

### Tipos de Teste Implementados

#### 1. Testes de Componentes

- **UserForm.test.js**: Testa formulário de usuário (criação e edição)
- **Layout.test.js**: Testa layout principal e navegação
- **LanguageSwitcher.test.js**: Testa seletor de idiomas

```javascript
// Exemplo de teste de componente
describe("UserForm", () => {
  it("should validate required fields", async () => {
    render(<UserForm isEdit={false} />);
    fireEvent.click(screen.getByText("Create User"));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
  });
});
```

#### 2. Testes de Contextos

- **AuthContext.test.js**: Testa contexto de autenticação e estado global

#### 3. Testes de Serviços

- **UserService.test.js**: Testa comunicação com API e tratamento de erros

#### 4. Testes de Páginas

- **SignIn.test.js**: Testa página de login e validações
- **Users.test.js**: Testa listagem e operações CRUD

### Estratégias de Teste

#### Renderização de Componentes

```javascript
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
);

test("renders component", () => {
  render(<Component />, { wrapper: TestWrapper });
});
```

#### Simulação de Eventos

```javascript
import userEvent from "@testing-library/user-event";

test("handles user interaction", async () => {
  const user = userEvent.setup();
  render(<Component />);

  await user.type(screen.getByLabelText(/email/i), "test@example.com");
  await user.click(screen.getByRole("button", { name: /submit/i }));
});
```

#### Mock de Dependências

```javascript
// Mock de serviços
jest.mock("../services/UserService");

// Mock de hooks
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));
```

### Cobertura de Testes

O projeto mantém cobertura de teste para:

- **Componentes React** - Renderização e interações
- **Hooks customizados** - Lógica de estado
- **Serviços de API** - Requisições HTTP
- **Contextos** - Estado global da aplicação
- **Páginas** - Fluxos de usuário completos

Para visualizar relatório de cobertura:

```bash
npm run test:coverage
# Relatório disponível em coverage/lcov-report/index.html
```

### Mocks Globais Configurados

No arquivo `setupTests.js`:

```javascript
// Mock do matchMedia para componentes responsivos
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock do localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;
```

### Execução em Desenvolvimento

Durante o desenvolvimento, use o modo watch:

```bash
npm run test:watch
```

Este modo:

- ✅ Executa apenas testes relacionados a arquivos modificados
- ✅ Re-executa automaticamente quando arquivos mudam
- ✅ Permite filtrar testes por padrão
- ✅ Oferece interface interativa

### Debugging de Testes

Para debugar testes:

```bash
# Executar teste específico
npm test -- --testNamePattern="should validate email"

# Executar arquivo específico
npm test UserForm.test.js

# Modo verbose
npm test -- --verbose

# Watch com cobertura
npm test -- --coverage --watchAll
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
npm run test:coverage -- --coverage --watchAll=false
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

- **Email**: admin@sps.com
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

### Hospedagem

A aplicação pode ser hospedada em:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Qualquer servidor de arquivos estáticos

## 📊 Performance

- Lazy loading de componentes
- Code splitting automático
- Otimização de imagens
- Minificação de CSS e JavaScript
- Cache de requisições com Axios

## 🔄 Atualizações Futuras

- [ ] Implementar upload de foto de perfil
- [ ] Adicionar paginação na listagem de usuários
- [ ] Implementar busca e filtros avançados
- [ ] Adicionar tema escuro
- [ ] Implementar PWA completo
- [ ] Adicionar testes unitários e E2E
- [ ] Implementar recuperação de senha
- [ ] Adicionar autenticação com redes sociais

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para o Sistema de Gerenciamento de Usuários SPS**
