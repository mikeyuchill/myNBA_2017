import React from "react";
import { Link } from "react-router-dom";

export const HomeScreen = () => {
  return (
    <div className="">
      <div className="h-screen bg-bb-sm sm:bg-bb-lg object-cover sm:bg-bottom ">
        <div className="h-screen bg-black bg-opacity-50 grid place-content-center">
          <div className="grid grid-cols-1 md:grid-cols-5 place-content-center">
            <div className="md:col-span-full">
              <h1 className="text-white text-center text font-bold text-6xl">
                MyNBA
              </h1>
              <h2 className="text-gray-100 text-3xl text-center mt-2">
                Player stats, Shot Charts, and Teams
              </h2>
            </div>
            <div>
            </div>
            <div className="grid md:col-span-full md:grid-cols-5 mt-6 md:mt-0">
              <Link
                className="grid md:col-span-5 mt-6 md:mt-0"
                to="/player"
              >
                <button className="bg-LAL md:my-8 lg:my-16  justify-self-center font-bold text-5xl py-3 md:py-6 px-7 md:px-14  rounded-3xl">
                  Player Stats
                </button>
              </Link>
              <Link
                className="grid md:col-span-5 mt-6 md:mt-0"
                to="/team"
              >
                <button className="bg-LAL md:my-8 lg:my-16  justify-self-center font-bold text-5xl py-3 md:py-6 px-7 md:px-14  rounded-3xl">
                  Team Stats
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
