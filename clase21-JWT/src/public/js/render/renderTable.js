import { deleteProduct } from './deleteProduct.js'

export function renderTable (array, container, btn) {
    let content = ''

    array.forEach(item => {
        if(btn) {
            content += `
                <tr class="fila" *ngFor="let item of filas" role="button">
                    <td class="py-4 px-6">${item.title}</td>
                    <td class="py-4 px-6">${item.description}</td>
                    <td class="py-4 px-6">${item.code}</td>
                    <td class="py-4 px-6">${item.price}</td>
                    <td class="py-4 px-6">${item.status}</td>
                    <td class="py-4 px-6">${item.stock}</td>
                    <td class="py-4 px-6">${item.category}</td>
                    <td class="py-4 px-6">
                        <form class="btn-delete-product" id=${item._id}>
                            <button class="bg-red-500 text-white p-2 rounded-md shadow-lg">
                                <svg class="text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                </svg>
                            </button>
                        </form>
                    </td>
                </tr>
            `
        } else {
            content += `
                <tr class="fila" *ngFor="let item of filas" role="button">
                    <td class="py-4 px-6">${item.title}</td>
                    <td class="py-4 px-6">${item.description}</td>
                    <td class="py-4 px-6">${item.code}</td>
                    <td class="py-4 px-6">${item.price}</td>
                    <td class="py-4 px-6">${item.status}</td>
                    <td class="py-4 px-6">${item.stock}</td>
                    <td class="py-4 px-6">${item.category}</td>
                </tr>
            `
        }
    })

    container.innerHTML = content
    deleteProduct()
}