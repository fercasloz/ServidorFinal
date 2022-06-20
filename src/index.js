/*const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); //variables de ambiente
const userRoutes = require ("./routes/user"); //"importar" las rutas de routes/user.js

const app = express();
const port = process.env.PORT || 9000;

//middleware (servicios comunes)
app.use(express.json());
app.use("/api", userRoutes);

//Routes 
app.get('/',(req,res)=>{
    res.send("Welcome to my API");
});

//mongodb connection (conectar BDD)
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to MongoDB Atlas"))
.catch((error)=>console.error(error));


app.listen(port, ()=> console.log("server listening on port",port)); */



const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./routes/user");
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
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('Connected to Mongo DB atlas'))
.catch((error)=>console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));