import React from 'react';
import axios from 'axios';
import {BASE_URL} from '../utils/Constants';

const Premium = () => {
  const handleClick = async (type) => {
    const res = await axios.post(BASE_URL + "/payment/create",
      {
        membershipType : type,
      },
      {
        withCredentials : true}
      );
    
    console.log(res);

    const {amount,keyId,currency,notes,orderId} = res.data;
    //open the razorpay dialog box
     const options = {
      key: keyId,
      amount,
      currency,
      name: 'DevTinder',
      description: 'Connect to other developers',
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        emailId : notes.emailId,
      },
      theme: {
        color: '#F37254'
     },
    };

     const rzp = window.Razorpay(options);
     rzp.open();
    }

  return (
    <div className="m-10 flex justify-center">
      <div className="flex w-full max-w-4xl gap-6">
        {/* Silver Membership Card */}
        <div className="card bg-gray-800 text-white rounded-2xl shadow-lg p-6 flex-1 transition-transform transform hover:scale-105">
          <h1 className="text-2xl font-bold mb-4 text-center">Silver Membership</h1>
          <ul className="space-y-2 text-center">
            <li>💬 Chat with other people</li>
            <li>🔗 100 connections per day</li>
            <li>✅ Blue Tick</li>
            <li>📅 3 months</li>
          </ul>
          <button className="mt-6 w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all" onClick={() => handleClick("silver")}>
            Choose Silver
          </button>
        </div>
        
        <div className="flex items-center justify-center">
          <span className="text-xl font-semibold text-gray-500">OR</span>
        </div>
        
        {/* Gold Membership Card */}
        <div className="card bg-yellow-500 text-white rounded-2xl shadow-lg p-6 flex-1 transition-transform transform hover:scale-105">
          <h1 className="text-2xl font-bold mb-4 text-center">Gold Membership</h1>
          <ul className="space-y-2 text-center">
            <li>💬 Chat with other people</li>
            <li>🔗 Infinite connections per day</li>
            <li>✅ Blue Tick</li>
            <li>📅 6 months</li>
          </ul>
          <button className="mt-6 w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition-all" onClick={() => handleClick("gold")}>
            Choose Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
