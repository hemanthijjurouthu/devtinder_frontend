import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    console.log(connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            console.log(res?.data?.data);
            dispatch(addConnections(res?.data?.data));
        } catch (err) {
            console.log("ERROR :", err.message);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections || connections.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-base-200">
                <h1 className="text-2xl font-semibold text-gray-700">No Connections</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-300 p-6 ">
            <h1 className="text-center text-2xl font-semibold mb-6">Connections</h1>
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                {connections.map((connection) => (
                    <div key={connection._id} className="bg-white shadow-md rounded-xl p-4 flex items-center gap-4 border border-gray-300">
                        <div className="w-20 h-20">
                            <img 
                                src={connection.photoURL} 
                                alt="Profile" 
                                className="w-full h-full object-cover rounded-full border border-gray-300"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-medium text-gray-900">{connection.firstName} {connection.lastName}</h2>
                            <p className="text-sm text-gray-600">{connection.age}, {connection.gender}</p>
                            <p className="text-sm text-gray-500 mt-1">{connection.about}</p>
                        </div>
                        <div>
                        <Link to={"/chat/" + connection._id}><button className="bg-primary text-white font-semibold px-6 py-3 rounded-xl">
                            Chat
                        </button>
                        </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Connections;
