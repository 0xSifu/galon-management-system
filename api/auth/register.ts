import express from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient, User } from '@prisma/client';

const router = express.Router();

const register = (prisma: PrismaClient) => {
    router.post('/', async (req: express.Request, res: express.Response) => {
        const { username, email, password, role, address, long, lat, status = 'active' } = req.body;
    
        if (!username || !email || !password || !role || !address || !long || !lat) {
            res.status(400).json({ message: 'Missing required fields' });
            return;
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user: User = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                role,
                address,
                long,
                lat,
                status,
                created_date: new Date()
            },
        });
        res.json(user);
    });

    return router;
};

export default register;
