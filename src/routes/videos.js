//rutas
const express = require("express");
const videos = require("../models/videos");
const videoSchema = require("../models/videos"); //importar el esquema de usuario

const router = express.Router();

// create user
router.post("/videos", (req, res) => {
  const videos = videoSchema(req.body);  //nos va a crear un nuevo usuario
  console.log(req.body);
  videos
    .save()
    .then((data) => res.json(data))   //guardar usuario en BDD
    .catch((error) => res.json({ message: error })); //si la creacion falla, error   
});



// mostrar todos los videos
router.get("/videos", (req, res) => {
  videoSchema
    .find()  //para mostrar todos los usuarios
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// obetener video por ID
router.get("/videos/:id", (req, res) => { //agregamos a la URL la id
  const { id } = req.params;
  videoSchema
    .findById(id)  //con esto buscamos por ID
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

 
// borrar video
router.delete("/videos/:id", (req, res) => {
  const { id } = req.params;
  videoSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// actualizar video
router.put("/videos/:id", (req, res) => {
  const { id } = req.params;
  const { name, url } = req.body;
  videoSchema
    .updateOne({ _id: id }, { $set: { name, URL } }) //updateone actualizar uno
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});



module.exports = router;