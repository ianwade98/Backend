import { config } from "dotenv"
config()

export const PORT = process.env.PORT || 3000
export const DB_NAME = process.env.DB_NAME
export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_COLLECTION_PRODUCTS = process.env.DB_COLLECTION_PRODUCTS
export const DB_COLLECTION_CARTS = process.env.DB_COLLECTION_CARTS
export const DB_COLLECTION_MESSAGES = process.env.DB_COLLECTION_MESSAGES
export const DB_COLLECTION_USERS = process.env.DB_COLLECTION_USERS

export const PASSPORT_GITHUB_CLIENTID = process.env.PASSPORT_GITHUB_CLIENTID
export const PASSPORT_GITHUB_CLIENTSECRET = process.env.PASSPORT_GITHUB_CLIENTSECRET
export const PASSPORT_GITHUB_CALLBACKURL = process.env.PASSPORT_GITHUB_CALLBACKURL