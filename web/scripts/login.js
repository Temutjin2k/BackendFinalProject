document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    const loginData = { email, password };
    try {
        // Send data to the backend
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });

        // Handle response
        const result = await response.json();
        if (response.ok) {
            window.location.href = '/';
        } else {
            alert(`Login failed: ${result.error || 'Unknown error'}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login. Please try again.');
    }
});
