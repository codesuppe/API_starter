import React, { useEffect } from "react";
import { useState } from "react";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import Error from "../../components/Error";
import useGetData from "../../hooks/useGetData";
import Pagination from "../../pagination/Pagination";

//https://rapidapi.com/apininjas/api/Facts-by-api-ninjas/

const Facts = () => {
  const { error, loading, data, getData } = useGetData();
  const [currentPage, setCurrentPage] = useState(0); //Hvilken side skal vises nu
  const [itemsPerPage, setItemsPerPage] = useState(5); //antal items pr. side, der skal vises

  useEffect(() => {
    getData(
      "https://facts-by-api-ninjas.p.rapidapi.com/v1/facts",

      {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPIKEY,
        "X-RapidAPI-Host": "facts-by-api-ninjas.p.rapidapi.com",
      },
      { limit: "30" }
    );
  }, []);

  return (
    <div className="Facts container">
      <Title headline="Få facts" />

      {loading && <Loader />}
      {error && <Error errormessage="Ingen data her" />}

{data && 
  <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} itemsTotal={data.length} />

}
      

      {data &&
        data.slice(currentPage * itemsPerPage, (currentPage * itemsPerPage) + itemsPerPage).map( (f, i) => (
          <div className="card" key={"fact" + i}>
            <div className="card-body">
              <small>{data.indexOf(f)}</small>
              <h4>{f.fact}</h4>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Facts;
