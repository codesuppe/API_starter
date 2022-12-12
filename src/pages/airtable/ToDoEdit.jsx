import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

import useGetData from "../../hooks/useGetData";
import usePatchData from "../../hooks/usePatchData";

const ToDoEdit = () => {
  const { id } = useParams();
  
  const navigate = useNavigate(); // så brugeren kan redirectes retur til adminsiden efter rettelse

  const { error, loading, data, getData } = useGetData();
  const { error: errorCategories, loading: loadingCategories, data: dataCategories, getData: getDataCategories } = useGetData();

  const {error: errorPatch, loading: loadingPatch, data: dataPatch, patchData } = usePatchData();

  //state til at rumme rettet todo
  const [ updatedTodo, setUpdatedTodo ] = useState();
  const [ updatedCategory, setUpdatedCategory ] = useState();


 

  useEffect( () => {
    //kategorier, så man kan hente en anden kategori
      getDataCategories( "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/Categories", {

        "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY     

      } )

    //todo'en der skal rettes
    getData( "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable/" + id, {

      "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
      "Content-Type": "application/json",

    } );
  }, [] );


  useEffect( () => {
    //hvis der er data fra patch-requestet = færdig med at rette
    if ( dataPatch ) {
      navigate( "/admintodo" );
    }
  }, [ dataPatch ] );
  
  const handleSubmit = ( e ) => {
    e.preventDefault()

    let tododefault = updatedTodo ? updatedTodo : data.fields.todos
    let todocategorydefault = updatedCategory ? updatedCategory : data.fields.Categories[0]

    let rettet = {
      "fields": {
          "todos": tododefault,
          "Categories": [ todocategorydefault ]
      }
  }

    patchData(
      "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable/" + id, rettet,
      
      {
        "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
        "Content-Type": "application/json",
      }, null );
  }

  return (
    <div className="container">
      <Title headline="Ret udvalgt todo" />

      { loading || ( loadingPatch && <Loader /> ) }
      { error || ( errorPatch && <Error /> ) }

      { data && (
        <form onSubmit={ handleSubmit }>
          <label className="form-label me-3">
            ret todo:
            <input
              type="text"
              defaultValue={ data.fields.todos }
              onChange={ ( e ) => setUpdatedTodo( e.target.value ) }
              className="form-control"
            />
          </label>


          <div className='mb-3 mt-3'> {/* Loop categories */ }
            <label className='form-label me-3'>
              Vælg en kategori

              <select defaultValue={data.fields.Categories[0]} onInput={ e => setUpdatedCategory( e.target.value ) } className='form-select'>

                { dataCategories &&

                  dataCategories.records.map( c =>

                    <option value={ c.id } key={ c.id }>{ c.fields.Name }</option>

                  )

                }

              </select>

            </label>

          </div>

          <button type="submit" className="btn btn-primary">
            Ret ToDo
          </button>
        </form>
      ) }
    </div>
  );
};

export default ToDoEdit;
