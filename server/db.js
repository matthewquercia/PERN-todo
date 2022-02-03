//connect to database
const Pool = require('pg').Pool;

//needed in order to connect to the DB. We supply user, password, host, port, and database name
const pool = new Pool({
    user: "",
    password: "",
    host: "localhost",
    port: 5432,
    database: "perntodo"
});

module.exports = pool;