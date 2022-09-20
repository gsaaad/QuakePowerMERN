import React from "react";
import Earthquakes from "../data/largest.json";
import LargestList from "../components/LargestList/index";
const Largest = () => {
  const deadliestEarthquakes = Earthquakes.largest;
  console.log(deadliestEarthquakes);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div id="display-area">
          <LargestList
            earthquakes={deadliestEarthquakes}
            title="Checkout the largest Earthquakes recorded!"
          />
        </div>
        {/* <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}></div> */}
      </div>
      <div className="flex-row justify-space-between">
        {/*TODO get a live feed component going */}
        {/* this line is if you want to conditional render, and add another column to the right for live feed/ */}
        {/* <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
         */}
      </div>
    </main>
  );
};

export default Largest;
