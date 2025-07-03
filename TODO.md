# Corbee Gestão n8n Node - Implementation TODO

## Phase 1: Foundation (High Priority)
- [ ] **Project Setup**
  - Create package.json with proper n8n configuration
  - Set up TypeScript configuration
  - Create folder structure (credentials/, nodes/, etc.)

- [ ] **Authentication System**
  - Implement Corbee Gestao credentials file
  - Add broker authentication support
  - Add user authentication support
  - Handle token management and refresh

- [ ] **Base Node Structure**
  - Create CorbeeGestao.node.ts with base structure
  - Configure node metadata and properties
  - Set up operation selection framework

## Phase 2: Core Proposal Operations (High Priority)
- [ ] **Essential Proposal Features**
  - Create FGTS Proposal (`POST /proposals/fgts`)
  - Search Proposals (`GET /proposals/search`)
  - Get Proposal Details (`GET /proposals/{id}`)
  - Update Proposal Status (`PUT /proposals/{id}/status`)
  - Update Bank Status (`PUT /proposals/{id}/bank-status`)

- [ ] **Proposal Management**
  - Register Proposal (`POST /proposals/register`)
  - Enter Proposal in Bank (`POST /proposals/{id}/bank-entry`)
  - Cancel Proposal (`DELETE /proposals/{id}`)
  - View Proposal Logs (`GET /proposals/{id}/logs`)

## Phase 3: Document & Observation Management (Medium Priority)
- [ ] **Document Operations**
  - Send Proposal Documents (`POST /proposals/{id}/documents`)
  - List/Download Proposal Files (`GET /proposals/{id}/files`)

- [ ] **Observation System**
  - Add Broker Observation (`POST /proposals/{id}/observations`)
  - View Broker Observations (`GET /proposals/{id}/observations`)

- [ ] **Additional Proposal Features**
  - Add Portability Balance (`POST /proposals/{id}/portability-balance`)
  - Modify/Remove Payment Terms (`PUT /proposals/{id}/payment-terms`)

## Phase 4: Broker & Product Management (Medium Priority)
- [ ] **Broker Operations**
  - Register Brokers (`POST /brokers`)
  - Update Broker Information (`PUT /brokers/{id}`)
  - List Active Brokers (`GET /brokers/active`)
  - Get Logged Broker Details (`GET /brokers/me`)

- [ ] **Product Management**
  - List Products (`GET /products`)
  - Get Product by ID (`GET /products/{id}`)
  - List Product Types (`GET /products/types`)
  - List Bank Operations (`GET /products/bank-operations`)
  - List Bank Agreements (`GET /products/bank-agreements`)

## Phase 5: Pending Items & Reference Data (Medium Priority)
- [ ] **Pending Items System**
  - Create Pending Item (`POST /pending-items`)
  - Search Pending Items (`GET /pending-items/search`)
  - View Pending Item Messages (`GET /pending-items/{id}/messages`)
  - Resolve Pending Items (`PUT /pending-items/{id}/resolve`)

- [ ] **Reference Data**
  - List Proposal Statuses (`GET /proposals/statuses`)
  - List Bank Statuses (`GET /proposals/bank-statuses`)
  - List Cancellation Types (`GET /proposals/cancellation-types`)
  - List Pending Item Types (`GET /pending-items/types`)

## Phase 6: Utility & Support Features (Low Priority)
- [ ] **General Utilities**
  - List Banks (`GET /utilities/banks`)
  - List States (`GET /utilities/states`)
  - List Cities (`GET /utilities/cities`)

- [ ] **Financial Operations**
  - Get Cost Centers (`GET /financial/cost-centers`)

- [ ] **User Management**
  - List Users (`GET /users`)

## Phase 7: Advanced Features (Low Priority)
- [ ] **Notifications**
  - Get Notifications (`GET /notifications`)

- [ ] **Reporting**
  - Generate Reports (`POST /reports/generate`)

- [ ] **Telemarketing**
  - Get Telemarketing Campaigns (`GET /telemarketing/campaigns`)

## Phase 8: Quality & Enhancement (Medium Priority)
- [ ] **Error Handling & Validation**
  - Comprehensive error handling for all endpoints
  - Input validation and sanitization
  - Rate limiting and timeout management

- [ ] **LLM Tool Compatibility**
  - Add `usableAsTool: true` configuration
  - Implement proper array handling for LLM responses
  - Add descriptive operation names and descriptions

- [ ] **Testing & Documentation**
  - Create comprehensive test suite
  - Write usage examples and documentation
  - Create node icon and visual assets

## Implementation Priority Levels

### **Start Here (Phase 1-2)**
Essential for basic functionality - authentication and core proposal operations.

### **Next Steps (Phase 3-4)**
Important features that extend core functionality - document management and broker operations.

### **Enhancement (Phase 5-6)**
Supporting features that improve usability - pending items and utility endpoints.

### **Polish (Phase 7-8)**
Advanced features and quality improvements - notifications, reporting, and testing.

## Endpoint Integration Sequence Options

Choose one of these sequences based on your immediate needs:

### **Option A: Proposal-Focused**
1. Authentication → Core Proposals → Document Management → Broker Management

### **Option B: Broker-Focused**
1. Authentication → Broker Management → Core Proposals → Product Management

### **Option C: Complete Foundation**
1. Authentication → Reference Data → Core Proposals → All Management Features

Which sequence would you prefer to start with?