import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";
import "./TodoList.css";

const TodoList = () => {
  const INITIAL_STATE = { content: "", id: "", date: "" };
  const [list, setList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  // it would be probably best to move isOpen, formData to a new Component Todo

  const dt = DateTime.now(); // just a helper

  const addTodo = (todo) => {
    let newTodo = {
      ...todo,
      id: uuid(),
      date: dt.toLocaleString(DateTime.DATETIME_SHORT),
    };
    setList((list) => [...list, newTodo]);
  };

  const removeAll = () => setList([]);
  const removeTodo = (event) => {
    const todo = event.target.parentElement;
    setList((list) => list.filter((t) => t.id !== todo.id));
  };

  const markDone = (event) => {
    event.preventDefault();
    const todo = event.target.parentElement;
    if (todo.className === "done") {
      todo.className = "todo";
      event.target.checked = false;
    } else {
      todo.className = "done";
      event.target.checked = true;
    }
  };

  const editTodo = (todo) => {
    // how to grab specific todo from list?
    const idx = list.findIndex((el) => el.id === todo.id);
    const newList = [...list];
    newList[idx].content = formData.content;
    newList[idx].date = dt.toLocaleString(DateTime.DATETIME_SHORT);
    setList(newList);
    // setList( list with new modified todo )

    closeForm();
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    editTodo(evt.target.parentElement);
    setFormData(INITIAL_STATE);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const listTodos = () => {
    return (
      <ul>
        {list.map((todo) => (
          <li key={todo.id} id={todo.id} className='todo'>
            <b>{todo.content}</b>, at :{todo.date}
            <input type='radio' onClick={markDone} />
            <button onClick={openForm}>Edit</button>
            {isOpen ? (
              // this should be moved to another component
              <form onSubmit={handleSubmit}>
                <input
                  type='text'
                  name='content'
                  value={formData.content}
                  onChange={handleChange}
                />
                <button>Done</button>
              </form>
            ) : null}
            <button
              onClick={(e) => {
                removeTodo(e);
                closeForm();
              }}>
              X
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className='TodoList'>
      <h1>Todo List</h1>
      <NewTodoForm addTodo={addTodo} />
      {listTodos()}
      {list.length > 0 ? <button onClick={removeAll}>clear all</button> : null}
    </div>
  );
};

export default TodoList;
