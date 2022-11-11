import React from "react";

function TourCard({ item }) {
  return (
    <div className="bg-slate-100 p-2 shadow-lg">
      <img src={item.imageFile} alt="/" className="object-cover" />
      <div className="mt-3">
        <div className="flex justify-between">
          <h2 className="text-base capitalize md:text-base mb-1">
            {item.name}
          </h2>
          <label className="text-base bg-slate-600 capitalize text-white font-medium py-1 px-5 mb-2 inline-block rounded-full cursor-pointer">
            {item?.tags[0]}
            {/* hill station */}
            {/* beach */}
            {/* temple */}
          </label>
        </div>
        <h2 className="text-slate-500 capitalize mb-1">
          visitors: {item.visitors}
        </h2>
        <p className="text-sm leading-6 w-full">{item.desc}</p>
        <div className="flex justify-end">
          <div className="flex items-center justify-end flex-col">
            <h2 className="text-sm capitalize md:text-base mb-[1px] font-medium">
              posted by
            </h2>
            <label className="text-base text-slate-400 capitalize">
              {item.addby}
              {/* hill station */}
              {/* beach */}
              {/* temple */}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;
