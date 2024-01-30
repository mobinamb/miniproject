const { Sequelize } = require('sequelize');
const pg = require('pg')
// Database URL -> external URL
const databaseURL = 'postgres://currency_exchange_50kz_user:5Spt6dACH3hOCA1e40JkLLNvDKMBMbDq@dpg-cmrejnacn0vc73dt3aog-a.oregon-postgres.render.com/currency_exchange_50kz'

// Perform the connection through sequelize
const sequelize = new Sequelize(databaseURL, {
  
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

try {
  sequelize.authenticate()
  console.log('We have successfully connected to database...')
} catch (error) {
  console.log('Unable to connect to database...')
}
/*
// Authentication function
const connect = async () => {
    try {
      await sequelize.authenticate()
      console.log('We have successfully connected to database...')
    } catch (error) {
      console.log('Unable to connect to database...')
    }
  }
  
  connect() */

module.exports = sequelize