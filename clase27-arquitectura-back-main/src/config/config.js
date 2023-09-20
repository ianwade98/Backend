import dotenv from 'dotenv';
dotenv.config()

export default{
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    USER_MONGO: process.env.USER_MONGO,
    PASSWORD_MONGO: process.env.PASSWORD_MONGO,
}