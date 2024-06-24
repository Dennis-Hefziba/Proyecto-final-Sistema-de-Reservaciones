const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "An email is required"],
        unique: false
    },
    password: {
        type: String,
        required: [true, "A password is required"]
    },
    //relacionar schema de role a usuario
    role: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]
});

//encriptar la contrasena
userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return encryptedPassword;
};

//Comparar contrasena, recibe la contrasena q ya existe y la que se desea comparar
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;