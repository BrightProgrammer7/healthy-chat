import express from "express";
import { SerialPort } from "serialport";
import { Server as SocketIO } from "socket.io";

const app = express();
const SERVER_PORT = 4000;
// const SERVER_PORT = 'https://stress-server.onrender.com' || 4000;

// Two paths as I have to test on my windows pc and mac
const path = "COM3";
// const path = '/dev/tty.usbmodem1101';

const arduinoPort = new SerialPort({
  path: path,
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
  flowControl: false,
  delimiter: "\r\n",
});

const server = app.listen(SERVER_PORT, () =>
  console.log(`Listening for requests on port ${SERVER_PORT}.`)
);

const reactSocket = new SocketIO(server, { cors: { origin: "*" } });

// get from front-end send to arduino
reactSocket.on("connection", (clientSocket) => {
  console.log(`React Client connected: ${clientSocket.id}`);

  clientSocket.emit('message', 'Hello, client!');
  
  clientSocket.on("sentData", (message) => {
    arduinoPort.write(`${message}\n`);
  });
  
  clientSocket.on("disconnect", () => {
    console.log(`React Client disconnected: ${clientSocket.id}`);
  });

});

// getting data from arduino and send to front-end
arduinoPort.on("open", () => {
  console.log("Serial Port " + arduinoPort.path + " is opened.");

  arduinoPort.on("data", (data) => {
    console.log(`Arduino Data: ${data}`);
    reactSocket.emit("data", `${data}`);
    
  });

  arduinoPort.on("close", () => {
    console.log("Serial Port " + arduinoPort.path + " is closed.");
  });
});

