import { useState } from "react";
import { useForm } from "../context/FormContext";
import { createGUID } from "../utils/helpers.jsx";
import supabase from "../../config/supabaseClient";

export const StoryForm = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { state, dispatch } = useForm();
  const { formData } = state;

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const payload = name === "photo" ? files[0] : value;
    dispatch({
      type: "SET_FORM_DATA",
      payload: { [name]: payload },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("stories").insert({
        id: createGUID(),
        lat: formData.lat,
        lng: formData.lng,
        story_body: formData.story,
        photo_ids: null,
      });

      if (error) {
        console.error(`Error submitting to database:`, error);
        return;
      }
      console.log(`Successful data submission:`, data);
      dispatch({
        type: "RESET_FORM",
      });
    } catch (err) {
      console.error(`Unexpected error:`, err);
    }
  };
  return (
    <div id="form-container">
      {!isFormVisible ? (
        <button className="form-button" onClick={toggleFormVisibility}>
          &times;
        </button>
      ) : (
        <div>
          <button onClick={toggleFormVisibility}>&times;</button>
          <form onSubmit={handleSubmit}>
            <label>Location:</label>
            <br />
            <input
              type="text"
              id="latLng"
              name="latLng"
              value={
                formData.lat
                  ? `${formData.lat.toFixed(3)}, ${formData.lng.toFixed(3)}`
                  : "Click on map to select location."
              }
              readOnly
            />
            <br />
            <br />

            <label>Story:</label>
            <br />
            <textarea
              id="story"
              name="story"
              rows="4"
              cols="50"
              value={formData.story}
              onChange={handleChange}
            ></textarea>
            <br />
            <br />

            <label>Photo:</label>
            <br />
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleChange}
            />
            <br />
            <br />

            <input type="submit" value="Submit" />
          </form>
        </div>
      )}
    </div>
  );
};
