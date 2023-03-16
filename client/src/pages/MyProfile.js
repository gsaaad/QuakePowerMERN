import React from "react";

// import { QUERY_USER } from "../utils/queries";
// import { useParams } from "react-router-dom";
// todo add the ability to display user's earthquakes linked
// import EarthquakeList from "../components/EarthquakeList";
// import { useQuery } from "@apollo/client";
import Auth from "../utils/authenticate";
const MyProfile = () => {
  const getProfile = Auth.getProfile();

  const username = getProfile.data.username;
  const useremail = getProfile.data.email;

  console.log(getProfile.data.username);
  //   const { username: userParam } = useParams();

  //   const { loading, data } = useQuery(QUERY_USER, {
  //     variables: { username: userParam },
  //   });

  // const user = data?.user || {};

  //   if (loading) {
  //     return <div>Loading...</div>;
  //   }
  if (!username) {
    return (
      <h2>
        You need to be logged in to see this page. Sign up or Login to
        continue..
      </h2>
    );
  }
  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {/* Viewing <usernames>'s profile. */}
          Viewing {username}'s Profile
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <h3 className="col-12 mb-3 col-lg-8 fs-4">
          If you would like to inquire more about an entry that {username}{" "}
          added, Please email them at {useremail}
        </h3>
      </div>
    </div>
  );
};

export default MyProfile;
