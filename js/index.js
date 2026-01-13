function toggle(id) {
    const input = document.getElementById(id)
    input.type = input.type === "password" ? "text" : "password"
}

function showError(input, msg) {
    const error = input.closest(".mb-3").querySelector(".error")
    error.innerHTML = msg
    input.classList.add("is-invalid")
}

function clearError(input) {
    const error = input.closest(".mb-3").querySelector(".error")
    error.innerHTML = ""
    input.classList.remove("is-invalid")
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

        const nameRegex = /^[A-Za-z ]+$/
        const emailRegex = /^\S+@\S+\.\S+$/
        const phoneRegex = /^\d{10}$/
        const passwordREgex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

        if (!name.value.match(nameRegex)) {
            showError(name, "Only letters allowed")
            valid = false
        } else clearError(name)

        if (!email.value.match(emailRegex)) {
            showError(email, "Invalid email")
            valid = false
        } else clearError(email)

        if (!phone.value.match(phoneRegex)) {
            showError(phone, "10 digits required")
            valid = false
        } else clearError(phone)

        if (!pass.value.match(passwordREgex)) {
            showError(pass, "Min 8 chars with letters & numbers")
            valid = false
        } else clearError(pass)

        if (pass.value !== confirm.value) {
            showError(confirm, "Passwords do not match")
            valid = false
        } else clearError(confirm)

        if (!valid) return

        localStorage.setItem("user", JSON.stringify({ email: email.value, password: pass.value }))
        window.location.href = "index.html"

    })
}

const signinForm = document.getElementById("signinForm")
if (signinForm) {
    signinForm.addEventListener("submit", e => {
        e.preventDefault()
        let valid = true

        const email = document.getElementById("loginEmail")
        const pass = document.getElementById("loginPassword")
        const user = JSON.parse(localStorage.getItem("user"))

        if (!user || user.email !== email.value) {
            showError(email, "Email not registered")
            valid = false;
        }
        else clearError(email)
        if (!user || user.password !== pass.value) {
            showError(pass, "Incorrect password")
            valid = false;
        }
        else clearError(pass)

        if (!valid) return
        window.location.href = "travel.html"
    });
}