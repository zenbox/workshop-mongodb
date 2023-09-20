/** Application script
 *
 * @desc This script is the main script of the application.
 *
 * @package Webapplication
 * @module UI Webapplication
 * @author Michael <michael.reichart@gfu.net>
 * @version v1.0.0
 * @since 2023-08-30
 * @see i.e. inspired by ... {link to}
 * @license MIT {https://opensource.org/licenses/MIT}
 * @copyright (c) 2023 Michael Reichart, Cologne
 */

// - - - - -
// Login
// - - - - -
// ES module import
import Api from "./classes/api.js";

// Declaration, Initalization
let sheepsData = [];
let api = new Api();

api.get().then((data) => {
    sheepsData = data.sheeps;
    showAsTable(sheepsData);
});

// - - - - -
// Socket.io
// - - - - -
const socket = io("http://localhost:3000", {});

socket.on("socket message", (msg) => {
    console.log(
        `%c${msg}`,
        "color: white;  background: green; font-size: 0.75rem;"
    );
});

// - - - - -
// Sheeps table
// - - - - -
function showAsTable(data) {
    let keys = Object.keys(data[0]);
    console.log(keys);
    const table = document.createElement("table");
    table.classList.add("sheeps");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    const tr = document.createElement("tr");
    keys.forEach((key) => {
        const th = document.createElement("th");
        th.innerHTML = key;
        tr.appendChild(th);
    });
    thead.appendChild(tr);

    data.forEach((sheep) => {
        const tr = document.createElement("tr");
        keys.forEach((key) => {
            const td = document.createElement("td");
            td.innerHTML = sheep[key];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    document.body.appendChild(table);
}

// Schreibe `template`-Element für eine HTML-Tabelle, das via Array gefüllt werden kann

// write a function, that shows the socket message as a note in the document.
// It should close itself after 2 seconds
function socketMessage(msg) {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = msg;
    document.body.appendChild(note);
    setTimeout(() => {
        note.remove();
    }, 2000);
}
socket.on("socket message", (msg) => {
    socketMessage(msg);
});
socket.on("visual data", (msg) => {
    socketMessage(msg);
});
socket.on("sheeps", (msg) => {
    sheepsData = JSON.parse(msg);
    showAsTable(sheepsData);
    socketMessage("got sheeps");
});

try {
    // - - - - -
    // Visual
    // - - - - -
    const border = 2;
    const width = 480 - border;
    const height = 480;
    const data = [200, 100, 300, 400, 300];
    data.forEach((d, i) => {
        const rect = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "rect"
        );
        rect.setAttribute("x", border + i * (width / data.length));
        rect.setAttribute("y", height - d);
        rect.setAttribute("width", width / data.length - border);
        rect.setAttribute("height", d);
        document.querySelector("#visual g").appendChild(rect);
    });
    socket.on("visual data", (data) => {
        console.log(data);
        data.forEach((d, i) => {
            const rect = document.querySelectorAll("#visual g rect")[i];
            rect.setAttribute("y", height - d);
            rect.setAttribute("height", d);
        });
    });
} catch (error) {
    // console.log(error);
}
