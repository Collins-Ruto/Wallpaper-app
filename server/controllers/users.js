import UserData from '../models/userData.js'

export const getUsers = async (req, res) => {
    try {
        const userData = await UserData.find()

        res.status(200).json(userData)
    } catch (error) {
        console.log(error.message)
    }
}

export const createUsers = async (req, res) => {
    const  user = req.body
    console.log(user)

    const newUser = new UserData(user)

    try {
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message)
    }
}

export const editUsers = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
    }
    res.send("user edit route works")
}

export const deleteUsers = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error.message)
    }
    res.send("user delete route works")
}

