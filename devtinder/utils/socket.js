import io from 'socket.io-client';
import { BASE_URL } from './Constants';

export const createSocketConnection = () => {
    if(location.hostName === 'localhost')
    {
        return io(BASE_URL);
    }
    else
    {
        return io("/",{path : "/api/socket-io"});
    }
}
