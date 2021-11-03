require("dotenv").config();

var mysql = require("mysql2");
var sequelizeORM = require("sequelize");

describe("Access to DB", function () {
  describe("success connection", function () {
    test("MYSQL2 adapter", function (done) {
      var mysqlConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      mysqlConnection.connect(done);
    });
    test("SEQUELIZE orm", function (done) {
      var seqConnection = new sequelizeORM.Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
          host: process.env.DB_HOST,
          dialect: "mysql",
        }
      );
      seqConnection.authenticate().then(done);
    });
  });
});
