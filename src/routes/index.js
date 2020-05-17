const express = require('express');
const router = express.Router();
const {Client} = require('pg')


const connectionData = {
  user: 'postgres',
  host: 'localhost',
  database: 'DS1_BaseDeDatos',
  password: 'cjloco1996',
  port: 5432,
}

const client = new Client(connectionData)

client.connect()
client.query('SELECT nombre_persona FROM usuarios')
    .then(response => {
        console.log(response.rows)
        client.end()
    })
    .catch(err => {
        client.end()
    })

router.get('/', (req, res) => {
  res.render('index', { title: 'First Web Node' });
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

module.exports = router;
