const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'list_app'
});

app.get('/index', (req, res) => {
  // Write the necessary code to get data from the database
  connection.query(
    'SELECT * FROM items',
    (error,results)=>{
      console.log(results);
      res.render('index.ejs', {items: results});
    }
  );
});

app.listen(3000);