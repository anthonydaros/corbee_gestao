import type { ICredentialType, INodeProperties } from "n8n-workflow";

export class CorbeeGestaoApi implements ICredentialType {
  name = "corbeeGestaoApi";

  displayName = "Corbee Gestão API";

  documentationUrl = "https://demo.corbee.com.br/api/documentation";

  properties: INodeProperties[] = [
    {
      displayName: "Environment",
      name: "environment",
      type: "options",
      options: [
        {
          name: "Demo",
          value: "demo",
        },
        {
          name: "Production",
          value: "production",
        },
      ],
      default: "demo",
      description: "Environment to connect to",
    },
    {
      displayName: "Base URL",
      name: "baseUrl",
      type: "string",
      default: "https://demo.corbee.com.br",
      description: "Base URL for the Corbee Gestão API",
      displayOptions: {
        show: {
          environment: ["demo"],
        },
      },
    },
    {
      displayName: "Base URL",
      name: "baseUrl",
      type: "string",
      default: "",
      placeholder: "https://api.corbee.com.br",
      description: "Base URL for the Corbee Gestão API",
      displayOptions: {
        show: {
          environment: ["production"],
        },
      },
    },
    {
      displayName: "Login",
      name: "login",
      type: "string",
      default: "",
      description: "Your Corbee Gestão login username",
    },
    {
      displayName: "Password",
      name: "senha",
      type: "string",
      typeOptions: {
        password: true,
      },
      default: "",
      description: "Your Corbee Gestão password",
    },
    {
      displayName: "User Type",
      name: "type_user",
      type: "options",
      options: [
        {
          name: "Internal User",
          value: "interno",
        },
        {
          name: "Broker",
          value: "corretor",
        },
      ],
      default: "interno",
      description: "Type of user for authentication",
    },
  ];
}
