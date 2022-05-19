import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, required: true}, 
    email: { type: String, required: true},
    password: { type: String, required: true},
    favorites: [{

    }],
    image: String
})

const UserData = mongoose.model('UserData', userSchema);

export default UserData