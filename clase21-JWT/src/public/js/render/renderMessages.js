export function renderMessages (array, container) {
    let content = ''

    array.forEach(item => {
        content += `
            <div class="font-medium flex items-start justify-start gap-1">
                <h3 class="text-emerald-500">
                    ${item.user} :
                </h3>
                <p class="text-gray-600">
                    ${item.message}
                </p>
            </div>
        `
    })

    container.innerHTML = content
}