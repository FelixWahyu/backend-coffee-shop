# API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header:

- X-API-TOKEN : token

Request Body:

```json
{
  "first_name": "Felix",
  "last_name": "Wahyu Sejati",
  "email": "felix@gmail.com",
  "phone": "081234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Felix",
    "last_name": "Wahyu Sejati",
    "email": "felix@gmail.com",
    "phone": "081234567890"
  }
}
```

Response Body (Failed)

```json
{
  "errors": {
    "message": "first name must be filled"
  }
}
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Felix",
    "last_name": "Wahyu Sejati",
    "email": "felix@gmail.com",
    "phone": "081234567890"
  }
}
```

Response Body (Failed)

```json
{
  "errors": {
    "message": "Contact not found"
  }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header:

- X-API-TOKEN : token

Request Body:

```json
{
  "first_name": "Felix",
  "last_name": "Wahyu Sejati",
  "email": "felix@gmail.com",
  "phone": "081234567890"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "first_name": "Felix",
    "last_name": "Wahyu Sejati",
    "email": "felix@gmail.com",
    "phone": "081234567890"
  }
}
```

Response Body (Failed)

```json
{
  "errors": {
    "message": "first name must be filled"
  }
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:id

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": "OK"
}
```

Response Body (Failed)

```json
{
  "errors": {
    "message": "Contact not found or not authorized"
  }
}
```

## Search Contact

Endpoint : GET /api/contacts

Query Parameter:

- name: string, contact first name or last name, optional
- email: string, contact email, optional
- phone: string, contact phone number, optional
- page : number, page number, default 1
- size : number, page size, default 10

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "Felix",
      "last_name": "Wahyu Sejati",
      "email": "felix@gmail.com",
      "phone": "081234567890"
    },
    {
      "id": 2,
      "first_name": "Felix",
      "last_name": "Wahyu Sejati",
      "email": "felix@gmail.com",
      "phone": "081234567890"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed)

```json
{
  "errors": {
    "message": "Unauthorized"
  }
}
```
