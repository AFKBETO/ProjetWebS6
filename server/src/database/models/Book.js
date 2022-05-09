module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
        id_book: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name_book: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        quantity_book: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0
            }
        }
    })

    return Book
}