//Put params f og s med sammen med headers i vores hook.

//https://rapidapi.com/ajith/api/love-calculator/

import React from "react";
import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import Title from "../../components/Title";

const Love = () => {
  const [fname, setFname] = useState("Frank");
  const [sname, setSname] = useState("Alice");

  const { error, loading, data, getData } = useGetData();

  const handleClick = () => {
    getData(
      "https://love-calculator.p.rapidapi.com/getPercentage",
      {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPIKEY,
        "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
      },
      { fname: fname, sname: sname }
    );
  };

  return (
    <div className="Love container text-center p-5">
      <Title headline="Sæt jeres kærlighed på prøve" />
      <input
        className="form-control m-3"
        type="text"
        onInput={(e) => setFname(e.target.value)}
        placeholder="Lover 1"
      />
      <input
        className="form-control m-3"
        type="text"
        onInput={(e) => setSname(e.target.value)}
        placeholder="Lover 2"
      />
      <button className="btn btn-lg btn-success form-submit" onClick={handleClick}>
        Get some love
      </button>

      {data && (
        <div className="card p-5 m-5">
          <div className="card-body text-center">
            <h2>{data.percentage}%</h2>
            <h2>{data.result}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Love;
