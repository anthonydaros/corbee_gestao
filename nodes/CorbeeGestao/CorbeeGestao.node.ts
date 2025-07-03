import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeConnectionType, NodeOperationError } from "n8n-workflow";

export class CorbeeGestao implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Corbee Gestão",
    name: "corbeeGestao",
    icon: "file:folder.svg",
    group: ["transform"],
    version: 1,
    description:
      "Corbee Gestão API - Complete Integration for Users and Brokers",
    defaults: {
      name: "Corbee Gestão",
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

          // Proposal Operations
          {
            name: "Create FGTS Proposal",
            value: "createFgtsProposal",
            description: "Register new FGTS proposal",
            action: "Create FGTS proposal",
          },
          {
            name: "Submit Proposal to Bank",
            value: "submitProposalToBank",
            description: "Submit proposal for bank processing",
            action: "Submit proposal to bank",
          },
          {
            name: "Create Proposal",
            value: "createProposal",
            description:
              "Create new proposal (requires broker if internal user)",
            action: "Create proposal",
          },
          {
            name: "Upload Proposal Documents",
            value: "uploadProposalDocs",
            description: "Upload documents for proposal",
            action: "Upload proposal documents",
          },
          {
            name: "Add Broker Observation",
            value: "addBrokerObservation",
            description: "Add broker observation to proposal",
            action: "Add broker observation",
          },
          {
            name: "Search Proposals",
            value: "searchProposals",
            description: "Search proposals with filters",
            action: "Search proposals",
          },
          {
            name: "Get Proposal Logs",
            value: "getProposalLogs",
            description: "Get action logs for proposal",
            action: "Get proposal logs",
          },
          {
            name: "List Proposal Status",
            value: "listProposalStatus",
            description: "List available proposal status",
            action: "List proposal status",
          },
          {
            name: "List Bank Status",
            value: "listBankStatus",
            description: "List available bank status",
            action: "List bank status",
          },
          {
            name: "Update Proposal Status",
            value: "updateProposalStatus",
            description: "Update proposal status",
            action: "Update proposal status",
          },
          {
            name: "Update Bank Status",
            value: "updateBankStatus",
            description: "Update bank status",
            action: "Update bank status",
          },
          {
            name: "Change Proposal PMT",
            value: "changeProposalPmt",
            description: "Change PMT of proposal",
            action: "Change proposal PMT",
          },
          {
            name: "Remove Proposal PMT",
            value: "removeProposalPmt",
            description: "Remove PMT from proposal",
            action: "Remove proposal PMT",
          },
          {
            name: "Get Broker Observations",
            value: "getBrokerObservations",
            description: "Get broker observations for proposal",
            action: "Get broker observations",
          },
          {
            name: "Set Portability Balance",
            value: "setPortabilityBalance",
            description: "Set portability balance received from bank",
            action: "Set portability balance",
          },
          {
            name: "List Cancellation Types",
            value: "listCancellationTypes",
            description: "List available cancellation types",
            action: "List cancellation types",
          },
          {
            name: "List Proposal Files",
            value: "listProposalFiles",
            description: "List files attached to proposal",
            action: "List proposal files",
          },
          {
            name: "Download Proposal File",
            value: "downloadProposalFile",
            description: "Download proposal file in base64",
            action: "Download proposal file",
          },

          // Commission Operations
          {
            name: "List Commission Groups",
            value: "listCommissionGroups",
            description: "List commission groups",
            action: "List commission groups",
          },
          {
            name: "Get Commission Group",
            value: "getCommissionGroup",
            description: "Get specific commission group by ID",
            action: "Get commission group",
          },

          // Operations
          {
            name: "List Banks with Operations",
            value: "listBanksWithOperations",
            description: "List banks with operations",
            action: "List banks with operations",
          },
          {
            name: "Search Operations by Bank",
            value: "searchOperationsByBank",
            description: "Search operations by bank",
            action: "Search operations by bank",
          },

          // Notifications
          {
            name: "List Notifications",
            value: "listNotifications",
            description: "List notifications",
            action: "List notifications",
          },
          {
            name: "Send Notification",
            value: "sendNotification",
            description: "Send notification",
            action: "Send notification",
          },
        ],
        default: "createBroker",
      },

      // Proposal ID field
      {
        displayName: "Proposal ID",
        name: "proposalId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: [
              "submitProposalToBank",
              "uploadProposalDocs",
              "addBrokerObservation",
              "getProposalLogs",
              "updateProposalStatus",
              "updateBankStatus",
              "changeProposalPmt",
              "removeProposalPmt",
              "getBrokerObservations",
              "setPortabilityBalance",
              "listProposalFiles",
              "downloadProposalFile",
            ],
          },
        },
        default: "",
        description: "The ID of the proposal",
      },

      // File ID field for download
      {
        displayName: "File ID",
        name: "fileId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["downloadProposalFile"],
          },
        },
        default: "",
        description: "The ID of the file to download",
      },

      // Broker field for proposals (required for internal users)
      {
        displayName: "Broker ID",
        name: "brokerIdForProposal",
        type: "string",
        displayOptions: {
          show: {
            operation: ["createProposal", "createFgtsProposal"],
          },
        },
        default: "",
        description: "Broker ID (required if logged user is internal type)",
      },

      // Observation field
      {
        displayName: "Observation",
        name: "observation",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["addBrokerObservation"],
          },
        },
        default: "",
        description: "Broker observation to add to the proposal",
      },

      // Status fields
      {
        displayName: "Status ID",
        name: "statusId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["updateProposalStatus", "updateBankStatus"],
          },
        },
        default: "",
        description: "New status ID to update",
      },

      // PMT field
      {
        displayName: "New PMT Value",
        name: "pmtValue",
        type: "number",
        required: true,
        displayOptions: {
          show: {
            operation: ["changeProposalPmt"],
          },
        },
        default: 0,
        description: "New PMT value for the proposal",
      },

      // Portability balance field
      {
        displayName: "Portability Balance",
        name: "portabilityBalance",
        type: "number",
        required: true,
        displayOptions: {
          show: {
            operation: ["setPortabilityBalance"],
          },
        },
        default: 0,
        description: "Portability balance received from bank",
      },

      // Search filters
      {
        displayName: "CPF",
        name: "searchCpf",
        type: "string",
        displayOptions: {
          show: {
            operation: ["searchProposals"],
          },
        },
        default: "",
        description: "CPF for proposal search",
      },
      {
        displayName: "Proposal Code",
        name: "proposalCode",
        type: "string",
        displayOptions: {
          show: {
            operation: ["searchProposals"],
          },
        },
        default: "",
        description: "Proposal code for search",
      },
      {
        displayName: "Client Name",
        name: "clientName",
        type: "string",
        displayOptions: {
          show: {
            operation: ["searchProposals"],
          },
        },
        default: "",
        description: "Client name for proposal search",
      },

      // File upload field
      {
        displayName: "Document File",
        name: "documentFile",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["uploadProposalDocs"],
          },
        },
        default: "",
        description: "Base64 encoded document file",
      },
      {
        displayName: "Document Type",
        name: "documentType",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["uploadProposalDocs"],
          },
        },
        default: "",
        description: "Type of document being uploaded",
      },

      // Commission Group ID field
      {
        displayName: "Commission Group ID",
        name: "commissionGroupId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["getCommissionGroup"],
          },
        },
        default: "",
        description: "The ID of the commission group to retrieve",
      },

      // Bank ID field for operations
      {
        displayName: "Bank ID",
        name: "bankId",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["searchOperationsByBank"],
          },
        },
        default: "",
        description: "The ID of the bank to search operations for",
      },

      // Notification fields
      {
        displayName: "Notification Title",
        name: "notificationTitle",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["sendNotification"],
          },
        },
        default: "",
        description: "Title of the notification",
      },
      {
        displayName: "Notification Message",
        name: "notificationMessage",
        type: "string",
        required: true,
        displayOptions: {
          show: {
            operation: ["sendNotification"],
          },
        },
        default: "",
        description: "Message content of the notification",
      },
      {
        displayName: "Recipient Type",
        name: "recipientType",
        type: "options",
        options: [
          {
            name: "All Users",
            value: "all",
          },
          {
            name: "Specific User",
            value: "user",
          },
          {
            name: "Specific Role",
            value: "role",
          },
        ],
        required: true,
        displayOptions: {
          show: {
            operation: ["sendNotification"],
          },
        },
        default: "all",
        description: "Type of recipient for the notification",
      },
      {
        displayName: "Recipient ID",
        name: "recipientId",
        type: "string",
        displayOptions: {
          show: {
            operation: ["sendNotification"],
            recipientType: ["user", "role"],
          },
        },
        default: "",
        description: "ID of the specific user or role (if not sending to all)",
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
        const baseUrl = credentials.baseUrl as string;

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

          // Proposal Operations
        } else if (operation === "createFgtsProposal") {
          const proposalData: any = {};

          // Add broker if provided (required for internal users)
          const brokerIdForProposal = this.getNodeParameter(
            "brokerIdForProposal",
            itemIndex,
            ""
          ) as string;
          if (brokerIdForProposal) proposalData.corretor = brokerIdForProposal;

          responseData = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/v2/proposta/fgts`,
            headers,
            body: proposalData,
            json: true,
          });
        } else if (operation === "submitProposalToBank") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          responseData = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/digitar-banco`,
            headers,
            json: true,
          });
        } else if (operation === "createProposal") {
          const proposalData: any = {};

          // Add broker if provided (required for internal users)
          const brokerIdForProposal = this.getNodeParameter(
            "brokerIdForProposal",
            itemIndex,
            ""
          ) as string;
          if (brokerIdForProposal) proposalData.corretor = brokerIdForProposal;

          responseData = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/v2/proposta`,
            headers,
            body: proposalData,
            json: true,
          });
        } else if (operation === "uploadProposalDocs") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          const documentFile = this.getNodeParameter(
            "documentFile",
            itemIndex
          ) as string;
          const documentType = this.getNodeParameter(
            "documentType",
            itemIndex
          ) as string;

          const uploadData = {
            arquivo: documentFile,
            tipo: documentType,
          };

          responseData = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/documentos`,
            headers,
            body: uploadData,
            json: true,
          });
        } else if (operation === "addBrokerObservation") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          const observation = this.getNodeParameter(
            "observation",
            itemIndex
          ) as string;

          const observationData = {
            observacao: observation,
          };

          responseData = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/observacao-corretor`,
            headers,
            body: observationData,
            json: true,
          });
        } else if (operation === "searchProposals") {
          const searchParams: any = {};

          const searchCpf = this.getNodeParameter(
            "searchCpf",
            itemIndex,
            ""
          ) as string;
          if (searchCpf) searchParams.cpf = searchCpf;

          const proposalCode = this.getNodeParameter(
            "proposalCode",
            itemIndex,
            ""
          ) as string;
          if (proposalCode) searchParams.codigo = proposalCode;

          const clientName = this.getNodeParameter(
            "clientName",
            itemIndex,
            ""
          ) as string;
          if (clientName) searchParams.nome = clientName;

          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/proposta/buscar`,
            headers,
            qs: searchParams,
            json: true,
          });
        } else if (operation === "getProposalLogs") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/logs`,
            headers,
            json: true,
          });
        } else if (operation === "listProposalStatus") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/proposta/status`,
            headers,
            json: true,
          });
        } else if (operation === "listBankStatus") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/proposta/status-banco`,
            headers,
            json: true,
          });
        } else if (operation === "updateProposalStatus") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          const statusId = this.getNodeParameter(
            "statusId",
            itemIndex
          ) as string;

          const statusData = {
            status: statusId,
          };

          responseData = await this.helpers.httpRequest({
            method: "PUT",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/status`,
            headers,
            body: statusData,
            json: true,
          });
        } else if (operation === "updateBankStatus") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          const statusId = this.getNodeParameter(
            "statusId",
            itemIndex
          ) as string;

          const statusData = {
            status: statusId,
          };

          responseData = await this.helpers.httpRequest({
            method: "PUT",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/status-banco`,
            headers,
            body: statusData,
            json: true,
          });
        } else if (operation === "changeProposalPmt") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          const pmtValue = this.getNodeParameter(
            "pmtValue",
            itemIndex
          ) as number;

          const pmtData = {
            pmt: pmtValue,
          };

          responseData = await this.helpers.httpRequest({
            method: "PUT",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/pmt`,
            headers,
            body: pmtData,
            json: true,
          });
        } else if (operation === "removeProposalPmt") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          responseData = await this.helpers.httpRequest({
            method: "DELETE",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/pmt`,
            headers,
            json: true,
          });
        } else if (operation === "getBrokerObservations") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/observacoes-corretor`,
            headers,
            json: true,
          });
        } else if (operation === "setPortabilityBalance") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          const portabilityBalance = this.getNodeParameter(
            "portabilityBalance",
            itemIndex
          ) as number;

          const balanceData = {
            saldo: portabilityBalance,
          };

          responseData = await this.helpers.httpRequest({
            method: "PUT",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/saldo-portabilidade`,
            headers,
            body: balanceData,
            json: true,
          });
        } else if (operation === "listCancellationTypes") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/proposta/tipos-cancelamento`,
            headers,
            json: true,
          });
        } else if (operation === "listProposalFiles") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/arquivos`,
            headers,
            json: true,
          });
        } else if (operation === "downloadProposalFile") {
          const proposalId = this.getNodeParameter(
            "proposalId",
            itemIndex
          ) as string;
          const fileId = this.getNodeParameter("fileId", itemIndex) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/proposta/${proposalId}/arquivo/${fileId}`,
            headers,
            json: true,
          });

          // Commission Operations
        } else if (operation === "listCommissionGroups") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/comissionamento/grupos`,
            headers,
            json: true,
          });
        } else if (operation === "getCommissionGroup") {
          const commissionGroupId = this.getNodeParameter(
            "commissionGroupId",
            itemIndex
          ) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/comissionamento/grupos/${commissionGroupId}`,
            headers,
            json: true,
          });

          // Operations
        } else if (operation === "listBanksWithOperations") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/operacoes/bancos`,
            headers,
            json: true,
          });
        } else if (operation === "searchOperationsByBank") {
          const bankId = this.getNodeParameter("bankId", itemIndex) as string;
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/operacoes/banco/${bankId}`,
            headers,
            json: true,
          });

          // Notifications
        } else if (operation === "listNotifications") {
          responseData = await this.helpers.httpRequest({
            method: "GET",
            url: `${baseUrl}/api/v2/notificacoes`,
            headers,
            json: true,
          });
        } else if (operation === "sendNotification") {
          const notificationTitle = this.getNodeParameter(
            "notificationTitle",
            itemIndex
          ) as string;
          const notificationMessage = this.getNodeParameter(
            "notificationMessage",
            itemIndex
          ) as string;
          const recipientType = this.getNodeParameter(
            "recipientType",
            itemIndex
          ) as string;
          const recipientId = this.getNodeParameter(
            "recipientId",
            itemIndex,
            ""
          ) as string;

          const notificationData: any = {
            titulo: notificationTitle,
            mensagem: notificationMessage,
            tipo_destinatario: recipientType,
          };

          if (recipientId && recipientType !== "all") {
            notificationData.destinatario_id = recipientId;
          }

          responseData = await this.helpers.httpRequest({
            method: "POST",
            url: `${baseUrl}/api/v2/notificacoes`,
            headers,
            body: notificationData,
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
