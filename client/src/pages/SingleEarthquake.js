import React, { useState } from "react";
import ReactionList from "../components/ReactionList";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_EARTHQUAKE } from "../utils/queries";
import Auth from "../utils/authenticate";

import ReactionForm from "../components/ReactionForm";

const SingleEarthquake = () => {
  const [componentDisplay, setComponentDisplay] = useState({
    display: "none",
  });

  console.log("KEY IS", process.env.REACT_APP_KEY);

  const { id: earthquakeId } = useParams();
  // console.log(earthquakeId);

  const handleDisplayComponent = (e) => {
    e.preventDefault();

    if (componentDisplay.display === "none") {
      setComponentDisplay({ display: "block" });
    } else {
      setComponentDisplay({ display: "none" });
    }
  };

  const { loading, data } = useQuery(QUERY_EARTHQUAKE, {
    variables: { id: earthquakeId },
  });
  // console.log(data);
  const earthquake = data?.earthquake || {};
  // console.log(earthquake);
  const staticMap = `https://maps.googleapis.com/maps/api/staticmap?center=${earthquake.Latitude},${earthquake.Longitude}&zoom=0&maptype=terrain&markers=color:blue%7Clabel:E%7C21220&size=400x400&key=${process.env.REACT_APP_KEY}`;
  console.log(staticMap);
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
        <div>
          <div className="grid-container">
            <div className="card-body">
              <p>Date:{earthquake.earthquakeDate}</p>
              <p>Magnitude:{earthquake.Magnitude}</p>
              <p>Latitude:{earthquake.Latitude}</p>
              <p>Longitude:{earthquake.Longitude}</p>
              <p>Depth:{earthquake.Depth}</p>
              <p>Region:{earthquake.Region}</p>
              <p className="mb-1">
                Reactions: {earthquake.reactionCount} ||
                <button
                  className="bg-secondary p-2 m-2"
                  onClick={handleDisplayComponent}
                >
                  Click to {earthquake.reactionCount ? "see" : "start"} the
                  discussion!
                </button>
              </p>
            </div>
            <div className="bg-primary featured-map">
              <p className="text-light m-2 p-2">
                According to our records... This is roughly where the earthquake
                occured!
              </p>
              {/* <img src={staticMap} alt={`${earthquake.Region}`} /> */}
              <img
                src={`https://maps.googleapis.com/maps/api/staticmap?center=${earthquake.Latitude},${earthquake.Longitude}&zoom=3&size=350x350&markers=label:S%7Cicon:https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png%7C${earthquake.Latitude},${earthquake.Longitude}&key=${process.env.REACT_APP_KEY}`}
                alt="location"
                className="m-3 p-2"
              />
            </div>
          </div>
        </div>
      </div>
      <div style={componentDisplay}>
        {earthquake.reactionCount > 0 && (
          <ReactionList reactions={earthquake.reactions} />
        )}
        {Auth.loggedIn() && <ReactionForm earthquakeId={earthquake._id} />}
      </div>
    </div>
  );
};

export default SingleEarthquake;
