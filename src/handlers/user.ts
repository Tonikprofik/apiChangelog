import prisma from '../db';
import { comparePassword, createJWT, hashPasswword } from '../modules/auth';

export const createNewUser = async (req, res) => {
    const { username, password } = req.body;
    
    const user = await prisma.user.create({
        data: {
            username,
            password: await hashPasswword(password)
        }
    })

    const token = createJWT(user)
    res.json({token})
}

export const signIn = async (req, res) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (!user) return res.status(404).json({ message: 'User not found' })
    
    const valid = await comparePassword(password, user.password)
    if(!valid) return res.status(401).json({message: 'Invalid credentials'})
}