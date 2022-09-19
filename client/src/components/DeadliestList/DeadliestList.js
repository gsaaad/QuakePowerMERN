import React from "react";

const DeadliestList = ({ earthquakes, title }) => {
  console.log(earthquakes.length, title);
  if (!earthquakes.length) {
    return <h3>No Earthquakes Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {earthquakes &&
        earthquakes.map((earthquake) => (
          <div key={earthquake.id} className="card mb-3">
            <div className="card-body">
              <p>Earthquake ID: {earthquake.id}</p>
              <p>
                Date:{earthquake.Year},{earthquake.Date}
              </p>
              <p>Magnitude:{earthquake.Magnitude}</p>
              <p>Latitude:{earthquake.Latitude}</p>
              <p>Longitude:{earthquake.Longitude}</p>
              <p>Location: {earthquake.location}</p>
              <p>Depth:{earthquake.Depth}</p>
              <p>Region:{earthquake.Notes}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DeadliestList;
