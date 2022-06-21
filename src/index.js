
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); //Variables de ambiente
const userRoute = require("./routes/user"); //"importar" las rutas de routes/user.j
const categoriaRoute = require("./routes/categoria");
const videoRoute = require("./routes/videos");

// settings
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use("/api", userRoute);
app.use("/api",categoriaRoute);
app.use("/api",videoRoute);

// routes
/*
app.get("/", (req, res) => {
  res.send("Welcome");
  //enviar el servicio login
}); */
app.use(express.static('./src/Public'));

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connected to Mongo DB atlas'))
.catch((error)=>console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));