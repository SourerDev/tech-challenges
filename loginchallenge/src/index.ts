import express from 'express'
import router from './routes';

const app = express();
const PORT = 3001

//middlewares
app.use(express.json())

app.use('/',router)
app.use(function(_req, res) {
    res.status(404).send("Sorry, we can't find that!");
});

app.listen(PORT,()=>{
    console.log(`Server runnig on port ${PORT}`)
})