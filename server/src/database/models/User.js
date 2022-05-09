const bcrypt = require('bcrypt')

async function hashPassword(user, options) {
    const SALT_FACTOR = 10

    if (!user.changed('password')) {
        return
    }

    const hashedPassword = await bcrypt.hash(user.password, SALT_FACTOR)
    user.setDataValue('password', hashedPassword)
}

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            types: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile: {
            type: DataTypes.ENUM,
            values: ['admin', 'student']
        }
    })

    User.prototype.comparePassword = async function (password) {
        const result = await bcrypt.compare(password, this.password)
        return result
    }

    return User
}