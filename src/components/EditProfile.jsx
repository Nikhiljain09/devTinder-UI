import React, { useState, useEffect } from "react";
import UserCard from "./userCard";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [about, setAbout] = useState(user?.about);
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState(user?.skills || []);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about, skills },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  useEffect(() => {
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setAge(user?.age);
    setGender(user?.gender);
    setPhotoUrl(user?.photoUrl);
    setAbout(user?.about);
    setSkills(user?.skills);
  }, [user]);

  return (
    <>
      <div className="flex justify-center p-3 m-3">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title font-bold justify-center">
              Edit Profile
            </h2>
            <div>
              {/* {<p className="text-red-600">{error} </p>} */}
              <label className="form-control w-full max-w-xs my-2">
                <span className="ml-2 p-2 font-bold">FirstName</span>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter your FirstName"
                  className="input input-bordered w-full max-w-xs "
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="ml-2 p-2 font-bold">LastName</span>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter your LastName"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>

              <label className="form-control w-full max-w-xs">
                <span className="ml-2 p-2 font-bold">Age</span>
                <input
                  type="number"
                  value={age}
                  placeholder="Enter your Age"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="ml-2 p-2 font-bold">Gender</span>
                <input
                  type="text"
                  value={gender}
                  placeholder="Enter your Gender"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="ml-2 p-2 font-bold">PhotoUrl</span>
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="Enter your photoUrl"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="ml-2 p-2 font-bold">Skills</span>
                <input
                  type="text"
                  value={newSkill}
                  placeholder="Enter your Skills"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button
                  className="btn btn-secondary mt-2"
                  onClick={handleAddSkill}
                >
                  Add Skill
                </button>
              </label>
              <label className="form-control w-full max-w-xs">
                <span className="ml-2 p-2 font-bold">About</span>
                <input
                  type="text"
                  value={about}
                  placeholder="Tell us about yourself"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </label>
            </div>

            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>
        {error && <p className="text-red-600">{error}</p>}{" "}
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, about, skills }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <span>New mail arrived.</span>
          </div>
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
