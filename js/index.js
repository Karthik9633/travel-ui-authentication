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

        setTimeout(() => {
            window.location.href = "index.html"
        }, 3000);
    })
}

const signinForm = document.getElementById("signinForm")
if (signinForm) {
    signinForm.addEventListener("submit", e => {
        e.preventDefault()
        let valid = true

        const email = document.getElementById("loginEmail")
        const pass = document.getElementById("loginPassword")
        const message = document.getElementById("message")
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
        setTimeout(() => {
            window.location.href = "travel.html"
        }, 3000);

        message.innerHTML = "Login Successfull"
        message.style.color = "#26d730"

    });
}

const inputs = document.querySelectorAll(
    "#signupForm input, #signinForm input"
)

inputs.forEach(input => {
    input.addEventListener("input", () => {
        clearError(input)
    })
})

const password = document.getElementById("password")
const result = document.getElementById("result")



password.addEventListener('input', () => {

    const length = password.value.length

    if (length === 0) {
        result.style.display = "block"
        result.innerHTML = ""
        password.style.border = ""

        return

    } else {
        result.style.display = "block"
    }

    if (length < 6) {
        result.innerHTML = "Password is weak"
        password.style.border = "2px solid #ff5925"
        result.style.color = "#ff5925"
    }
    else if (length >= 6 && length < 9) {
        result.innerHTML = "Password is fair"
        password.style.border = "2px solid yellow"
        result.style.color = "yellow"
    }

    else {
        result.innerHTML = "Password is strong"
        password.style.border = "2px solid #26d730"
        result.style.color = "#26d730"
    }

})
