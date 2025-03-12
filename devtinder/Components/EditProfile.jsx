import React, { useState } from 'react';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/Constants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [toast,setShowToast] = useState(false);

  const dispatch = useDispatch();

  const HandleClick = async () => {
    try{
        const res = await axios.patch(BASE_URL + "/profile/edit",
            { firstName, lastName, photoURL, age, gender, about },
            {withCredentials : true}
          );
        console.log(res.data.user);
        dispatch(addUser(res.data.user));

        setShowToast(true);   //shows immediately

        setTimeout(() => {
          setShowToast(false); //disappears after 2sec
        },2000)
    }
    catch(err)
    {
      console.log(err);
      console.log(err.message);
    }
}

  return (
  <>
    <div className="flex justify-center items-start gap-10 my-10">
      {/* Edit Profile Form */}
      <div className="card bg-base-300 w-[400px] shadow-md p-6">
        <div className="card-body">
          <h2 className="card-title text-center text-2xl font-semibold">
            Edit Profile
          </h2>

          {/* First Name */}
          <label className="form-control w-full">
            <span className="label-text font-medium">First Name</span>
            <input
              type="text"
              className="input input-bordered w-full"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </label>

          {/* Last Name */}
          <label className="form-control w-full mt-3">
            <span className="label-text font-medium">Last Name</span>
            <input
              type="text"
              className="input input-bordered w-full"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </label>

          {/* Photo URL */}
          <label className="form-control w-full mt-3">
            <span className="label-text font-medium">Profile Photo URL</span>
            <input
              type="url"
              className="input input-bordered w-full"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Enter image URL"
            />
          </label>

          {/* Age */}
          <label className="form-control w-full mt-3">
            <span className="label-text font-medium">Age</span>
            <input
              type="number"
              className="input input-bordered w-full"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
            />
          </label>

          {/* Gender Dropdown */}
          <label className="form-control w-full mt-3">
            <span className="label-text font-medium">Gender</span>
            <select
              className="select select-bordered w-full"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </label>

          {/* About */}
          <label className="form-control w-full mt-3">
            <span className="label-text font-medium">About</span>
            <textarea
              className="textarea textarea-bordered w-full"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell something about yourself..."
              rows="3"
            ></textarea>
          </label>

          {/* Save Button */}
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary w-full" onClick={HandleClick}>Save Profile</button>
          </div>
        </div>
      </div>
      {/* UserCard Display */}
      <UserCard user={{ firstName, lastName, photoURL, age, gender, about }} />
    </div>

    {toast && <div className="toast toast-top toast-center">
      <div className="alert alert-success text-black">
        <span>&#9989; profile saved successfully.</span>
      </div>
    </div>}
  </>
  );
};

export default EditProfile;
