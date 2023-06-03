import express from 'express';
import { PrismaClient } from '@prisma/client';
import register from './api/auth/register'; // Make sure this path correctly points to your register.ts file
import login from './api/auth/login'; // Make sure this path correctly points to your register.ts file
import users from './api/auth/users';

const app = express();
const prisma = new PrismaClient();

app.use(express.json()); // This line ensures that Express will parse incoming JSON requests

app.use('/api/auth/register', register(prisma));
app.use('/api/auth/login', login(prisma));
app.use('/api/auth/users', users(prisma));



app.listen(3000, () => console.log('Server started on port 3000'));
