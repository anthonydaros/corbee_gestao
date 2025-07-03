import type {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeConnectionType, NodeOperationError } from "n8n-workflow";

export class CorbeeGestaoCorretor implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Corbee Gestão Corretor",
    name: "corbeeGestaoCorretor",
    icon: "file:archive.svg",
    group: ["transform"],
    version: 1,
    description: "Corbee Gestão API - Broker Operations",
    defaults: {
      name: "Corbee Gestão Corretor",
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
            name: "Authenticate as Broker",
            value: "authenticate",
            description: "Authenticate as broker and get JWT token",
            action: "Authenticate as broker",
          },
          {
            name: "Get My Data",
            value: "myData",
            description: "Get current broker data",
            action: "Get my broker data",
          },
        ],
        default: "authenticate",
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

        let responseData: any;

        if (operation === "authenticate") {
          responseData = await this.helpers.httpRequest({
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
        } else if (operation === "myData") {
          // This would need a specific endpoint from the API
          // For now, return a helpful message
          responseData = {
            message: "Endpoint for logged broker data not yet specified in API",
            note: "Use the Usuario node to get specific broker data by ID",
            suggestion:
              "First authenticate, then use the obtained broker ID to get data via Usuario node",
          };
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
