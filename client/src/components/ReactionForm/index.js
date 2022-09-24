import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../../utils/mutations";
const ReactionForm = ({ earthquakeId }) => {
  const [formState, setFormState] = useState({
    earthquakeId: earthquakeId,
    reactionBody: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <div>
      <p className="m-0">
        Character Count: {formState.reactionBody.length}/280
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          name="reactionBody"
          value={formState.reactionBody}
          placeholder="Leave a reaction to this thought..."
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>

        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactionForm;
