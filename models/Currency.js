const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database');
const Country = require('./Country');

class Currency extends Model {}

Currency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        //comment: 'Primary key for the currency table'
    },
    currencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        //comment: 'Currency code'
    },
    countryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //comment: 'Foreign key referencing id in countries table',
        references: {
            model : Country,
            key: 'id',
        //defferable: Deferrable.INITIALLY_IMMEDIATE 
           }
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
        //comment: 'Conversion rate of the currency'
    }
}, {
    sequelize,
    tableName: 'currencies', // Specify the name of the database table
    timestamps: true, // Enable timestamps
    underscored: true, // Use underscored style for column names
    modelName: 'Currency'
});

// Define the association in the Currency model
Currency.belongsTo(Country, {
    //as: 'Country', // Alias for the association, you can use this alias when performing eager loading
    foreignKey: 'countryId' // Name of the foreign key column in the Currency table
});

module.exports = Currency;
