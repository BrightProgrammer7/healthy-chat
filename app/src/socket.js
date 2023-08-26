//create a websocket client
// const socket = io('http://localhost:2000')

// receive Msg from server
socket.on('message', (data) => {
    console.log('Message from server ', data);
})

// send Msg to server
socket.emit('message', 'Hello, server!');
document.querySelector('button').onclick = () => {
    socket.send('hello')
}



// var serialData = document.getElementById('serialData');
//       var ws = new WebSocket('ws://' + window.location.hostname + ':81/');
//       ws.onmessage = function(event) {
//         serialData.textContent += event.data;
//       };

// const ws = new WebSocket('ws://localhost:8080')

// ws.onmessage = ({data}) => {
//     console.log('Message from server ', data);
// }
// document.querySelector('button').onclick = () => {
//     ws.send('hello')
// }




// const socket = io('ws://localhost:8080');

// socket.on('message', text => {

//     const el = document.createElement('li');
//     el.innerHTML = text;
//     document.querySelector('ul').appendChild(el)

// });

// document.querySelector('button').onclick = () => {

//     const text = document.querySelector('input').value;
//     socket.emit('message', text)
    
// }