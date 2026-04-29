# Card Validation API

A RESTful API built with Node.js, TypeScript, and Express that validates credit/debit card numbers using the **Luhn Algorithm**. Designed with a clean, modular architecture that separates concerns across controllers, services, schemas, and middleware.

---

## Key Technologies

| Technology               | Purpose                                      |
| ------------------------ | -------------------------------------------- |
| Node.js                  | Runtime environment                          |
| TypeScript (strict mode) | Static typing and compile-time safety        |
| Express                  | HTTP server and routing                      |
| Zod                      | Request schema validation and type inference |
| Jest + Supertest         | Unit and integration testing                 |

---

## Architecture Decisions

### Controller-Service Pattern

Business logic is fully decoupled from the HTTP layer. Controllers handle request/response, while services contain the core validation logic. This makes the service layer independently testable and reusable without any Express dependency.

### Startup Pattern

`index.ts` is kept minimal and clean. Middleware registration and route mounting are handled in dedicated `src/startup/middleware.ts` and `src/startup/routes.ts` modules. This avoids a bloated entry point and makes each concern easy to locate and modify.

### Luhn Algorithm

Card number validation uses the Luhn Algorithm — the industry-standard checksum formula used by all major card networks (Visa, Mastercard). It provides fast, reliable, offline validation without any external API calls.

### Zod for Schema Validation

Zod is used to validate and parse incoming request bodies before they reach the controller. It provides a single source of truth for input shape, automatically infers TypeScript types, and returns structured, human-readable error messages on invalid input.

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

The server starts with hot-reloading via `nodemon`.

### Run Tests

```bash
npm test
```

---

## API Documentation

### `GET /health`

Returns the current system status.

**Response**

```json
{
  "status": 200,
  "timeStamp": "2026-04-29T02:31:17.968Z"
}
```

---

### `POST /api/v1/card/validate`

Validates a card number using the Luhn Algorithm.

**Request Body**

```json
{
  "cardNumber": "4111111111111111"
}
```

**Success Response** `200 OK`

```json
{
  "success": true,
  "status": 200,
  "message": "Card number is valid"
}
```

**Validation Error Response** `400 Bad Request`

```json
{
  "success": false,
  "status": 400,
  "message": "Card number is too short"
}
```

---

## Error Handling

All errors are handled by a global error middleware (`src/middleware/error.middleware.ts`) that intercepts unhandled exceptions and returns a consistent JSON response shape across the entire API.

| Status Code | Meaning                            |
| ----------- | ---------------------------------- |
| `200`       | Request successful                 |
| `400`       | Invalid input / validation failure |
| `404`       | Route not found                    |
| `500`       | Internal server error              |
