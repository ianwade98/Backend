import { Schema, model } from "mongoose"

import { DB_COLLECTION_CARTS } from '../../config/config.js'

const cartCollection = DB_COLLECTION_CARTS

const cartSchema = Schema({
    products: [
        {
           _id: {
                type: Schema.Types.ObjectId,
                ref: 'products',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]

})

export const cartModelSchema = model(cartCollection, cartSchema)