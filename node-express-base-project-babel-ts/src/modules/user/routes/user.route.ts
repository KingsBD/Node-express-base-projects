import express from 'express';
import userController from '../controllers/user.controller';

const router = express.Router();

// Create
router.put('/', userController.createUser);

// Modify
router.post('/', userController.updateUser);

// Delete
router.delete('/:id', userController.deleteUser);

// Get user
router.get('/:id', userController.getUser);

// Get users
router.get('/', userController.getUsers);

export default router;
