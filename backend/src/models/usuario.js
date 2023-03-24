const mongoose = require("mongoose");
//CLASE PARA LA COLECCION "usuarios" DE ATLAS
const userSchema = mongoose.Schema({
    nombre : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', userSchema);