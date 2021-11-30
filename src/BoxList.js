import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import { v4 as uuid } from "uuid";

const BoxList = () => {
  const [boxes, setBoxes] = useState([]);

  const addBox = (box) => {
    let newBox = { ...box, id: uuid() };
    setBoxes((boxes) => [...boxes, newBox]);
  };

  const handleDelete = (event) => {
    const box = event.target.previousSibling;
    const boxRemoved = boxes.filter((b) => b.id !== box.id);
    setBoxes(boxRemoved);
  };

  return (
    <div
      className='BoxList'
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <NewBoxForm addBox={addBox} />

      {boxes.map((box) => (
        <Box
          key={box.id}
          n={box.id}
          width={box.width}
          height={box.height}
          color={box.color}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BoxList;
