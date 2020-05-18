const express = require('express');
const router = express.Router();
const { client } = require('./dbConfig');
const bcrypt = require("bcrypt");

router.use(express.urlencoded({extended: false}));


router.get('/', (req, res) => {
  res.render('index', { title: 'Mande' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Page' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Inicio de sesión' });
});

router.get('/login', (req, res) => {
  res.render('login', { title: 'Inicio de sesión' });
});

router.get('/registro', (req, res) => {
  res.render('registro', { title: 'Registro de usuario' });
});

router.post('/registro',async (req, res) => {
  let{celular, nombre, apellido, direccion, nacimiento, latitud, longitud, email, cedula, contrasena, contrasena2} = req.body;

  console.log({
    celular, nombre, apellido, direccion, nacimiento, latitud, longitud, email, cedula, contrasena, contrasena2
  });

  let errors =[];

  if(!celular || !nombre || !apellido || !direccion || !nacimiento || !latitud || !longitud || !email || !cedula || !contrasena || !contrasena2){
    errors.push({message: "Por favor llenar todos los campos"});
  }

  if(contrasena.length < 6){
    errors.push({message: "La contraseña debe ser de al menos 6 caracteres"});
  }

  if(contrasena != contrasena2){
    errors.push({message: "La contraseña no coincide"});
  }

  if(errors.length > 0){
    res.render("registro", {errors});
  }else{
    // validacion aprobada del formulario

    //encriptar contraseña
    let hashedContrasena= await bcrypt.hash(contrasena, 10);
    console.log(hashedContrasena);

    client.query(
      `SELECT * FROM cliente
        WHERE password_cliente = $1`,
      [contrasena],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);
      }
    );
    console.log('aqui');
  }
});

module.exports = router;
