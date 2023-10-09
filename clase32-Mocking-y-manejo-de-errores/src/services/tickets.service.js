// Import clase del DAO de Tickets:
import TicketDAO from "../DAO/mongodb/TicketMongo.dao.js";

// Clase para el Service de tickets:
export default class TicketService {

    // Constructor de TicketService:
    constructor() {
        this.ticketDao = new TicketDAO();
    }

    // Métodos del TicketService: 

    // Crear ticket - Service:
    async createTicketService(ticketInfo) {
        let response = {};
        try {
            const resultDAO = await this.ticketDao.createTicket(ticketInfo);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Ticket creado exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "No se pudo crear el ticket - Service: " + error.message;
        };
        return response;
    };

    // Obtener todos los tickets de un usuario - Service:
    async getTicketByIdService(tid) {
        let response = {};
        try {
            const resultDAO = await this.ticketDao.getTicketByID(tid);
            if (resultDAO.status === "error") {
                response.statusCode = 500;
                response.message = resultDAO.message;
            } else if (resultDAO.status === "not found ticket") {
                response.statusCode = 404;
                response.message = `No se encontro ningún ticket con el ID ${tid}.`;
            } else if (resultDAO.status === "success") {
                response.statusCode = 200;
                response.message = "Ticket obtenido exitosamente.";
                response.result = resultDAO.result;
            };
        } catch (error) {
            response.statusCode = 500;
            response.message = "Error al obtener el ticket por ID - Service: " + error.message;
        };
        return response;
    };

};