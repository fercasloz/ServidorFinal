
//rutas
const express = require("express");
const categoriaSchema = require("../models/categoria"); //importar el esquema de usuario

const router = express.Router();

// create categoria
router.post("/categoria", (req, res) => {
  const categoria = categoriaSchema(req.body);  //nos va a crear un nuevo usuario
  console.log(req.body);
  categoria
    .save()
    .then((data) => res.json(data))   //guardar usuario en BDD
    .catch((error) => res.json({ message: error })); //si la creacion falla, error   
});



// mostrar todas los categorias
router.get("/categoria", (req, res) => {
  categoriaSchema
    .find()  //para mostrar todos las categorias
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// obetener categoria por ID
router.get("/categoria/:id", (req, res) => { //agregamos a la URL la id
  const { id } = req.params;
  categoriaSchema
    .findById(id)  //con esto buscamos por ID
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

 
// borrar categoria
router.delete("/categoria/:id", (req, res) => {
  const { id } = req.params;
  categoriaSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// actualizar nombre categoria
router.put("/categoria/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  categoriaSchema
    .updateOne({ _id: id }, { $set: { name } }) //updateone actualizar uno
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



module.exports = router;