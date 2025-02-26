document.addEventListener("DOMContentLoaded", async function () {
    await fetchUsers();
});


// Получить список пользователей
async function fetchUsers() {
    try {
        const res = await fetch('/api/users', { method: 'GET', credentials: 'include' });

        if (!res.ok) {
            alert("Failed to fetch users.");
            return;
        }

        const users = await res.json();
        document.getElementById('userList').innerHTML = users.map(user => `
            <tr>
                <td>${user._id}</td>
                <td>${user.first_name} ${user.last_name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="openEditUserModal('${user._id}', '${user.first_name}', '${user.last_name}', '${user.email}', '${user.role}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            </tr>
        `).join('');

    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

function openEditUserModal(id, firstName, lastName, email, role) {
    document.getElementById('editUserId').value = id;
    document.getElementById('editFirstName').value = firstName;
    document.getElementById('editLastName').value = lastName;
    document.getElementById('editEmail').value = email;
    document.getElementById('editRole').value = role;

    let modal = new bootstrap.Modal(document.getElementById('editUserModal'));
    modal.show();
}

async function saveUserChanges() {
    const id = document.getElementById('editUserId').value;
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const email = document.getElementById('editEmail').value;
    const role = document.getElementById('editRole').value;

    try {
        const res = await fetch(`/api/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ first_name: firstName, last_name: lastName, email, role })
        });

        if (!res.ok) {
            alert("Failed to update user.");
            return;
        }

        alert("User updated successfully!");
        fetchUsers();
        let modal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        modal.hide();

    } catch (error) {
        console.error("Error updating user:", error);
    }
}

async function deleteUser(id) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        alert("User deleted successfully!");
        fetchUsers();
    } catch (error) {
        console.error("Error deleting user:", error);
    }
}