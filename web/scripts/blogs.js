let userFullName = "";
let isAdmin = false;

document.addEventListener("DOMContentLoaded", async function () {
    await fetchUserProfile();
    await fetchBlogs();
});

async function fetchUserProfile() {
    try {
        const res = await fetch('/api/profile/info', {
            method: 'GET',
            credentials: 'include'
        });

        if (!res.ok) {
            window.location.href = "/login";
            return;
        }

        const user = await res.json();
        userFullName = `${user.first_name} ${user.last_name}`;
        isAdmin = user.email === "admin@admin.com";

    } catch (error) {
        console.error("Error fetching user profile:", error);
    }
}

async function fetchBlogs() {
    try {
        const res = await fetch('/api/blogs');
        const blogs = await res.json();

        document.getElementById('blogList').innerHTML = blogs.map(blog => `
    <div class="col-md-4">
        <div class="card mb-3 p-3">
            <h5>${blog.title}</h5>
            <p>${blog.body}</p>
            <small>By: ${blog.author}</small>

            <!-- Показываем кнопки, если пользователь - автор или он админ -->
            ${(blog.author === userFullName || isAdmin) ? `
                <button class="btn btn-warning btn-sm mt-2" onclick="openEditModal(
                    '${blog._id}', 
                    \`${escapeBackticks(blog.title)}\`, 
                    \`${escapeBackticks(blog.body)}\`, 
                    \`${escapeBackticks(blog.author)}\`
                )">Edit</button>
                <button class="btn btn-danger btn-sm mt-2" onclick="deleteBlog('${blog._id}')">Delete</button>
            ` : ''}
        </div>
    </div>`).join('');

    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}



function escapeBackticks(str) {
    return str.replace(/`/g, '\\`');
}

// Создать пост
async function createBlog() {
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    // Автор автоматически = FIO пользователя
    const author = userFullName;

    try {
        await fetch('/api/blogs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body, author })
        });
        // Обновляем список
        fetchBlogs();
        // Очищаем поля
        document.getElementById('title').value = "";
        document.getElementById('body').value = "";
    } catch (error) {
        console.error("Error creating blog:", error);
    }
}

// Удалять пост
async function deleteBlog(id) {
    try {
        const responce = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        const result = responce.json()
        if (!responce.ok) {
            alert(result.error)
            return
        }
        fetchBlogs();
    } catch (error) {
        console.error("Error deleting blog:", error);
    }
}

// Открываем модалку и заполняем поля
function openEditModal(id, title, body, author) {
    document.getElementById('editId').value = id;
    document.getElementById('editTitle').value = title;
    document.getElementById('editBody').value = body;
    document.getElementById('editAuthor').value = author;

    let modalElement = document.getElementById('editModal');
    let modal = new bootstrap.Modal(modalElement);
    modal.show();
}

// Сохраняем изменения
async function saveChanges() {
    const id = document.getElementById('editId').value;
    const title = document.getElementById('editTitle').value;
    const body = document.getElementById('editBody').value;
    const author = document.getElementById('editAuthor').value;

    try {
        const responce = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, body, author })
        });

        const result = responce.json()
        if (!responce.ok) {
            alert(result.error)
            return
        }

        fetchBlogs();
        let modal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
        modal.hide();
    } catch (error) {
        console.error("Error updating blog:", error);
    }
}