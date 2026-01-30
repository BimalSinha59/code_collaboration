# 💻 Code-Collaboration  
### Real-Time Collaborative Code Editor

🔗 **Live Demo:** https://code-collaboration-by-b20.onrender.com  

Code-Collaboration is a real-time collaborative coding platform that allows multiple users to join a shared room and write code together instantly. It enables seamless pair programming with synchronized editing, live updates, and participant awareness.

---

## ✨ Features

- 👥 **Room-Based Collaboration** – Create or join coding rooms using a unique Room ID  
- ⚡ **Real-Time Code Sync** – Instant updates across all connected users  
- 🟢 **Live User Presence** – See who is currently active in the room  
- 🔄 **Auto Sync on Join** – New users receive the latest code automatically  
- 🎨 **Responsive UI** – Clean and intuitive interface  
- 🔌 **Reliable Socket Handling** – Manages disconnections and reconnections smoothly  
- 🌐 **Production Deployment** – Fully deployed full-stack application on Render  

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- HTML5
- CSS3
- JavaScript (ES6+)

### Backend
- Node.js
- Express.js
- Socket.io (WebSockets)

### Deployment
- Render

---

## 🧠 System Workflow

1. A user creates or joins a room using a Room ID  
2. A WebSocket connection is established with the server  
3. Code changes are emitted as events using Socket.io  
4. The server broadcasts updates to all users in the same room  
5. New users automatically receive the current code state upon joining  

This event-driven architecture ensures low-latency and real-time collaboration.

---

## 🔒 Future Enhancements

- 📝 Support for multiple programming languages
- ▶️ Code execution feature
- 💾 Persistent code saving with database integration
- 🔐 Authentication and private rooms
- 🎥 Voice/video integration for pair programming
