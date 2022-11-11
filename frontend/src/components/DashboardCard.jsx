import React from "react";
// import { Link } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";
import { deleteTour } from "../features/tours/tourSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

function DashboardCard({ tour }) {
  const { _id, addby, name, imageFile } = tour;
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this tour ?")) {
      dispatch(deleteTour({ id, toast }));
    }
  };
  return (
    <div className="bg-white px-1 shadow-md flex items-center justify-between w-full">
      <div className="h-28 w-[80%] p-1 sm:h-24 sm:w-[55%]">
        <img
          src={imageFile}
          alt="/"
          className="h-full w-full object-cover sm:h-full"
        />
      </div>
      <div className="w-full">
        <div className="flex flex-col capitalize items-center lm:text-[13px] md:ml-2">
          <h3>added by: {addby}</h3>
          <h3>tour title: {name}</h3>
        </div>
      </div>
      <div className="flex gap-2 items-center pr-4 justify-center lm:!flex-wrap">
        <div className="border border-green-400 cursor-pointer py-1 px-2">
          <Link to={`/editTour/${_id}`}>
            <EditOutlinedIcon className="text-green-400 lm:!text-lg" />
          </Link>
        </div>
        <div className="border border-red-500 cursor-pointer py-1 px-2">
          <DeleteForeverOutlinedIcon
            className="text-red-500 lm:!text-lg"
            onClick={() => handleDelete(_id)}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardCard;
