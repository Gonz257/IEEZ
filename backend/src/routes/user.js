const express = require('express')
const userSchema = require("../models/Users");
//const app = require("../index")
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

//Crear Usuario (POST)
router.post('/Users', (req,res) =>{
    const user = userSchema(req.body);
    user
    .save()
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});


//Obtener todos los usuarios GET
router.get('/Users', (req,res) =>{
    userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});

//Obtener un usuario GET
/*
router.get('/Users/:id', (req,res) =>{
    const {id} = req.params;
    userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});
*/
router.get('/Users/:user', async (req,res) =>{
    userSchema.findOne(req.params)
    .then((data) =>{ return res.json(data)})
    .catch((error)=> res.json({ message: error}));
//Nota del gonz del 13/04 todavia no jala el puto return xd xdxd lo unico que hace es devolver la respueta pero en el response de la api ggs

 /*   .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));*/

});


//Actualizar usuario
router.put('/sex', (req,res) =>{
    const {id} = req.params;
    const {user, password} = req.body;
    userSchema
    .updateOne({ _id: id }, {$set: { user, password } })
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});

//Actualizar usuario con pontraseña y eso XDDD
router.put('/Users/:id', async (req,res) =>{
    const {id} = req.params;
    const {password, firstTime} = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    userSchema
    .updateOne({ _id: id }, {$set: {  password: hashedPassword  , firstTime} })
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});

//SIGNIN

/*router.post('/signin', async (req, res) =>{

    const { user, password} = req.body;
    const usuario = await userSchema.findOne({user});
    if(!usuario) return res.status(401).send("El usuario no está registrado");
    if(usuario.password !== password) return res.status(402).send("Contraseña incorrecta");
    
    const token =jwt.sign({_id: user._id}, 'secretkey')
    return res.status(200).json({token});
})*/

//Signin
router.get('/signin/', async (req,res) =>{
 
    let user = req.query.user;
    let password= req.query.password;
    
    const usuario = await userSchema.findOne({user});
    if(!usuario) return res.status(401).json({msg: "El usuario no está registrado"});
    const response = await usuario.comparePassword(password);

    if(!response) return res.status(401).json({msg: "Contraseña incorrecta", response});
    
    const token =jwt.sign({_id: user._id}, 'secretkey')
    return res.status(200).json({token, msg : "INICIO_EXITOSO", response});
});



//Borrar usuario

router.delete('/Users/:id', (req,res) =>{
    const {id} = req.params;
    userSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error)=> res.json({ message: error}));
});

router.get('/tasks', (req,res) => {
    res.json([
        {
            _id: 1,
            name: "Cédula",
            descripción: "DistritoCalera",
            date: "2023-03-16T00:26:11.604Z"
        },{
            _id: 2,
            name: "Cédula",
            descripción: "DistritoFresnillo",
            date: "2023-03-16T00:26:11.604Z"
        },{
            _id: 3,
            name: "Cédula",
            descripción: "DistritoGuadalupe",
            date: "2023-03-16T00:26:11.604Z"
        },
    ])
})

router.get('/private-tasks', validarToken, (req, res)=>{
    res.json([
        {
            _id: 1,
            name: "Cédula",
            descripción: "DistritoCalera",
            date: "2023-03-16T00:26:11.604Z"
        },{
            _id: 2,
            name: "Cédula",
            descripción: "DistritoFresnillo",
            date: "2023-03-16T00:26:11.604Z"
        },{
            _id: 3,
            name: "Cédula",
            descripción: "DistritoGuadalupe",
            date: "2023-03-16T00:26:11.604Z"
        },
    ])
})

module.exports = router;

function validarToken(req,res,next){
    // console.log(req.headers.authorization);
    if(!req.headers.authorization){
     return  res.status(401).send("Requisito no valido")
    }
    const token = req.headers.authorization.split(' ')[1];
    
    if(token == 'null'){
     return  res.status(401).send("Requisito no valido")
    }
 
    const payloads = jwt.verify(token, 'secretkey' );
    req.userID = payloads._id;
    next();
 }