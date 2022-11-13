import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { login } from "../features/users/userSlice";

function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { email, password } = formValues;

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ((!email, !password)) {
      toast.error("All Fields are required");
    } else {
      dispatch(login({ formValues, navigate }));
      setFormValues(formValues);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("user") ||
      localStorage.getItem("user") === "null"
    ) {
      localStorage.getItem("user");
      navigate("/");
    }
  }, [navigate]);
  return (
    <div className="flex items-center justify-center h-[50vh] max-w-xl mt-4 mx-auto">
      <div className="w-full p-4">
        <form
          className="mt-5 p-4 bg-slate-50 shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[21px] capitalize font-medium sm:text-[15px]">
            <span className="text-pink-400"> welcome </span> back
          </h2>
          <div className="mt-3">
            <div className="w-full">
              <input
                type="email"
                name="email"
                value={email}
                onChange={onInputChange}
                placeholder="Enter email"
                className="!w-full p-2 my-2 placeholder:text-sm focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={onInputChange}
                placeholder="Enter password"
                className="!w-full p-2 my-2 placeholder:text-sm focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
            </div>
            <button className="capitalize text-lg inline-block mt-2 bg-blue-600 text-white px-9 py-2 sm:text-sm sm:px-6">
              login
            </button>
            <Link
              to="/register"
              className="text-sm hover:underline hover:text-pink-400 hover:duration-300 ml-3 sm:block sm:ml-0 sm:mt-3"
            >
              dont't have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
