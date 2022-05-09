module.exports = {
    ports: process.env.PORT || 3001,
    db: {
        database: process.env.DB_NAME || 's6_projet_web',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || 'admin',
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env. HOST || 'localhost'
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'k7jnEJ99eK!NK32KJ'
    }
}