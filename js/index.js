function toggle(id) {
    const input = document.getElementById(id)
    input.type = input.type === "password" ? "text" : "password"
}

function showError(input, msg) {
    const error = input.closest(".mb-3").querySelector(".error");
    error.innerHTML = msg;
    input.classList.add("is-invalid");
}

function clearError(input) {
    const error = input.closest(".mb-3").querySelector(".error");
    error.innerHTML = "";
    input.classList.remove("is-invalid");
}

const signupForm = document.getElementById("signupForm")

if (signupForm) {
    signupForm.addEventListener('submit', e => {
        e.preventDefault()
        let valid = true

        const name = document.getElementById("name")
        const email = document.getElementById("email")
        const phone = document.getElementById("phone")
        const pass = document.getElementById("password")
        const confirm = document.getElementById("confirmPassword")
    })
}