const form = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.querySelector("#mess1")
const message2 = document.querySelector("#mess2")

message1.textContent = ''
message2.textContent = ''

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    message1.textContent = "Loading..."
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ""
            } else {
                message2.textContent = data.forecast
                message1.textContent = data.location
            }
        })
    })
})