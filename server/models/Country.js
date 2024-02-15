const { DataTypes, Model } = require('sequelize');
const {sequelize, initConnection} = require('../database') // Provide a path to your config.js or database.js file, wherever you export that sequelize

class Country extends Model {}

Country.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        //comment: 'Primary key for the country table'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        //comment: 'Name of the country'
    }
}, {
    sequelize,
    tableName: 'countries', // Specify the name of the database table
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
    underscored: true, // Use underscored style for column names
    modelName: 'Country'
});


//console.log(Country === sequelize.models.Country)
module.exports = Country;
