module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id_cart: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM,
            values: ['pending', 'borrowed', 'returned'],
            allowNull: false
        }
    })

    return Cart
}