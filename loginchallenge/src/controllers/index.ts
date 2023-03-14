import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client"
import util from "../utils/index"

const prisma = new PrismaClient()

export function hello(_req: Request, res: Response) {
    res.send("hello World")
}

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body
    const exist = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (exist) res.status(401).json({message:"This user already exist"})
    else {
        const hashPassword = await util.hashPassword(password)
        const user = await prisma.user.create({
            data: {
                email,
                password: hashPassword
            }
        })
        res.send({message:"Successful registration",user:{ id: user.id, name: user.name, email: user.email }})
    }
}

export async function logIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) res.status(401).json({ message: 'Incorrect email or password.' });
    else {
        const passwordMatch = await util.verifyPassword(user.password, password);
        if (!passwordMatch)res.status(401).json({ message: 'Incorrect email or password.' });
        else {
            res.status(200).json({ message: 'Sign up successful.',user:{
                id:user.id,
                name: user.name,
                email:user.email
            } });
        }
    }
}
