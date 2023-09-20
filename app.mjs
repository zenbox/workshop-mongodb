/** Application Server
 *
 * @desc This script is the main script of the application.
 *       It serves a http server and a socket.io server.
 *
 * @package Webapplication
 * @module UI Server
 * @author Michael <michael.reichart@gfu.net>
 * @version v1.0.0
 * @since 2023-08-31
 * @see i.e. inspired by ... {link to}
 * @license MIT {https://opensource.org/licenses/MIT}
 * @copyright (c) 2023 Michael Reichart, Cologne
 */

import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const port = 3000;

import mongodb from "mongodb";
import { Server as SocketIO } from "socket.io";

import { getRoute, postRoute } from "./src/routes/routes.mjs";

const server = http.createServer(app);
const io = new SocketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
});
// - - - - -
// Express webservice
// - - - - -
let corsOptions = {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type"],
        credentials: true,
    },
};

app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

app.get("/api", (request, response) => {
    getRoute(request, response);
});

app.post("/api", (request, response) => {
    postRoute(request, response);
});

// - - - - -
// Server
// - - - - -
server.listen(port, () => {
    console.log(
        `\n\n- - - - -\nWebservice listening at http://localhost:${port}`
    );
});

// // - - - - -
// // MongoDB
// // - - - - -

// // Stelle eine Verbindung zur MongoDB her,
// // Verwende dazu die folgende URL: "mongodb://localhost:27017"
// // und lese alle Dokumente aus der Collection "sheeps"
// // aus der Datenbank "workshop" aus.
// // Gib die Dokumente in der Konsole aus.
// // Verwende dazu die Methode "find" und die Methode "toArray".
// let sheepsData = [];
// mongodb.MongoClient.connect("mongodb://localhost:27017")
//     .then((client) => {
//         console.log("Connected to MongoDB");
//         const db = client.db("workshop");
//         const collection = db.collection("sheeps");
//         collection
//             .find()
//             .toArray()
//             .then((items) => {
//                 sheepsData = items;
//                 // console.log(items);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//             .finally(() => {
//                 client.close();
//             });
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// - - - - -
// Socket.io
// - - - - -
// socket with acces-control-allow-origin

io.on("connection", (socket) => {
    console.log("\n\nSocket:\na user connected");
    socket.emit("socket message", "via socket: Hello from server");
    // socket.emit("sheeps", JSON.stringify(sheepsData));
    socket.on("disconnect", () => {
        console.log("\n\nSocket:\nuser disconnected");
    });

    socket.on("socket message", (msg) => {
        io.emit("socket message", msg);
    });
});
