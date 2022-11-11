import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="max-w-6xl mx-auto mt-5 py-4">
      <div className="flex gap-3 items-start p-2 lg:flex-col lg:items-start">
        <div className="bg-white shadow-md max-w-md py-4 flex-[0.5] flex justify-center lg:w-full">
          <div className="w-[200px] h-[200px] rounded-full sm:w-[150px] sm:h-[150px]">
            {/* <img
              src="./images/profile.png"
              alt="/"
              className="mx-auto h-full w-full object-cover rounded-full"
            /> */}
            <div className="bg-slate-200 capitalize h-full flex items-center justify-center text-5xl rounded-full">
              {user?.email[0]}
            </div>
          </div>
        </div>
        <div className="flex-[0.5] bg-slate-100 shadow-md p-3 lg:!w-full">
          <h2 className="text-[21px] capitalize font-medium sm:text-[15px] border-b-slate-600 border-b-[1.4px]">
            your <span className="text-pink-400"> profile </span>
          </h2>
          <div className="w-full capitalize flex items-center justify-between mt-6 sm:text-[14px]">
            <label> full name </label>
            <span> {user?.name} </span>
          </div>
          <div className="w-full flex items-center justify-between mt-4 sm:text-[14px]">
            <label> Email Address </label>
            <span> {user?.email} </span>
          </div>
          <div className="w-full capitalize flex items-center justify-between mt-4 sm:text-[14px]">
            <label> phone number </label>
            <span> +91 {!user?.phone ? "None" : user?.phone} </span>
          </div>
          <div className="w-full capitalize flex items-center justify-between mt-4 sm:text-[14px]">
            <label> role </label>
            <span className="text-red-500">
              {user?.isAdmin === "true" ? "Admin" : "User"}
            </span>
          </div>
          <div className="w-full capitalize flex items-center justify-end mt-4 sm:text-[14px]">
            <button className="bg-red-500 text-white capitalize py-2 px-6 text-sm sm:w-full">
              delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
