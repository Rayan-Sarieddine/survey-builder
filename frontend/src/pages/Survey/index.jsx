import React from "react";

function Survey() {
  return (
    <div>
      <h2>question:</h2>

      <label>
        <input type="radio" name="option" value="option1" /> Option 1
      </label>

      <label>
        <input type="radio" name="option" value="option2" /> Option 2
      </label>

      <label>
        <input type="radio" name="option" value="option3" /> Option 3
      </label>

      <button onclick="submitAnswer()">Submit</button>
    </div>
  );
}

export default Survey;
