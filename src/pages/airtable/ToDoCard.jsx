import React from "react";

const ToDoCard = ({t}) => {
  return (
    <div className="card h-100 bg-dark text-light">
      <div className="card-body">
        <h2>{t.fields.todos}</h2>
        <p> {new Date(t.createdTime).toLocaleDateString("da-dk")}</p>

        <p>{t.fields.Notes}</p>
      </div>
    </div>
  );
};

export default ToDoCard;
