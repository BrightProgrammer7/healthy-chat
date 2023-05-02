import ReactDOM from "react-dom/client";


import "./index.css";

// create a root and render some content for the first time
// const container = document.getElementById('root');
// const root = ReactDOM.hydrateRoot(container, <App />);
// update the existing root with new content
// root.render(<Main />);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);







