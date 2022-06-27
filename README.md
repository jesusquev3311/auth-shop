
# Auht Shop

Simple Node JS PRODUCTS API




## Requirenments

- NodeJs ^12.22.0
- MySQL
- .env file configuration


## Installation

Install packages by running this command:
```bash
  npm install
  yarn install
```
Create a database on MySQL client, to storage model's database

```bash
CREATE DATABASE `database-name`
```

Create a .env file and add the following variables with your
database configuration:
```bash
TOKEN_SECRET=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
CORS_ORIGIN=
``` 


## Run Locally

Start the server

```bash
  npm run start
```


## API Reference

## Products

#### Get all products

```http
  GET /api/products
```

#### Get product

```http
  GET /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Update product

```http
  PUT /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |
| `payload` | `object` | **Required**. product object with changes |


#### Create product

```http
  POST /api/products/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Id of item to update |
| `type` | `string` | **Required**. product type |
| `description` | `string` | product description |


### Delete product

```http
  DELETE /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

## Users

#### Get all users

```http
  GET /api/users
```

#### Get user

```http
  GET /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Create user

```http
  POST /api/products/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `loginName`      | `string` | **Required**. username |
| `password` | `string` | **Required**. password |


#### Update user

```http
  PUT /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |
| `payload` | `object` | **Required**. user object with changes |

### Delete user

```http
  DELETE /api/users/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

## Basket

#### Get all BAsket items

```http
  GET /api/basket
```

#### Get one basket item

```http
  GET /api/basket/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Add item to basket

```http
  POST /api/basket/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userID`      | `INT` | **Required**. user id |
| `productID` | `INT` | **Required**. products id |


#### Update item from basket

```http
  PUT /api/basket/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to update |
| `payload` | `object` | **Required**. object with changes |

### Delete item from basket

```http
  DELETE /api/basket/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Register

```http
  POST /api/register/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `loginName`      | `INT` | **Required**. username |
| `password` | `INT` | **Required**. password |

## login

```http
  POST /api/login/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `loginName`      | `INT` | **Required**. username |
| `password` | `INT` | **Required**. password |

## Logout

```http
  GET /api/Logout/
```
