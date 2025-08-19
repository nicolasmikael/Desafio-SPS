# SPS Server - API REST de Gerenciamento de Usuários (Backend)

Servidor Express.js robusto e seguro para gerenciamento de usuários, com autenticação JWT, controle de acesso baseado em funções, documentação Swagger e operações CRUD completas.

## 📋 Descrição do Projeto

API REST backend para o sistema de gerenciamento de usuários SPS, fornecendo endpoints seguros para autenticação e gerenciamento de usuários com persistência de dados em arquivo JSON e cache em memória.

## 🛠 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** - Framework web minimalista e flexível
- **JWT (jsonwebtoken)** - Autenticação baseada em tokens
- **bcryptjs** - Hash seguro de senhas
- **Swagger UI Express** - Documentação interativa da API
- **express-validator** - Validação de dados de entrada
- **cors** - Habilitação de CORS para requisições cross-origin
- **dotenv** - Gerenciamento de variáveis de ambiente
- **nodemon** - Hot reload durante desenvolvimento

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## 🚀 Instalação

### 1. Clonar o Repositório

```bash
git clone [url-do-repositorio]
cd test-sps-server
```

### 2. Instalar Dependências

```bash
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3001
JWT_SECRET=seu_jwt_secret_super_secreto_aqui
NODE_ENV=development
```

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor em modo desenvolvimento (com hot reload)
npm run dev

# Iniciar servidor em modo produção
npm start

# Executar testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com cobertura
npm run test:coverage
```

## 🧪 Testes

### Framework de Testes

O projeto migrou completamente de **Jest** para **Cypress** como framework de testes, oferecendo uma solução integrada para testes E2E, de componentes e de API.

### Framework de Testes

| Ambiente    | Framework | Tipos de Teste                   |
| ----------- | --------- | -------------------------------- |
| **Backend** | Cypress   | API Testing, Integration Testing |

### Estrutura dos Testes

```
test-sps-server/
├── cypress/
│   ├── e2e/                    # Testes de API
│   │   ├── auth-api.cy.js     # API de autenticação
│   │   └── users-api.cy.js    # API de usuários
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

- **Cypress API Testing** para testes de integração
- **Comandos customizados** para facilitar os testes
- **Fixtures** com dados de teste mockados
- **Configuração global** em `support/e2e.js`

### Scripts de Teste

```bash
# Abrir Cypress UI para desenvolvimento
npm run test:open

# Executar todos os testes em modo headless
npm test
```

### Tipos de Teste Implementados

#### 1. Testes de API

- **auth-api.cy.js**: Testa endpoints de autenticação
- **users-api.cy.js**: Testa endpoints de CRUD de usuários

#### 2. Testes de Integração

- **auth-api.cy.js**: Testa integração entre autenticação e JWT
- **users-api.cy.js**: Testa integração entre controllers, services e database

### Cobertura de Testes

O projeto mantém cobertura de testes para:

- **Endpoints de autenticação**: Login, JWT validation
- **CRUD de usuários**: GET, POST, PUT, DELETE
- **Validação de dados**: Campos obrigatórios, formatos
- **Autorização**: Permissões por tipo de usuário
- **Códigos de status**: 200, 201, 400, 401, 404, etc.
- **Estrutura de respostas**: JSON schema validation

### Execução em CI/CD

Os testes são executados automaticamente em:

- **Pull Requests**
- **Deploy pipelines**
- **Pre-commit hooks** (opcional)

### Comandos Customizados

#### Backend

```javascript
cy.apiLogin(); // Autenticação via API
cy.apiCreateUser(userData); // Criar usuário via API
cy.setupTestData(); // Preparar dados de teste
cy.validateUserResponse(); // Validar schema JSON
```

### Exemplos de Teste

#### Teste de Endpoint

```javascript
describe("POST /users", () => {
  it("should create user with valid data", () => {
    cy.apiLogin();
    cy.request({
      method: "POST",
      url: "/users",
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        type: "standard",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.user.name).to.eq("Test User");
    });
  });
});
```

#### Teste de Validação

```javascript
describe("POST /users", () => {
  it("should validate required fields", () => {
    cy.apiLogin();
    cy.request({
      method: "POST",
      url: "/users",
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: {
        name: "",
        email: "invalid-email",
        password: "123",
        type: "standard",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("errors");
    });
  });
});
```

### Debugging de Testes

Para debugar testes:

```bash
# Abrir Cypress UI
npm run test:open

# Executar testes em modo headless com logs
npm test -- --headed --no-exit
```

### Boas Práticas Implementadas

- ✅ **Isolamento**: Cada teste é independente
- ✅ **Cleanup**: Limpeza automática entre testes
- ✅ **Nomes descritivos**: Testes claros e específicos
- ✅ **AAA Pattern**: Arrange, Act, Assert
- ✅ **Edge cases**: Testes de cenários limite
- ✅ **Error handling**: Testes de tratamento de erros
- ✅ **Meaningful assertions**: Verificações específicas e claras

## 🏗 Estrutura do Projeto

```
test-sps-server/
├── data/
│   └── users.json               # Persistência de dados (auto-gerado)
├── src/
│   ├── config/
│   │   ├── swagger.js          # Configuração do Swagger UI
│   │   └── swagger.json        # Especificação OpenAPI/Swagger
│   ├── controllers/
│   │   ├── authController.js   # Controlador de autenticação
│   │   └── userController.js   # Controlador de usuários CRUD
│   ├── database/
│   │   ├── inMemoryDb.js       # Banco de dados em memória
│   │   └── persistence.js      # Sistema de persistência em arquivo
│   ├── middleware/
│   │   ├── auth.js             # Middleware de autenticação JWT
│   │   └── errorHandler.js    # Middleware de tratamento de erros
│   ├── services/
│   │   ├── authService.js      # Lógica de negócio de autenticação
│   │   ├── userService.js      # Lógica de negócio de usuários
│   │   └── index.js            # Exportação de serviços
│   ├── utils/
│   │   └── validators.js       # Funções de validação
│   ├── index.js                # Ponto de entrada da aplicação
│   └── routes.js               # Definição de rotas
├── .env                        # Variáveis de ambiente (não versionado)
├── .gitignore
├── package.json                # Dependências e scripts
└── README.md                   # Este arquivo
```

## 📚 Documentação da API (Swagger)

### Acessando a Documentação Interativa

A documentação completa da API está disponível através do Swagger UI:

1. **Inicie o servidor**:

```bash
npm run dev
```

2. **Acesse o Swagger UI**:

```
http://localhost:3001/api-docs
```

3. **Autenticação no Swagger**:
   - Faça login através do endpoint `/auth/login`
   - Copie o token JWT retornado
   - Clique no botão "Authorize" 🔒
   - Digite: `Bearer SEU_TOKEN_AQUI`
   - Agora você pode testar todos os endpoints protegidos

## 🔗 Visão Geral dos Endpoints

### Autenticação

| Método | Endpoint        | Descrição                           | Autenticação |
| ------ | --------------- | ----------------------------------- | ------------ |
| POST   | `/auth/login`   | Realizar login                      | Não          |
| GET    | `/auth/profile` | Obter perfil do usuário autenticado | Sim          |

### Gerenciamento de Usuários

| Método | Endpoint     | Descrição                | Autenticação | Permissão |
| ------ | ------------ | ------------------------ | ------------ | --------- |
| GET    | `/users`     | Listar todos os usuários | Sim          | Todos     |
| POST   | `/users`     | Criar novo usuário       | Sim          | Admin     |
| GET    | `/users/:id` | Obter usuário por ID     | Sim          | Todos     |
| PUT    | `/users/:id` | Atualizar usuário        | Sim          | Admin     |
| DELETE | `/users/:id` | Excluir usuário          | Sim          | Admin     |

### Health Check

| Método | Endpoint | Descrição               | Autenticação |
| ------ | -------- | ----------------------- | ------------ |
| GET    | `/`      | Verificar status da API | Não          |

## 🔐 Mecanismo de Autenticação

### JWT (JSON Web Token)

- **Algoritmo**: HS256
- **Expiração**: 24 horas
- **Header**: `Authorization: Bearer <token>`
- **Payload**: ID do usuário, email, tipo

### Fluxo de Autenticação

1. Cliente envia credenciais para `/auth/login`
2. Servidor valida credenciais
3. Servidor gera JWT com dados do usuário
4. Cliente armazena token
5. Cliente envia token em requisições subsequentes
6. Servidor valida token em rotas protegidas

## 💾 Persistência de Dados

### Abordagem Híbrida

O sistema utiliza uma abordagem de persistência em duas camadas:

1. **Cache em Memória** (`inMemoryDb.js`):

   - Acesso ultrarrápido
   - Estrutura de dados otimizada
   - Sincronização automática

2. **Persistência em Arquivo** (`persistence.js`):
   - Arquivo JSON: `data/users.json`
   - Salvamento automático em todas as operações
   - Recuperação ao iniciar servidor
   - Operações atômicas para prevenir corrupção

### Estrutura de Dados

```json
{
  "users": [
    {
      "id": 1,
      "name": "Administrator",
      "email": "admin@sps.com",
      "password": "$2a$10$...", // Hash bcrypt
      "type": "admin",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Reset de Dados

Para resetar o banco de dados:

```bash
# Parar o servidor
# Deletar o arquivo de dados
rm data/users.json

# Reiniciar o servidor (usuário admin será recriado)
npm run dev
```

## 🔒 Segurança

### Recursos Implementados

- **Hash de Senhas**: bcrypt com salt rounds configurável
- **Tokens JWT**: Assinatura segura e expiração
- **Validação de Entrada**: express-validator em todas as rotas
- **CORS Configurado**: Aceita requisições do frontend
- **Variáveis de Ambiente**: Dados sensíveis em .env
- **Tratamento de Erros**: Sem exposição de dados sensíveis
- **Rate Limiting**: Preparado para implementação futura

### Headers de Segurança

```javascript
// CORS habilitado para frontend
cors({
  origin: "http://localhost:3000",
  credentials: true,
});
```

## 🌐 Variáveis de Ambiente

| Variável     | Descrição              | Padrão      | Obrigatório |
| ------------ | ---------------------- | ----------- | ----------- |
| `PORT`       | Porta do servidor      | 3001        | Não         |
| `JWT_SECRET` | Chave secreta para JWT | -           | Sim         |
| `NODE_ENV`   | Ambiente de execução   | development | Não         |

## 👥 Tipos de Usuário e Permissões

### Usuário Padrão (standard)

- ✅ Fazer login
- ✅ Visualizar próprio perfil
- ✅ Listar usuários (somente leitura)
- ❌ Criar usuários
- ❌ Editar usuários
- ❌ Excluir usuários

### Administrador (admin)

- ✅ Todas as permissões do usuário padrão
- ✅ Criar novos usuários
- ✅ Editar qualquer usuário
- ✅ Excluir usuários
- ✅ Alterar tipo de usuário

## 🔐 Credenciais Padrão

### Administrador (Pré-cadastrado)

- **Email**: admin@sps.com
- **Senha**: admin123
- **Tipo**: admin

## 📊 Exemplos de Requisições

### Login

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@sps.com",
    "password": "admin123"
  }'
```

**Resposta de Sucesso (200)**:

```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "admin@sps.com",
    "name": "Administrator",
    "type": "admin"
  }
}
```

### Listar Usuários

```bash
curl -X GET http://localhost:3001/users \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### Criar Usuário

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "password": "senha123",
    "type": "standard"
  }'
```

## 🐛 Solução de Problemas

### Porta já em uso

**Erro**: `Error: listen EADDRINUSE: address already in use :::3001`

**Solução**:

```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Token JWT Inválido

**Erro**: `JsonWebTokenError: invalid signature`

**Solução**: Verifique se o JWT_SECRET no .env corresponde ao usado para gerar o token

### Arquivo de dados corrompido

**Erro**: `SyntaxError: Unexpected token in JSON`

**Solução**: Delete `data/users.json` e reinicie o servidor

### CORS bloqueado

**Erro**: `Access to fetch at 'http://localhost:3001' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solução**: Verifique se o frontend está rodando na porta 3000 ou ajuste a configuração CORS

## 🚀 Deploy

### Preparação para Produção

1. **Configurar variáveis de ambiente**:

```env
NODE_ENV=production
JWT_SECRET=chave_super_secreta_complexa_aqui
PORT=3001
```

2. **Instalar dependências de produção**:

```bash
npm ci --only=production
```

3. **Iniciar servidor**:

```bash
npm start
```

## 📈 Melhorias Futuras

- [ ] Implementar banco de dados real (PostgreSQL/MongoDB)
- [ ] Adicionar paginação nos endpoints de listagem
- [ ] Implementar verificação de email
- [ ] Adicionar recuperação de senha
- [ ] Implementar upload de avatar
- [ ] Adicionar logs estruturados
- [ ] Adicionar métricas e monitoramento
