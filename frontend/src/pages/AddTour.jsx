import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TagsInput from "../components/TagsInput";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createTour, updateTour } from "../features/tours/tourSlice";
import { toast } from "react-hot-toast";

function AddTour() {
  const [tourData, setTourData] = useState({
    name: "",
    addby: "",
    visitors: "",
    category: "",
    tags: [],
    desc: "",
  });

  const { userTours } = useSelector((state) => ({ ...state.tour }));

  const { name, addby, visitors, category, tags, desc } = tourData;
  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    if (id) {
      const singleTour = userTours.find((tour) => tour._id === id);
      setTourData({ ...singleTour });
    }
  }, [id, userTours]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const selectedTags = (tags) => {
    setTourData({ ...tourData, tags: tags });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedTourData = { ...tourData };

    if ((!name, !addby, !visitors, !tags, !desc)) {
      alert("All fields are required");
    } else {
      if (!id) {
        dispatch(createTour({ tourData, toast }));
      } else {
        dispatch(updateTour({ id, updatedTourData, toast }));
      }
      handleClear();
    }
  };

  const handleClear = () => {
    setTourData({
      name: "",
      addby: "",
      visitors: "",
      category: "",
      tags: [],
      desc: "",
    });
  };

  const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     navigate("/login");
  //   }
  // }, [navigate, user]);

  return (
    <div className="flex items-center justify-center h-[95vh] w-full p-3 md:h-[87vh]">
      <div>
        <form
          className="mt-5 p-4 bg-slate-50 shadow-md md:mt-16"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[21px] text-center capitalize font-medium sm:text-[15px]">
            welcome<span className="text-pink-400"> {user.name} </span>,{" "}
            {id ? "Update Your Tour" : "Add Your Tour"}
          </h2>
          <div className="flex justify-between gap-2 mt-3 md:!flex-wrap md:gap-0">
            <div className="!w-full sm:text-sm">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Tour Place Name"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="text"
                name="addby"
                value={addby}
                onChange={handleChange}
                placeholder="Tour added by"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <input
                type="text"
                name="visitors"
                value={visitors}
                onChange={handleChange}
                placeholder="Total visitors"
                className="!w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
              />
              <select
                className="w-full p-2 my-2 border-[1px] border-slate-200 shadow-sm capitalize focus:outline-none"
                name="category"
                value={category}
                onChange={handleChange}
              >
                <option value="" disabled>
                  please select category
                </option>
                <option value="historic">historic</option>
                <option value="hill station">hill station</option>
                <option value="beach">beach</option>
                <option value="temple">temple</option>
              </select>
              {!id && (
                <>
                  <TagsInput
                    selectedTags={selectedTags}
                    value={tags}
                    tags={[]}
                  />
                </>
              )}
            </div>
          </div>
          <textarea
            cols="30"
            rows="4"
            name="desc"
            value={desc}
            onChange={handleChange}
            placeholder="Tour description"
            className="w-full p-2 my-2 focus:outline-none border-[1px] border-slate-200 shadow-sm"
          ></textarea>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setTourData({ ...tourData, imageFile: base64 })
            }
          />
          <button className="px-5 py-2 text-base text-white bg-blue-600 capitalize inline-block mt-2 sm:py-2 sm:px-4 sm:text-sm">
            {id ? "update tour" : "add tour"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTour;
