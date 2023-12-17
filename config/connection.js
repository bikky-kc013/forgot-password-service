const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "",
});

connection.query(
  `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`,
  (error) => {
    if (error) {
      console.log(error);
    }
    connection.query(`USE ${process.env.DB_NAME}`, (error) => {
      if (error) {
        console.log(error);
      }
      console.log(`Using database ${process.env.DB_NAME}`);

      createTable();
    });
  }
);
const CreateConnection = async () => {
  try {
    await connection.promise().connect();
    console.log("connected to the database");
  } catch (error) {
    console.log(error);
  }
};

const createTable = async () => {
  connection.query(`CREATE TABLE IF NOT EXISTS user(
    user_id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    otp INT NULL,
    password VARCHAR(250),
    email VARCHAR(250)
  )`);
};

module.exports = {
  connection,
  CreateConnection,
  createTable,
};
