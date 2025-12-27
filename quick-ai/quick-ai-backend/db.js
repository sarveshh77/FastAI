const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL successfully"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err.message));

module.exports = pool;


// const { Pool } = require('pg');
// require('dotenv').config();

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// // Test the connection
// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('❌ Error acquiring client', err.stack);
//   }
//   console.log('✅ PostgreSQL database connected successfully!');
//   client.release();
// });

// module.exports = pool;