import { Schema, model } from "mongoose"

import { DB_COLLECTION_MESSAGES } from '../../config/config.js'

const messageCollection = DB_COLLECTION_MESSAGES

const messageSchema = Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export const messageModelSchema = model(messageCollection, messageSchema)