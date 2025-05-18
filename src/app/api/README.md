# Luxora Restaurant API Documentation

This document provides a comprehensive overview of all available API endpoints in the Luxora Restaurant application.

## Base URL

All API endpoints are prefixed with `/api`

## Authentication

Authentication is handled through NextAuth.js. Protected routes require a valid session.

## Routes

### Authentication

-   `/auth`
    -   `/[...nextauth]` (GET, POST) - Handle authentication callbacks and requests

### Admin

-   `/admin`
    -   `/contact` (GET) - Get all contact messages (paginated)
    -   `/events` (GET, POST) - List/Create events
        -   `/:eid` (DELETE, PUT) - Delete/Update specific event
    -   `/gallery` (GET, POST) - List/Create gallery images
        -   `/:gid` (DELETE) - Delete specific gallery image
    -   `/menu` (POST) - Create menu item
        -   `/:mid` (DELETE) - Delete specific menu item
    -   `/messages` (GET) - List all messages
        -   `/:mid` (DELETE) - Delete specific message
    -   `/reservations` (GET) - List all reservations
        -   `/:rid` (DELETE) - Delete specific reservation
    -   `/stats` (GET) - Get dashboard statistics
    -   `/testimonials` (POST) - Create testimonial
        -   `/:tid` (DELETE) - Delete specific testimonial

### Public

-   `/contact` (POST) - Submit contact form
-   `/events` (GET) - List all events (paginated)
-   `/gallery` (GET) - List all gallery images (paginated)
-   `/menu` (GET) - List all menu items (paginated)
-   `/reservations`
    -   `/` (POST) - Create new reservation
    -   `/:rid` (GET) - Get specific reservation
    -   `/booked-dates` (GET) - Get all booked dates
-   `/testimonials` (GET) - List all testimonials (paginated)

### Test

-   `/test` (GET, POST) - Test endpoints for model operations

## Common Features

### Pagination

Most list endpoints support pagination with the following query parameters:

-   `page` (default: 1) - Page number
-   `limit` (default: 10) - Items per page

Example: `/api/events?page=1&limit=20`

### Response Format

All endpoints return responses in a consistent format:

```typescript
// Success Response
{
  success: true,
  data: T,           // Response data
  pagination?: {     // Present in paginated responses
    total_pages: number,
    limit: number,
    current_page: number,
    has_next_page: boolean
  }
}

// Error Response
{
  success: false,
  error: string,
  message: string
}
```

### Status Codes

-   `200` - Successful GET request
-   `201` - Successful POST request
-   `400` - Bad request
-   `401` - Unauthorized
-   `404` - Resource not found
-   `500` - Server error

## Notes

-   All admin routes require authentication
-   Protected routes are handled through NextAuth.js
-   Database operations are performed using Prisma ORM
-   Error handling is uniform across all endpoints
-   File uploads are handled through the appropriate endpoints
-   All timestamps are in ISO 8601 format
