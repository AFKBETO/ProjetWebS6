const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
) 

fs
    .readdirSync(__dirname)
    .filter((file) => 
        file != 'index.js'
    )
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

db['User'].hasMany(db['Cart'], {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db['Cart'].belongsTo(db['User'])

db['Cart'].hasMany(db['CartItem'], {
    foreignKey: 'id_cart',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})
db['CartItem'].belongsTo(db['Cart'])

db['Book'].hasMany(db['CartItem'], {
    foreignKey: 'id_book',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    scope: {
        status: true
    },
    as: 'activeBorrow'
})
db['CartItem'].belongsTo(db['Book'])

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db