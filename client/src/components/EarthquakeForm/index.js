import React, { useState } from "react";
import { useMutation } from "@apollo/client";

const EarthquakeForm = () => {
  const [formState, setFormState] = useState({
    Date: "",
    Latitude: "",
    Longitude: "",
    Depth: "",
    Magnitude: "",
    Region: "",
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
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
    console.log(formState.Date);
    console.log(typeof formState.Date);
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
    </div>
  );
};

export default EarthquakeForm;
