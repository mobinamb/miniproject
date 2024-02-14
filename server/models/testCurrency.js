const { DataTypes, Model } = require('sequelize');

class TestCurrency extends Model {}

TestCurrency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    currencyCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Added unique constraint to ensure distinct currency codes
    },
    conversionRate: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    timestamps: true, // Enable timestamps
    underscored: true, // Use underscored style for column names
    modelName: 'testCurrency', // Specified model name
});

module.exports = TestCurrency;
