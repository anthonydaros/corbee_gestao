# Corbee Gestão API Endpoints

## Base URL
`https://api.gestao.corbee.com.br`

## Authentication

### Broker Authentication
- **Endpoint**: `POST /auth/broker`
- **Description**: Generate access token for brokers
- **Parameters**: 
  - `username` (string): Broker username
  - `password` (string): Broker password
- **Response**: Access token with expiration

### User Authentication
- **Endpoint**: `POST /auth/user`
- **Description**: Generate access token for users
- **Parameters**:
  - `username` (string): User username
  - `password` (string): User password
- **Response**: Access token with expiration

## Proposals

### Create FGTS Proposal
- **Endpoint**: `POST /proposals/fgts`
- **Description**: Create a new FGTS proposal
- **Parameters**: Customer data, simulation details, split configuration
- **Response**: Proposal ID and status

### Enter Proposal in Bank
- **Endpoint**: `POST /proposals/{id}/bank-entry`
- **Description**: Submit proposal to bank system
- **Parameters**: Proposal ID, bank-specific data
- **Response**: Bank entry confirmation

### Register Proposal
- **Endpoint**: `POST /proposals/register`
- **Description**: Register a new proposal in the system
- **Parameters**: Complete proposal data
- **Response**: Registration confirmation

### Send Proposal Documents
- **Endpoint**: `POST /proposals/{id}/documents`
- **Description**: Upload documents for a proposal
- **Parameters**: Proposal ID, document files
- **Response**: Document upload status

### Add Broker Observation
- **Endpoint**: `POST /proposals/{id}/observations`
- **Description**: Add broker observation to proposal
- **Parameters**: Proposal ID, observation text
- **Response**: Observation ID

### Search Proposals
- **Endpoint**: `GET /proposals/search`
- **Description**: Search proposals with filters
- **Parameters**: Search criteria, pagination
- **Response**: List of matching proposals

### View Proposal Logs
- **Endpoint**: `GET /proposals/{id}/logs`
- **Description**: Get proposal activity logs
- **Parameters**: Proposal ID
- **Response**: Log entries

### List Proposal Statuses
- **Endpoint**: `GET /proposals/statuses`
- **Description**: Get all available proposal statuses
- **Response**: List of status options

### List Bank Statuses
- **Endpoint**: `GET /proposals/bank-statuses`
- **Description**: Get all available bank statuses
- **Response**: List of bank status options

### Update Proposal Status
- **Endpoint**: `PUT /proposals/{id}/status`
- **Description**: Update proposal status
- **Parameters**: Proposal ID, new status
- **Response**: Updated status confirmation

### Update Bank Status
- **Endpoint**: `PUT /proposals/{id}/bank-status`
- **Description**: Update bank status for proposal
- **Parameters**: Proposal ID, new bank status
- **Response**: Updated bank status confirmation

### Modify/Remove Proposal Payment Terms
- **Endpoint**: `PUT /proposals/{id}/payment-terms`
- **Description**: Modify or remove payment terms
- **Parameters**: Proposal ID, payment terms data
- **Response**: Updated payment terms

### View Broker Observations
- **Endpoint**: `GET /proposals/{id}/observations`
- **Description**: Get all broker observations for a proposal
- **Parameters**: Proposal ID
- **Response**: List of observations

### Add Portability Balance
- **Endpoint**: `POST /proposals/{id}/portability-balance`
- **Description**: Add portability balance information
- **Parameters**: Proposal ID, balance data
- **Response**: Balance confirmation

### List Cancellation Types
- **Endpoint**: `GET /proposals/cancellation-types`
- **Description**: Get available cancellation types
- **Response**: List of cancellation options

### List/Download Proposal Files
- **Endpoint**: `GET /proposals/{id}/files`
- **Description**: Get or download proposal files
- **Parameters**: Proposal ID, file type
- **Response**: File list or file data

## Brokers

### Register Brokers
- **Endpoint**: `POST /brokers`
- **Description**: Register a new broker
- **Parameters**: Broker information
- **Response**: Broker ID and registration status

### Update Broker Information
- **Endpoint**: `PUT /brokers/{id}`
- **Description**: Update broker details
- **Parameters**: Broker ID, updated information
- **Response**: Update confirmation

### List Active Brokers
- **Endpoint**: `GET /brokers/active`
- **Description**: Get all active brokers
- **Response**: List of active brokers

### Get Logged Broker Details
- **Endpoint**: `GET /brokers/me`
- **Description**: Get details of currently logged broker
- **Response**: Current broker information

## Products

### List Products
- **Endpoint**: `GET /products`
- **Description**: Get all available products
- **Response**: List of products

### Get Product by ID
- **Endpoint**: `GET /products/{id}`
- **Description**: Get specific product details
- **Parameters**: Product ID
- **Response**: Product information

### List Product Types
- **Endpoint**: `GET /products/types`
- **Description**: Get all product types
- **Response**: List of product types

### List Bank Operations
- **Endpoint**: `GET /products/bank-operations`
- **Description**: Get available bank operations
- **Response**: List of bank operations

### List Bank Agreements
- **Endpoint**: `GET /products/bank-agreements`
- **Description**: Get bank agreement options
- **Response**: List of bank agreements

### Cancel Proposal
- **Endpoint**: `DELETE /proposals/{id}`
- **Description**: Cancel a proposal
- **Parameters**: Proposal ID, cancellation reason
- **Response**: Cancellation confirmation

### Get Proposal Details
- **Endpoint**: `GET /proposals/{id}`
- **Description**: Get detailed proposal information
- **Parameters**: Proposal ID
- **Response**: Complete proposal data

## Pending Items

### Create Pending Item
- **Endpoint**: `POST /pending-items`
- **Description**: Create a new pending item
- **Parameters**: Item details, priority, assignment
- **Response**: Pending item ID

### List Pending Item Types
- **Endpoint**: `GET /pending-items/types`
- **Description**: Get available pending item types
- **Response**: List of item types

### Search Pending Items
- **Endpoint**: `GET /pending-items/search`
- **Description**: Search pending items with filters
- **Parameters**: Search criteria, status filters
- **Response**: List of matching pending items

### View Pending Item Messages
- **Endpoint**: `GET /pending-items/{id}/messages`
- **Description**: Get messages for a pending item
- **Parameters**: Pending item ID
- **Response**: List of messages

### Resolve Pending Items
- **Endpoint**: `PUT /pending-items/{id}/resolve`
- **Description**: Mark pending item as resolved
- **Parameters**: Pending item ID, resolution notes
- **Response**: Resolution confirmation

## Financial

### Cost Centers
- **Endpoint**: `GET /financial/cost-centers`
- **Description**: Get available cost centers
- **Response**: List of cost centers

## User Management

### User Operations
- **Endpoint**: `GET /users`
- **Description**: Get system users
- **Response**: List of users

## Notifications

### Notification Management
- **Endpoint**: `GET /notifications`
- **Description**: Get user notifications
- **Response**: List of notifications

## Reporting

### Generate Reports
- **Endpoint**: `POST /reports/generate`
- **Description**: Generate system reports
- **Parameters**: Report type, date range, filters
- **Response**: Report data or generation status

## Telemarketing

### Telemarketing Operations
- **Endpoint**: `GET /telemarketing/campaigns`
- **Description**: Get telemarketing campaigns
- **Response**: List of campaigns

## General Utilities

### Banks
- **Endpoint**: `GET /utilities/banks`
- **Description**: Get list of available banks
- **Response**: List of banks with codes

### States
- **Endpoint**: `GET /utilities/states`
- **Description**: Get Brazilian states
- **Response**: List of states

### Cities
- **Endpoint**: `GET /utilities/cities`
- **Description**: Get cities by state
- **Parameters**: State code
- **Response**: List of cities