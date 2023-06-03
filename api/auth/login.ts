import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';

const router = express.Router();
const crypto = require('crypto');

const secretKey = crypto.randomBytes(32).toString('hex');

// console.log(secretKey);

const login = (prisma: PrismaClient) => {
    router.post('/', async (req: express.Request, res: express.Response) => {
        const { email, password } = req.body;
        const user: User | null = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json('User not found');
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json('Invalid password');
  
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            secretKey,
            { expiresIn: '365d' }
        );

        res.json({ token, user });
    });

    return router;
};
export default login;
