import React from "react";
import EarthquakeList from "../components/EarthquakeList";
import { useQuery } from "@apollo/client";
import { QUERY_EARTHQUAKES } from "../utils/queries";
import Auth from "../utils/authenticate";
import EarthquakeForm from "../components/EarthquakeForm";

const Home = () => {
  const { loading, data } = useQuery(QUERY_EARTHQUAKES);
  console.log(data);

  const earthquakes = data?.earthquakes || [];
  console.log(earthquakes);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {/* if logged in, you can add earthquake! */}
        {loggedIn && (
          <div className="col-12 mb-3">
            <EarthquakeForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}></div>
      </div>
      <div className="flex-row justify-space-between">
        {/*TODO get a live feed component going */}
        {/* this line is if you want to conditional render, and add another column to the right for live feed/ */}
        {/* <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
         */}
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <EarthquakeList
              earthquakes={earthquakes}
              title="Some Feed for earthquake(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
