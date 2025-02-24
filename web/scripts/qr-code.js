async function generateQRCode() {
    const url = document.getElementById('urlInput').value;
    if (!url) {
        alert("Please enter a valid URL");
        return;
    }

    window.location.href = `/api/qrcode?url=${url}`
}