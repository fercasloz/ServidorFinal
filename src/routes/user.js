
//rutas
const express = require("express");
const userSchema = require("../models/user"); //importar el esquema de usuario

const router = express.Router();

// create user
router.post("/user", (req, res) => {
  const user = userSchema(req.body);  //nos va a crear un nuevo usuario
  console.log(req.body);
  user
    .save()
    .then((data) => res.json(data))   //guardar usuario en BDD
    .catch((error) => res.json({ message: error })); //si la creacion falla, error   
});



// mostrar todos los usuarios
router.get("/user", (req, res) => {
  userSchema
    .find()  //para mostrar todos los usuarios
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// obetener usario por ID
router.get("/user/:id", (req, res) => { //agregamos a la URL la id
  const { id } = req.params;
  userSchema
    .findById(id)  //con esto buscamos por ID
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

 
// borrar usuario
router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// actualizar usuario
router.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } }) //updateone actualizar uno
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



module.exports = router;