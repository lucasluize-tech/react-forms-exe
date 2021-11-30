import React, { useState } from "react";

const NewBoxForm = ({ addBox }) => {
  let INITIAL_STATE = {
    width: 0,
    height: 0,
    color: "black",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((data) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBox(formData);
    setFormData(INITIAL_STATE);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='width'>Width</label>
      <input
        type='text'
        name='width'
        id='width'
        value={formData.width}
        onChange={handleChange}></input>

      <label htmlFor='height'>Height</label>
      <input
        type='text'
        name='height'
        id='height'
        value={formData.height}
        onChange={handleChange}></input>

      <label htmlFor='color'>Color:</label>
      <input
        type='color'
        name='color'
        id='color'
        onChange={handleChange}
        value={formData.color}></input>
      <button type='submit'>Add Box!</button>
    </form>
  );
};

export default NewBoxForm;
