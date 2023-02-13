import prisma from '../db';
import { createJWT, hashPasswword } from '../modules/auth';

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

export const signIn = (req, res) => {

}