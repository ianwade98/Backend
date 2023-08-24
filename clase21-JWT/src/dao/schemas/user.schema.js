import { Schema, model } from 'mongoose'
import { DB_COLLECTION_USERS } from '../../config/config.js'

const userCollection = DB_COLLECTION_USERS

const userSchema = Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'usuario',
        required: true,
    }
})

export const userModelSchema = model(userCollection, userSchema)