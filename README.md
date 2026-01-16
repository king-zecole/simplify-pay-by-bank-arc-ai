# BankVerify SPA

A responsive React-based Single Page Application demonstrating **TDD**, **Clean Architecture**, and **Design Patterns**.

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
lib/
├── domain/           # Enterprise Business Rules
│   ├── entities/     # Business objects (User, Bank, Verification)
│   └── use-cases/    # Application business rules
├── infrastructure/   # External interfaces
│   └── repositories/ # API implementations
├── presentation/     # UI layer
│   └── hooks/        # React hooks for state management
└── __tests__/        # Unit tests (TDD)
```

## 🎨 Design Patterns Used

1. **Strategy Pattern** - Validation strategies for different field types
2. **Factory Pattern** - Bank entity creation
3. **Repository Pattern** - Data access abstraction
4. **State Machine** - Onboarding flow management
5. **Value Objects** - IBAN and Email validation

## 🧪 TDD Approach

Tests are located in \`lib/__tests__/\` and cover:
- Domain entities and value objects
- Use case business logic
- Validation strategies

Run tests:
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## 🐳 Docker Setup

Launch the full stack with a single command:

```bash
# Build and start
docker-compose up --build

# Production mode with nginx
docker-compose --profile production up --build

# Stop
docker-compose down
```

## 📱 Features

- **Mobile-first** responsive design
- **Screen 1**: User registration with validation
- **Screen 2**: Bank selection with visual feedback
- **Screen 3**: Success confirmation
- **API microservice** for bank verification

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Development
npm run dev

# Production build
npm run build
npm start
```

## 📋 API Endpoints

- \`GET /api/verify\` - Health check
- \`POST /api/verify\` - Bank verification

## 🔒 Security

- Input validation with Value Objects
- IBAN format validation
- Email format validation
- Rate limiting (via Nginx)
- Security headers configured
```
