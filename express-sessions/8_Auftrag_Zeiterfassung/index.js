const express = require('express');
const session = require('express-session');
const mariadb = require('mariadb');
const router = express.Router();

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.use(session({
  secret: 'supersecret',
	resave: false,
	saveUninitialized: false,
  cookie: {}
}));

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'zeiterfassung',
});

router.get('/', async (request, response) => {
  try {
    const connection = await pool.getConnection();
    const users = await connection.query('SELECT * FROM entry');
    response.json(users);
    connection.release();
  } catch (err) {
    response.status(500).json({ error: 'Datenbankfehler' });
  }
});

module.exports = router;