/* eslint-disable no-template-curly-in-string */
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState(null);

  const orgKey = import.meta.env.VITE_ORG;
  const apiKey = import.meta.env.VITE_API;

  //add state for input and chat log
  const [input, setInput] = useState("");

  const [healthyMsg, setHealthyMsg] = useState(".");
  // const [firstData, setFirstData] = useState(0);

  const prompt = document.querySelector(".input");
  function disablePrompt() {
    prompt.disabled = true;
  }

  function enablePrompt() {
    prompt.disabled = false;
  }
  const [messages, setMessages] = useState([
    {
      sender: "gpt",
      message: "Hello, I am chatGPT, How can I assist you today ? ",
    },
  ]);
  function clearChat() {
    setMessages([]);
  }

  // webSocket()

  useEffect(() => {
    // Create a new WebSocket connection
    const newSocket = io("https://stress-server.onrender.com") || io("http://localhost:4000");
    // const newSocket = io("http://localhost:4000") || io("https://stress-server.onrender.com");

    // Save the WebSocket connection to state
    setSocket(newSocket);
    // webSocket()

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  // This code will run when the page is loaded or reloaded
  const webSocket = () => {
    // return new Promise((resolve, reject) => {
    // your websocket logic here
    // handling the event when the connection to server is successful
    socket?.on("connect", () => {
      // receive Msg from server
      console.log(`Connection opened with Server: ${socket.id}`);
    });

    //handling the event when receiving a message from the server
    socket?.on("message", async (data) => {
      console.log(`Message from server: ${data}`);
    });

    //handling the event when the websocket connection is closed
    socket?.on("disconnect", async (code) => {
      console.log(`Connection closed with code: ${code}`);
    });
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    disablePrompt();
    webSocket();

    // add client message
    const newMessage = {
      sender: "user",
      message: `${input}${healthyMsg}`,
      direction: "outgoing",
    };

    // // post all the old Messages & new Message
    const newMessages = [...messages, newMessage];
    // console.log(firstData);
    // let firstData = 0;
    // socket?.on("data", async (data) => {
    //   console.log(data);
    //   // setFirstData(data);
    //   firstData = data;
    // });

    // if (firstData !== 0 && firstData !== 51 && firstData !== 52) {
    //   // setTimeout(() => {
    //   setHealthyMsg(
    //     ". Je me sens stressé, Donnez-moi des conseils pour me débarrasser de cette sensation !"
    //   );
    //   // }, 60000);
    // } else {
    //   setHealthyMsg(".");
    // }

    // setTimeout(() => {
    // Define a flag variable to ensure that the interval is only scheduled once
    // let isIntervalScheduled = false;

    socket.on("data", (data) => {
      console.log(data);
      let timeout;
      // Check if data is not a heartbeat signal
      if (data != 0 && data != 51 && data != 52) {
        setHealthyMsg(
          ". Je me sens stressé, Donnez-moi des conseils pour me débarrasser de cette sensation !"
        );
        timeout = setInterval(() => {
          console.log(`Healthy Advices were successfully sent to client`);
          setHealthyMsg('.')
        }, 10000);
        timeout()
      }
      else {
        setTimeout(() => {
          clearInterval(timeout);
        }, 60000);
      }
    });

    // setInterval(() => {
    //   if (isIntervalScheduled) {
    //     // add healthy tips for irregular heart rate
    //     setHealthyMsg(
    //       ". Je me sens stressé, Donnez-moi des conseils pour me débarrasser de cette sensation !"
    //     );
        // console.log(`stressed client ${socket.id}`);
    //   }
    // }, 60000);
    // let isFirstData = true; // add a flag to track the first data received

    // socket.on("data", (data) => {
    //   console.log(data);

    //   if (data != 0) {
    //     // check if data is not 0
    //     if (isFirstData) {
    //       // check if this is the first data received
    //       // store the data on your website
    //       // ...

    //       isFirstData = false; // update the flag to indicate that the first data has been received
    //     } else if (data != 51 && data != 52) {
    // check if data is not 51 or 52
    // interpret the data as null for 1 minute
    //       setHealthyMsg(
    //         ". Je me sens stressé, Donnez-moi des conseils pour me débarrasser de cette sensation !"
    //       ); // or any other null value you want to use

    //       // set a timer to reset the interpretation of data after 1 minute
    //       setTimeout(() => {
    //         setHealthyMsg("."); // reset the null value
    //       }, 60000);
    //     }
    //   }
    // });
    // setHealthyMsg(
    //   // "My heart rate is irregular. What symptoms am I experiencing ? Give me some tips to get rid of the feeling of stress"
    //   ". Je me sens stressé, Donnez-moi des conseils pour me débarrasser de cette sensation !"
    // );
    // }, 60000);
    // }

    // }, 180000);  // 5 minutes
    // // update our messages state
    setMessages(newMessages);

    // // process message to chatgpt: send it over and see the response
    await sendMessage(newMessages);
  };

  async function sendMessage(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "gpt") {
        // response from chatGPT
        role = "assistant";
      } else {
        // request from user
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const systemMessage = {
      // define how chatgpt talks in initial message
      role: "system",
      // content: "Explain all concepts like I am 20 years old",
      content: "You are an AI Assistant chatbot of HealthyChat a website that helps users control their heart rate state and reduce their stress situation. HealthyChat is a finished 2023 year project done for 'ENSAJ' an enginnering college based in ElJadida, Morocco. HealthyChat uses the deep learning model gpt3-turbo to generate the chat and a heart rate sensor linked with a nano arduino in a small desktop mouse. In the front end it's build using Vite with Reactjs and deployed on Vercel. In the backend, its using a RESTful API created with ExpressJS (NodeJS) and deployed to the Render Cloud (Web service). When asked how does HealthyChat work explain briefly how HealthyChat works for controling the stress of users based on their heart rate. To Get Started please play the square game or wait until the squares disapper, then head to the Chat page, there you have one option to start chatting with chatgpt and collect your state of heart rate, after that you can get responses and advices to reduce your stress and unstable heart rate. Answer as short and concise as possible",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };
    let response = "";

    // fetch response to the api combining the cat log array of messages and sending it as a message to openai api as a post
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey,
        "OpenAI-Organization": orgKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        response = data.choices[0].message.content;
        setMessages([
          ...chatMessages,
          {
            sender: "gpt",
            message: response,
          },
        ]);
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
        // response = err.message;
      });

    setInput("");
    enablePrompt();
  }



  useEffect(() => {
    // Set a timeout for the WebSocket connection
    const timeout = setTimeout(() => {
      socket?.close();
      console.log("WebSocket connection timed out");
    }, 10000); // 10 seconds

    // Clear the timeout when the WebSocket connection is closed
    window.addEventListener("beforeunload", () => {
      clearTimeout(timeout);
      console.log("WebSocket connection timed in");
    });

    // Clean up the event listener when the component unmounts
    return () => {
      // socket.removeEventListener('close', () => {});
      window.removeEventListener("beforeunload", {});
    };
  }, []);

  // Add an event listener for the beforeunload event
  // const handleBeforeUnload = () => {
  //   timeout()
  // };

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={clearChat}>
          <span> + </span>
          <p>New chat</p>
        </div>
      </aside>

      <section className="chatbox">
        <div className="chat-log">
          {messages.map((message) => (
            <ChatMessage key={message.id} messages={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              // onSubmit={() => sendDataToArduino("x")}
              className="input"
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
}
const ChatMessage = ({ messages }) => {
  return (
    <div className={`chat-message ${messages.sender === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar  ${messages.sender === "gpt" && "chatgpt"}`}>
          {messages.sender === "gpt" ? (
            <img className="img" src="favicon.ico" alt="" />
          ) : (
            <img className="img" src="user.png" alt="" />
          )}
        </div>

        <div className="message">{messages.message}</div>
      </div>
    </div>
  );
};

export default App;
// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI here.
//       return <h1>Something went wrong.</h1>;
//     }

//     return this.props.children;
//   }
// }
