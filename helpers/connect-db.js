var ff = require("ff");
var seqConnection =
  require("../services/connectors/connect-db-sequelize").seqConnection;
var knexConnection =
  require("../services/connectors/connect-db-knex").knexConnection;

function testConnectionToDBsequelize() {
  console.log("SEQUELIZE: Checking database connection...");
  var f = ff(this, tryToConnect).onComplete(onCompleteHandlerSequelize);

  function tryToConnect() {
    seqConnection.authenticate().then(f.wait());
  }

  function onCompleteHandlerSequelize(error) {
    if (error) {
      console.log("SEQUELIZE: Unable to connect to the database:", error);
      return process.exit(1);
    }
    console.log("SEQUELIZE: Database connection OK!");
  }
}

function testConnectionToDBknex() {
  console.log("KNEX: Checking database connection...");
  var f = ff(this, tryToConnect).onComplete(onCompleteHandler);

  function tryToConnect() {
    knexConnection.raw("SELECT 1+1 as result").then(f.wait()).catch(f.slot());
  }

  function onCompleteHandler(res) {
    if (!res[0]) {
      console.log("KNEX: Unable to connect to the database:", res[0]);
      console.log(res[0].message);
      return process.exit(1);
    }
    console.log("KNEx: Database connection OK!");
  }
}

module.exports = {
  testConnectionToDBsequelize: testConnectionToDBsequelize,
  testConnectionToDBknex: testConnectionToDBknex,
};
