# SPS Server - API de Gerenciamento de Usuários

Uma API REST robusta e segura construída com Node.js e Express para gerenciamento de usuários, com autenticação JWT, controle de acesso baseado em funções e operações CRUD completas.

## 🚀 Funcionalidades

### Autenticação e Segurança

- ✅ Autenticação baseada em JWT com expiração de 24 horas
- ✅ Hash seguro de senhas usando bcrypt
- ✅ Middleware de autenticação para rotas protegidas
- ✅ Controle de acesso baseado em funções (Admin/Usuário Padrão)
- ✅ Validação de entrada no frontend e backend

### Gerenciamento de Usuários (CRUD)

- ✅ Criar novos usuários (somente Admin)
- ✅ Listar usuários com design pronto para paginação
- ✅ Editar usuários existentes (somente Admin)
- ✅ Excluir usuários (somente Admin)
- ✅ Validação de email duplicado
- ✅ Gerenciamento de tipos de usuário (Admin/Padrão)

### Recursos do Backend

- ✅ Design de API RESTful
- ✅ Armazenamento persistente em arquivo JSON com cache em memória
- ✅ Usuário administrador pré-cadastrado
- ✅ Tratamento abrangente de erros
- ✅ Middleware de validação de requisições
- ✅ Configuração CORS
- ✅ Arquitetura estruturada com separação de responsabilidades
- ✅ Documentação Swagger UI interativa

## 🛠 Tecnologias Utilizadas

- **Node.js** - Ambiente de execução
- **Express.js** - Framework web
- **JWT** - Tokens de autenticação
- **bcryptjs** - Hash de senhas
- **express-validator** - Validação de entrada
- **cors** - Compartilhamento de recursos entre origens
- **dotenv** - Variáveis de ambiente
- **swagger-ui-express** - Documentação interativa da API
- **nodemon** - Desenvolvimento com hot reload

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- npm ou yarn

## 🚀 Instalação e Configuração

### 1. Instalar Dependências

```bash
# Navegar para o diretório do servidor
cd test-sps-server

# Instalar dependências
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3001
JWT_SECRET=seu_jwt_secret_aqui
NODE_ENV=development
```

### 3. Executar o Servidor

```bash
# Iniciar o servidor de desenvolvimento (com hot reload)
npm run dev

# Ou iniciar o servidor em modo produção
npm start
```

O servidor será iniciado em `http://localhost:3001`

## 📝 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento com nodemon
npm run dev

# Iniciar servidor em modo produção
npm start

# Executar testes (se configurados)
npm test
```

## 🔐 Credenciais Padrão do Administrador

O sistema vem com uma conta de administrador pré-registrada:

- **Email:** `admin@sps.com`
- **Senha:** `admin123`
- **Tipo:** `admin`

## 📚 Documentação da API com Swagger

### Acessando a Documentação

A documentação completa da API está disponível através do Swagger UI no endpoint `/api-docs`. A documentação é **publicamente acessível**, mas a autenticação JWT é necessária para testar endpoints protegidos.

#### Passo 1: Iniciar o Servidor

```bash
cd test-sps-server
npm run dev
```

O servidor será iniciado em `http://localhost:3001`

#### Passo 2: Acessar a Documentação Swagger

Navegue para `http://localhost:3001/api-docs` no seu navegador. Nenhuma autenticação é necessária para visualizar a documentação.

#### Passo 3: Obter Token de Autenticação (para testar endpoints protegidos)

Para testar endpoints protegidos, você precisa obter um token JWT fazendo login. Você pode fazer isso diretamente da interface Swagger:

1. **Encontre o endpoint de login**: Procure por `POST /auth/login` na seção "Authentication"
2. **Clique em "Try it out"**
3. **Digite as credenciais** no corpo da requisição:

```json
{
  "email": "admin@sps.com",
  "password": "admin123"
}
```

4. **Execute** a requisição
5. **Copie o token** da resposta

#### Passo 4: Autorizar no Swagger UI

Uma vez que você tenha o token JWT:

1. **Autorizar**: Clique no botão "Authorize" (🔒) no canto superior direito do Swagger UI
2. **Digite o Token**: No campo "bearerAuth", digite: `Bearer SEU_JWT_TOKEN_AQUI`
3. **Autorizar**: Clique em "Authorize" e depois "Close"
4. **Testar Endpoints**: Agora você pode testar todos os endpoints protegidos da API diretamente do Swagger UI

### Endpoints da API

#### Verificação de Saúde

- **GET** `/` - Verificar se a API está funcionando (público)

#### Autenticação

- **POST** `/auth/login` - Login do usuário (público)
- **GET** `/auth/profile` - Obter perfil do usuário (protegido)

#### Gerenciamento de Usuários

- **GET** `/users` - Listar todos os usuários (protegido)
- **POST** `/users` - Criar novo usuário (somente admin)
- **GET** `/users/{id}` - Obter usuário por ID (protegido)
- **PUT** `/users/{id}` - Atualizar usuário (somente admin)
- **DELETE** `/users/{id}` - Excluir usuário (somente admin)

### Exemplos de Uso

#### Autenticação

```bash
# Login
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@sps.com","password":"admin123"}'
```

**Resposta:**

```json
{
  "message": "Login successful",
  "token": "jwt_token_aqui",
  "user": {
    "id": 1,
    "email": "admin@sps.com",
    "name": "Administrator",
    "type": "admin",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Listar Usuários

```bash
# Listar usuários (substitua TOKEN pelo JWT real)
curl -X GET http://localhost:3001/users \
  -H "Authorization: Bearer TOKEN"
```

#### Criar Usuário

```bash
# Criar usuário (substitua TOKEN pelo JWT real)
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "password": "senha123",
    "type": "standard"
  }'
```

## 🏗 Estrutura do Projeto

```
test-sps-server/
├── src/
│   ├── controllers/
│   │   ├── authController.js      # Controlador de autenticação
│   │   └── userController.js      # Controlador de usuários
│   ├── database/
│   │   ├── inMemoryDb.js          # Banco de dados em memória
│   │   └── persistence.js         # Persistência em arquivo
│   ├── middleware/
│   │   └── auth.js                # Middleware de autenticação
│   ├── utils/
│   │   └── validators.js          # Validadores de entrada
│   ├── config/
│   │   ├── swagger.js             # Configuração do Swagger
│   │   └── swagger.json           # Especificação da API
│   ├── index.js                   # Ponto de entrada
│   └── routes.js                  # Configuração de rotas
├── data/
│   └── users.json                 # Dados persistentes (auto-gerado)
├── package.json
├── .env
└── README.md
```

## 💾 Persistência de Dados

### Armazenamento Híbrido

- **Cache em Memória**: Para acesso rápido durante a execução
- **Persistência em Arquivo**: Dados salvos em `data/users.json`
- **Salvamento Automático**: Todas as operações (criar, atualizar, excluir) são salvas automaticamente
- **Recuperação de Dados**: Os dados persistem entre reinicializações do servidor
- **Operações Atômicas**: Operações de arquivo seguras previnem corrupção de dados

### Localização dos Dados

- **Local de Armazenamento**: `test-sps-server/data/users.json`
- **Reset de Dados**: Exclua `test-sps-server/data/users.json` para resetar todos os usuários

## 🔒 Funcionalidades de Segurança

1. **Autenticação JWT**: Autenticação segura baseada em tokens com expiração
2. **Hash de Senhas**: Todas as senhas são hasheadas usando bcrypt com salt rounds
3. **Validação de Entrada**: Validação abrangente no cliente e servidor
4. **Rotas Protegidas**: Todas as rotas requerem autenticação
5. **Controle de Acesso Baseado em Funções**: Operações administrativas são adequadamente restritas
6. **Configuração CORS**: Configuração adequada de compartilhamento de recursos entre origens

## 🎯 Funções de Usuário e Permissões

### Usuário Padrão

- ✅ Fazer login/logout
- ✅ Visualizar próprio perfil
- ✅ Visualizar lista de usuários (somente leitura)

### Administrador

- ✅ Todas as funcionalidades do usuário padrão
- ✅ Criar novos usuários
- ✅ Editar usuários existentes
- ✅ Excluir usuários
- ✅ Gerenciar tipos de usuário

## 🔧 Solução de Problemas

### Não consegue acessar /api-docs

- **Problema**: Recebendo 401 Unauthorized
- **Solução**: Certifique-se de incluir o token JWT no cabeçalho Authorization

### Token expirado

- **Problema**: Recebendo erros de autenticação
- **Solução**: Faça login novamente para obter um token JWT novo

### Servidor não inicia

- **Problema**: Servidor falha ao iniciar
- **Solução**: Certifique-se de que todas as dependências estão instaladas (`npm install`) e a porta 3001 está disponível

### Erro de CORS

- **Problema**: Erro de CORS ao acessar do frontend
- **Solução**: Verifique se o frontend está rodando na porta 3000 (configurada no CORS)

## 🚀 Deploy

Para fazer deploy da aplicação:

```bash
# Instalar dependências de produção
npm install --production

# Configurar variáveis de ambiente de produção
# Definir NODE_ENV=production

# Iniciar servidor
npm start
```

## 📈 Melhorias Futuras

- Persistência em banco de dados (MongoDB/PostgreSQL)
- Permissões avançadas de usuário
- Fotos de perfil de usuário
- Verificação de email
- Funcionalidade de reset de senha
- Log de auditoria
- Testes unitários e de integração
- Containerização Docker
- Rate limiting
- Paginação avançada

## 📞 Suporte

Para suporte ou dúvidas, entre em contato com a equipe de desenvolvimento ou crie uma issue no repositório.

---

**Desenvolvido com ❤️ para o Sistema de Gerenciamento de Usuários SPS**
