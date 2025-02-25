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