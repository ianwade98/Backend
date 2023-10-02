import { usersModel } from '../../mongo/models/users.model.js';
import config from '../../../config.js';

export default class UsersMongo {
    async createUser(user) {
        const { email } = user;
        try {
            const userExists = await usersModel.find({ email });
            if (userExists.length === 0) {
                const newUser = await usersModel.create(user);
                return newUser
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }

    async loginUser(user) {
        try {
            const { email, password } = user;
            const foundUser = await usersModel.find({ email, password });
            if (foundUser.length !== 0) {
                return foundUser
            } else if (email === config.ADMIN_EMAIL && password === config.ADMIN_PASSWORD) {
                return [{...user, firstName: 'coder', lastName: 'house', admin: true, age: 9}]
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }
}