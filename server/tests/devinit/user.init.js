const { User } = require('../../src/database/models')

const user = {
    admin: {
        id_user: 1,
        username: "Administrator",
        email: "admin@efrei.fr",
        password: "Sdf(123)",
        profile: "admin"
    },
    student: {
        id_user: 2,
        username: "Student",
        email: "student@efrei.net",
        password: "Sdf(123)",
        profile: "student"
    }
}

User.findOrCreate({
    where: {id_user: user.admin.id_user},
    defaults: user.admin
})

User.findOrCreate({
    where: {id_user: user.student.id_user},
    defaults: user.student
})
User.update(user.admin, {
    where: {
        id_user: user.admin.id_user
    },
    individualHooks: true
})
User.update(user.student, {
    where: {
        id_user: user.student.id_user
    },
    individualHooks: true
})

module.exports = user