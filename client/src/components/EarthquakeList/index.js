import React from "react";

import { Link } from "react-router-dom";
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
              <Link
                to={`/profile/${earthquake.username}`}
                style={{ fontWeight: 800 }}
                className="text-light"
              >
                {earthquake.username}
              </Link>
              {""}
              entered earthquake #{earthquake._id}
            </p>
            <div className="card-body">
              <Link to={`/earthquake/${earthquake._id}`}>
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
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EarthquakeList;
