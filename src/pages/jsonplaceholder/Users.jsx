import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
//import eget hook
import useGetData from "../../hooks/useGetData";
import Loader from "../../components/Loader";

const Users = () => {
  //request-hook
  const { error, loading, data, getData } = useGetData();

  // state
  const [userID, setUserID ] = useState(5)

  useEffect(() => {
    
if ( userID !== "") {

  //undgå kald til api hvis der ikke er en id i state

  getData("https://jsonplaceholder.typicode.com/users/" + userID);

}

  }, [userID]);

  return (
    <div className="Users container">
      <div>
        <Title headline="Users"/>

        {/* Error */}
        {error && <Error errormessage="Ingen brugere med det ID "/>}

        {/* Loading */}
        {loading && <Loader />}


        <form className="my-3">

            <label htmlFor="inputUserId">Tast en brugers ID</label>
            <input type="number" id="inputUserId" onInput={ e => setUserID(e.target.value)} min="1" className="form-control" placeholder="Indtast bruger ID" />

        </form>

        <div>
          {/* Data - ujsers */}
          {data && data.address && (
            <div className="card">
              <div className="card-body">
                <h2>{data.name}</h2>
                <p>
                  <a href={"mailto:" + data.email}>{data.email}</a>
                </p>
                <p>{data.address.city}</p>

                {
                  Object.entries(data.address).slice(0,4).map(([k, v]) => 
                    <p key={v}>{k}: {v}</p>
                  )
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
