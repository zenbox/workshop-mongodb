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
import Login from "./classes/login.js";
import Api from "./classes/api.js";

// Declaration, Initalization
const login = new Login("form-login");
console.dir(login);

// Event process control
try {
  login.form.addEventListener("submit", (event) => {
    login.onSubmit(event);
  });
} catch (error) {
  // console.log(error);
}

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

try {
  // - - - - -
  // Visual
  // - - - - -
  const border = 2;
  const width = 480 - border;
  const height = 480;
  const data = [200, 100, 300, 400, 300];
  data.forEach((d, i) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
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

// MongoDB API
const api = new Api();
api.get().then((data) => {
  console.log(data);
});
