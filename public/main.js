// main.js
const update = document.querySelector('#update-button')

const deleteButton = document.querySelector('#delete-button')
deleteButton.addEventListener('click', _ => {
    fetch('/titles', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        window.location.reload()
    })
})