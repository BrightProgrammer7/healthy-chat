import { useState, useEffect } from "react";
import App from "./App";
import Loading from "./Loading";

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // simulate data loading
        setTimeout(() => {
            setIsLoading(false);
        }, 10000);
    }, []);
    return <div>{isLoading ? <Loading /> : <App />}</div>;

}

export default Home