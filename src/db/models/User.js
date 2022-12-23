const knex = require("../db");

class User {
    constructor() {}

    async findOne(whereField, columnsToGet="*") {
        const [user] = await knex.where(whereField).select(columnsToGet).from("users");
        return user;
    }

    async joinAndFindOneByUserId(id) {
        console.log("id: ", id);
        const [user] = await knex
                           .from("users")
                           .fullOuterJoin("users_stats", function() {
                            this.on("users.user_stats_id", "=", "users_stats.id");
                           })
                           .select(`users.id as userId`, "username", "email", `users_stats.id as userStatsId`,
                                  `total_games_played AS totalGamesPlayed`, `total_wins as totalWins`, 
                                  `total_losses as totalLosses`, `current_streak as currentStreak`, 
                                  `max_streak as maxStreak`, `total_time_played as totalTimePlayed`)
                           .where('users.id', id);

        return user;
    }

    async findOneByGoogleId(googleId) {
        const  { rows } = await db.query(
            `SELECT id, user_stats_id AS userStatsId, username, google_id AS googleId, email FROM users WHERE google_id = $1`, 
        [googleId]);
        const [ user ] = rows;
        return user;
    }

    async findAll() {
        return await knex.select().from("users");
    }

    async create(usersStatsId, googleId, email) {
        const [createdUser] = await knex("users").insert({
            user_stats_id: usersStatsId,
            google_id: googleId,
            email
        }, ['id', 'user_stats_id as userStatsId', 'username', 'email']);    
        return createdUser;

    }
}

module.exports = new User();