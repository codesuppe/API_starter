import React, { useEffect, useState } from "react";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import useGetData from "../../hooks/useGetData";

const Starships = () => {
  const { error, loading, data, getData } = useGetData();

  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getData("https://swapi.dev/api/starships/?page=" + pageNumber);
  }, [pageNumber]);

  return (
    <div className="Starships container">
      <div>
        <Title headline="Starships" />

        {/* Error */}
        {error && <Error />}

        {/* Loader */}
        {loading && <Loader />}

        {/* Data - species */}
        {data && (
          <>
            <div className="row row-cols-1 row-cols-md-4 g-2">
              {data.results.map((s, i) => (
              <div className="card" key={"starship" + i}>
                <div className="card-body">
                  <h2>{s.name}</h2>
                  <p>{s.manufacturer}</p>
                  <p>{s.crew}</p>
                  <p>{s.passengers}</p>
                  <p>{s.cargo_capacity}</p>
                </div>
              </div>
              ))}
            </div>
            
            <button disabled= {data.previous ? false : true } onClick={() => { setPageNumber(pageNumber - 1)}}>&lt;&lt;Previous</button>

            <button disabled= {data.next ? false : true } onClick={() => { setPageNumber(pageNumber + 1)}}>Next &gt;&gt;</button>
          </>
        )}
      </div>
    </div>
  );
};
export default Starships;
