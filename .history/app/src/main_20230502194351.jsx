import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Loading from "./Loading";
// create a root and render some content for the first time
const container = document.getElementById('root');
const root = ReactDOM.(container);
root.render(<Main />);
// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Main />
//   </React.StrictMode>
// );

function Main() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // simulate data loading
    setTimeout(() => {
      setIsLoading(false);
    }, 22000);
  }, []);
  return <div>{isLoading ? <Loading /> : <App />}</div>;
}




// update the existing root with new content
// root.render(<App />);
