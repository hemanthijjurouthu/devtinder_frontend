import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connections = () => {
    const connections = useSelector((store) => store.connections);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
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
            <div className="flex items-center justify-center my-20">
                <h1 className="text-2xl font-semibold text-center">No Connections</h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-300 p-4 md:p-6">
            <h1 className="text-center text-2xl font-semibold mb-6">Connections</h1>
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {connections.map((connection) => (
                    <div key={connection._id} className="bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 border border-gray-300">
                        <div className="w-16 h-16 sm:w-20 sm:h-20">
                            <img 
                                src={connection.photoURL} 
                                alt="Profile" 
                                className="w-full h-full object-cover rounded-full border border-gray-300"
                            />
                        </div>
                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-lg font-medium text-gray-900">{connection.firstName} {connection.lastName}</h2>
                            <p className="text-sm text-gray-600">{connection.age}, {connection.gender}</p>
                            <p className="text-sm text-gray-500 mt-1">{connection.about}</p>
                        </div>
                        <div className="w-full sm:w-auto">
                            <Link to={`/chat/${connection._id}`}>
                                <button className="bg-primary text-white font-semibold px-5 py-2 rounded-xl w-full sm:w-auto">
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