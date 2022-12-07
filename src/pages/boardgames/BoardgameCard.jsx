import React from "react";

const BoardgameCard = ({t}) => {
  return (
    <div className="card h-100 bg-dark text-light">
      <div className="card-body">
        <h2>{t.fields.name}</h2>
        <p> {t.fields.categoryname}</p>

        
      </div>
    </div>
  );
};

export default BoardgameCard;
