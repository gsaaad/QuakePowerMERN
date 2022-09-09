import React from "react";

import { useParams } from "react-router-dom";

const SingleEarthquake = (props) => {
  const { id: earthquakeId } = useParams();
  console.log(earthquakeId);
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            Username
          </span>{" "}
          Earthquake
        </p>
        <div className="card-body">
          <p>Earthquake (username, id, date, ...)</p>
        </div>
      </div>
    </div>
  );
};

export default SingleEarthquake;
