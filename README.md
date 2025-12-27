# ⚡ Fast AI

**Quick AI** is a full-stack, web-based **Software as a Service (SaaS)** application built on the **PERN stack**.  
It provides users with a suite of powerful **AI-driven tools** for content creation and image manipulation — including an **article generator**, **image generator**, **background remover**, and more.

This project is designed with a **modern, decoupled architecture** — featuring separate frontend and backend components optimized for **performance** and **scalability**.

---

## 🚀 Tech Stack

**Frontend:** Next.js (React) & Tailwind CSS  
**Backend:** Express.js & Node.js  
**Database:** PostgreSQL (hosted on [Neon](https://neon.tech))  
**Authentication:** Clerk *(to be added)*  
**AI APIs:** OpenAI, FLUX.1 *(and more)*

---

## 🏗️ Project Structure

This repository is a **monorepo** containing two separate projects:

```
quick-ai/
├── quick-ai-backend/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   └── server.js
└── quick-ai-frontend/
    ├── node_modules/
    ├── src/
    ├── .env.local
    ├── next.config.mjs
    └── package.json
```

- **quick-ai-frontend/** → The Next.js/React application serving the user interface (deployed on **Vercel**)  
- **quick-ai-backend/** → The Express.js server handling business logic, database connections, and AI API calls (deployed on **Render**)

---

## ⚙️ Local Setup & Installation

Follow these steps to set up and run both the frontend and backend on your local machine.

### 🧩 Prerequisites
- Node.js (v18 or later)
- A free [Neon](https://neon.tech) account for the PostgreSQL database

---

### 🪄 Step 1: Clone the Repository

```bash
git clone https://your-repository-url.git
cd quick-ai
```

---

### 🧠 Step 2: Set Up the Backend

Navigate to the backend folder:

```bash
cd quick-ai-backend
```

Install dependencies:

```bash
npm install
```

Create an environment file named **`.env`** and add your database connection string:

```env
# Get this connection string from your Neon project dashboard
DATABASE_URL="postgresql://YourNeonConnectionString"

# Port for the backend server
PORT=8080
```

---

### 💻 Step 3: Set Up the Frontend

Navigate to the frontend folder (from the root `quick-ai` directory):

```bash
cd quick-ai-frontend
```

Install dependencies:

```bash
npm install
```

Create an environment file named **`.env.local`** and add the backend URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

---

### 🏃 Step 4: Run the Application

You’ll need two separate terminals open to run the project.

#### Terminal 1 (Run the Backend)
```bash
cd quick-ai-backend
node server.js
```
Your backend will run at **http://localhost:8080**

#### Terminal 2 (Run the Frontend)
```bash
cd quick-ai-frontend
npm run dev
```
Your frontend will run at **http://localhost:3000**

---

## 🌐 Deployment

- **Frontend:** [Vercel](https://vercel.com)
- **Backend:** [Render](https://render.com)
- **Database:** [Neon PostgreSQL](https://neon.tech)

---

## 🧾 License

This project is open-source and available under the [MIT License](LICENSE).

---

### 💡 Future Enhancements

- 🔐 Clerk Authentication Integration  
- 🧠 Additional AI Tools (e.g., text summarizer, logo generator)  
- 📊 Admin Dashboard for usage analytics  
- ☁️ Cloud-based storage for user-generated content  

---

**Developed with ❤️ by the Fast AI Team**
