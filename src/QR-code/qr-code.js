const qr = require('qr-image');
const fs = require('fs')
function qrCodeApi(req, res) {
    const url = req.query.url;
    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        console.log("Generating QR code for:", url);
        
        const qrCode = qr.imageSync(url, { type: 'png', size: 10 });
        fs.writeFileSync('qr-code.png', qrCode);


        res.writeHead(200, { 'Content-Type': 'image/png' });
        fs.createReadStream('qr-code.png').pipe(res);
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = qrCodeApi;
