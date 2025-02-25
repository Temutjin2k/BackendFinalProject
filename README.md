
# Final project WEB TECHNOLOGIES 2 (BACKEND)

This project implements a **backend system** using **Node.js**, **Express**, and **MongoDB**.

---

## 📌 Features
✅ **User Authentication & Authorization** (JWT, bcrypt)  
✅ **CRUD operations for Posts** (Create, Read, Update, Delete)  
✅ **Weather API integration** (Real-time weather data)  
✅ **QR Code Generation** (Generates QR codes)  
✅ **Email Sending via Nodemailer** (Send emails directly from the app)  
✅ **BMI Calculator** (Calculates BMI by height and weight)  

---

## 👨‍🎓 Course Information
- **Course:** Web Technologies 2 (Backend)  
- **Student:** Temutjin Koszhanov

---

## 🛠️ Technologies Used
- **MongoDB** – NoSQL database  
- **NodeJS** – Server runtime  
- **Express** – Web framework  
- **JWT (JSON Web Tokens)** – Secure authentication  
- **bcrypt** – Password hashing  
- **Nodemailer** – Email sending  
- **qr-image** – QR code generation  
- **WeatherAPI** – Fetch weather data  

---

## 🚀 Functionalities
### 🔑 Authentication & Authorization
- **Register:** Users can register with their email and password.  
- **Login:** Users receive a JWT token after successful login.  
- **Protected Routes:** Users must provide a valid token to access private routes.  

### 📝 CRUD Operations for Posts
- **Create a Post:** Users can add posts.  
- **Read Posts:** Users can retrieve posts.  
- **Update Posts:** Users can edit their posts.  
- **Delete Posts:** Users can remove their own posts.  

### 🌦️ Weather API
- **Real-time Weather:** Fetches weather data based on user input (city).  

### 📧 Email Sending (Nodemailer)
- **Users can send emails** directly through the application.  

### 📊 BMI Calculator
- **Users enter weight & height** to calculate their **Body Mass Index (BMI)**.  

### 📲 QR Code Generator
- **Users can generate QR codes** from any input URL.  

---

## 🛠️ Setup & Installation
### 📌 Prerequisites
- **Node.js**
- **npm**

### 📌 Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Temutjin2k/BackendFinalProject.git
   ```

2. **Install dependencies:**
   ```bash
   cd BackendFinalProject
   npm install
   ```

3. **Create a `.env` file** in the root of the project with the following content:
   ```env
   // Secret for JWT tokens
   SECRET=

   // MongoDB connection URL
   MongoURL=

   // Your Google account email and app password for sending emails
   EMAIL=
   PASSWORD=

   // Generate an API key from https://www.weatherapi.com/
   WEATHER_KEY=
   ```

4. **Start the server:**
   ```bash
   node src/index.js
   ```

5. **The server will be running on:**  
   ```
   http://localhost:8080
   ```

---

## 📌 API Endpoints
### 🔑 Authentication
| Method | Endpoint         | Description |
|--------|-----------------|-------------|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login`    | Login and receive JWT token |
| `GET`  | `/api/profile/info` | Get user profile (requires authentication) |

### 📝 Posts CRUD
| Method  | Endpoint        | Description |
|---------|----------------|-------------|
| `POST`  | `/api/posts`    | Create a new post |
| `GET`   | `/api/posts`    | Retrieve all posts |
| `GET`   | `/api/posts/:id` | Retrieve a single post by ID |
| `PUT`   | `/api/posts/:id` | Update a post (user must own the post) |
| `DELETE`| `/api/posts/:id` | Delete a post (user must own the post) |

### 🌦️ Weather API
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET`  | `/api/weather?city=Almaty` | Get real-time weather data for a city |

### 📧 Email Sending
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/mail` | Send an email using Nodemailer |

### 📊 BMI Calculator
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET`  | `/api/bmi?weight=70&height=170` | Calculate BMI based on weight & height |

### 📲 QR Code Generator
| Method | Endpoint | Description |
|--------|---------|-------------|
| `GET`  | `/api/qrcode?url=https://example.com` | Generate a QR code for a given URL |

---

**📌 Developed by:**  
👨‍💻 **Temutjin Koszhanov**  
📆 **January 2025**  
🎓 **AITU | Web Technologies 2 (Backend)**  

