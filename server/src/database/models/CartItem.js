module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id_cartitem: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity_cart: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  })

  return CartItem
}