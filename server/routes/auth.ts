import express, { Request, Response } from "express"

require('dotenv').config()
const axios = require('axios')
const db = require('../db')
const jwt = require('jsonwebtoken')

const router = express.Router();

router.get('/discord', (req: Request, res: Response) => {
    const url = 'https://discord.com/api/oauth2/authorize?client_id=1083847204478914711&redirect_uri=http%3A%2F%2F45.136.70.211%3A3000%2Fauth%2Fdiscord%2Fcallback&response_type=code&scope=identify%20email'
    res.redirect(url)
})

router.get('/discord/callback', async (req, res) => {
    if (!req.query.code) throw new Error('Code not provided');

    const { code } = req.query;
    const params = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.DISCORD_REDIRECT_URI
    })

    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'application/x-www-form-urlencoded'
    }

    // Get Discord Access Token
    const response = await axios.post('https://discord.com/api/oauth2/token', params, { headers })

    // Get the logged user's discord information
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
        headers: {
            Authorization: `Bearer ${response.data.access_token}`
        }
    })

    const { id, username, avatar } = userResponse.data


    const createUser = async () => {
        try {
            const newUser = await User.create({ discord_id: id, username: username, avatar: avatar });
            return res.json(newUser)
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    // update in case user exists already
    const updateUser = async () => {
        try {
            const updatedUser = await User.update({ discord_id: id, username: username, avatar: avatar })
            return res.json(updatedUser)
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    const checkUserExists = async () => {
        const checkUser = await User.findOne({ where: { discord_id: id } })
        if (checkUser === null) {
            return null;
        } else {
            return res.json(checkUser)
        }
    }

    const userExists = await checkUserExists()

    if (userExists) {
        await updateUser();
    } else {
        await createUser();
    }

    const token = jwt.sign({ sub: id }, process.env.JWT_SECRET, { expiresIn: '15m' })

    res.cookie('token', token);
    res.redirect(process.env.CLIENT_REDIRECT_URL)

})

module.exports = router;
