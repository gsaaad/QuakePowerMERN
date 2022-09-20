import React from "react";

const LargestList = ({ earthquakes, title }) => {
  if (!earthquakes.length) {
    return <h3>No Earthquakes Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {earthquakes &&
        earthquakes.map((earthquake) => (
          <div key={earthquake.Date} className="card mb-3">
            <div className="card-body">
              <p>Earthquake ID: {earthquake.id}</p>
              <p>
                Date:{earthquake.Year},{earthquake.Date}
              </p>
              <p>Deaths: {earthquake.Deaths}</p>

              <p>
                {" "}
                <b>Magnitude:{earthquake.Magnitude}</b>
              </p>
              <p>Region: {earthquake.Region}</p>
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

export default LargestList;
