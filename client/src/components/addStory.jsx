export const AddStory = () => {
  return (
    <div id="form-container">
      <form>
        <label>Location:</label>
        <br />
        <input type="text" id="location" name="location" />
        <br />
        <br />

        <label>Story:</label>
        <br />
        <textarea id="story" name="story" rows="4" cols="50"></textarea>
        <br />
        <br />

        <label>Photo:</label>
        <br />
        <input type="file" id="photo" name="photo" />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
