const express = require('express')
const mongoose = require('mongoose')
const cors= require('cors');
require('dotenv').config();
const rutaUsuario = require('./routes/user.js')

const app = express();
const port = process.env.PORT || 9000;
//middleware
app.use(cors());
app.use(express.json());
app.use('/api', rutaUsuario);


//routes 
app.get("/", (req, res) =>{
    res.send("Que tal buenas tardes");
})
//mongoDB conexion
mongoose
.connect(process.env.mongoDB_uri)
.then(() => console.log("Conectado a mongo atlas yay"))
.catch((error) => console.error(error))

app.listen(port, () => console.log("Servidor listening en " + port) ); 

module.exports = app;