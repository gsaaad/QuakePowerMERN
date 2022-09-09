import React from "react";
import ReactionList from "../components/ReactionList";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_EARTHQUAKES } from "../utils/queries";

const SingleEarthquake = (props) => {
  const { id: earthquakeId } = useParams();
  console.log(earthquakeId);

  const { loading, data } = useQuery(QUERY_EARTHQUAKES, {
    variables: { id: earthquakeId },
  });
  console.log(data);
  const earthquake = data?.earthquake || {};
  console.log(earthquake);
  if (loading) {
    return <div>Loading Earthquakes...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {earthquake.username}
          </span>{" "}
          entered #{earthquake._id}
        </p>
        <div className="card-body">
          <p>Date:{earthquake.Date}</p>
          <p>Magnitude:{earthquake.Magnitude}</p>
          <p>Latitude:{earthquake.Latitude}</p>
          <p>Longitude:{earthquake.Longitude}</p>
          <p>Depth:{earthquake.Depth}</p>
          <p>Region:{earthquake.Region}</p>
          {/* <p className="mb-0">
            Reactions: {earthquake.reactionCount} || Click to{" "}
            {earthquake.reactionCount ? "see" : "start"} the discussion!
          </p> */}
        </div>
      </div>
      {earthquake.reactionCount > 0 && (
        <ReactionList reactions={earthquake.reactions} />
      )}
    </div>
  );
};

export default SingleEarthquake;
