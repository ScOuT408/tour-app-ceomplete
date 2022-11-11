import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchTours } from "../features/tours/tourSlice";
import { useNavigate } from "react-router-dom";

function TagSearch() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (search) {
      dispatch(searchTours(search));
      navigate(`/search?searchQuery=${search}`);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="mt-5">
        <h2 className="text-pink-400 font-medium text-2xl lm:text-xl">
          Search Any Place
        </h2>

        <form className="mt-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-1 pl-2 text-base shadow-sm border border-slate-700 w-full focus:outline-none rounded-sm text-black placeholder:text-base"
          />
          <button className="bg-blue-500 inline-block mt-3 text-white capitalize text-base px-4 py-1">
            search
          </button>
        </form>
      </div>
    </>
  );
}

export default TagSearch;
