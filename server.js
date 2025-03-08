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
// Ruta para subir archivos
app.post('/subir', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ningún archivo' });
    }
    res.json({ message: 'Archivo subido correctamente', file: req.file });
});

app.get('/usuarios', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(500).json({ mensaje: Err }))

}
)

app.get('/usuario/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(user => res.render('usuario', { user }))
        .catch(error => res.status(500).json({ mensaje: Err }))

}


)


//registro de usuario
app.post('/registro', upload.single('foto'), (req, res) => {
    const { name, email, password } = req.body;

    // Encriptar contraseña
    bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => {
            // Crear usuario
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                foto: req.file.filename
            });


            // Guardar usuario
            return newUser.save();
        })
        .then(() => {
            res.json({ message: 'Usuario registrado correctamente' });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error al registrar usuario' });
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;


    // Buscar usuario
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: 'Credenciales inválidas' });
            }


            // Comparar contraseñas
            return bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.status(400).json({ message: 'Credenciales inválidas' });
                    }


                    res.json({ message: 'Usuario autenticado correctamente' });
                });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error al iniciar sesión' });
        });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

