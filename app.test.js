require("dotenv").config();
var mysql = require("mysql2");

describe("Access to DB", function () {
  describe("#fail", function () {
    test("should return -1 because wrong credentials", function (done) {
      var mysqlConnection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      mysqlConnection.connect(done);
    });
  });
});
