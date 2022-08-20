import React from "react";
import ReactStars from "react-rating-stars-component";

const Reviews = ({ name, rate, review }) => {
  return (
    <div className="mt-3 flex gap-3">
      <div className="min-w-9 pt-1">
        <h1 className="font-22 font-medium capitalize bg-slate-900 rounded-full w-9 h-9 flex justify-center items-center text-white">
          {name.substring(0, 1)}
        </h1>
      </div>
      <div>
        <h1 className="color4 font-medium">{name}</h1>
        <div>
          <ReactStars
            classNames="mr-2"
            size={18}
            edit={false}
            color={"#adb5bd"}
            activeColor={"#ef0d5e"}
            isHalf={true}
            value={rate}
          />
        </div>
        <p>{review}</p>
      </div>
    </div>
  );
};

export default Reviews;
