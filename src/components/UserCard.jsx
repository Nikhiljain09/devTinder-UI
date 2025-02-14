import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, age, gender, photoUrl, about, skills } =
    user || {};
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={user?.photoUrl} alt="user" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          <span>{gender?.toUpperCase() || "Male"}</span>{" "}
          {(age ? age : "22") + " years old"}
        </p>
        <p>{about}</p>
        <p>
          Skills -{" "}
          {skills?.map((skill, i) => (
            <span key={i}>{skill + " "}</span>
          ))}
        </p>
        <div className="card-actions">
          <button className="btn btn-primary ">Ignore</button>
          <button className="btn bg-red-400">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
