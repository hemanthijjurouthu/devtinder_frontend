import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/recieved`, { withCredentials: true });
      console.log(res?.data?.connectionRequests);
      dispatch(addRequests(res?.data?.connectionRequests));
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [dispatch]);

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(`${BASE_URL}/request/review/${status}/${id}`, {}, { withCredentials: true });
      console.log(res);

      dispatch(addRequests(requests.filter(request => request.fromUserId._id !== id)));
      
    } catch (err) {
      console.log("ERROR:", err.message);
    }
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="flex items-center justify-center my-20">
        <h1 className="text-2xl font-semibold">No Requests Received</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6 flex flex-col items-center">
      <h1 className="text-center text-2xl font-medium mb-8">Received Requests</h1>

      <div className="w-full flex flex-col items-center gap-8">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoURL, age, gender, about } = request.fromUserId;

          return (
            <div key={_id} className="bg-white shadow-lg rounded-2xl p-6 w-96 flex flex-col items-center border border-gray-300 transition transform hover:scale-105 hover:shadow-xl">
              <div className="w-24 h-24 mb-4">
                <img
                  src={photoURL || "/default-profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-2 border-gray-400"
                />
              </div>

              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">{firstName} {lastName}</h2>
                <p className="text-md text-gray-600">{age}, {gender}</p>
                <p className="text-sm text-gray-500 mt-2 px-4 text-center">{about}</p>
              </div>

              <div className="flex gap-4 mt-4 ">
                <button 
                  className="px-5 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-700 transition-all duration-300" 
                  onClick={() => reviewRequest("accepted", _id)}
                >
                  Accept
                </button>
                <button 
                  className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300" 
                  onClick={() => reviewRequest("rejected", _id)}
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
