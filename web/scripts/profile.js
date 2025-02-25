document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/profile/info', {
            method: 'GET'
        });

        if (response.ok) {
            const profileData = await response.json();
            
            // Заполняем страницу данными профиля
            document.getElementById('profile-name').innerHTML = `<strong>Full Name:</strong> ${profileData.first_name} ${profileData.last_name}`;
            document.getElementById('profile-email').innerHTML = `<strong>Email:</strong> ${profileData.email}`;
        } else {
            const error = await response.json();
            alert(`Ошибка: ${error.error}`);
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Ошибка при загрузке профиля:', error);
        alert('Произошла ошибка. Попробуйте снова.');
    }
});
