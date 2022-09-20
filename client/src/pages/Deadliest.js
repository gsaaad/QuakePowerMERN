import React from "react";
import Earthquakes from "../data/deadliest.json";
import DeadliestList from "../components/DeadliestList/index";
const Deadliest = () => {
  const deadliestEarthquakes = Earthquakes.deadliest;
  console.log(deadliestEarthquakes);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div id="display-area">
          <DeadliestList
            earthquakes={deadliestEarthquakes}
            title="Deadliest Earthquakes recorded!"
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

export default Deadliest;
