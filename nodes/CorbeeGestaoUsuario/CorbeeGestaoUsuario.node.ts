import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeConnectionType, NodeOperationError } from "n8n-workflow";

export class CorbeeGestaoUsuario implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Corbee Gestão Usuario",
    name: "corbeeGestaoUsuario",
    group: ["transform"],
    version: 1,
    description: "Corbee Gestão API - User and Broker Operations",
    defaults: {
      name: "Corbee Gestão Usuario",
    },
    inputs: [NodeConnectionType.Main],
    outputs: [NodeConnectionType.Main],
    usableAsTool: true,
    credentials: [
      {
        name: "corbeeGestaoApi",
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
            name: "Create Broker",
            value: "createBroker",
            description: "Create a new broker",
            action: "Create broker",
          },
          {
            name: "Get Broker",
            value: "getBroker",
            description: "Get broker by ID",
            action: "Get broker",
          },
          {
            name: "List Brokers",
            value: "listBrokers",
            description: "List all active brokers",
            action: "List brokers",
          },
          {
            name: "Update Broker",
            value: "updateBroker",
            description: "Update broker information",
            action: "Update broker",
          },
          {
            name: "List User Profiles",
            value: "listProfiles",
            description: "List all user profiles",
            action: "List user profiles",
          },
          {
            name: "Get Profile Details",
            value: "getProfileDetails",
            description: "Get details of a specific profile",
            action: "Get profile details",
          },
          {
            name: "List Managers",
            value: "listManagers",
            description: "List all managers with details",
            action: "List managers",
          },
          {
            name: "Create User",
            value: "createUser",
            description: "Create a new user",
            action: "Create user",
          },
          {
            name: "Update User",
            value: "updateUser",
            description: "Update user information",
            action: "Update user",
          },
          {
            name: "Get User Data",
            value: "getUserData",
            description: "Get user data by ID",
            action: "Get user data",
          },
          {
            name: "List Users (Simplified)",
            value: "listUsersSimplified",
            description: "Get simplified list of all active users",
            action: "List users simplified",
          },
        ],
        default: "createBroker",
      },

      // Broker ID field
      {
        displayName: "Broker ID",
        name: "brokerId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["getBroker", "updateBroker"],
          },
        },
        default: "",
        description: "The ID of the broker",
      },

      // Profile ID field for profile details
      {
        displayName: "Profile ID",
        name: "profileId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["getProfileDetails"],
          },
        },
        default: "",
        description: "The ID of the profile to get details for",
      },

      // User ID field for user operations
      {
        displayName: "User ID",
        name: "userId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["updateUser", "getUserData"],
          },
        },
        default: "",
        description: "The ID of the user",
      },

      // Broker data fields
      {
        displayName: "Login",
        name: "login",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "createBroker",
              "updateBroker",
              "createUser",
              "updateUser",
            ],
          },
        },
        default: "",
        description: "Login username",
      },
      {
        displayName: "CPF",
        name: "cpf",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "createBroker",
              "updateBroker",
              "createUser",
              "updateUser",
            ],
          },
        },
        default: "",
        description: "CPF (numbers only)",
      },
      {
        displayName: "Name",
        name: "nome",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "createBroker",
              "updateBroker",
              "createUser",
              "updateUser",
            ],
          },
        },
        default: "",
        description: "Full name",
      },
      {
        displayName: "Email",
        name: "email",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "createBroker",
              "updateBroker",
              "createUser",
              "updateUser",
            ],
          },
        },
        default: "",
        description: "Email address",
      },
      {
        displayName: "Phone",
        name: "telefone",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "createBroker",
              "updateBroker",
              "createUser",
              "updateUser",
            ],
          },
        },
        default: "",
        description: "Phone number",
      },
      {
        displayName: "Birth Date",
        name: "dtNascimento",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "createBroker",
              "updateBroker",
              "createUser",
              "updateUser",
            ],
          },
        },
        default: "",
        placeholder: "DD/MM/YYYY",
        description: "Birth date (DD/MM/YYYY format)",
      },
      {
        displayName: "Broker Type",
        name: "tipoCorretor",
        type: "options",
        options: [
          {
            name: "Individual (PF)",
            value: "pf",
          },
          {
            name: "Company (PJ)",
            value: "pj",
          },
        ],
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "pf",
        description: "Type of broker",
      },
      {
        displayName: "CNPJ",
        name: "cnpj",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
            tipoCorretor: ["pj"],
          },
        },
        default: "",
        description: "Company CNPJ (required for PJ)",
      },
      {
        displayName: "Company Name",
        name: "razaoSocial",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
            tipoCorretor: ["pj"],
          },
        },
        default: "",
        description: "Company legal name (required for PJ)",
      },
      {
        displayName: "Store",
        name: "loja",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "Store code",
      },
      {
        displayName: "Street",
        name: "logradouro",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "Street address",
      },
      {
        displayName: "Number",
        name: "numero",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "Address number",
      },
      {
        displayName: "District",
        name: "bairro",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "District/neighborhood",
      },
      {
        displayName: "City",
        name: "cidade",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "City name",
      },
      {
        displayName: "State",
        name: "estado",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "State abbreviation",
      },
      {
        displayName: "ZIP Code",
        name: "cep",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "ZIP/postal code",
      },
      {
        displayName: "Manager",
        name: "gerente",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "Manager ID",
      },
      {
        displayName: "Cost Center ID",
        name: "idCentroCusto",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "Cost center identifier",
      },
      {
        displayName: "Payment Method",
        name: "recebimento",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "Payment receiving method",
      },
      {
        displayName: "Permissions",
        name: "permissoes",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createBroker", "updateBroker"],
          },
        },
        default: "",
        description: "Broker permissions",
      },

      // User-specific fields
      {
        displayName: "Profile ID",
        name: "perfilId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["createUser", "updateUser"],
          },
        },
        default: "",
        description: "Profile/role ID for the user",
      },
      {
        displayName: "Password",
        name: "senha",
        type: "string",
        typeOptions: {
          password: true,
        },
        required: true,
        displayOptions: {
          show: {
            operation: ["createUser"],
          },
        },
        default: "",
        description: "User password (required for creation)",
      },
      {
        displayName: "Status",
        name: "status",
        type: "options",
        options: [
          {
            name: "Active",
            value: "ativo",
          },
          {
            name: "Inactive",
            value: "inativo",
          },
        ],
        displayOptions: {
          show: {
            operation: ["createUser", "updateUser"],
          },
        },
        default: "ativo",
        description: "User status",
      },
      {
        displayName: "Store ID",
        name: "lojaId",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createUser", "updateUser"],
          },
        },
        default: "",
        description: "Store ID where user works",
      },
      {
        displayName: "Manager ID",
        name: "gerenteId",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createUser", "updateUser"],
          },
        },
        default: "",
        description: "Manager ID for this user",
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();

    let item: INodeExecutionData;
    let operation: string;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
      try {
        operation = this.getNodeParameter("operation", itemIndex, "") as string;
        item = items[itemIndex];

        const credentials = await this.getCredentials("corbeeGestaoApi");
        const baseUrl =
          credentials.environment === "demo"
            ? "https://demo.corbee.com.br"
            : (credentials.baseUrl as string);

        // Get JWT token first for all operations
        const authResponse = await this.helpers.httpRequest({
          method: "POST",
          url: `${baseUrl}/api/v2/login`,
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            login: credentials.login,
            senha: credentials.senha,
            type_user: credentials.type_user,
          },
          json: true,
        });

        if (!authResponse.data?.jwt) {
          throw new NodeOperationError(
            this.getNode(),
            "Authentication failed: No JWT token received",
            {
              itemIndex,
            }
          );
        }

        const jwt = authResponse.data.jwt;
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        };

        let responseData: any;

        if (operation === "createBroker") {
          const brokerData: any = {
            login: this.getNodeParameter("login", itemIndex),
            cpf: this.getNodeParameter("cpf", itemIndex),
            nome: this.getNodeParameter("nome", itemIndex),
            email: this.getNodeParameter("email", itemIndex),
            telefone: this.getNodeParameter("telefone", itemIndex),
            dtNascimento: this.getNodeParameter("dtNascimento", itemIndex),
            tipoCorretor: this.getNodeParameter("tipoCorretor", itemIndex),
            loja: this.getNodeParameter("loja", itemIndex),
            logradouro: this.getNodeParameter("logradouro", itemIndex),
            numero: this.getNodeParameter("numero", itemIndex),
            bairro: this.getNodeParameter("bairro", itemIndex),
            cidade: this.getNodeParameter("cidade", itemIndex),
            estado: this.getNodeParameter("estado", itemIndex),
            cep: this.getNodeParameter("cep", itemIndex),
            gerente: this.getNodeParameter("gerente", itemIndex),
            idCentroCusto: this.getNodeParameter("idCentroCusto", itemIndex),
            recebimento: this.getNodeParameter("recebimento", itemIndex),
            permissoes: this.getNodeParameter("permissoes", itemIndex),
          };

          // Add PJ specific fields if needed
          const tipoCorretor = this.getNodeParameter(
            "tipoCorretor",
            itemIndex
          ) as string;
          if (tipoCorretor === "pj") {
            brokerData.cnpj = this.getNodeParameter("cnpj", itemIndex);
            brokerData.razaoSocial = this.getNodeParameter(
              "razaoSocial",
              itemIndex
            );
          }

          responseData = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/v2/broker`,
            headers,
            body: brokerData,
            json: true,
          });
        } else if (operation === "getBroker") {
          const brokerId = this.getNodeParameter(
            "brokerId",
            itemIndex
          ) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/broker/${brokerId}`,
            headers,
            json: true,
          });
        } else if (operation === "listBrokers") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/broker/list`,
            headers,
            json: true,
          });
        } else if (operation === "updateBroker") {
          const updateBrokerId = this.getNodeParameter(
            "brokerId",
            itemIndex
          ) as string;
          const updateBrokerData: any = {
            login: this.getNodeParameter("login", itemIndex),
            cpf: this.getNodeParameter("cpf", itemIndex),
            nome: this.getNodeParameter("nome", itemIndex),
            email: this.getNodeParameter("email", itemIndex),
            telefone: this.getNodeParameter("telefone", itemIndex),
            dtNascimento: this.getNodeParameter("dtNascimento", itemIndex),
            tipoCorretor: this.getNodeParameter("tipoCorretor", itemIndex),
            loja: this.getNodeParameter("loja", itemIndex),
            logradouro: this.getNodeParameter("logradouro", itemIndex),
            numero: this.getNodeParameter("numero", itemIndex),
            bairro: this.getNodeParameter("bairro", itemIndex),
            cidade: this.getNodeParameter("cidade", itemIndex),
            estado: this.getNodeParameter("estado", itemIndex),
            cep: this.getNodeParameter("cep", itemIndex),
            gerente: this.getNodeParameter("gerente", itemIndex),
            idCentroCusto: this.getNodeParameter("idCentroCusto", itemIndex),
            recebimento: this.getNodeParameter("recebimento", itemIndex),
            permissoes: this.getNodeParameter("permissoes", itemIndex),
          };

          // Add PJ specific fields if needed
          const updateTipoCorretor = this.getNodeParameter(
            "tipoCorretor",
            itemIndex
          ) as string;
          if (updateTipoCorretor === "pj") {
            updateBrokerData.cnpj = this.getNodeParameter("cnpj", itemIndex);
            updateBrokerData.razaoSocial = this.getNodeParameter(
              "razaoSocial",
              itemIndex
            );
          }

          responseData = await this.helpers.httpRequest({
            method: "PUT",
            url: `${baseUrl}/api/v2/broker/${updateBrokerId}`,
            headers,
            body: updateBrokerData,
            json: true,
          });
        } else if (operation === "listProfiles") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/perfis`,
            headers,
            json: true,
          });
        } else if (operation === "getProfileDetails") {
          const profileId = this.getNodeParameter(
            "profileId",
            itemIndex
          ) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/perfis/${profileId}`,
            headers,
            json: true,
          });
        } else if (operation === "listManagers") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/gerentes`,
            headers,
            json: true,
          });
        } else if (operation === "createUser") {
          const userData: any = {
            login: this.getNodeParameter("login", itemIndex),
            nome: this.getNodeParameter("nome", itemIndex),
            email: this.getNodeParameter("email", itemIndex),
            perfilId: this.getNodeParameter("perfilId", itemIndex),
            senha: this.getNodeParameter("senha", itemIndex),
            status: this.getNodeParameter("status", itemIndex, "ativo"),
          };

          // Add optional fields if provided
          const telefone = this.getNodeParameter(
            "telefone",
            itemIndex,
            ""
          ) as string;
          if (telefone) userData.telefone = telefone;

          const cpf = this.getNodeParameter("cpf", itemIndex, "") as string;
          if (cpf) userData.cpf = cpf;

          const dtNascimento = this.getNodeParameter(
            "dtNascimento",
            itemIndex,
            ""
          ) as string;
          if (dtNascimento) userData.dtNascimento = dtNascimento;

          const lojaId = this.getNodeParameter(
            "lojaId",
            itemIndex,
            ""
          ) as string;
          if (lojaId) userData.lojaId = lojaId;

          const gerenteId = this.getNodeParameter(
            "gerenteId",
            itemIndex,
            ""
          ) as string;
          if (gerenteId) userData.gerenteId = gerenteId;

          responseData = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/v2/usuarios`,
            headers,
            body: userData,
            json: true,
          });
        } else if (operation === "updateUser") {
          const userId = this.getNodeParameter("userId", itemIndex) as string;
          const updateUserData: any = {
            login: this.getNodeParameter("login", itemIndex),
            nome: this.getNodeParameter("nome", itemIndex),
            email: this.getNodeParameter("email", itemIndex),
            perfilId: this.getNodeParameter("perfilId", itemIndex),
            status: this.getNodeParameter("status", itemIndex, "ativo"),
          };

          // Add optional fields if provided
          const telefone = this.getNodeParameter(
            "telefone",
            itemIndex,
            ""
          ) as string;
          if (telefone) updateUserData.telefone = telefone;

          const cpf = this.getNodeParameter("cpf", itemIndex, "") as string;
          if (cpf) updateUserData.cpf = cpf;

          const dtNascimento = this.getNodeParameter(
            "dtNascimento",
            itemIndex,
            ""
          ) as string;
          if (dtNascimento) updateUserData.dtNascimento = dtNascimento;

          const lojaId = this.getNodeParameter(
            "lojaId",
            itemIndex,
            ""
          ) as string;
          if (lojaId) updateUserData.lojaId = lojaId;

          const gerenteId = this.getNodeParameter(
            "gerenteId",
            itemIndex,
            ""
          ) as string;
          if (gerenteId) updateUserData.gerenteId = gerenteId;

          responseData = await this.helpers.httpRequest({
            method: "PUT",
            url: `${baseUrl}/api/v2/usuarios/${userId}`,
            headers,
            body: updateUserData,
            json: true,
          });
        } else if (operation === "getUserData") {
          const userId = this.getNodeParameter("userId", itemIndex) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/usuarios/${userId}`,
            headers,
            json: true,
          });
        } else if (operation === "listUsersSimplified") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/usuarios/simplificado`,
            headers,
            json: true,
          });
        }

        // Following ExampleNode pattern - modify the item directly
        item.json.corbeeResponse = responseData;
        item.json.operation = operation;
      } catch (error) {
        if (this.continueOnFail()) {
          items.push({
            json: this.getInputData(itemIndex)[0].json,
            error: error as any,
            pairedItem: itemIndex,
          });
        } else {
          if ((error as any).context) {
            (error as any).context.itemIndex = itemIndex;
            throw error;
          }
          throw new NodeOperationError(this.getNode(), error as Error, {
            itemIndex,
          });
        }
      }
    }

    return [items];
  }
}
