import express from 'express';
import cookieParser from 'cookie-parser';
import { verifyToken } from '../middleware/auth.js';
import { addUserValidator, loginUserValidator } from '../validations/user.js';
import { loginUser, logoutUser, registerUser } from '../controllers/auth.js';

const router = express.Router();
router.use(cookieParser());

router.route('/register').post(addUserValidator, registerUser);
router.route('/login').post(loginUserValidator, loginUser);
router.route('/logout').post(verifyToken, logoutUser);

export default router;
