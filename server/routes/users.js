import express from 'express';

import {getUsers, createUsers, editUsers, deleteUsers} from '../controllers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUsers)
router.put('/', editUsers)
router.delete('/', deleteUsers);

export default router