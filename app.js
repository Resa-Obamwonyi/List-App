const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

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

app.get('/add',(req,res) => {
  res.render('add.ejs')
});


app.post('/create', (req, res) => {
  // Write a query to add data to the database
  connection.query( 'INSERT INTO items (name) VALUES (?) ', [req.body.itemName], 
  (error, results)=>{
  // Add a route method for redirecting to the items    
    res.redirect('/index')
      
  }
  );
});

app.listen(3000);