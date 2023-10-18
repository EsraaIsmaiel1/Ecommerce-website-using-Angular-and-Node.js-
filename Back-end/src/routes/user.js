import express from 'express';
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/user.js';
import { isAllowed, verifyToken } from '../middleware/auth.js';
const router = express.Router();

router.route('/').get(getAllUsers).post(addUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

export default router;
