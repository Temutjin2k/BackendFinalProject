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

