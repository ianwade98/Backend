import mongoose from 'mongoose';
import config from '../../config.js';

(async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log('Conectado a la base de datos correctamente.');
    } catch (error) {
        console.log('Error de conexión a la base de datos.');
        console.log(error)
    }
})();