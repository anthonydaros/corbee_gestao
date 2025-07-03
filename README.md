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

## Nodes Included

### CorbeeGestaoUsuario
Consolidated node providing:
- Authentication operations
- Broker CRUD (create, get, list, update)
- User management (create, update, get, list simplified)
- Profile management (list profiles, get profile details)
- Manager operations (list managers)

### CorbeeGestaoCorretor
Simple broker authentication node for quick access.

## Operations Available

### Authentication
- `authenticate` - Get JWT token for API access

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

## Configuration

### Credentials Setup
1. Create new credentials of type "Corbee Gestão API"
2. Configure:
   - **Environment**: Choose Demo or Production
   - **Login**: Your Corbee Gestão username
   - **Password**: Your Corbee Gestão password
   - **User Type**: Select "Internal User" or "Broker"

### Environment URLs
- **Demo**: `https://demo.corbee.com.br`
- **Production**: Configure your production URL

## Usage Examples

### Authenticate and List Brokers
1. Add CorbeeGestaoUsuario node
2. Select "Authenticate" operation
3. Add another CorbeeGestaoUsuario node
4. Select "List Brokers" operation
5. Connect the nodes

### Create New User
1. Use "List Profiles" to get available profiles
2. Use "Create User" with required fields:
   - Login, Name, Email, Profile ID, Password
   - Optional: Phone, CPF, Birth Date, Store ID, Manager ID

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