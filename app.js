  //environment and mysql variables
  const express = require('express');
  const mysql = require('mysql');
  const app = express();

  app.use(express.static('public'));
  app.use(express.urlencoded({extended: false}));
  
  //mysql connection information
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'list_app'
  });

  //If unable to connect to mysql, display error
  connection.connect((err) => {
    if (err) {
      console.log('error connecting: ' + err.stack);
      return;
    }
    console.log('success');
  });

  //to load the home page
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

  //route for getting the page "add"
  app.get('/add',(req,res) => {
    res.render('add.ejs')
  });

  //add a route to create new items
  app.post('/create', (req, res) => {
    // Write a query to add data to the database
    connection.query( 'INSERT INTO items (name) VALUES (?) ', [req.body.itemName], 
    (error, results)=>{
    // Add a route method for redirecting to the items    
      res.redirect('/index')
        
    }
    );
  });

  // Add a route for deleting items
  app.post('/delete/:id', (req, res) => {
    // Write code to delete from the database
  connection.query('DELETE FROM items WHERE id = ?',
  [req.params.id], (error,results) =>{
      res.redirect('/index');
  });  
  });

  // Add a route for the edit page
  app.get('/edit/:id', (req, res) => {
    // Write code to get the selected item from the database
    connection.query('SELECT * FROM items WHERE id = ?',
    [req.params.id],(error, results) => {
      res.render('edit.ejs', {item:results[0]});
    });
  });

  // Add a route for updating items
  app.post('/update/:id', (req,res) => {
    // Write code to update item in the database
    connection.query('UPDATE items SET name = ? WHERE id = ?',
    [req.body.itemName ,req.params.id],(error, results) => {
      res.redirect('/index');
    });
  });

  app.listen(3000);