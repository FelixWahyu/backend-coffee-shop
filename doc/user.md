# API Spec

## Register User

Endpoint : POST /api/users

Request Body:

```json
{
  "name": "Felix Wahyu",
  "username": "felixws",
  "password": "password"
}
```

Response Body (Success):

```json
{
  "data": {
    "name": "Felix Wahyu",
    "username": "felixws"
  }
}
```

Response Body (Failed):

```json
{
  "errors": {
    "messageName": "Name must be filled",
    "messageUsername": "Username must be filled",
    "messagePassword": "Password must be filled"
  }
}
```

## Login User

Endpoint : POST /api/users/login

Request Body:

```json
{
  "username": "felixws",
  "password": "password"
}
```

Response Body (Success):

```json
{
  "data": {
    "name": "Felix Wahyu",
    "username": "felixws",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
  }
}
```

Response Body (Failed):

```json
{
  "errors": {
    "messageUsername": "Username is not registered",
    "messagePassword": "Password is invalid"
  }
}
```

## Get User

Endpoint : GET /api/users/current

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "name": "Felix Wahyu",
    "username": "felixws"
  }
}
```

Response Body (Failed):

```json
{
  "errors": {
    "message": "Unauthorized"
  }
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header:

- X-API-TOKEN : token

Request Body:

```json
{
  "name": "Felix Wahyu", // tidak wajib
  "username": "felixws", // tidak wajib
  "password": "password" // tidak wajib
}
```

Response Body (Success):

```json
{
  "data": {
    "name": "Felix Wahyu",
    "username": "felixws"
  }
}
```

Response Body (Failed):

```json
{
  "errors": {
    "message": "Unauthorized"
  }
}
```

## Delete User

Endpoint : DELETE /api/users/current

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": {
    "message": "User is not found"
  }
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed):

```json
{
  "errors": {
    "message": "Unauthorized"
  }
}
```
