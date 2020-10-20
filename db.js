const Sequelize = require('sequelize');

const sequelize = new Sequelize('workoutlog', 'postgres', 'LetAlexaIn', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to THE workoutlog postgres database!');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;