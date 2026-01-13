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