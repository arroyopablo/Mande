const express = require('express');
const router = express.Router();
const { client } = require('./dbConfig');


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

router.post('/registro', (req, res) => {
  let{celular, nombre} = req.body;

  console.log({
    celular, nombre
  });


});

module.exports = router;
