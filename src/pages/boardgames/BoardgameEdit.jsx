import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
import { useParams, useNavigate } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import Loader from "../../components/Loader";
import usePatchData from "../../hooks/usePatchData";

const BoardgameEdit = () => {
  const { idd } = useParams();
  const navigate = useNavigate(); // så brugeren kan redirectes retur til adminsiden efter rettelse

  const { error, loading, data, getData } = useGetData();
  const { error: errorCategories, loading: loadingCategories, data: dataCategories, getData: getDataCategories } = useGetData();

  const {error: errorPatch, loading: loadingPatch, data: dataPatch, patchData } = usePatchData();

  //state til at rumme rettet todo
  const [ updatedBoardgame, setupdatedBoardgame ] = useState();
  const [ updatedCategory, setUpdatedCategory ] = useState();


 

  useEffect( () => {
    //kategorier, så man kan hente en anden kategori

      getDataCategories( "https://api.airtable.com/v0/appelw4DFg7HS9Tky/categorytable", {
        "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY     
      } )

    //todo'en der skal rettes
    getData( "https://api.airtable.com/v0/appelw4DFg7HS9Tky/boardgametable/" + idd, {
      "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
      "Content-Type": "application/json",
    } );
  }, [] );

  useEffect( () => {
    //hvis der er data fra patch-requestet = færdig med at rette
    if ( dataPatch ) {
      navigate( "/boardgamesAdmin" );
    }
  }, [ dataPatch ] );
  
  const handleSubmit = ( e ) => {
    e.preventDefault();

    let boardgamedefault = updatedBoardgame ? updatedBoardgame : data.fields.name
    let boardgamecategorydefault = updatedCategory ? updatedCategory : data.fields.categoryname[0]

    let rettet = {
      "fields": {
          "name": boardgamedefault,
          "category": [ boardgamecategorydefault ]
      }
  }

    patchData(
      "https://api.airtable.com/v0/appelw4DFg7HS9Tky/boardgametable/" + idd, rettet,
     
      {
        "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
        "Content-Type": "application/json",
      }, null
    );
  }

  return (
    <div className="container">
      <Title headline="Ret i et brætspil" />

      { loading || ( loadingPatch && <Loader /> ) }
      { error || ( errorPatch && <Error /> ) }

      { data && (
        <form onSubmit={ handleSubmit }>
          <label className="form-label me-3">
            Ret brætspil:
            <input
              type="text"
              defaultValue={ data.fields.name }
              onInput={ ( e ) => setupdatedBoardgame( e.target.value ) }
              className="form-control"
            />
          </label>


          <div className='mb-3 mt-3'> {/* Loop categories */ }
            <label className='form-label me-3'>
              Vælg en kategori

              <select defaultValue={data.fields.category[0]} onChange={ e => setUpdatedCategory( e.target.value ) } className='form-select'>

                { dataCategories &&

                  dataCategories.records.map( c =>

                    <option value={ c.id } key={ c.id }>{ c.fields.categoryname }</option>

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

export default BoardgameEdit;
