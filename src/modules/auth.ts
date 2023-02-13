import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';


export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export const hashPasswword = (password) => {
    return bcrypt.hash(password, 10)
}

export const createJWT = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username },
        process.env.JWT_SECRET)
    return token
}

export const protect = (req, res, next) => {
    const bearer = req.headers.authorization

    if (!bearer || !bearer.startsWith('Bearer ')) {
        res.status(401)
        res.send('Unauthorized')
        return
    }

    const [, token] = bearer.split(' ') // Bearer Xtoken
    if (!token) {
        res.status(401)
        res.json({message: 'Unauthorized'})
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()

    } catch (error) {
        console.error(error);
        res.status(401)
        res.json({message: 'errUnauthorized'})
        return
    }
}
