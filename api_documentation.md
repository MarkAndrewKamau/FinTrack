# FinTrack API Documentation

## Overview
FinTrack allows users to manage financial reports, user registration, authentication, and notifications.

### Base **URL**
`http://localhost:8000/`

---

## Authentication

### 1. Obtain Access and Refresh Tokens
**Endpoint**: `/api/token/`  
**Method**: `POST`  
**Description**: Retrieves JWT access and refresh tokens by providing valid user credentials.

**Request Body**:
```
{
  "username": "string",
  "password": "string"
}
```

**Response**
```
{
  "access": "string"
}
```

### 2. Expenses
**Endpoint**: `/api/expenses/`  
**Method**: `POST`(Add Expenses), `GET`(Show Expenses), `DELETE`(Remove Expense)  
**Description**: Shows all available Expenses.

### 3. Incomes
**Endpoint**: `/api/incomes/`  
**Method**: `POST`(Add Income), `GET`(Show Incomes), `DELETE`(Remove Income)  
**Description**: Shows all available Incomes.

### 4. Budgets
**Endpoint**: `/api/budgets/`  
**Method**: `POST`(Add Budget), `GET`(Show Budgets), `DELETE`(Remove Budget)  
**Description**: Show all available Budgets.

### 5. Refresh Access Token
**Endpoint**: `/api/token/refresh/`  
**Method**: `POST`  
**Description**: Obtain a new access token by providing a valid refresh token.

**Request Body**:
```
{
  "refresh": "string"
}
```

**Response**:
```
{
  "access": "string"
}
```


## Financial Reports
### 6. List/Create Financial Reports
**Endpoint**: `/financial-report/`   
**Method**: `GET` (List), `POST` (Create)   
**Description**: Fetches the list of financial reports or allows you to create a new financial report.

**Request Body** (for creating):

```
{
  "title": "string",
  "**description**": "string",
  "amount": "float",
  "date": "YYYY-MM-DD"
}
```


**Response** (for creating):
```
{
  "id": "integer",
  "title": "string",
  "**description**": "string",
  "amount": "float",
  "date": "YYYY-MM-DD"
}
```

### 7. Retrieve/Update/Delete a Financial Report
**Endpoint**: `/financial-report/<int:report_id>/`   
**Method**: `GET`, `PUT`, `DELETE`  
**Description**: Fetch, update, or delete a specific financial report by ID.

**Request Body** (for updating):
```
{
  "title": "string",
  "**description**": "string",
  "amount": "float",
  "date": "YYYY-MM-DD"
}
```

**Response** (for updating):
```
{
  "id": "integer",
  "title": "string",
  "**description**": "string",
  "amount": "float",
  "date": "YYYY-MM-DD"
}
```

## User Registration and Authentication
### 8. User Registration
**Endpoint**: `/api/register/`   
**Method**: `POST`  
**Description**: Registers a new user.

**Request Body**:
```
{
  "username": "string",
  "email": "string",
  "password1": "string",
  "password2": "string"
}
```

**Response**:
```
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

### 9. Authentication (Sign up/Sign in)
**URL**: `/api/auth/`
**Method**: `POST`
**Description**: Handles user authentication, including sign up and sign in.

### 10. Account Management
#### Get User Profile
**Endpoint**: `/api/auth/accounts/`   
**Method**: `GET`   
**Description**: Retrieves the authenticated user's profile information.

## Notifications
### 11. List Notifications
**Endpoint**: `/api/notifications/`  
**Method**: `GET`   
**Description**: Retrieves a list of notifications for the authenticated user.

**Response**:
```
[
  {
    "id": "integer",
    "message": "string",
    "created_at": "YYYY-MM-DDTHH:MM:SSZ"
  }
]
```

## Router-based Endpoints
All API endpoints prefixed with /api/ are included by the router from Django REST Framework, providing a clean interface for interacting with various resources.

## Additional **Endpoint**s
| Feature    | Endpoint   | Description |
|------------|------------|-------------|
| Swagger UI | `/swagger/` | Interactive API documentation with Swagger UI |
| Redoc UI   | `/redoc/`   | Interactive API documentation with Redoc UI   |

## Error Responses

Common error responses for the API include:

- **400 Bad Request**: Returned when the request cannot be processed due to client error (e.g., validation errors).
- **401 Unauthorized**: Returned when authentication is required and has failed or has not been provided.
- **404 Not Found**: Returned when a requested resource could not be found.
- **500 Internal Server Error**: Returned when an unexpected error occurs on the server side.

## Conclusion
This document serves as a basic overview of your API. You can enhance it with more details such as example error **response**s, request headers, or more detailed **description**s for each endpoint.