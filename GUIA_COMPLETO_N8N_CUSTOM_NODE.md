# Guia Completo: Criando um Custom Node n8n para Qualquer API

Este guia completo ensina como criar um custom node n8n do zero para integrar qualquer API, baseado na experiência real de desenvolvimento do `@devanthonymax/n8n-nodes-corbeegestao`.

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração do Projeto](#configuração-do-projeto)
3. [Estrutura de Arquivos](#estrutura-de-arquivos)
4. [Implementação das Credenciais](#implementação-das-credenciais)
5. [Implementação do Node](#implementação-do-node)
6. [Configuração do Build](#configuração-do-build)
7. [Ícones Personalizados](#ícones-personalizados)
8. [Testes e Validação](#testes-e-validação)
9. [Publicação no NPM](#publicação-no-npm)
10. [Problemas Comuns e Soluções](#problemas-comuns-e-soluções)

## 🔧 Pré-requisitos

### Software Necessário
- **Node.js** >= 18.10
- **npm** ou **pnpm** >= 8.6
- **TypeScript** knowledge
- **n8n** instalado para testes

### Conhecimentos Recomendados
- TypeScript/JavaScript
- APIs RESTful
- Conceitos de autenticação (JWT, Basic Auth, etc.)
- n8n basics

## 🏗️ Configuração do Projeto

### 1. Inicialização do Projeto

```bash
# Criar diretório do projeto
mkdir n8n-node-minha-api
cd n8n-node-minha-api

# Inicializar npm
npm init -y

# Instalar dependências
npm install --save-dev @types/node @typescript-eslint/parser eslint eslint-plugin-n8n-nodes-base n8n-workflow prettier typescript
```

### 2. Configuração do package.json

```json
{
  "name": "@seuusuario/n8n-nodes-minhaapi",
  "version": "1.0.0",
  "description": "n8n community node for Minha API integration",
  "keywords": [
    "n8n-community-node-package",
    "minha-api",
    "api-integration"
  ],
  "license": "MIT",
  "author": {
    "name": "Seu Nome",
    "email": "seu@email.com"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/seuusuario/n8n-node-minha-api.git"
  },
  "engines": {
    "node": ">=18.10",
    "pnpm": ">=8.6"
  },
  "main": "index.js",
  "scripts": {
    "build": "tsc && find nodes -name '*.svg' -exec cp {} dist/nodes/MinhaApi/ \\;",
    "dev": "tsc --watch",
    "format": "prettier nodes credentials --write",
    "lint": "eslint nodes/**/*.ts credentials/**/*.ts package.json",
    "lintfix": "eslint nodes credentials package.json --fix",
    "prepublishOnly": "npm run build && npm run lint"
  },
  "files": [
    "dist"
  ],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": [
      "dist/credentials/MinhaApiCredentials.credentials.js"
    ],
    "nodes": [
      "dist/nodes/MinhaApi/MinhaApi.node.js"
    ]
  },
  "devDependencies": {
    "@types/node": "^18.16.16",
    "@typescript-eslint/parser": "^5.45.0",
    "eslint": "^8.29.0",
    "eslint-plugin-n8n-nodes-base": "^1.11.0",
    "n8n-workflow": "^1.0.0",
    "prettier": "^2.7.1",
    "typescript": "^4.8.4"
  },
  "peerDependencies": {
    "n8n-workflow": "*"
  }
}
```

### 3. Configuração do TypeScript (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2019",
    "module": "commonjs",
    "lib": ["ES2019"],
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "noImplicitOverride": true,
    "alwaysStrict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "exactOptionalPropertyTypes": false,
    "noImplicitUseStrict": false,
    "noPropertyAccessFromIndexSignature": false,
    "noUncheckedIndexedAccess": false
  },
  "include": [
    "credentials/**/*",
    "nodes/**/*"
  ],
  "exclude": [
    "node_modules/**/*",
    "dist/**/*"
  ]
}
```

## 📁 Estrutura de Arquivos

```
n8n-node-minha-api/
├── credentials/
│   └── MinhaApiCredentials.credentials.ts
├── nodes/
│   └── MinhaApi/
│       ├── MinhaApi.node.ts
│       └── minhaapi.svg
├── dist/                           # Gerado pelo build
├── package.json
├── tsconfig.json
├── README.md
└── .eslintrc.js
```

## 🔐 Implementação das Credenciais

### 1. Arquivo de Credenciais (credentials/MinhaApiCredentials.credentials.ts)

```typescript
import type {
  ICredentialDataDecryptedObject,
  ICredentialTestRequest,
  ICredentialType,
  IHttpRequestOptions,
  INodeProperties,
} from "n8n-workflow";

export class MinhaApiCredentials implements ICredentialType {
  name = "minhaApiCredentials";
  displayName = "Minha API Credentials";
  documentationUrl = "https://docs.minhaapi.com";
  
  properties: INodeProperties[] = [
    {
      displayName: "Base URL",
      name: "baseUrl",
      type: "string",
      default: "https://api.minhaapi.com",
      description: "Base URL da API",
      required: true,
    },
    {
      displayName: "API Key",
      name: "apiKey",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      description: "API Key para autenticação",
      required: true,
    },
    {
      displayName: "Username",
      name: "username",
      type: "string",
      default: "",
      description: "Nome de usuário para login",
      required: true,
    },
    {
      displayName: "Password",
      name: "password",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      description: "Senha para login",
      required: true,
    },
  ];

  async authenticate(
    credentials: ICredentialDataDecryptedObject,
    requestOptions: IHttpRequestOptions
  ): Promise<IHttpRequestOptions> {
    // Implementar lógica de autenticação
    // Exemplo para JWT:
    const { baseUrl, username, password } = credentials;
    
    // Fazer login para obter token
    const loginResponse = await this.helpers.request({
      method: "POST",
      url: `${baseUrl}/auth/login`,
      body: {
        username,
        password,
      },
      json: true,
    });

    const token = loginResponse.token;

    // Adicionar token ao cabeçalho
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Bearer ${token}`,
    };

    return requestOptions;
  }

  test: ICredentialTestRequest = {
    request: {
      baseURL: "={{$credentials.baseUrl}}",
      url: "/auth/validate",
      method: "GET",
    },
  };
}
```

### 2. Exemplo para Diferentes Tipos de Autenticação

#### JWT Authentication
```typescript
async authenticate(credentials: ICredentialDataDecryptedObject, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
  const { baseUrl, username, password } = credentials;
  
  const loginResponse = await this.helpers.request({
    method: "POST",
    url: `${baseUrl}/auth/login`,
    body: { username, password },
    json: true,
  });

  requestOptions.headers = {
    ...requestOptions.headers,
    Authorization: `Bearer ${loginResponse.token}`,
  };

  return requestOptions;
}
```

#### API Key Authentication
```typescript
async authenticate(credentials: ICredentialDataDecryptedObject, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
  const { apiKey } = credentials;
  
  requestOptions.headers = {
    ...requestOptions.headers,
    'X-API-Key': apiKey,
  };

  return requestOptions;
}
```

#### Basic Authentication
```typescript
async authenticate(credentials: ICredentialDataDecryptedObject, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
  const { username, password } = credentials;
  
  const token = Buffer.from(`${username}:${password}`).toString('base64');
  
  requestOptions.headers = {
    ...requestOptions.headers,
    Authorization: `Basic ${token}`,
  };

  return requestOptions;
}
```

## 🚀 Implementação do Node

### 1. Estrutura Básica do Node (nodes/MinhaApi/MinhaApi.node.ts)

```typescript
import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeConnectionType, NodeOperationError } from "n8n-workflow";

export class MinhaApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Minha API",
    name: "minhaApi",
    icon: "file:minhaapi.svg",
    group: ["transform"],
    version: 1,
    description: "Integração com Minha API",
    defaults: {
      name: "Minha API",
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    usableAsTool: true,
    credentials: [
      {
        name: "minhaApiCredentials",
        required: true,
      },
    ],
    properties: [
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "List Users",
            value: "listUsers",
            description: "Lista todos os usuários",
            action: "List users",
          },
          {
            name: "Get User",
            value: "getUser",
            description: "Obtém usuário por ID",
            action: "Get user",
          },
          {
            name: "Create User",
            value: "createUser",
            description: "Cria novo usuário",
            action: "Create user",
          },
          {
            name: "Update User",
            value: "updateUser",
            description: "Atualiza usuário existente",
            action: "Update user",
          },
          {
            name: "Delete User",
            value: "deleteUser",
            description: "Deleta usuário",
            action: "Delete user",
          },
        ],
        default: "listUsers",
      },
      // Campos condicionais para cada operação
      {
        displayName: "User ID",
        name: "userId",
        type: "string",
        default: "",
        description: "ID do usuário",
        displayOptions: {
          show: {
            operation: ["getUser", "updateUser", "deleteUser"],
          },
        },
      },
      {
        displayName: "User Name",
        name: "userName",
        type: "string",
        default: "",
        description: "Nome do usuário",
        displayOptions: {
          show: {
            operation: ["createUser", "updateUser"],
          },
        },
      },
      {
        displayName: "User Email",
        name: "userEmail",
        type: "string",
        default: "",
        description: "Email do usuário",
        displayOptions: {
          show: {
            operation: ["createUser", "updateUser"],
          },
        },
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];
    const credentials = await this.getCredentials("minhaApiCredentials");
    const operation = this.getNodeParameter("operation", 0);

    const baseUrl = credentials.baseUrl as string;
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    for (let i = 0; i < items.length; i++) {
      try {
        let responseData;

        if (operation === "listUsers") {
          responseData = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "minhaApiCredentials",
            {
              method: "GET",
              url: `${baseUrl}/api/users`,
              headers,
              json: true,
            }
          );
        } else if (operation === "getUser") {
          const userId = this.getNodeParameter("userId", i) as string;
          responseData = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "minhaApiCredentials",
            {
              method: "GET",
              url: `${baseUrl}/api/users/${userId}`,
              headers,
              json: true,
            }
          );
        } else if (operation === "createUser") {
          const userName = this.getNodeParameter("userName", i) as string;
          const userEmail = this.getNodeParameter("userEmail", i) as string;
          
          responseData = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "minhaApiCredentials",
            {
              method: "POST",
              url: `${baseUrl}/api/users`,
              headers,
              body: {
                name: userName,
                email: userEmail,
              },
              json: true,
            }
          );
        } else if (operation === "updateUser") {
          const userId = this.getNodeParameter("userId", i) as string;
          const userName = this.getNodeParameter("userName", i) as string;
          const userEmail = this.getNodeParameter("userEmail", i) as string;
          
          responseData = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "minhaApiCredentials",
            {
              method: "PUT",
              url: `${baseUrl}/api/users/${userId}`,
              headers,
              body: {
                name: userName,
                email: userEmail,
              },
              json: true,
            }
          );
        } else if (operation === "deleteUser") {
          const userId = this.getNodeParameter("userId", i) as string;
          
          responseData = await this.helpers.httpRequestWithAuthentication.call(
            this,
            "minhaApiCredentials",
            {
              method: "DELETE",
              url: `${baseUrl}/api/users/${userId}`,
              headers,
              json: true,
            }
          );
        }

        const executionData = this.helpers.constructExecutionMetaData(
          this.helpers.returnJsonArray(responseData),
          { itemData: { item: i } }
        );

        returnData.push(...executionData);
      } catch (error) {
        if (this.continueOnFail()) {
          const executionData = this.helpers.constructExecutionMetaData(
            this.helpers.returnJsonArray({ error: error.message }),
            { itemData: { item: i } }
          );
          returnData.push(...executionData);
          continue;
        }
        throw new NodeOperationError(this.getNode(), error as Error, {
          itemIndex: i,
        });
      }
    }

    return [returnData];
  }
}
```

### 2. Campos Dinâmicos e Condicionais

```typescript
// Exemplo de campo que carrega opções dinamicamente
{
  displayName: "Project",
  name: "projectId",
  type: "options",
  typeOptions: {
    loadOptionsMethod: "getProjects",
  },
  default: "",
  description: "Selecione um projeto",
  displayOptions: {
    show: {
      operation: ["createTask"],
    },
  },
},

// Método para carregar opções
async getProjects(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
  const credentials = await this.getCredentials("minhaApiCredentials");
  const baseUrl = credentials.baseUrl as string;
  
  const projects = await this.helpers.httpRequestWithAuthentication.call(
    this,
    "minhaApiCredentials",
    {
      method: "GET",
      url: `${baseUrl}/api/projects`,
      json: true,
    }
  );

  return projects.map((project: any) => ({
    name: project.name,
    value: project.id,
  }));
}
```

### 3. Tratamento de Erros

```typescript
try {
  responseData = await this.helpers.httpRequestWithAuthentication.call(
    this,
    "minhaApiCredentials",
    {
      method: "GET",
      url: `${baseUrl}/api/users`,
      headers,
      json: true,
    }
  );
} catch (error) {
  if (this.continueOnFail()) {
    const executionData = this.helpers.constructExecutionMetaData(
      this.helpers.returnJsonArray({ 
        error: error.message,
        statusCode: error.statusCode,
        operation: operation 
      }),
      { itemData: { item: i } }
    );
    returnData.push(...executionData);
    continue;
  }
  
  // Tratamento específico de erros
  if (error.statusCode === 401) {
    throw new NodeOperationError(
      this.getNode(),
      "Credenciais inválidas. Verifique sua autenticação.",
      { itemIndex: i }
    );
  } else if (error.statusCode === 404) {
    throw new NodeOperationError(
      this.getNode(),
      "Recurso não encontrado. Verifique o ID fornecido.",
      { itemIndex: i }
    );
  } else {
    throw new NodeOperationError(this.getNode(), error as Error, {
      itemIndex: i,
    });
  }
}
```

## 📦 Configuração do Build

### 1. Configuração do ESLint (.eslintrc.js)

```javascript
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    '@n8n/eslint-config/node',
  ],
  rules: {
    // Regras específicas do projeto
    'n8n-nodes-base/node-param-default-missing': 'error',
    'n8n-nodes-base/node-param-description-missing': 'error',
  },
};
```

### 2. Configuração do Prettier (.prettierrc)

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

## 🎨 Ícones Personalizados

### 1. Criação do Ícone SVG

- **Dimensões**: 60x60 pixels
- **Formato**: SVG otimizado
- **Cores**: Preferencialmente cores sólidas
- **Estilo**: Simples e reconhecível

```svg
<!-- Exemplo: nodes/MinhaApi/minhaapi.svg -->
<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="30" r="25" fill="#4F46E5"/>
  <text x="30" y="35" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle">API</text>
</svg>
```

### 2. Configuração do Build para Ícones

```json
{
  "scripts": {
    "build": "tsc && find nodes -name '*.svg' -exec cp {} dist/nodes/MinhaApi/ \\;"
  }
}
```

### 3. Referência no Node

```typescript
export class MinhaApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Minha API",
    name: "minhaApi",
    icon: "file:minhaapi.svg", // Referência ao arquivo SVG
    // ...
  };
}
```

## 🧪 Testes e Validação

### 1. Testes Locais

```bash
# Build do projeto
npm run build

# Lint
npm run lint

# Verificar estrutura dos arquivos
ls -la dist/
ls -la dist/nodes/MinhaApi/
ls -la dist/credentials/
```

### 2. Teste em n8n Local

```bash
# Instalar n8n localmente
npm install -g n8n

# Instalar seu custom node localmente
npm install -g ./

# Iniciar n8n
n8n start
```

### 3. Validação das Credenciais

```typescript
// Adicionar teste específico nas credenciais
test: ICredentialTestRequest = {
  request: {
    baseURL: "={{$credentials.baseUrl}}",
    url: "/api/health",
    method: "GET",
  },
  rules: [
    {
      type: "responseSuccessBody",
      properties: {
        key: "status",
        value: "ok",
      },
    },
  ],
};
```

## 📤 Publicação no NPM

### 1. Preparação para Publicação

```bash
# Login no npm
npm login

# Verificar se está logado
npm whoami

# Verificar package.json
npm run lint
npm run build
```

### 2. Publicação

```bash
# Publicar primeira versão
npm publish --access public

# Publicar versões subsequentes
npm version patch  # ou minor, major
npm publish
```

### 3. Verificação da Publicação

```bash
# Verificar se foi publicado
npm view @seuusuario/n8n-nodes-minhaapi

# Testar instalação
npm install @seuusuario/n8n-nodes-minhaapi
```

## 🔧 Problemas Comuns e Soluções

### 1. Ícone Não Aparece

**Problema**: Ícone aparece em branco ou quebrado

**Soluções**:
```bash
# Verificar se o SVG está sendo copiado
ls -la dist/nodes/MinhaApi/minhaapi.svg

# Verificar se o build está copiando SVGs
npm run build

# Verificar se o ícone está referenciado corretamente
grep -r "icon:" nodes/
```

### 2. Credenciais Não Funcionam

**Problema**: Erro 401 ou autenticação falha

**Soluções**:
```typescript
// Adicionar logs para debug
console.log('Credentials:', credentials);
console.log('Request options:', requestOptions);

// Verificar se a API está retornando o token esperado
const loginResponse = await this.helpers.request({
  method: "POST",
  url: `${baseUrl}/auth/login`,
  body: { username, password },
  json: true,
});
console.log('Login response:', loginResponse);
```

### 3. Node Não Aparece no n8n

**Problema**: Custom node não aparece na interface

**Soluções**:
```bash
# Verificar se o node foi registrado corretamente
cat package.json | grep -A 10 '"n8n"'

# Verificar se os arquivos estão no local correto
ls -la dist/nodes/
ls -la dist/credentials/

# Reiniciar n8n
n8n stop
n8n start
```

### 4. Erro de Build

**Problema**: TypeScript compilation errors

**Soluções**:
```bash
# Verificar imports
npm run lint

# Verificar tipos
tsc --noEmit

# Verificar dependências
npm install
```

### 5. Problemas com Campos Dinâmicos

**Problema**: Campos não aparecem condicionalmente

**Soluções**:
```typescript
// Verificar displayOptions
displayOptions: {
  show: {
    operation: ["createUser"], // Deve ser array
  },
},

// Verificar se o nome do campo está correto
{
  displayName: "Operation",
  name: "operation", // Nome deve corresponder ao displayOptions
  // ...
}
```

## 📚 Recursos Adicionais

### 1. Documentação Oficial
- [n8n Node Development](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n Workflow API](https://docs.n8n.io/integrations/creating-nodes/build/)

### 2. Exemplos de Referência
- [n8n Community Nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes)
- [n8n Node Starter](https://github.com/n8n-io/n8n-nodes-starter)

### 3. Comunidade
- [n8n Community Forum](https://community.n8n.io/)
- [n8n Discord](https://discord.gg/7qGG3jcQ)

### 4. Ferramentas Úteis
- [n8n Node Generator](https://www.npmjs.com/package/n8n-node-generator)
- [Postman para testes de API](https://www.postman.com/)

## 🎯 Checklist Final

### Antes de Publicar
- [ ] Todas as operações CRUD implementadas
- [ ] Credenciais testadas e funcionando
- [ ] Ícone SVG aparecendo corretamente
- [ ] Documentação README atualizada
- [ ] Testes locais realizados
- [ ] Lint sem erros
- [ ] Build sem erros
- [ ] Versão do package.json atualizada

### Após Publicar
- [ ] Instalação via npm testada
- [ ] Funcionamento no n8n verificado
- [ ] Documentação da API no npmjs.com
- [ ] Issues do GitHub monitoradas
- [ ] Feedback da comunidade coletado

## 🏆 Conclusão

Este guia fornece todos os passos necessários para criar um custom node n8n profissional e funcional. Seguindo essas práticas, você terá:

1. **Estrutura sólida** do projeto
2. **Autenticação robusta** para diferentes tipos de API
3. **Interface intuitiva** com campos condicionais
4. **Tratamento de erros** apropriado
5. **Ícones personalizados** funcionais
6. **Processo de build** automatizado
7. **Publicação** no npm sem problemas

Lembre-se de sempre testar localmente antes de publicar e manter a documentação atualizada para facilitar o uso por outros desenvolvedores.

---

*Este guia foi desenvolvido com base na experiência real de criação do `@devanthonymax/n8n-nodes-corbeegestao`, que integra com sucesso 46 operações da API Corbee Gestão.*