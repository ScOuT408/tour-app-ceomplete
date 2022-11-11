import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import { useDispatch, useSelector } from "react-redux";
import { getToursByUser } from "../features/tours/tourSlice";
// w-full 2xl:flex-col-reverse
// 2xl:static 2xl:w-full

function Dashboard() {
  const { userTours } = useSelector((state) => ({ ...state.tour }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  useEffect(() => {
    if (userId) {
      dispatch(getToursByUser(userId));
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, navigate]);
  return (
    <div className="max-w-7xl mx-auto mt-4 py-4">
      <div className="flex justify-center gap-3 items-start px-2 lg:!flex-col-reverse">
        <div className="w-1/2 space-y-3 p-1 lg:flex-[1] lg:w-full !flex-wrap">
          {userTours == 0 ? (
            <>
              <h2 className="text-center text-xl"> You Don't Had Tours ! </h2>
            </>
          ) : (
            <>
              {userTours.map((tour) => (
                <React.Fragment key={tour._id}>
                  <DashboardCard tour={tour} />
                </React.Fragment>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
