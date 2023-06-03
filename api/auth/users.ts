import express from 'express';
import { PrismaClient, User } from '@prisma/client';

const router = express.Router();

const users = (prisma: PrismaClient) => {
    router.get('/', async (req: express.Request, res: express.Response) => {
        const users: User[] = await prisma.user.findMany();
        res.json(users);
    });

    return router;
};

export default users;
