import React from "react";

const Box = ({ n, color, width, height, handleDelete }) => {
  return (
    <>
      <div
        className='box'
        id={n}
        style={{
          width: `${width}px`,
          backgroundColor: color,
          height: `${height}px`,
          margin: `10px 0 10px 0`,
        }}></div>
      <button onClick={handleDelete}>X</button>
    </>
  );
};

export default Box;
