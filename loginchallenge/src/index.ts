import express from 'express'
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
const app = express();
app.use(express.json())

const PORT = 3001

app.post('/user', async (_req,res)=>{
    try {
        const user = await prisma.user.create({
            data: {
                name: 'Alice',
                email: 'alice@prisma.io',
                password: "1234"
              },
        })
        res.send(user)
    } catch (error) {
        res.status(404).send(error)
    }
    
})
app.get('/', (_req,res)=>{
    res.send('Hello World!') 
})

app.listen(PORT,()=>{
    console.log(`Server runnig on port ${PORT}`)
})