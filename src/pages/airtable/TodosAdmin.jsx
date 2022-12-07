import React, {useEffect} from "react";
import Title from "../../components/Title";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Error from "../../components/Error";

//hooks import
import useDeleteData from "../../hooks/useDeleteData";
import useGetData from "../../hooks/useGetData";

//import icons
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const TodosAdmin = () => {
  const { error, loading, data, getData } = useGetData();
  const { error: errordelete, loading: loadingdelete, data: dataDelete, deleteData } = useDeleteData();

  useEffect( () => {
    getData( "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable", {
      "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY } );
  }, [ dataDelete ] ); // abonnerer på ændringer i datadelete-state (fra delete hook) og henter nye data ved ændringer


  //handledelete
  const handleDelete = ( id ) => {

    if ( window.confirm( "Er du sikker på at slette?" ) === true) {
      deleteData(
        "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable/" + id,
        { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY }
      );
    }
  };

  return (
    <div className="Todos container">
      <div>
        <Title headline="Admin todois" />

        {/* Eroor */ }
        { ( error || errordelete ) && <Error  /> }

        {/* Loading */ }
        { ( loading || loadingdelete ) && <Loader /> }

        <div className="row row-cols-1 row-cols-md-4 g-2">
          { data &&
            data.records.map( ( t ) => (
              <div className="card" key={ t.id }>

                <div className="card-body">
                  <h2>{ t.fields.todos }</h2>
                  <p> { new Date( t.createdTime ).toLocaleDateString( "da-dk" ) }</p>

                  <p>{ t.fields.Notes }</p>
                  <p>{ t.fields.categoryname }</p>
                </div>
                <div className="card-footer">
                  <Link>
                    <button
                      onClick={ () => handleDelete ( t.id ) }
                      className="btn btn-secondary btn-danger me-2"
                    >
                      SLET <AiOutlineDelete />
                    </button>
                  </Link>

                  <Link to={ "/todoedit/" + t.id }>
                    <button className="btn btn-warning">
                      RET <AiOutlineEdit />
                    </button>
                  </Link>
                </div>
              </div>
            ) ) }
        </div>
      </div>
    </div>
  );
};

export default TodosAdmin;
