require('dotenv').config()
import { prisma } from './db'
import express, { Request, Response } from 'express'
const axios = require('axios')
const cookieParser = require('cookie-parser')
const db = require('./db')
const jwt = require('jsonwebtoken')
const authenticate = require('./middleware/authenticate')
const authRoutes = require('./routes/auth')


const app = express()

app.get('/users', async (req: Request, res: Response) => {
    res.send('hi')
    // const users = await User.findAll();
    // res.json(users);
});

app.get('/create', async (req: Request, res: Response) => {
    const create = await prisma.interest.createMany({
        data: [
            { name: 'Web Design' },
            { name: 'UI Design' },
            { name: 'Software Development' },
            { name: 'UX Design' },
            { name: 'Machine Learning' },
            { name: 'Artificial Intelligence' },
            { name: 'Augmented Reality' },
            { name: 'Virtual Reality' },
        ]
    })
    res.json(create)
});

app.use(cookieParser())
app.use('/auth', authRoutes)

// Middleware for only allowing calling with a JWT
app.use(authenticate)

// Test
app.get('/users/me', (req: Request, res: Response) => {
    res.send('hello')
})

app.listen(3000, () => {
    console.log("Hello world")
})