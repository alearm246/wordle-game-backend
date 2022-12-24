const knex = require("../db");

class UserStat {
    cosntructor() {}

    async findOne(whereFields, columnsToGet="*") {
        const [userStats] = await knex.where(whereFields).select(columnsToGet).from("users_stats");
        return userStats;
    }

    async create() {
        const [createdUser] = await knex("users_stats").insert({}, [
            'id', 'total_games_played as totalGamesPlayed', 'total_wins as totalWins',
            'total_losses as totalLosses', 'current_streak as currentStreak',
            'max_streak as maxStreak', 'total_time_played as totalTimePlayed'
        ]);
        return createdUser;
    }

    async update(id, userStatsField) { 
        const [updatedUser] = await knex("users_stats").where({id}).update(userStatsField, [
            'total_wins as totalWins', 'total_losses as totalLosses',
            'current_streak as currentStreak', 'max_streak as maxStreak',
            'total_time_played as totalTimePlayed', 'total_games_played as totalGamesPlayed'
        ])
        return updatedUser;
    }
}

module.exports = new UserStat();