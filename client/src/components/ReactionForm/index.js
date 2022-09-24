import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REACTION } from "../../utils/mutations";
import { Store } from "react-notifications-component";
const ReactionForm = ({ earthquakeId }) => {
  const [formState, setFormState] = useState({
    earthquakeId: earthquakeId,
    reactionBody: "",
  });

  const [addReaction, { error }] = useMutation(ADD_REACTION);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // add reaction
      await addReaction({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
      console.log(
        `There was a problem with adding a reaction to this Earthquake, ID:${earthquakeId} Try again!`
      );
    }
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
            There was a problem with adding a reaction to this Earthquake, ID:{" "}
            {earthquakeId} Try again!
          </div>
        ))}
    </div>
  );
};

export default ReactionForm;
