export class ResponseData {
    constructor( status, message, data ) {
        this.status = status
        this.message = message
        this.payload = data || []
    }
}

// export class ResponseApi {
//     constructor(
//         status,
//         payload,
//     ) {
//         this.status       = status
//         this.payload      = payload
//         this.totalPages   = totalPages
//         this.prevPage     = prevPage
//         this.nextPage     = nextPage
//         this.page         = page
//         this.hasPrevPage  = hasPrevPage
//         this.hasNextPage  = hasNextPage
//         this.prevLink     = prevLink
//         this.nextLink     = nextLink
//     }
// }