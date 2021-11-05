var knexConnection = require("../services/connect-db-knex").knexConnection;

exports.up = function (knex) {
  return knexConnection.schema.hasTable("Deliverer").then(function (exists) {
    if (!exists) {
      return knexConnection.schema.createTable("users", function (t) {
        t.uuid("id")
          .primary()
          .unique()
          .notNullable()
          .defaultTo(knex.raw("(UUID())"));
        t.string("name", 30).notNullable();
        t.string("description", 100);
        t.string("phone", 50).notNullable();
        t.string("address", 50);
        t.decimal("delivery_price", 7, 2).defaultTo(0);
        t.timestamps(true, true);
      });
    }
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Deliverer");
};
