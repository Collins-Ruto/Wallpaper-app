import express from 'express';

import {getUsers, getUser, createUsers, deleteFavorites, addFavorites} from '../controllers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.post('/signin', getUser);
router.post('/', createUsers)

router.put('/favorites', addFavorites)
router.delete('/favorites', deleteFavorites);

export default router