const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.json({ message: "hello guys" });
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.on("sendMsg", (dataMsg) => {
        console.log(dataMsg.value);
        socket.broadcast.emit("receiveMsg", dataMsg);
    });
});

server.listen(PORT, () => console.log(`server is running on port ${PORT}`));

// Export the Express API
module.exports = app;
