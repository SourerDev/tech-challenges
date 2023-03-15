import express from 'express'
import router from './routes';
import {handleJwtError} from './middlewares/index'
const app = express();
const PORT = 3001

// Middleware for handling JWT authentication errors
app.use(handleJwtError);

app.use(express.json());

// Routes
app.use('/', router);

// 404 error handling middleware
app.use(function(_req, res) {
  res.status(404).send("Sorry, we can't find that!");
});

//starting server
app.listen(PORT,()=>{
    console.log(`Server runnig on port ${PORT}`)
})