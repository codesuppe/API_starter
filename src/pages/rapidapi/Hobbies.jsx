import React from "react";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import Error from "../../components/Error";

import useGetData from "../../hooks/useGetData";

//https://rapidapi.com/apininjas/api/hobbies-by-api-ninjas/

const Hobbies = () => {
  const { error, loading, data, getData } = useGetData();

  //ved klik på knap

  const handleClick = () => {
    getData(
      "https://hobbies-by-api-ninjas.p.rapidapi.com/v1/hobbies",
      {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPIKEY,
        "X-RapidAPI-Host": "hobbies-by-api-ninjas.p.rapidapi.com",
      },
      { category: "general" }
    );
  };

  return (
    <div className="container">
      <Title headline="Din nye hobby" />

      {loading && <Loader />}
      {error && <Error />}

      {data && (
        <div className="card">
          <div className="card-body">
            <h2>
              <a href={data.link} target="_blank">
                {data.hobby}
              </a>
            </h2>
          </div>
        </div>
      )}

      <button onClick={handleClick} className="btn btn-success mt-5">
        Gi' mig en hobby
      </button>
    </div>
  );
};

export default Hobbies;
