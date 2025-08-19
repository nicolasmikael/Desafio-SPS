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

O projeto utiliza **Jest** como framework principal para testes unitários, com **Supertest** para testes de integração da API.

### Estrutura dos Testes

```
test-sps-server/
├── src/
│   ├── controllers/
│   │   ├── __tests__/
│   │   │   ├── userController.test.js
│   │   │   └── authController.test.js
│   ├── services/
│   │   ├── __tests__/
│   │   │   ├── userService.test.js
│   │   │   └── authService.test.js
│   ├── utils/
│   │   └── __tests__/
│   │       └── validators.test.js
│   └── middleware/
│       └── __tests__/
│           └── auth.test.js
├── jest.config.js              # Configuração do Jest
└── package.json                # Scripts de teste
```

### Configuração

O Jest está configurado com:

- **Ambiente Node.js** para testes de backend
- **Cobertura de código** com limite mínimo de 70%
- **Timeout** de 10 segundos para testes assíncronos
- **Mocks automáticos** para dependências externas

### Scripts de Teste

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (desenvolvimento)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

### Tipos de Teste Implementados

#### 1. Testes de Controladores

- **userController.test.js**: Testa endpoints de CRUD de usuários
- **authController.test.js**: Testa endpoints de autenticação

```javascript
// Exemplo de teste de controlador
describe("UserController", () => {
  it("should create a user successfully", async () => {
    // Test implementation
  });
});
```

#### 2. Testes de Serviços

- **userService.test.js**: Testa lógica de negócio de usuários
- **authService.test.js**: Testa lógica de autenticação e JWT

#### 3. Testes de Utilitários

- **validators.test.js**: Testa funções de validação de dados

#### 4. Testes de Middleware

- **auth.test.js**: Testa middleware de autenticação JWT

### Cobertura de Testes

O sistema visa manter pelo menos **70% de cobertura** em:

- **Linhas de código** (statements)
- **Branches** (condicionais)
- **Funções**
- **Statements**

Para visualizar o relatório de cobertura:

```bash
npm run test:coverage
# Abre o relatório em coverage/lcov-report/index.html
```

### Execução em CI/CD

Os testes são executados automaticamente em:

- **Pre-commit hooks** (opcional)
- **Pull requests**
- **Deploy pipelines**

### Mocks e Fixtures

O projeto utiliza mocks para:

- **Banco de dados** - Mock do inMemoryDb
- **JWT tokens** - Mock do jsonwebtoken
- **Requisições HTTP** - Mock das dependências

### Exemplos de Teste

#### Teste de Endpoint

```javascript
describe("POST /users", () => {
  it("should create user with valid data", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      type: "standard",
    };

    const response = await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${validToken}`)
      .send(userData)
      .expect(201);

    expect(response.body.user.name).toBe("Test User");
  });
});
```

#### Teste de Serviço

```javascript
describe("UserService", () => {
  it("should validate email uniqueness", async () => {
    const userData = { email: "existing@example.com" };

    await expect(userService.createUser(userData)).rejects.toThrow(
      "Email already exists"
    );
  });
});
```

### Debugging de Testes

Para debugar testes individuais:

```bash
# Executar teste específico
npm test -- --testNamePattern="should create user"

# Executar arquivo específico
npm test userController.test.js

# Modo verbose para mais detalhes
npm test -- --verbose
```

### Boas Práticas Implementadas

- ✅ **Isolamento**: Cada teste é independente
- ✅ **Mocks**: Dependências externas são mockadas
- ✅ **Cleanup**: Estado limpo entre testes
- ✅ **Nomes descritivos**: Testes claros e específicos
- ✅ **AAA Pattern**: Arrange, Act, Assert
- ✅ **Edge cases**: Testes de cenários limite
- ✅ **Error handling**: Testes de tratamento de erros

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

### Plataformas de Deploy

- **Heroku**: Com Procfile
- **AWS EC2**: Com PM2
- **Docker**: Dockerfile disponível
- **Vercel/Netlify**: Para serverless functions

## 📈 Melhorias Futuras

- [ ] Implementar banco de dados real (PostgreSQL/MongoDB)
- [ ] Adicionar paginação nos endpoints de listagem
- [ ] Implementar rate limiting
- [ ] Adicionar refresh tokens
- [ ] Implementar verificação de email
- [ ] Adicionar recuperação de senha
- [ ] Implementar upload de avatar
- [ ] Adicionar logs estruturados
- [ ] Implementar testes unitários e de integração
- [ ] Adicionar WebSockets para real-time
- [ ] Implementar cache com Redis
- [ ] Adicionar métricas e monitoramento

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com a equipe de desenvolvimento.

---

**Desenvolvido com ❤️ para o Sistema de Gerenciamento de Usuários SPS**
