document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const authButtons = document.getElementById("auth-buttons");

    if (token) {
        authButtons.innerHTML = `
            <button type="button" class="btn btn-outline-primary me-2" onclick="window.location.href='/profile';">Profile</button>
            <button type="button" class="btn btn-danger" onclick="logout();">Logout</button>
        `;
    }
});

function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
}