import io from "socket.io-client";
import { BASE_URL } from "./Constants";

export const createSocketConnection = () => {
    if (location.hostname === "localhost") {
        return io(BASE_URL, {
            transports: ["websocket", "polling"], 
            withCredentials: true
        });
    } else {
        return io("https://ijjurouthu.duckdns.org", {
            path: "/api/socket-io/", // Ensure this matches Nginx location
            transports: ["websocket", "polling"],
            withCredentials: true
        });
    }
};
