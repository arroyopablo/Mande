const express = require('express');
const router = express.Router();
const { client } = require('./dbConfig');
const bcrypt = require("bcrypt");
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./passportConfig');

initializePassport(passport);

router.use(express.urlencoded({extended: false}));

router.use
  (session({
    secret: 'secret',

    resave: false,

    saveUninitialized: false
  })
);

router.use(passport.initialize());
router.use(passport.session());

router.use(flash())

router.get('/', (req, res) => {
  res.render('index', { title: 'Mande' });
});

router.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Page' });
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'Acerca de' });
});


router.get('/login', checkAuthenticated, (req, res) => {
  res.render('login', { title: 'Inicio de sesión' });
});

router.get('/loginTrabajador', checkAuthenticated, (req, res) => {
  res.render('loginTrabajador', { title: 'Inicio de sesión' });
});

router.get('/registro', checkAuthenticated, (req, res) => {
  res.render('registro', { title: 'Registro de usuario' });
});

router.get('/registroTrabajador', checkAuthenticated, (req, res) => {
  res.render('registroTrabajador', { title: 'Registro de Trabajador' });
});

router.get("/dashboard", checkNotAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.user.nombre_cliente });
});

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "Has cerrado sesión");
  res.redirect("/login");
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
    client.connect()
    client.query(
      `SELECT * FROM cliente
        WHERE cc_cliente = $1 or celular_cliente = $2`,
      [cedula, celular],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log(results.rows);

        if(results.rows.length > 0){
          errors.push({message: "El usuario ya se encuentra registrado, prueba con una cédula o celular diferente"});
          res.render("registro", {errors});
        }else{
          client.query(
            `INSERT INTO cliente VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING cc_cliente`, 
            [celular, nombre, apellido, direccion, nacimiento, latitud, longitud, email, cedula, hashedContrasena],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash("success_msg", "Se ha registrado exitosamente, por favor ínicia sesión");
              res.redirect('/login');
            }
          );
        }
      }
    ); 
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
  })
);

function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return res.redirect("/dashboard");
  }
  next();
}

function checkNotAuthenticated(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}

module.exports = router;
