import React, { useEffect } from "react";
import TagSearch from "../components/TagSearch";
import TourCard from "../components/TourCard";
import { useDispatch, useSelector } from "react-redux";
import { getTours } from "../features/tours/tourSlice";

function Home() {
  // const navigate = useNavigate();
  const { tours } = useSelector((state) => ({ ...state.tour }));
  const dispatch = useDispatch();

  // const user = JSON.parse(localStorage.getItem("user"));

  // useEffect(() => {
  //   if (!localStorage.getItem("user")) {
  //     navigate("/login");
  //   }
  // }, [navigate, user]);

  useEffect(() => {
    dispatch(getTours());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto mt-4 py-4">
      <div className="flex gap-3 w-full 2xl:flex-col-reverse p-2">
        <div className="flex-[0.7] 3xl:flex-[1]">
          <div className="grid grid-cols-3 gap-3 w-full md:grid-cols-2 lm:grid-cols-1">
            {tours.length === 0 && <h2> No Tours Found </h2>}
            {tours &&
              tours.map((item) => (
                <React.Fragment key={item._id}>
                  <TourCard item={item} />
                </React.Fragment>
              ))}
          </div>
        </div>
        <div className="flex-[0.3] bg-slate-50 shadow-md mt-1 fixed right-5 w-[28%] h-auto p-2 2xl:static 2xl:w-full">
          <TagSearch />
        </div>
      </div>
    </div>
    // {tours.length === 0 && <h2> No Tours Found </h2>}
    // {tours &&
    //   tours.map((item, index) => (
    //     <React.Fragment key={item._id}>
    //       <TourCard item={item} />
    //     </React.Fragment>
    //   ))}
  );
}

export default Home;
