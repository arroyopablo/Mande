const { Client } = require('pg')

const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'mande',
  password: 'cjloco1996',
  port: 5432,
}

const client = new Client(connectionString)

module.exports = { client };