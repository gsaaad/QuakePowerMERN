import React from "react";

import { QUERY_USER } from "../utils/queries";
import { useParams } from "react-router-dom";
import EarthquakeList from "../components/EarthquakeList";
import { useQuery } from "@apollo/client";
const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam },
  });

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {/* Viewing <usernames>'s profile. */}
          Viewing {user.username}'s Profile'
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">print earthquakes</div>
      </div>
    </div>
  );
};

export default Profile;
