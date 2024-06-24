const Role = require('../models/Role');

const createRoles = async () => {
    //Esto sirve para contar si ya hay registros de roles
    try {
        const count = await Role.estimatedDocumentCount();
        if(count > 0) return;

        const value = await Promise.all([
        new Role({name: "User"}).save(),
        new Role({name: "Administrator"}).save()
    ]);

    console.log(value);
    } catch (error) {
        console.log({error: error.message});
    }
}

module.exports = {
    createRoles
}
