# Medical Diagnosis Test Data API

A dynamic API which fetches medical diagnosis test data from the central data warehouse based on the user requirements.

Created using MySQL database.

ETL pipeline used to populate data in data warehouse [medical-diagnosis-data-etl](https://github.com/idhamija/medical-diagnosis-data-etl)

### Installation

```
git clone https://github.com/idhamija/medical-diagnosis-data-api.git
cd medical-diagnosis-data-api
npm run install-dependencies
```

### Setup

Create a .env file in the following format:

```
MYSQL_HOST = <MYSQL_HOST>
MYSQL_DB = <MYSQL_DB_NAME>
MYSQL_USER = <MYSQL_USERNAME>
MYSQL_PASSWORD = <MYSQL_PASSWORD>
```

### Run Development Server

```
npm run dev
```

### Built Using

- [React](https://reactjs.org/) - JavaScript Library for Building User Interfaces
- [Node](https://nodejs.org/) - JavaScript Runtime Built on Chrome's V8 JavaScript Engine
- [Express](https://expressjs.com/) - Node.js Framework for HTTPS Server
