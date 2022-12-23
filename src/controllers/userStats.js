const { validate } = require("uuid");
const db = require("../db/db");
const userStats = require("../db/models/UserStat");

const updateUserStats = async (req, res) => {
    try {
        const validatedBody = {
            total_games_played: req.body.totalGamesPlayed,
            total_wins: req.body.totalWins,
            total_losses: req.body.totaLosses,
            current_streak: req.body.currentStreak,
            max_streak: req.body.maxStreak,
            total_time_played: req.body.totalTimePlayed
        }
        const columnsToGet = ['id', 'total_games_played as totalGamesPlayed',
        'total_wins as totalWins', 'total_losses as totalLosses',
        'current_streak as currentStreak', 'max_streak as maxStreak',
        'total_time_played as totalTimePlayed'];
        if(!(await userStats.findOne({id: req.params.id}))) return res.stats(404).send("user stats with that id not found");
        const updatedUser = await userStats.update(req.params.id, validatedBody);
        res.status(200).send(updatedUser);
        
    } catch(err) {
        console.error(err);
        res.status(500).send("There was an unexpected error updating the user's stats");
    }
}

const incrementStats = async (req, res) => {
    const { id } = req.params;

    const { totalGamesPlayed, 
            totalWins, 
            totalLosses, 
            currentStreak, 
            maxStreak, 
            totalTimePlayed} = req.body
    const columnsToGet = ['id', 'total_games_played as totalGamesPlayed',
        'total_wins as totalWins', 'total_losses as totalLosses',
        'current_streak as currentStreak', 'max_streak as maxStreak',
        'total_time_played as totalTimePlayed'];
    const currentUserStats = await userStats.findOne({id}, columnsToGet);
    if(!(await userStats.findOne({id}))) return res.stats(404).send("user stats with that id not found");

    const newTotalGamesPlayed = currentUserStats.totalGamesPlayed + totalGamesPlayed;
    const newTotalWins = currentUserStats.totalWins + totalWins;
    const newTotalLosses = currentUserStats.totalLosses + totalLosses;
    const newCurrentStreak = currentUserStats.currentStreak + currentStreak;
    const newMaxStreak = currentUserStats.maxStreak + maxStreak;
    const newTotalTimePlayed = currentUserStats.totalTimePlayed + totalTimePlayed;

    console.log(newTotalGamesPlayed);
    console.log(newTotalWins);
    console.log(newTotalLosses);
    console.log(newCurrentStreak);
    console.log(newMaxStreak);
    console.log(newTotalTimePlayed);

    const updatedUserStats = await userStats.update(id, {
        total_games_played: newTotalGamesPlayed,
        total_wins: newTotalWins,
        total_losses: newTotalLosses,
        current_streak: newCurrentStreak,
        max_streak: newMaxStreak,
        total_time_played: newTotalTimePlayed
    })
    res.status(200).send(updatedUserStats);
}

module.exports = {
    updateUserStats,
    incrementStats
}