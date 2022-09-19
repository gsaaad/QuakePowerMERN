import React from "react";
import Auth from "../utils/authenticate";
import Earthquakes from "../data/deadliest.json";
import $ from "jquery";
const displayArea = $("#display-area");
const loggedIn = Auth.loggedIn();
const Deadliest = () => {
  Object.entries(Earthquakes.deadliest).map(([key, earthquake]) => {
    console.log("this is each earthquake", key, earthquake);

    const earthquakeDisplay = `<div class="col-12 col-md-5 mb-3">
             <div class="card p-3" data-id=${earthquake.id}>
             <h4 class="text-dark">${earthquake.Location}</h4>
             <p>ID:${earthquake.id}</p>
             <p>Date: ${earthquake.Date} ${earthquake.Year}<br/>
                Depth: ${earthquake.Depth}<br/>
                Magnitude: ${earthquake.Magnitude}<br/>
                Notes: ${earthquake.Notes}
               </p>
             </div>
           </div>`;
    displayArea.html(earthquakeDisplay);
    return earthquakeDisplay;
  });

  //   const printResults = (resultArr) => {
  //     console.log(resultArr);

  //     const earthquakeDisplay = resultArr.map(
  //       ({ id, Year, Date, Depth, Magnitude, Location, Notes }) => {
  //         return ` <div class="col-12 col-md-5 mb-3">
  //         <div class="card p-3" data-id=${id}>
  //         <h4 class="text-dark">${Location}</h4>
  //         <p>ID:${id}</p>
  //         <p>Date: ${Date} ${Year}<br/>
  //            Depth: ${Depth}<br/>
  //            Magnitude: ${Magnitude}<br/>
  //            Notes: ${Notes}
  //           </p>
  //         </div>
  //       </div>`;
  //       }
  //     );
  //     displayArea.html(earthquakeDisplay);
  //   };

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div id="display-area"></div>
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
