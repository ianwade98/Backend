import config from '../../config.js';
import UsersMongo from './usersDAOs/usersMongo.js';
import CartsMongo from './cartsDAOs/CartsMongo.js';
import ProductsMongo from './productsDAOs/ProductsMongo.js';

let DAO = {
    users: null,
    carts: null,
    products: null
};

switch (config.PERSISTENCE) {
    case 'MONGO':
        await import('../mongo/mongoConfig.js');
        DAO.users = new UsersMongo();
        DAO.carts = new CartsMongo();
        DAO.products = new ProductsMongo();
        break;
    default:
        await import('../mongo/mongoConfig.js');
        DAO.users = new UsersMongo();
        DAO.carts = new CartsMongo();
        DAO.products = new ProductsMongo();
        break;
}

export default DAO;