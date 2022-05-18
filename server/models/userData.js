import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    favorites: [{

    }],
    password: String,
    image: String
})

const UserData = mongoose.model('UserData', userSchema);

export default UserData