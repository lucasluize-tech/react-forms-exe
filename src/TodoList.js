import React, { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import { v4 as uuid } from "uuid";
import { DateTime } from "luxon";
import "./TodoList.css";

const TodoList = () => {
  const [list, setList] = useState([]);

  const addTodo = (todo) => {
    const dt = DateTime.now();
    let newTodo = {
      ...todo,
      id: uuid(),
      date: dt.toLocaleString(DateTime.DATETIME_SHORT),
    };
    setList((list) => [...list, newTodo]);
  };

  const removeTodo = (event) => {
    const todo = event.target.parentElement;
    setList((list) => list.filter((t) => t.id !== todo.id));
  };
  const removeAll = () => setList([]);

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

  const editTodo = (evt) => {
    // render a input text field bellow the item
  };

  const listTodos = () => {
    return (
      <ul>
        {list.map((todo) => (
          <li key={todo.id} id={todo.id} className='todo'>
            <b>{todo.content}</b>, at :{todo.date}
            <input type='radio' onClick={markDone} />
            <button onClick={editTodo}>Edit</button>
            <button onClick={removeTodo}>X</button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h1>Todo List</h1>
      <NewTodoForm addTodo={addTodo} />
      {listTodos()}
      {list.length > 0 ? <button onClick={removeAll}>clear all</button> : null}
    </>
  );
};

export default TodoList;
