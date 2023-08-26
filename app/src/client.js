//create a websocket client
// const socket = io("http://localhost:3000");

// handling the event when the connection to server is successful
socket.on("connect", () => {
// receive Msg from server
    console.log(`Connection opened with Server: ${socket.id}`);
})

//handling the event when receiving a message from the server
socket.on('message', (data) => {
    console.log(`Message from server: ${data}`)
});

// const msg = $('input').value;
const button = document.querySelector("button");
// const button = $("button");

//sending a mesage to the server in 5 seconds
setTimeout(() => {
    // send Msg to server
    socket.emit('message', 'Hello, server!');

    // if (msg !== "") {
    button.onclick = () => {
        const msg = document.querySelector('input').value;

        socket.send(msg);
        // socket.emit('message', `${socket.id.substring(0,2)}`);
        // socket.emit('message', `${msg}`);

        // socket.emit('message', msg)

        const el = document.createElement('li');
        el.innerHTML = msg;
        document.querySelector('ul').appendChild(el)
    }
    // }
    // else {
    // console.error("Button not found!");
    // }
}, 5000);

//handling the event when the websocket connection is closed
socket.on("disconnect", (code) => {
    console.log(`Connection closed with code: ${code}`);
});

//disconnecting the websocket connection in 1000 seconds
setTimeout(() => {
    socket.close();
}, 100000);

// //handling the event when the connection to the server is unsuccessful
socket.on("error", (error) => {
    console.log(`ERROR: ${error.message}`);
});
// })