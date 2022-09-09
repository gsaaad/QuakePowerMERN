import React from "react";

const EarthquakeList = ({ earthquakes, title }) => {
  if (!earthquakes.length) {
    return <h3>No Earthquakes Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {earthquakes &&
        earthquakes.map((earthquake) => (
          <div key={earthquake._id} className="card mb-3">
            <p className="card-header">
              {earthquake.username} entered earthquake #{earthquake._id}
            </p>
            <div className="card-body">
              <p>Date:{earthquake.Date}</p>
              <p>Magnitude:{earthquake.Magnitude}</p>
              <p>Latitude:{earthquake.Latitude}</p>
              <p>Longitude:{earthquake.Longitude}</p>
              <p>Depth:{earthquake.Depth}</p>
              <p>Region:{earthquake.Region}</p>
              <p className="mb-0">
                Reactions: {earthquake.reactionCount} || Click to{" "}
                {earthquake.reactionCount ? "see" : "start"} the discussion!
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EarthquakeList;
