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
              <p>
                {" "}
                <b>Magnitude:{earthquake.Magnitude}</b>
              </p>
              <p>Location: {earthquake.Location}</p>
              <p>Depth:{earthquake.Depth}</p>
              <p>
            <b>Notes:{earthquake.Notes}</b>
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default DeadliestList;
