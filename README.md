# @devanthonymax/n8n-nodes-corbeegestao

An n8n community node for integrating with Corbee Gestão API, providing comprehensive user and broker management capabilities.

## Features

- **Authentication**: JWT-based authentication with demo/production environment support
- **Broker Management**: Complete CRUD operations for brokers (create, read, update, list)
- **User Management**: Full user lifecycle management including profiles and managers
- **Dual Environment**: Support for both demo and production environments
- **LLM Compatible**: Designed to work as both manual nodes and LLM tools

## Installation

```bash
npm install @devanthonymax/n8n-nodes-corbeegestao
```

## Node Included

### CorbeeGestao
Single unified node providing:
- Broker CRUD (create, get, list, update)
- User management (create, update, get, list simplified)
- Profile management (list profiles, get profile details)
- Manager operations (list managers)
- Authentication automatically handled based on credential configuration

## Operations Available

All operations automatically handle JWT authentication using the configured credentials.

### Broker Operations
- `createBroker` - Create new broker with full details
- `getBroker` - Retrieve broker by ID
- `listBrokers` - List all active brokers
- `updateBroker` - Update existing broker information

### User Operations
- `createUser` - Create new user with profile assignment
- `updateUser` - Update user information
- `getUserData` - Get user details by ID
- `listUsersSimplified` - Get simplified list of active users

### Profile & Manager Operations
- `listProfiles` - List all available user profiles/roles
- `getProfileDetails` - Get detailed information about a specific profile
- `listManagers` - List all managers with details

### Proposal Operations
- `createFgtsProposal` - Register new FGTS proposal
- `submitProposalToBank` - Submit proposal for bank processing
- `createProposal` - Create new proposal (requires broker if internal user)
- `uploadProposalDocs` - Upload documents for proposal
- `addBrokerObservation` - Add broker observation to proposal
- `searchProposals` - Search proposals with filters (CPF, code, client name)
- `getProposalLogs` - Get action logs for proposal
- `listProposalStatus` - List available proposal status
- `listBankStatus` - List available bank status
- `updateProposalStatus` - Update proposal status
- `updateBankStatus` - Update bank status
- `changeProposalPmt` - Change PMT of proposal
- `removeProposalPmt` - Remove PMT from proposal
- `getBrokerObservations` - Get broker observations for proposal
- `setPortabilityBalance` - Set portability balance received from bank
- `listCancellationTypes` - List available cancellation types
- `listProposalFiles` - List files attached to proposal
- `downloadProposalFile` - Download proposal file in base64

### Commission Operations
- `listCommissionGroups` - List commission groups
- `getCommissionGroup` - Get specific commission group by ID

### Operations Management
- `listBanksWithOperations` - List banks with operations
- `searchOperationsByBank` - Search operations by specific bank

### Notifications
- `listNotifications` - List notifications
- `sendNotification` - Send notification (to all users, specific user, or role)

### Reference Data Operations
- `listBanks` - Get client banks list
- `getBankById` - Get specific bank by ID
- `listAgreements` - Get agreements list
- `getAgreementById` - Get specific agreement by ID
- `listStates` - List Brazilian states
- `getStateById` - Get specific state by ID
- `listCities` - List cities (optionally by state)
- `getCityById` - Get specific city by ID
- `listMaritalStatus` - List marital status options
- `listClientReceiptTypes` - List client receipt types
- `listProposalFilesAlt` - Alternative method to list proposal files
- `listStores` - List registered stores in the system

## Configuration

### Credentials Setup
1. Create new credentials of type "Corbee Gestão API"
2. Configure:
   - **Base URL**: API endpoint (e.g., https://demo.corbee.com.br)
   - **Login**: Your Corbee Gestão username
   - **Password**: Your Corbee Gestão password
   - **User Type**: Select "User" or "Corretor"

## Usage Examples

### List Brokers
1. Add CorbeeGestao node
2. Configure Corbee Gestão API credentials (choose user type: User or Corretor)
3. Select "List Brokers" operation
4. Execute - authentication is handled automatically

### Create New User
1. Use "List Profiles" to get available profiles
2. Use "Create User" with required fields:
   - Login, Name, Email, Profile ID, Password
   - Optional: Phone, CPF, Birth Date, Store ID, Manager ID

### Manage Proposals
1. Use "Create FGTS Proposal" to register new proposal
2. Use "Upload Proposal Documents" to attach files
3. Use "Add Broker Observation" to add notes
4. Use "Submit Proposal to Bank" when ready
5. Use "Search Proposals" to find specific proposals by CPF, code, or name

### Commission Management
1. Use "List Commission Groups" to see available groups
2. Use "Get Commission Group" to get details of specific group

### Send Notifications
1. Use "Send Notification" to notify users
2. Choose recipient type: All Users, Specific User, or Role
3. Provide title and message content

### Work with Reference Data
1. Use "List States" and "List Cities" for address forms
2. Use "List Banks" and "List Agreements" for financial setup
3. Use "List Marital Status" for client registration
4. Use "List Stores" for store management

## API Documentation

This package integrates with Corbee Gestão API v2. For detailed API documentation, visit:
- Demo: https://demo.corbee.com.br/api/documentation

## Support

- **Repository**: https://github.com/anthonydaros/corbee_gestao
- **Issues**: https://github.com/anthonydaros/corbee_gestao/issues

## License

MIT License - see LICENSE file for details.

## Author

Anthony Daros - devanthonymax@gmail.com