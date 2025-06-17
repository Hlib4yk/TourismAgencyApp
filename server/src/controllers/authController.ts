import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
const JWT_SECRET = process.env.JWT_SECRET;

interface AuthBody {
    name?: string;
    email: string;
    password: string;
}

const generateToken = (id: string): string => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
};
type RegisterHandler = (
    req: Request<{}, {}, AuthBody>,
    res: Response
) => Promise<any>;
export const register:RegisterHandler = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id.toString());

        res.status(201).json({
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ message: 'Registration failed' });
    }
};

type loginHandler = (
    req: Request<{}, {}, AuthBody>,
    res: Response
) => Promise<any>;

export const login:loginHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            user: { id: user._id, name: user.name, email: user.email },
            token,
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Login failed' });
    }
};

