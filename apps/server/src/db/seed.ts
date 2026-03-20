import pg from 'pg'
import { DATABASE_URL } from '../constants.ts'

function getConnectionUrlTemplate0() {
  const uri = new URL(DATABASE_URL)
  return `postgresql://${uri.username}:${uri.password}@${uri.host}/template1`
}

const databaseName = new URL(DATABASE_URL).pathname.slice(1)

const client = new pg.Client({ connectionString: getConnectionUrlTemplate0() })
await client.connect()
await client.query(`DROP DATABASE IF EXISTS ${databaseName}`)
await client.query(`CREATE DATABASE ${databaseName}`)

console.log('database created')

process.exit()