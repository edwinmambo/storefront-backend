import express from 'express';
import authoriseToken from '../auth/authorisation.auth';
import { UserController } from '../controllers/index.controller';

const usersRouter = express.Router();
const controller = new UserController();

usersRouter.get('/', authoriseToken, controller.getAllUsers);
usersRouter.get('/:id', authoriseToken, controller.getUserById);
usersRouter.post('/', controller.createUser);
usersRouter.patch('/:id', authoriseToken, controller.updateUser);
usersRouter.delete('/:id', authoriseToken, controller.deleteUser);

export default usersRouter;
