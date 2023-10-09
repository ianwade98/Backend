// Import clase del DAO de mensajes:
import MessageDAO from "../DAO/mongodb/MessageMongo.dao.js";

// Clase para el Service de mensajes: 
export default class MessageService {

    // Constructor de MessageService:
    constructor() {
        this.messageDao = new MessageDAO();
    }

    // Métodos de MessageService: 

    // Crear un mensaje - Service:
    async createMessageService(message) {
        let response = {};
        try {
            const resultDAO = await this.messageDao.createMessage(message);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Mensaje creado exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al crear el producto - Service: " + error.message;
        };
        return response;
    };

    // Traer todos los mensajes - Service: 
    async getAllMessageService() {
        let response = {};
        try {
            const resultDAO = await this.messageDao.getAllMessage();
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.status === "not found messages") {
                response.statusCode = 404;
                response.message = `No se encontraron mensajes. El resultado fue de ${resultDAO.result.length} mensajes`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Mensajes obtenidos exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al obtener los mensajes - Service: " + error.message;
        };
        return response;
    };

    // Borrar un mensaje - DAO:
    async deleteMessageService(mid) {
        let response = {};
        try {
            const resultDAO = await this.messageDao.deleteMessage(mid);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.status === "not found message") {
                response.statusCode = 404;
                response.message = `No se encontró ningún mensaje con el ID ${mid}.`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Mensaje eliminado exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al eliminar el mensaje - Service: " + error.message;
        };
        return response;
    };

};