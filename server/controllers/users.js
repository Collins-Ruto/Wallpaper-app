import UserData from '../models/userData.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const ObjectId = mongoose.Types.ObjectId;

export const getUsers = async (req, res) => {
    try {
        const userData = await UserData.find()

        res.status(200).json(userData)
    } catch (error) {
        console.log(error.message)
    }
}
export const getData = async (req, res) => {
    try {
        const userData = await images.find()

        res.status(200).json(userData)
    } catch (error) {
        console.log(error.message)
    }
}
export const getUser = async (req, res) => {
    const {email, password} = req.body
    console.log(req.body)
    try {
        const existUser = await UserData.findOne({ email })

        if (!existUser) {return res.status(404).json({message: 'User not found'}) }

        const correctPass = await bcrypt.compare(password, existUser.password)
        if (!correctPass) {return res.status(404).json({message: "invalid password"}) }

        const token = jwt.sign({email: existUser.email, id: existUser._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result: existUser, token})
    } catch (error) {
        res.status(500).json({message : "something went wrong", error: error})
    }
}
export const googleLogin = async (req, res) => {
    const {email, name, image} = req.body
    console.log(email)
    try {
        const existUser = await UserData.findOne({ email })

        if (existUser) {
            return res.status(200).json({result: existUser})
        } else {
            const result = await UserData.create({email, name, image: image})
        }
    } catch (error) {
        res.status(500).json({message : "something went wrong", error: error})
    }

}
export const createUsers = async (req, res) => {
    const {name, email, password, confPass} = req.body

    try {
        const existUser = await UserData.findOne({ email })

        if (existUser) {
            return res.status(406).json({message: 'User already exists',}) }
        
        if (password !== confPass) return res.status(403).json({message: 'Passwords do not match'})

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserData.create({email, name, password: hashedPassword})

        const token = jwt.sign({email: result.email, id: result._id}, 'test', {expiresIn: "1h"})

        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message : "something went wrong", error: error})
    }
}

export const addFavorites = async (req, res) => {

    const {userId, image} = req.body
    const _id = ObjectId(userId)
    
    try {
        const updateUser = await UserData.updateOne(
            {_id: _id},
            {$push: {favorites: image}}
        )
        const upUser = await UserData.findOne({ _id})
        res.status(200).json({result: upUser})
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteFavorites = async (req, res) => {
    
    const {userId, imageId} = req.body;
    const _id = ObjectId(userId)
    console.log(imageId)
    try {
        const deldata = await UserData.updateOne(
            {_id: _id},
            {$pull: {favorites: {id: imageId}}},
            {multi : true} 
        )
        const user = await UserData.findOne({_id})
        res.status(200).json({result: user})
    } catch (error) {
        console.log(error.message)
    }
}

