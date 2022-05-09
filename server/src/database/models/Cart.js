module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    return Cart
}