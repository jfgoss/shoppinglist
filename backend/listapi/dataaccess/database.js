const mariadb = require('mariadb')

const dbHost = process.env.SHOPPING_LIST_DB_HOST ?? "127.0.0.1"
const dbPort = process.env.SHOPPING_LIST_DB_PORT ? parseInt(process.env.SHOPPING_LIST_DB_PORT) : 3306
const dbName = process.env.SHOPPING_LIST_DB_NAME ?? "shopping_list_db"
const dbUser = process.env.SHOPPING_LIST_DB_USER ?? "shoppinglistapp"
const dbPassword = process.env.SHOPPING_LIST_DB_PASSWORD ?? ""

let pool

const initDbConnection = () => {
  console.log(`Creating DB connection to ${dbHost}:${dbPort}/${dbName} user ${dbUser}`)
  const options = {
     host: dbHost,
     port: dbPort,
     database: dbName,
     user: dbUser,
     connectionLimit: 5,
  }
  if (dbPassword) {
    options.password = dbPassword
    console.debug("Using password from $SHOPPING_LIST_DB_PASSWORD")
  } else {
    console.warn("No $SHOPPING_LIST_DB_PASSWORD environment variable set?")
  }

  pool = mariadb.createPool(options)
  console.debug("DB connection pool created")
}

const closeDbConnection = () => {
  pool.end()
}

const executeCommand = async (sqlCommands) => {
  let conn
  const results = []
  try {
    conn = await pool.getConnection()

    // In sequence and block until complete all commands
    for (const command of sqlCommands) {
      // Use parameterised queries to prevent injection
      const res = await conn.query(command.sql, command.parameters)
      results.push(res)
    }
  } catch (err) {
  	throw err
  } finally {
	  if (conn) {
      conn.end()
    }
  }
  return results
}

module.exports = {
  initDbConnection,
  closeDbConnection,
  executeCommand
}
