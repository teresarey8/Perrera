const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();
const port = 3004;

require('dotenv').config();

mongoose.connect(process.env.CADENA)
    .then(() => console.log('Connected!'));

// Middleware para parsear el cuerpo de las solicitudes en formato JSON
app.use(express.json());
app.use(express.static('public'));
app.use('/fotos', express.static('uploads'));
app.set('view engine', 'ejs');
app.set('views', './views');
const modeloPerro = require('./models/perro');
const User = require("./models/User");

// Obtener todos los ítems
app.get("/items", (req, res) => {
    modeloPerro.buscaTodos()
        .then(
            perros => res.status(200).json(perros)
        )
        .catch(err => res.status(500).send("error"))
});
// Obtener un ítem por ID
app.get("/items/:id", (req, res) => {
    const itemId = req.params.id;
    modeloPerro.buscaPorId(itemId)
        .then(
            perro => res.status(200).json(perro)
        )
        .catch(err => res.status(500).send("error"))
});
// Crear un nuevo ítem
app.post("/items", (req, res) => {
    nombre = req.body.nombre;
    edad = req.body.edad;
    raza = req.body.raza;
    color = req.body.color;
    modeloPerro.crearNuevoPerro(nombre, edad, raza, color)
        .then(
            perro => res.status(200).json(perro)
        )
        .catch(err => res.status(500).send("error"))

});
// Actualizar un ítem existente
app.put("/items/:id", (req, res) => {
    const itemId = req.params.id;
    perro = req.body;
    //res.send(perro);
    modeloPerro.actualizarPerro(itemId, perro)
        .then(
            perroActualizado => res.status(200).json(perroActualizado)
        )
        .catch(err => res.status(500).send("error al actualizar el perro"))

});
// Eliminar un ítem
app.delete("/items/:id", (req, res) => {
    const itemId = req.params.id;
    modeloPerro.borrarPerro(itemId)
        .then(
            perro => res.status(200).json(perro)
        )
        .catch(err => res.status(500).send("error"))

});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });

