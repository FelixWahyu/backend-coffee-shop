# API Spec

## Create Address

Endpoint : POST /api/contact/:idContact/addresses

Request Header:

- X-API-TOKEN : token

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "12345"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "12345"
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

## Get Address

Endpoint : GET /api/contact/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "12345"
  }
}
```

Response Body (Failed):

```json
{
  "errors": {
    "message": "Address is not found"
  }
}
```

## Update Address

Endpoint : PUT /api/contact/:idContact/addresses/:idAddress

Request Header:

- X-API-TOKEN : token

Request Body:

```json
{
  "street": "Jalan apa",
  "city": "Jakarta",
  "province": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "12345"
}
```

Response Body (Success):

```json
{
  "data": {
    "id": 1,
    "street": "Jalan apa",
    "city": "Jakarta",
    "province": "DKI Jakarta",
    "country": "Indonesia",
    "postal_code": "12345"
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

## Remove Address

Endpoint : DELETE /api/contact/:idContact/addresses/:idAddress

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
    "message": "Address is not found"
  }
}
```

## List Address

Endpoint : GET /api/contact/:idContact/addresses

Request Header:

- X-API-TOKEN : token

Response Body (Success):

```json
{
  "data": [
    {
      "id": 1,
      "street": "Jalan apa",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "12345"
    },
    {
      "id": 2,
      "street": "Jalan apa",
      "city": "Jakarta",
      "province": "DKI Jakarta",
      "country": "Indonesia",
      "postal_code": "12345"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```

Response Body (Failed):

```json
{
  "errors": {
    "message": "Contact is not found"
  }
}
```
