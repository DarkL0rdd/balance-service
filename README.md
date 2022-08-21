
# Balance service

1. Adding funds to a user's account.
2. Withdrawing funds from the user's account.
3. Transferring funds from one account to another user's account.


## Tech Stack

**Server:** JavaScript, Node(v16.16.0), Express, MongoDB

**Test:** Postman, Jest


## Installation

1. Clone the repo:

```bash
git clone https://github.com/DarkL0rdd/balance-service.git
```

2. Go to the project directory:
```bash
cd balance-service
```

3. Install NPM packages:
```bash
npm install
```
4. Create .env file (see .env.example or Environment Variables).

5. Start the server:
```bash
npm run start or npm run dev
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file:
`SERVER_PORT=`

`DB_USER=`

`DB_PASS=`

`DB_NAME=`

`DB_HOST=`
## Postman usage

1. Import the file ```balance-service.postman_collection.json``` in Postman. 
2. Change the port and localhost to yours.
## API Reference

#### Increase the user's balance:

```http
  POST /transaction/add
```

| Parameter | Type     | Value           | Description                         |
| :-------- | :------- | :-------------- | :---------------------------------- |
| `id`      | `string` |                 | **Required**. User ID.              |
| `type`    | `string` | "Replenishment" | **Required**. Transaction type.     |
| `amount`  | `number` |                 | **Required**. Replenishment amount. |

#### Decrease the user's balance:

```http
  POST /transaction/reduce
```

| Parameter | Type     | Value           | Description                         |
| :-------- | :------- | :-------------- | :---------------------------------- |
| `id`      | `string` |                 | **Required**. User ID.              |
| `type`    | `string` | "Write-off"     | **Required**. Transaction type.     |
| `amount`  | `number` |                 | **Required**. Withdrawal amount.    |

#### Transfer user money to another account:

```http
  POST /transaction/transfer
```

| Parameter     | Type     | Value           | Description                         |
| :------------ | :------- | :-------------- | :---------------------------------- |
| `id`          | `string` |                 | **Required**. User ID.              |
| `type`        | `string` | "Transfer"      | **Required**. Transaction type.     |
| `destination` | `string` |                 | **Required**. Recipient ID.         |       
| `amount`      | `number` |                 | **Required**. Withdrawal amount.    |

#### Show all user transactions:

```http
  GET /transaction/show 
```
| Parameter     | Type     | Description             |
| :------------ | :------- | :---------------------- |
| `id`          | `string` | **Required**. User ID.  |

#### "Quick" creation users:

```http
  POST /balance/create-user
```

#### Show user balance:

```http
  GET /balance/show 
```
| Parameter     | Type     | Description             |
| :------------ | :------- | :---------------------- |
| `id`          | `string` | **Required**. User ID.  |

