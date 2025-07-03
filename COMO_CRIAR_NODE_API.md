# Guia Completo: Como Criar um Node n8n para Consumo de API (Exemplo: FGTS Bankerize)

Este documento detalha, passo a passo, como criar um node n8n para consumir APIs externas, usando como referência o node "Bankerize - FGTS". O objetivo é fornecer um guia prático e detalhado para desenvolvedores que desejam criar integrações robustas e profissionais no n8n.

---

## 1. Estrutura do Projeto

Organize seu projeto seguindo a estrutura recomendada:

```
credentials/
  MinhaCredencial.credentials.ts
nodes/
  MinhaApi/
    MinhaApi.node.ts
    icon.svg
README.md
package.json
```

- **credentials/**: Contém as definições de credenciais customizadas.
- **nodes/**: Cada subpasta representa um grupo de nodes relacionados a uma API.
- **README.md**: Documentação do pacote.

---

## 2. Definindo as Credenciais (OAuth2, API Key, etc.)

Crie um arquivo em `credentials/` para definir os campos necessários para autenticação. Exemplo:

```typescript
import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MinhaCredencial implements ICredentialType {
  name = 'minhaCredencialApi';
  displayName = 'Minha API';
  properties: INodeProperties[] = [
    {
      displayName: 'Client ID',
      name: 'clientId',
      type: 'string',
      required: true,
      description: 'ID do cliente',
    },
    {
      displayName: 'Client Secret',
      name: 'clientSecret',
      type: 'string',
      typeOptions: { password: true },
      required: true,
      description: 'Segredo do cliente',
    },
    // ...outros campos
  ];
}
```

- Use `typeOptions: { password: true }` para campos sensíveis.
- Adicione opções para ambiente (produção/desenvolvimento) se necessário.

---

## 3. Estrutura Básica do Node

No arquivo `MinhaApi.node.ts`, defina a classe principal:

```typescript
import type { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export class MinhaApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Minha API',
    name: 'minhaApi',
    icon: 'file:icon.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter.operation}}',
    description: 'Descrição do node',
    defaults: { name: 'Minha API' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      { name: 'minhaCredencialApi', required: true },
    ],
    properties: [ /* ...defina os campos aqui... */ ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    // ...lógica principal...
    return [[]];
  }
}
```

- O campo `properties` define os parâmetros que o usuário irá preencher no node.
- Use `displayOptions` para mostrar campos apenas em determinadas operações.

---

## 4. Definindo Operações e Parâmetros

No array `properties`, defina as operações disponíveis e os campos necessários para cada uma:

```typescript
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  options: [
    { name: 'Buscar', value: 'get', description: 'Buscar dados' },
    { name: 'Criar', value: 'create', description: 'Criar registro' },
  ],
  default: 'get',
},
// Campos específicos de cada operação
{
  displayName: 'ID',
  name: 'id',
  type: 'string',
  displayOptions: { show: { operation: ['get'] } },
  required: true,
},
```

- Use `displayOptions` para exibir campos apenas quando a operação correspondente for selecionada.
- Adicione validações e descrições claras.

---

## 5. Implementando a Lógica de Execução

No método `execute`, implemente a lógica para cada operação:

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const items = this.getInputData();
  const returnData: INodeExecutionData[] = [];

  for (let i = 0; i < items.length; i++) {
    try {
      const operation = this.getNodeParameter('operation', i) as string;
      const credentials = await this.getCredentials('minhaCredencialApi');
      let response;

      if (operation === 'get') {
        const id = this.getNodeParameter('id', i) as string;
        response = await this.helpers.httpRequest({
          method: 'GET',
          url: `https://api.meuservico.com/endpoint/${id}`,
          headers: { Authorization: `Bearer ${credentials.token}` },
        });
      }
      // ...outras operações...

      returnData.push({ json: response, pairedItem: { item: i } });
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
        continue;
      }
      throw error;
    }
  }
  return [returnData];
}
```

- Use `this.getNodeParameter` para acessar os parâmetros definidos.
- Use `this.helpers.httpRequest` para fazer chamadas HTTP.
- Trate erros usando `NodeOperationError` para mensagens amigáveis.

---

## 6. Autenticação OAuth2 (Client Credentials)

Se a API exigir OAuth2, implemente a obtenção do token antes das chamadas:

```typescript
async function getAccessToken(this: IExecuteFunctions, credentials: any): Promise<string> {
  const response = await this.helpers.httpRequest({
    method: 'POST',
    url: credentials.authUrl,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${credentials.clientId}&client_secret=${credentials.clientSecret}`,
  });
  if (!response.access_token) throw new NodeOperationError(this.getNode(), 'Erro ao obter token');
  return response.access_token;
}
```

- Sempre armazene o token em variável local e use no header `Authorization`.
- Renove o token se necessário (tokens geralmente expiram em 5 minutos).

---

## 7. Configuração para Uso como Tool e Node Comum

O n8n permite que nodes sejam usados tanto manualmente (arrastar e soltar) quanto automaticamente por LLMs e agentes de IA. Para garantir compatibilidade total, configure adequadamente:

### 7.1 Configurando para Uso como Tool (LLM/IA)

Adicione a propriedade `usableAsTool: true` na descrição do node:

```typescript
export class MinhaApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Minha API',
    name: 'minhaApi',
    icon: 'file:icon.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter.operation}}',
    description: 'API para gerenciar dados externos. Use para buscar, criar ou atualizar registros automaticamente.',
    defaults: { name: 'Minha API' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    usableAsTool: true, // IMPORTANTE: Para funcionar como tool
    credentials: [
      { name: 'minhaCredencialApi', required: true },
    ],
    properties: [
      // ...propriedades...
    ],
  };
}
```

### 7.2 Descrições Claras para LLMs

Forneça descrições detalhadas que ajudem LLMs a entender quando e como usar cada operação:

```typescript
{
  displayName: 'Operation',
  name: 'operation',
  type: 'options',
  noDataExpression: true,
  options: [
    {
      name: 'Get User',
      value: 'getUser',
      description: 'Buscar dados de um usuário específico pelo ID',
      action: 'Buscar usuário por ID',
    },
    {
      name: 'Create User',
      value: 'createUser',
      description: 'Criar um novo usuário no sistema',
      action: 'Criar novo usuário',
    },
    {
      name: 'Update User',
      value: 'updateUser',
      description: 'Atualizar dados de um usuário existente',
      action: 'Atualizar usuário existente',
    },
  ],
  default: 'getUser',
},
```

### 7.3 Tratamento de Arrays para Tools

LLMs esperam que respostas de arrays sejam tratadas adequadamente:

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  const items = this.getInputData();
  const returnData: INodeExecutionData[] = [];

  for (let i = 0; i < items.length; i++) {
    try {
      const operation = this.getNodeParameter('operation', i) as string;
      const credentials = await this.getCredentials('minhaCredencialApi');
      const responseData = await handleOperations.call(this, operation, i, credentials);

      // Tratamento especial para arrays (importante para LLMs)
      if (Array.isArray(responseData)) {
        if (responseData.length === 0) {
          // Lidar com arrays vazios
          const message = { message: "Nenhum resultado encontrado." };
          returnData.push({ json: message, pairedItem: { item: i } });
        } else {
          // Criar um item n8n para cada elemento do array
          const executionData = responseData.map(item => ({ 
            json: item, 
            pairedItem: { item: i } 
          }));
          returnData.push(...executionData);
        }
      } else {
        // É um único objeto
        returnData.push({ json: responseData, pairedItem: { item: i } });
      }

    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({
          json: { error: error instanceof Error ? error.message : String(error) },
          pairedItem: { item: i },
        });
        continue;
      }
      throw error;
    }
  }

  return [returnData];
}
```

---

## 8. Exemplos de Construção Completa

### 8.1 Exemplo: API de Usuários

```typescript
// credentials/UserApiCredentials.credentials.ts
import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class UserApiCredentials implements ICredentialType {
  name = 'userApiCredentials';
  displayName = 'User API';
  documentationUrl = 'https://docs.userapi.com/';
  properties: INodeProperties[] = [
    {
      displayName: 'Environment',
      name: 'environment',
      type: 'options',
      options: [
        { name: 'Development', value: 'dev' },
        { name: 'Production', value: 'prod' },
      ],
      default: 'dev',
      required: true,
    },
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      required: true,
      description: 'API Key fornecida pelo serviço',
    },
  ];
}
```

```typescript
// nodes/UserApi/UserApi.node.ts
import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType, NodeOperationError } from 'n8n-workflow';

export class UserApi implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'User API',
    name: 'userApi',
    icon: 'file:icon.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter.operation}}',
    description: 'Gerenciar usuários via API. Use para buscar, criar, atualizar ou deletar usuários no sistema.',
    defaults: { name: 'User API' },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    usableAsTool: true, // Compatível com LLMs
    credentials: [
      { name: 'userApiCredentials', required: true },
    ],
    properties: [
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        options: [
          {
            name: 'Get User',
            value: 'getUser',
            description: 'Buscar dados de um usuário pelo ID',
            action: 'Buscar usuário',
          },
          {
            name: 'List Users',
            value: 'listUsers',
            description: 'Listar todos os usuários',
            action: 'Listar usuários',
          },
          {
            name: 'Create User',
            value: 'createUser',
            description: 'Criar um novo usuário',
            action: 'Criar usuário',
          },
          {
            name: 'Update User',
            value: 'updateUser',
            description: 'Atualizar dados de um usuário',
            action: 'Atualizar usuário',
          },
          {
            name: 'Delete User',
            value: 'deleteUser',
            description: 'Deletar um usuário',
            action: 'Deletar usuário',
          },
        ],
        default: 'getUser',
      },

      // Get User fields
      {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        displayOptions: {
          show: { operation: ['getUser', 'updateUser', 'deleteUser'] },
        },
        default: '',
        required: true,
        description: 'ID único do usuário',
      },

      // List Users fields
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        displayOptions: {
          show: { operation: ['listUsers'] },
        },
        default: 10,
        description: 'Número máximo de usuários a retornar',
      },

      // Create/Update User fields
      {
        displayName: 'User Data',
        name: 'userDataNotice',
        type: 'notice',
        displayOptions: {
          show: { operation: ['createUser', 'updateUser'] },
        },
        default: '',
        description: 'Dados do usuário',
      },
      {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        displayOptions: {
          show: { operation: ['createUser', 'updateUser'] },
        },
        default: '',
        required: true,
        description: 'Nome completo do usuário',
      },
      {
        displayName: 'Email',
        name: 'email',
        type: 'string',
        displayOptions: {
          show: { operation: ['createUser', 'updateUser'] },
        },
        default: '',
        required: true,
        placeholder: 'user@example.com',
        description: 'Email do usuário',
      },
      {
        displayName: 'Role',
        name: 'role',
        type: 'options',
        displayOptions: {
          show: { operation: ['createUser', 'updateUser'] },
        },
        options: [
          { name: 'Admin', value: 'admin' },
          { name: 'User', value: 'user' },
          { name: 'Guest', value: 'guest' },
        ],
        default: 'user',
        description: 'Papel do usuário no sistema',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      try {
        const operation = this.getNodeParameter('operation', i) as string;
        const credentials = await this.getCredentials('userApiCredentials');
        const responseData = await handleUserOperations.call(this, operation, i, credentials);

        if (responseData === undefined || responseData === null) {
          throw new NodeOperationError(this.getNode(), `Operação não retornou dados: ${operation}`);
        }

        // Tratamento especial para arrays (listUsers)
        if (Array.isArray(responseData)) {
          if (responseData.length === 0) {
            returnData.push({ json: { message: "Nenhum usuário encontrado." }, pairedItem: { item: i } });
          } else {
            const executionData = responseData.map(user => ({ json: user, pairedItem: { item: i } }));
            returnData.push(...executionData);
          }
        } else {
          returnData.push({ json: responseData, pairedItem: { item: i } });
        }

      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            json: { error: error instanceof Error ? error.message : String(error) },
            pairedItem: { item: i },
          });
          continue;
        }
        throw error;
      }
    }

    return [returnData];
  }
}

// Função auxiliar para operações
async function handleUserOperations(this: IExecuteFunctions, operation: string, itemIndex: number, credentials: any) {
  const baseUrl = credentials.environment === 'prod' 
    ? 'https://api.userservice.com/v1' 
    : 'https://dev-api.userservice.com/v1';

  const headers = {
    'Authorization': `Bearer ${credentials.apiKey}`,
    'Content-Type': 'application/json',
  };

  switch (operation) {
    case 'getUser': {
      const userId = this.getNodeParameter('userId', itemIndex) as string;
      return await this.helpers.httpRequest({
        method: 'GET',
        url: `${baseUrl}/users/${userId}`,
        headers,
        json: true,
      });
    }

    case 'listUsers': {
      const limit = this.getNodeParameter('limit', itemIndex) as number;
      return await this.helpers.httpRequest({
        method: 'GET',
        url: `${baseUrl}/users?limit=${limit}`,
        headers,
        json: true,
      });
    }

    case 'createUser': {
      const name = this.getNodeParameter('name', itemIndex) as string;
      const email = this.getNodeParameter('email', itemIndex) as string;
      const role = this.getNodeParameter('role', itemIndex) as string;

      const body = { name, email, role };
      
      return await this.helpers.httpRequest({
        method: 'POST',
        url: `${baseUrl}/users`,
        headers,
        body,
        json: true,
      });
    }

    case 'updateUser': {
      const userId = this.getNodeParameter('userId', itemIndex) as string;
      const name = this.getNodeParameter('name', itemIndex) as string;
      const email = this.getNodeParameter('email', itemIndex) as string;
      const role = this.getNodeParameter('role', itemIndex) as string;

      const body = { name, email, role };
      
      return await this.helpers.httpRequest({
        method: 'PUT',
        url: `${baseUrl}/users/${userId}`,
        headers,
        body,
        json: true,
      });
    }

    case 'deleteUser': {
      const userId = this.getNodeParameter('userId', itemIndex) as string;
      return await this.helpers.httpRequest({
        method: 'DELETE',
        url: `${baseUrl}/users/${userId}`,
        headers,
        json: true,
      });
    }

    default:
      throw new NodeOperationError(this.getNode(), `Operação desconhecida: ${operation}`);
  }
}
```

### 8.2 Package.json para Publicação

```json
{
  "name": "@seu-usuario/n8n-nodes-minha-api",
  "version": "1.0.0",
  "description": "N8n node para integração com Minha API",
  "keywords": ["n8n-community-node-package"],
  "license": "MIT",
  "homepage": "https://github.com/seu-usuario/n8n-nodes-minha-api",
  "author": {
    "name": "Seu Nome",
    "email": "seu@email.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/seu-usuario/n8n-nodes-minha-api.git"
  },
  "main": "index.js",
  "scripts": {
    "build": "tsc && gulp build:icons",
    "dev": "tsc --watch",
    "format": "prettier nodes credentials --write",
    "lint": "eslint nodes credentials package.json",
    "lintfix": "eslint nodes credentials package.json --fix",
    "prepublishOnly": "npm run build && npm run lint -s"
  },
  "files": [
    "dist"
  ],
  "n8n": {
    "n8nNodesApiVersion": 1,
    "credentials": [
      "dist/credentials/UserApiCredentials.credentials.js"
    ],
    "nodes": [
      "dist/nodes/UserApi/UserApi.node.js"
    ]
  },
  "devDependencies": {
    "@types/node": "^18.16.16",
    "n8n-workflow": "^1.0.0",
    "typescript": "^5.1.3"
  },
  "peerDependencies": {
    "n8n-workflow": "*"
  }
}
```

### 8.3 Uso como Tool (LLM)

Quando configurado com `usableAsTool: true`, o node pode ser usado automaticamente por LLMs:

```
Usuário: "Busque o usuário com ID 123"
LLM: [executa automaticamente o node UserApi com operation=getUser e userId=123]

Usuário: "Crie um usuário admin chamado João com email joao@teste.com"
LLM: [executa automaticamente o node UserApi com operation=createUser, name=João, email=joao@teste.com, role=admin]
```

### 8.4 Uso Manual (Drag & Drop)

O mesmo node pode ser usado manualmente:
1. Arraste "User API" para o workflow
2. Configure as credenciais
3. Selecione a operação desejada
4. Preencha os campos necessários
5. Execute o workflow

---

## 9. Boas Práticas para Tools e Nodes

### 9.1 Compatibilidade Dupla
- **Use `usableAsTool: true`** para compatibilidade com LLMs
- **Mantenha interface amigável** para uso manual
- **Forneça descrições claras** que funcionem para humanos e IA

### 9.2 Tratamento de Dados
- **Valide todos os campos obrigatórios** antes de enviar para a API
- **Trate arrays adequadamente** (importante para LLMs)
- **Retorne mensagens de erro claras** e acionáveis

### 9.3 Documentação
- **Documente cada operação** no próprio código
- **Use `action` para descrever o que cada operação faz**
- **Inclua exemplos no README.md**

### 9.4 Segurança
- **Use `typeOptions: { password: true }` para dados sensíveis**
- **Implemente rate limiting se necessário**
- **Valide inputs para prevenir ataques**

### 9.5 Performance
- **Cache tokens OAuth2 quando possível**
- **Implemente retry logic para falhas temporárias**
- **Use paginação para grandes datasets**

---

## 10. Exemplo de Uso: FGTS Bankerize

- Simule uma proposta: envie CPF, banco e valor desejado.
- Crie uma proposta: envie todos os dados do cliente e o ID da simulação.
- Consulte uma proposta: envie o código da proposta.

Veja o código real em `nodes/Bankerize/BankerizeFgts.node.ts` para um exemplo completo e profissional.

---

## 11. Referências

- [Documentação Oficial n8n](https://docs.n8n.io)
- [Exemplo de API Bankerize](API_ENDPOINTS.md)
- [README do Projeto](README.md)

---

Este guia cobre desde a estrutura inicial até detalhes avançados de autenticação e tratamento de erros. Use como base para criar nodes n8n robustos para qualquer API RESTful.
