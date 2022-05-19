import express from 'express';

import {getUsers, getUser, createUsers, editUsers, deleteUsers} from '../controllers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.post('/signin', getUser);
router.post('/', createUsers)
router.put('/', editUsers)
router.delete('/:id', deleteUsers);

export default router