import React from "react";
import EarthquakeList from "../components/EarthquakeList";

import { useQuery } from "@apollo/client";
import { QUERY_EARTHQUAKES } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_EARTHQUAKES);
  console.log(data);

  const earthquakes = data?.earthquakes || [];
  console.log(earthquakes);

  return (
    <main>
      <div className="flex-row justify-space-between">
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
