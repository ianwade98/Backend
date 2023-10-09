import ErrorEnums from "./error.enums.js";

export const errorMiddleware = (error, req, res, next) => {

    req.logger.warn(error.cause);

    switch (error.code) {

        // Carrito: 

        case ErrorEnums.INVALID_ID_CART_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_ID_CART_ERROR
            });
            break;

        case ErrorEnums.INVALID_ID_CART_OR_PRODUCT_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_ID_CART_OR_PRODUCT_ERROR
            });
            break;

        case ErrorEnums.QUANTITY_INVALID_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.QUANTITY_INVALID_ERROR
            });
            break;

        case ErrorEnums.PRODUCTS_MISSING_OR_INVALID:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.PRODUCTS_MISSING_OR_INVALID
            });
            break;

        case ErrorEnums.INVALID_PRODUCT:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_PRODUCT
            });
            break;

        case ErrorEnums.INVALID_EMAIL:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_EMAIL
            });
            break;

        case ErrorEnums.INVALID_UPDATED_CART_FIELDS:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_UPDATED_CART_FIELDS
            });
            break;

        case ErrorEnums.INVALID_UPTATED_PROD_IN_CART:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_UPTATED_PROD_IN_CART
            });
            break;

            // Productos: 

        case ErrorEnums.INVALID_PRODUCT_DATA:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_PRODUCT_DATA
            });
            break;

        case ErrorEnums.INVALID_ID_PRODUCT_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_ID_PRODUCT_ERROR
            });
            break;

        case ErrorEnums.INVALID_UPDATED_PRODUCT_FIELDS:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_UPDATED_PRODUCT_FIELDS
            });
            break;

            // Mensajes: 

        case ErrorEnums.INVALID_MESSAGE_DATA:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_MESSAGE_DATA
            });
            break;

        case ErrorEnums.INVALID_ID_MESSAGE_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_ID_MESSAGE_ERROR
            });
            break;

            // Ticket:

        case ErrorEnums.INVALID_TICKET_DATA:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_TICKET_DATA
            });
            break;

        case ErrorEnums.INVALID_ID_TICKET_ERROR:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_ID_TICKET_ERROR
            });
            break;

            // Session: 

        case ErrorEnums.INVALID_REGISTER_DATA:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_REGISTER_DATA
            });
            break;

        case ErrorEnums.INVALID_LOGIN_DATA:
            res.status(400).send({
                status: "error",
                error: error.name,
                cause: error.cause,
                message: error.message,
                code: ErrorEnums.INVALID_LOGIN_DATA
            });
            break;

        default:
            res.status(500).send({
                status: "error",
                error: "Unhandled error",
                cause: error.message
            });
    }
};