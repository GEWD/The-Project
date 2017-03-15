// -- schema.sql is a skeleton schema file intended to create and use a database, and create new tables within it. Aside from writing SQL at the command line, you can also write it in a file and load it into a running MySQL server. Follow the link and read enough to learn how. In the schema.sql file you will be writing one or more CREATE TABLE statements that will define the structure of your database tables and loading them into your running MySQL server
// -- NOTE: if when running your SQL code from this file, and you find a bug in the schema or how it was generated, you'll want to "drop" all the new tables before running it again. This will reset your database by throwing away all data and schema information, to give you a blank slate before re-running your improved version of the SQL code. Look up how to do this if and when the need arises
let Sequelize = require('sequelize');
let sequelize = require('./db/index.js');

module.exports = () => {
  return Member = sequelize.define('Member', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    auth: {
      type: Sequelize.STRING,
      unique: true
    }
  })
};

module.exports = () => {
  return Trip = sequelize.deifne('Trip', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    admin: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })  
};

// let MemberTrip = sequelize.deifne('MemberTrip', {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   }
// });

// Member.belongsToMany(Trip, { as: 'Trips', through: { model: MemberTrip, unique: false }, foreignKey: 'trip_id' });
// Trip.belongsToMany(Member, { as: 'Members', through: { model: MemberTrip, unique: false }, foreignKey: 'member_id' });
// let Receipt = sequelize.deifne('Receipt', {

// });

// let Item = sequelize.deifne('Item', {

// });

// let Pool = sequelize.deifne('Pool', {

// });

// let ConsumedItem = sequelize.deifne('ConsumedItem', {

// });