import io from "socket.io-client";
import { BASE_URL } from "./Constants";

export const createSocketConnection = () => {
    if (location.hostname === "localhost") {
        return io(BASE_URL, {
            transports: ["websocket", "polling"], 
            withCredentials: true
        });
    } else {
        return io("https://dev-tinder-1-q58x.onrender.com", { 
            transports: ["websocket", "polling"],
            withCredentials: true
        });
    }
};
