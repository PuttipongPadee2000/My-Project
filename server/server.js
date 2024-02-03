const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql2/promise')

// **REQUIRED**
app.use(cors())
app.use(bodyParser.json())

// Token
const jwt = require('jsonwebtoken')
const secret = 'SomeSecret'

// Password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

// URL
const host = 'localhost'
const port = 5000

// MySQL Connection
let db = null

const mysqlConnect = async () => {
  try {
    db = await mysql.createConnection({
      host: host,
      user: 'root',
      password: 'root',
      database: 'project',
      port: 8889
    });
  } catch (error) {
    console.error('Error connecting to the database.');
    console.error('Error message:', error.message || 'Something went wrong.');
    console.error('Exiting...');
    process.exit(1);
  }
};

// Authentication checking route
app.route('/authentication')
  .get(async (req, res) => {

    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, secret)

      if (!decoded) {
        throw error
      } else {
        res.json({
          authority: 'Authorized.'
        })
      }
    } catch (error) {
      res.json({
        authority: 'Unauthorized',
        error: error.message,
      })
    }
  })


// [ALL ROUTES]

// users route
app.route('/users')

  // GET
  .get(async (req, res) => {  
    try {
      res.send('users GET')
    } catch (error) {
      console.log('Error message:', error.message)
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      })
    }
  })

// register route
app.route('/register')

  // GET
  .get(async (req, res) => { // register route
    try {
      res.send('register GET')
    } catch (error) {
      console.log('Error message:', error.message)
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      })
    }
  })

  // POST
  .post(async (req, res) => { // register route
    try {      

      const { username, password, confirmation } = req.body

      const hash = bcrypt.hashSync(password, saltRounds)

      const result = await db.execute('SELECT username FROM users WHERE username = ?', [username])

      // Form validation
      if (!username) {
        return res.json ({
          status: 'error',
          message: 'Username required.'
        })
      } else if (!password) {
        return res.json ({
          status: 'error',
          message: 'Password required.'
        })
      } else if (!confirmation) {
        return res.json ({
          status: 'error',
          message: 'Password confirmation required.'
        })
      } else if (result[0].length === 1) {
        return res.json({
          status: 'error',
          message: 'Username already taken.'
        })
      } else if (password !== confirmation) {
        return res.json({
          status: 'error',
          message: 'Password confirmation does not match.'
        })
      } else { // after validated
        await db.execute('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash])

        console.log('New user registered.')
        return res.json({
          status: 'ok',
          message: 'Register completed.'
        })
      }

    } catch (error) {
      console.log('Error message:', error.message)
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      })
    }
  })

// login route
app.route('/login')

  // GET
  .get(async (req, res) => { // login route
    try {
      res.send('login GET')
    } catch (error) {
      console.log('Error message:', error.message)
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      })
    }
  })

  // POST
  .post(async (req, res) => { // login route
    try {
      
      const { username, password } = req.body

      const result = await db.execute('SELECT * FROM users WHERE username = ?', [username])
     
      if (!username) {
        return res.json ({
          status: 'error',
          message: 'Username required.'
        })
      } else if (!password) {
        return res.json ({
          status: 'error',
          message: 'Password required.'
        })      
      } else if (result[0].length === 0) {
        return res.json({
          status: 'error',
          message: 'Username does not exist.'
        })
      }

      const user = result[0][0]
      const match = await bcrypt.compare(password, user.password)
          
      if (!match) {
        return res.json({
          status: 'error',
          message: 'Password is not correct.'
        })
      } else {
        console.log('User Logged in.')

        const payload = { username }
        const token = jwt.sign(payload, secret, { expiresIn: '1h' })

        res.json({
          status: 'ok',
          message: 'Login success.',
          token
        })
      }

    } catch (error) {
      console.log('Error message:', error.message)
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      })
    }
  })

// index route
app.route('/')
  .get(async (req, res) => { // index route

    try {
      const result = await db.execute('SELECT username FROM users')
      res.json({
        status: 'ok',
        users: result[0]
      })

    } catch (error) {      
      console.log('Error message:', error.message)
      res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
      })
    }    
  })
  

// Start server
app.listen(port, async () => {
  await mysqlConnect();
  console.log(`Server is running on http://${host}:${port}`);
})