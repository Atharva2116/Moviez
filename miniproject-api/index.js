const { Sequelize, DataTypes } = require('sequelize');
const port = 2000;
const DB_URL = 'postgres://postgres:root@localhost:5432/MoviesDB';
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sq = new Sequelize(DB_URL);
const app = express();
app.use(express.json());
app.use(require('cors')())
const User = sq.define('User', {
    username: { type: DataTypes.STRING,  primaryKey: true },
    password: { type: DataTypes.STRING, allowNull: false }
  }, {freezeTableName:true, timestamps:false});

const Wishtlist = sq.define('Wishlist', {
    imdbID: { type: DataTypes.STRING, primaryKey: true },
}, {timestamps:false, freezeTableName:true});

app.get('/wishlist', async (req, res) => {
    try {
        res.json(await Wishtlist.findAll({}));
    } catch (err) {
        console.error(err);
        res.json(err);
    }
});

app.post('/wishlist/:imdbID', async ({params:{imdbID}}, res) => {
    try {
        const movie = await Wishtlist.findOne({where:{imdbID}});
        console.log(movie);
        if (movie){
            res.json(await movie.destroy());
        }else{
            res.json(await Wishtlist.create({imdbID}));
        }
    } catch (err) { console.log(err); res.json(err); }
});




app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create user
      const user = await User.create({ username, password: hashedPassword });
  
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error during signup:', error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  });
  
  // Login endpoint
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username
      const user = await User.findOne({ where: { username } });
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, 'secret');
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  });

app.listen(port || 2000);

sq.sync({ alter: true })
    .then(() => {
        return;
    })
    .catch((err) => {
        console.log(err);
    });     