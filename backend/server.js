const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
app.use(express.json());


// GUARDAR TESTIMONIOS

app.post('/guardar-testimonio', (req, res) => {

  const { testimonio } = req.body;

  if (!testimonio) {

    return res.status(400).json({
      mensaje: 'El testimonio está vacío'
    });
  }

  const sql = 'INSERT INTO testimonios (testimonio) VALUES (?)';

  db.query(sql, [testimonio], (err, result) => {

    if (err) {

      console.log(err);

      res.status(500).json({
        mensaje: 'Error al guardar'
      });

    } else {

      res.json({
        mensaje: 'Testimonio guardado correctamente'
      });
    }
  });
});


// OBTENER TESTIMONIOS

app.get('/testimonios', (req, res) => {

  db.query('SELECT * FROM testimonios ORDER BY fecha DESC', (err, result) => {

    if (err) {

      res.status(500).json({
        mensaje: 'Error al obtener testimonios'
      });

    } else {

      res.json(result);
    }
  });
});


// INICIAR SERVIDOR

app.listen(3000, () => {

  console.log('Servidor ejecutándose en puerto 3000');
});
