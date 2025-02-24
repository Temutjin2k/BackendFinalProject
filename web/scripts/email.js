document.getElementById('send-email-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const email = document.getElementById('email').value; // Extract email from the option text
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    const formData = {
        to: email,
        subject: subject,
        text: message
    }

    try {
        const response = await fetch("/api/mail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            document.querySelector("#send-email-form").reset(); 
        } else {
            alert(data.error || "Failed to send email."); 
        }

    } catch (error) {
        console.error("Error sending email:", error);
        alert("Network error. Please try again.");
    }
});
