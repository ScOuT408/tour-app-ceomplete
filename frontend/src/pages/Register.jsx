import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/users/userSlice";
import { toast } from "react-hot-toast";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  cpassword: "",
};

function Register() {
  const [formValues, setFormValues] = useState(initialState);
  const { name, email, phone, password, cpassword } = formValues;
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((!name, !email, !phone, !password, !cpassword)) {
      toast.error("All Fields are required");
    } else if (password !== cpassword) {
      toast.error("Password didn't match");
    } else {
      dispatch(register({ formValues, toast }));
      setFormValues(initialState);
    }
  };
  return (
    <div className="flex items-center justify-center h-[60vh] w-full p-3 md:h-[70vh]">
      <div>
        <form
          className="mt-5 p-4 bg-slate-50 shadow-md md:mt-16"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[21px] capitalize font-medium sm:text-[15px]">
            <span className="text-pink-400"> join us </span> to start touring
            the world
          </h2>
          <div className="flex justify-between gap-2 mt-3 md:!flex-wrap md:gap-0">
            <div className="w-[49%] md:!w-full sm:text-sm">
              <input
                type="text"
                name="name"
                value={name}
                onChange={onInputChange}
                placeholder="Enter name"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="text"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="Enter email"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={onInputChange}
                placeholder="Phone Number"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
            </div>
            <div className="w-[49%] md:!w-full sm:text-sm">
              <input
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
                placeholder="Enter password"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="password"
                name="cpassword"
                value={cpassword}
                onChange={onInputChange}
                placeholder="Confirm password"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
            </div>
          </div>
          <button className="px-7 py-2 text-base text-white bg-blue-600 capitalize inline-block mt-2 sm:py-2 sm:px-5 sm:text-sm">
            register
          </button>
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-pink-400 hover:duration-300 ml-3 sm:block sm:ml-0 sm:mt-3"
          >
            already an account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
