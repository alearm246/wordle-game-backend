/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users_stats", (table) => {
        table.uuid("id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
        table.integer("total_games_played").notNullable().defaultTo(0);
        table.integer("total_wins").notNullable().defaultTo(0);
        table.integer("total_losses").notNullable().defaultTo(0);
        table.integer("current_streak").notNullable().defaultTo(0);
        table.integer("max_streak").notNullable().defaultTo(0);
        table.integer("total_time_played").notNullable().defaultTo(0);
        table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
        table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users_stats");
};