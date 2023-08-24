export class Product {
    constructor( title, description, code, price, status, stock, category, thumbnails ) {
        this.title          = title
        this.description    = description
        this.code           = code
        this.price          = price
        this.status         = status || true
        this.stock          = stock
        this.category       = category
        this.thumbnails     = thumbnails || []
    }
}