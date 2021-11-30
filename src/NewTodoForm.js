import React, { useState } from "react";

const NewTodoForm = ({ addTodo, removeTodo }) => {
  const INITIAL_STATE = {
    content: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addTodo(formData);
    setFormData(INITIAL_STATE);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='content'>Todo:</label>
      <input
        type='text'
        name='content'
        value={formData.content}
        onChange={handleChange}
      />
      <button>+</button>
    </form>
  );
};

export default NewTodoForm;
