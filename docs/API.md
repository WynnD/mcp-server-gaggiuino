# Gaggiuino API Reference

This document describes the API endpoints provided by the Gaggiuino-modified espresso machine that this MCP server interfaces with.

## REST API Endpoints

### 1. Shots API

#### `POST /api/shots`

**Description:**
* Handles shot persistence (streamed upload).
* Used to log espresso shot data.

**Request Body:**
```json
{
  "metadata": {
    "profile": "classic",
    "beanName": "Ethiopian Yirgacheffe",
    "grindSetting": 18,
    "doseWeight": 18.5,
    "brewRatio": 2.0,
    "notes": "Slightly finer grind than usual"
  },
  "dataPoints": [
    {
      "timestamp": 0,
      "temperature": 93.2,
      "pressure": 0,
      "flow": 0,
      "weight": 0
    },
    {
      "timestamp": 1000,
      "temperature": 93.3,
      "pressure": 3.5,
      "flow": 0.5,
      "weight": 0
    }
    // Additional data points...
  ]
}
```

**Response:**
* `200 OK` with the ID of the newly created shot
* `400 Bad Request` if the data format is invalid
* `500 Internal Server Error` if an error occurs during storage

#### `GET /api/shots/latest`

**Description:**
* Handles retrieving the identifier for the last history shot.

**Response:**
* `200 OK` with the ID of the latest shot as a string
* `404 Not Found` if no shots exist
* `500 Internal Server Error` if an error occurs during retrieval

#### `GET /api/shots/{id}`

**Description:**
* Handles retrieving shot data for a specific shot.
* The ID is used to specify the individual shot.

**Parameters:**
* `id` (path parameter): The ID of the shot to retrieve

**Response:**
* `200 OK` with the shot data
* `404 Not Found` if the specified shot does not exist
* `500 Internal Server Error` if an error occurs during retrieval

### 2. Profiles API

#### `GET /api/profiles/all`

**Description:**
* Retrieves all available profiles

**Response:**
* `200 OK` with an array of profile objects
* `500 Internal Server Error` if an error occurs during retrieval

#### `POST /api/profile-select/{id}`

**Description:**
* Selects a specific profile.
* The ID represents the profile identifier.

**Parameters:**
* `id` (path parameter): The ID of the profile to select

**Response:**
* `200 OK` if the profile is successfully selected
* `404 Not Found` if the specified profile does not exist
* `500 Internal Server Error` if an error occurs during selection

#### `DELETE /api/profile-select/{id}`

**Description:**
* Deletes a specific profile.
* The ID represents the profile identifier.

**Parameters:**
* `id` (path parameter): The ID of the profile to delete

**Response:**
* `200 OK` if the profile is successfully deleted
* `404 Not Found` if the specified profile does not exist
* `500 Internal Server Error` if an error occurs during deletion

### 3. System API

#### `GET /api/system/status`

**Description:**
* Handles retrieving the system sensors' latest data.

**Response:**
* `200 OK` with the system status data
```json
{
  "temperature": 93.5,
  "pressure": 0,
  "state": "idle",
  "heaterPower": 0,
  "steamMode": false
}
```
* `500 Internal Server Error` if an error occurs during retrieval

## Data Structures

### Shot Data

```typescript
interface Shot {
  id: string;
  timestamp: string;
  duration: number;
  data: {
    temperature: number[];
    pressure: number[];
    flow: number[];
    weight?: number[];
    timePoints: number[];
  };
}
```

### Profile Data

```typescript
interface Profile {
  id: string;
  name: string;
  description?: string;
  parameters: {
    // Profile-specific parameters like temperature, pressure targets, etc.
    [key: string]: any;
  };
}
```

### System Status Data

```typescript
interface SystemStatus {
  temperature: number;
  pressure: number;
  state: string; // 'idle', 'brewing', 'steaming', etc.
  heaterPower: number;
  steamMode: boolean;
}
```

## Error Responses

All API endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "Bad Request",
  "message": "Invalid data format"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "The requested resource does not exist"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```
