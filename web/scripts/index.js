document.addEventListener("DOMContentLoaded", async function () {
    const authButtons = document.getElementById("auth-buttons");

    try {
        const response = await fetch("/api/profile/info", { method: "GET", credentials: "include" });

        if (response.ok) {
            authButtons.innerHTML = `
                <button type="button" class="btn btn-outline-primary me-2" onclick="window.location.href='/profile';">Profile</button>
                <button type="button" class="btn btn-danger" onclick="logout();">Logout</button>
            `;
        } else {
            window.location.href = "/login";
        }
    } catch (error) {
        console.error("Error checking authentication:", error);
        window.location.href = "/login";
    }
});


async function logout() {
    try {
        const response = await fetch("/api/logout", { method: "POST" });
        if (response.ok) {
            window.location.href = "/login";
        } else {
            alert(`Failed to logout.`);
        }
    } catch (error) {
        console.error("Logout error:", error);
        alert("Something went wrong!");
    }
}
