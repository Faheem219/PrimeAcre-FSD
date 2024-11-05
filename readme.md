# 🏠 PrimeAcre

An **End-to-End Real Estate Management System** built with **Node.js**, **Express**, **MongoDB**, and **React** (with **Vite**). This web application enables **agents** and **clients** to interact seamlessly. Agents can **list properties**, while clients can **view** and **review properties**. The system implements **user authentication** using **Passport.js** and manages **property images** with **Cloudinary**. 🏡💼

---

## 📖 Table of Contents

- [📋 Project Overview](#-project-overview)
- [✨ Features](#-features)
- [🔧 Functionalities](#-functionalities)
- [💻 Technologies Used](#-technologies-used)
- [🚀 Installation and Usage (To run locally)](#-installation-and-usage-to-run-locally)
  - [🔑 Prerequisites](#-prerequisites)
  - [🛠️ Backend Setup](#%EF%B8%8F-backend-setup)
  - [🎨 Frontend Setup](#-frontend-setup)
  - [▶️ Running the Application](#️-running-the-application)
- [🌍 Live Demo](#-live-demo)

---

## 📋 Project Overview

**PrimeAcre** is a full-stack web application designed to streamline the process of **listing**, **viewing**, and **reviewing** real estate properties. It provides a platform where **agents** can **manage property listings**, and **clients** can **explore properties**, **leave reviews**, and **manage their profiles**. The application demonstrates robust features such as **user authentication**, **role-based access control**, and **image handling** with cloud storage integration.

---

## ✨ Features

- ✅ **User Authentication**: Secure login and registration for agents and clients using **Passport.js**.
- ✅ **Role-Based Access Control**: Different functionalities for agents and clients.
- ✅ **Property Management**: Agents can add, edit, and delete property listings.
- ✅ **Property Browsing**: Clients can view property listings with detailed information.
- ✅ **Reviews**: Clients can leave reviews on properties.
- ✅ **Image Uploads**: Property images are uploaded and stored using **Cloudinary**.
- ✅ **Responsive Design**: User-friendly interface compatible with various devices.
- ✅ **RESTful API**: Clean and maintainable codebase with a RESTful architecture.

---

## 🔧 Functionalities

1. **Agent Registration and Login** 👩‍💼
2. **Client Registration and Login** 👤
3. **Add Property Listing** 🏠
4. **Edit Property Listing** ✏️
5. **Delete Property Listing** ❌
6. **View Property Listings** 📄
7. **View Property Details** 🔍
8. **Leave a Property Review** 📝
9. **Edit Property Review** ⚙️
10. **Logout** 🚪

---

## 💻 Technologies Used

- **Frontend**:
  - [React](https://reactjs.org/) with [Vite](https://vitejs.dev/)
  - [React Router](https://reactrouter.com/)
  - [Axios](https://axios-http.com/)
- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
  - [Passport.js](http://www.passportjs.org/) for authentication
  - [Express Session](https://www.npmjs.com/package/express-session)
  - [Cloudinary](https://cloudinary.com/) for image storage
  - [Multer](https://github.com/expressjs/multer) and [Multer Storage Cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary)
- **Others**:
  - [Dotenv](https://www.npmjs.com/package/dotenv) for environment variables
  - [Cors](https://www.npmjs.com/package/cors) for handling Cross-Origin Resource Sharing

---

## 🚀 Installation and Usage (To run locally)

### 🔑 Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com) installed on your machine.
- [MongoDB](https://www.mongodb.com/) instance (local or cloud-based).
- [Cloudinary](https://cloudinary.com/) account for handling image uploads.

### 🛠️ Backend Setup

1. **Clone the Repository**

   ```bash
   git clone git@github.com:Faheem219/PrimeAcre-FSD.git
   ```
   💡 (Alternatively, download the zip file of this repo and extract it, if git is not setup on your PC) 

1. **Navigate to the Backend Directory**

    ```bash
    cd PrimeAcre-FSD/backend
    ```

2. **Install Backend Dependencies**

    ```bash
    npm install
    ```

3. **Create a .env File**

    ```bash
    touch .env
    ```

    Add the following variables to the .env file:

    ```bash
    PORT=5000
    FRONTEND_URL=http://localhost:5173
    MONGO_URI=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
    💡 (Replace the placeholders with your actual credentials)

4. **Start the Backend Server**

    ```bash
    npm start
    ```

### 🎨 Frontend Setup

1. **Navigate to the Frontend Directory**

    ```bash
    cd ../frontend
    ```

2. **Install Frontend Dependencies**

    ```bash
    npm install
    ```

3. **Create a .env File**

    ```bash
    touch .env
    ```

    Add the following variable to the .env file:

    ```bash
    VITE_BACKEND_URL=http://localhost:5001
    ```

4. **Start the Frontend Development Server**

    ```bash
    npm run dev
    ```

### ▶️ Running the Application

- **Access the Application**

    Open your web browser and navigate to:
    `http://localhost:5173`

- **Test the Application**
    - Register as an *Agent* or *Client*
    - Log in to access role-specific features.
    - Agents can add new properties and edit existing properties.
    - Clients can leave reviews & mark properties they like as interested.

---

## 🌍 Live Demo

The **PrimeAcre Website** is now live! You can access the deployed application using the following link:

### 🔗 Live Website: [https://primeacre-production.up.railway.app](https://primeacre-production.up.railway.app)

The application has been deployed using [Railway](https://railway.app), allowing you to explore all the features from any device anywhere. Feel free register as an **Agent** or **Client** and test out the functionalities!
