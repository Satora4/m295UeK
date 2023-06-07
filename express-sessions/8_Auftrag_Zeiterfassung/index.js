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
    const entry = await connection.query('SELECT * FROM entry');
    response.json(entry);
    connection.release();
  } catch (err) {
    response.status(500).json({ error: 'Datenbankfehler' });
  }
});

router.post('/addEntry', async (request, response) => {
  const data = request.body;

  if (data.start_time && data.end_time && data.category_id) {
    try {
      const connection = await pool.getConnection();
      var sql = `INSERT INTO entry (start_time, end_time, category_id) VALUES (?, ?, ?)`;
        connection.query(sql, [data.start_time, data.end_time, data.category_id], function (err, data) {
          if (err) {
            response.json({ error: "failed to insert"});
          } else {
            response.json(data);
        }
      });
    } catch (err) {
      response.send(err);
    }
  }
})

module.exports = router;