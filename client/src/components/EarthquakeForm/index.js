import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EARTHQUAKE } from "../../utils/mutations";
import { Store } from "react-notifications-component";
import { QUERY_EARTHQUAKES, QUERY_ME } from "../../utils/queries";

const EarthquakeForm = () => {
  const [formState, setFormState] = useState({
    Date: "",
    Latitude: "",
    Longitude: "",
    Depth: "",
    Magnitude: "",
    Region: "",
  });

  const [addEarthquake, { error }] = useMutation(ADD_EARTHQUAKE, {
    update(cache, { data: { addEarthquake } }) {
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: {
            me: { ...me, earthquakes: [...me.earthquakes, addEarthquake] },
          },
        });
      } catch (e) {
        console.warn("earthquake insertion by user");
      }

      // update array cache
      const { earthquakes } = cache.readQuery({ query: QUERY_EARTHQUAKES });
      cache.writeQuery({
        query: QUERY_EARTHQUAKES,
        data: { earthquakes: [addEarthquake, ...earthquakes] },
      });
    },
  });

  //   update state based on form input to add earthquake
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      // keep pre-existing values in form, and setFormState
      ...formState,
      [name]: value,
    });
  };
  //   handleForm
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formState);

    try {
      // add earthquake to database
      await addEarthquake({
        variables: { ...formState },
      });
      console.log("Successfull Earthquake Entry!");
    } catch (e) {
      console.error(e);
      console.log("There is a problem with adding an earthquake.. Try again!");
    }
  };

  return (
    <div>
      <form className="form-earthquake" onSubmit={handleFormSubmit}>
        <label htmlFor="date-input" className="form-label">
          Date
        </label>
        <input
          name="Date"
          id="date-input"
          value={formState.Date}
          className="form-input"
          type="date"
          onChange={handleChange}
        />

        <p>Latitude</p>
        <input
          name="Latitude"
          value={formState.Latitude}
          className="form-input"
          type="string"
          onChange={handleChange}
        />
        <p>Longitude</p>
        <input
          name="Longitude"
          value={formState.Longitude}
          className="form-input"
          type="string"
          onChange={handleChange}
        />

        <label htmlFor="depth-input" className="form-label">
          Depth
        </label>
        <input
          name="Depth"
          className="form-input"
          type="string"
          value={formState.Depth}
          onChange={handleChange}
        />
        <label htmlFor="magnitude-input" className="form-label">
          Magnitude
        </label>
        <input
          name="Magnitude"
          className="form-input"
          type="string"
          value={formState.Magnitude}
          onChange={handleChange}
        />
        <label htmlFor="region-input" className="form-label">
          Region
        </label>
        <input
          name="Region"
          id="region-input"
          className="form-input"
          type="string"
          value={formState.Region}
          onChange={handleChange}
        />
        <button className="btn">Add Earthquake</button>
      </form>
      {error &&
        (Store.addNotification({
          title: "Warning!",
          message:
            "We are currently aware of this issue, and are working on it! Thank you.",
          type: "warning",
          insert: "bottom",
          container: "center",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 5000,
            onScreen: true,
          },
          width: 700,
        }),
        (
          <div>
            There was a problem with adding earthquake entry.. Try again!
          </div>
        ))}
    </div>
  );
};

export default EarthquakeForm;
