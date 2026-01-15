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

function inputCheck(input) {
    if (input.value.trim() === "") {
        showError(input,"This field cannot be empty")
        return false
    }
    return true
}

const nameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/
const emailRegex = /^\S+@\S+\.\S+$/
const phoneRegex = /^[6-9]\d{9}$/ 
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

const signupForm = document.getElementById("signupForm")

if (signupForm) {
    const name = document.getElementById("name")
    const email = document.getElementById("email")
    const phone = document.getElementById("phone")
    const pass = document.getElementById("password")
    const confirm = document.getElementById("confirmPassword")
    const result = document.getElementById("result")

    name.addEventListener("input", () => {
        if (!inputCheck(name)) return
        if (!name.value.match(nameRegex)) {
            showError(name, "Only letters allowed (A-Z,a-z) ")
        } else clearError(name)
    })

    email.addEventListener("input", () => {
        if (!inputCheck(email)) return
        if (!email.value.match(emailRegex)) {
            showError(email, "Invalid email")
        } else clearError(email)
    })

    phone.addEventListener("input", () => {
        phone.value = phone.value.replace(/\D/g, "")
        if (!inputCheck(phone)) return
        if (!phone.value.match(phoneRegex)) {
            showError(phone, "Enter valid Indian mobile number")
        } else clearError(phone)
    })

    pass.addEventListener("input", () => {
        if (!inputCheck(pass)) return

        const len = pass.value.length
        if (len < 6) {
            result.innerHTML = "Password is weak"
            result.style.color = "#ff5925"
        } else if (len < 9) {
            result.innerHTML = "Password is fair"
            result.style.color = "orange"
        } else {
            result.innerHTML = "Password is strong"
            result.style.color = "#26d730"
        }

        if (!pass.value.match(passwordRegex)) {
            showError(pass, "Min 8 chars with letters & numbers")
        } else clearError(pass)

        if (confirm.value && pass.value !== confirm.value) {
            showError(confirm, "Passwords do not match")
        } else clearError(confirm)
    })

    confirm.addEventListener("input", () => {
        if (!inputCheck(confirm)) return
        if (pass.value !== confirm.value) {
            showError(confirm, "Passwords do not match")
        } else clearError(confirm)
    })

    signupForm.addEventListener("submit", e => {
        e.preventDefault()
        let valid = true

        const text = document.getElementById("msg")

        if (!inputCheck(name)) valid = false
        if (!inputCheck(email)) valid = false
        if (!inputCheck(phone)) valid = false
        if (!inputCheck(pass)) valid = false
        if (!inputCheck(confirm)) valid = false

        if (!name.value.match(nameRegex)) valid = false
        if (!email.value.match(emailRegex)) valid = false
        if (!phone.value.match(phoneRegex)) valid = false
        if (!pass.value.match(passwordRegex)) valid = false
        if (pass.value !== confirm.value) valid = false

        if (!valid) return

        localStorage.setItem("user", JSON.stringify({
            email: email.value,
            password: pass.value
        }))

        text.innerHTML = `✅Congratulations ${name.value}! You have signed up sucessfully`
        text.style.color = "#26d730"

         setTimeout(() => {
            window.location.href = "index.html"
        }, 5000)
    })
}

const signinForm = document.getElementById("signinForm")

if (signinForm) {
    signinForm.addEventListener("submit", e => {
        e.preventDefault()

        const email = document.getElementById("loginEmail")
        const pass = document.getElementById("loginPassword")
        const message = document.getElementById("message")
        const user = JSON.parse(localStorage.getItem("user"))

        let valid = true

        if (!inputCheck(email)) valid = false
        if (!inputCheck(pass)) valid = false
        if (!valid) return

        if (!user || !email.value.match(emailRegex) || user.email !== email.value) {
            showError(email, "Email not registered")
            return
        } else clearError(email)

        if (user.password !== pass.value) {
            showError(pass, "Incorrect password")
            return
        } else clearError(pass)

        message.innerHTML = "Login Successful"
        message.style.color = "#26d730"

        setTimeout(() => {
            window.location.href = "travel.html"
        }, 3000)
    })
}