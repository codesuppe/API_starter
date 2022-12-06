import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
import { useParams, useNavigate } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import Loader from "../../components/Loader";
import usePatchData from "../../hooks/usePatchData";

const ToDoEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // så brugeren kan redirectes retur til adminsiden efter rettelse

  const { error, loading, data, getData } = useGetData();
  const {
    error: errorPatch,
    loading: loadingPatch,
    data: dataPatch,
    patchData,
  } = usePatchData();

  const [updatedTodo, setUpdatedTodo] = useState();

  useEffect(() => {
    //hvis der er data fra patch-requestet = færdig med at rette
    if (dataPatch) {
      navigate("/admintodo");
    }
  }, [dataPatch]);

  useEffect(() => {
    getData("https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable/" + id, {
      "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
      "Content-Type": "application/json",
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    let t = {
      fields: {
        todos: updatedTodo,
      },
    };

    patchData(
      "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable/" + id,
      t,
      {
        "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
        "Content-Type": "application/json",
      }
    );}

    return (
      <div className="container">
        <Title headline="Ret udvalgt todo" />

        {loading || (loadingPatch && <Loader />)}
        {error || (errorPatch && <Error />)}

        {data && (
          <form onSubmit={handleSubmit}>
            <label className="form-label me-3">
              ret todo:
              <input
                type="text"
                defaultValue={data.fields.todos}
                onInput={(e) => setUpdatedTodo(e.target.value)}
                className="form-control"
              />
            </label>

            <button type="submit" className="btn btn-primary">
              Ret ToDo
            </button>
          </form>
        )}
      </div>
    );
  };

export default ToDoEdit;
