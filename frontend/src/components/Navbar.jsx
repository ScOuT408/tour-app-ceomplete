import React, { useState, useEffect } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../features/users/userSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNav = () => {
    setOpen(!open);
  };

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <header className="py-3 px-5 sticky top-0 left-0 right-0 w-full bg-slate-50 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to="/" className="capitalize">
          <div className="w-9 h-9 mx-auto lm:w-7 lm:h-7">
            <img src="./images/logo.png" alt="/" className="h-full w-full" />
          </div>
          <h2 className="lm:text-sm"> let's tour </h2>
        </Link>

        <nav>
          <ul
            className={
              open
                ? "flex items-center gap-6 capitalize text-[18px] md:text-[15px] md:absolute md:top-0 md:left-0 md:right-0 md:bg-slate-50 !z-50 md:!h-screen w-[250px] md:!text-center md:flex-col md:items-center md:justify-center md:shadow-md duration-200"
                : "flex items-center gap-6 capitalize text-[18px] md:text-[15px] md:fixed md:top-0 md:left-[-100%] md:right-0 md:bg-slate-50 !z-50 md:h-screen w-[250px] md:!text-center md:flex-col md:items-center md:justify-center md:shadow-md duration-300 lm:w-[250px]"
            }
          >
            <li className="hover:text-pink-500 duration-200">
              <Link to="/" onClick={handleNav}>
                home
              </Link>
            </li>
            <li className="hover:text-pink-500 duration-200">
              <Link to="/addtour" onClick={handleNav}>
                add&nbsp;tour
              </Link>
            </li>
            <li className="hover:text-pink-500 duration-200">
              <Link to="/dashboard" onClick={handleNav}>
                dashboard
              </Link>
            </li>

            <div className="hidden bg-slate-200 w-8 h-8 md:flex md:!items-center md:!justify-center md:rounded-full md:absolute md:top-5 md:right-5 cursor-pointer">
              <CloseIcon onClick={handleNav} />
            </div>
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <div className="py-2 px-3 text-base bg-slate-500 text-white  md:py-1 md:px-2 lm:text-sm">
                <Link to="/login" className="capitalize">
                  login/register
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link to="/profile">
                <PersonOutlineIcon
                  className="cursor-pointer md:!text-[24px]"
                  style={{ fontSize: "26px", fontWeight: "600" }}
                />
              </Link>
              <LogoutIcon
                className="cursor-pointer md:!text-[24px]"
                style={{ fontSize: "26px", fontWeight: "600" }}
                onClick={handleLogout}
              />
            </>
          )}

          <MenuIcon
            className="cursor-pointer !hidden md:!text-[24px] md:!inline-block"
            style={{ fontSize: "26px", fontWeight: "600" }}
            onClick={() => setOpen(true)}
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
