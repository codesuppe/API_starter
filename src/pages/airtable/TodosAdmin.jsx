import React, { useState, useEffect } from 'react'
import Title from '../../components/Title';

import Error from '../../components/Error';
import Loader from '../../components/Loader';

//hooks import
import useDeleteData from '../../hooks/useDeleteData';
import useGetData, { } from "../../hooks/useGetData"

const TodosAdmin = () => {
    const { error, loading, data, getData } = useGetData()
    const { error : errordelete, loading: loadingdelete, data: datadelete, deleteData } = useDeleteData()


    useEffect( () => {
        getData( "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY } )

    }, [ datadelete] ) // abonnerer på ændringer i datadelete-state (fra delete hook) og henter nye data ved ændringer

    //handledelete
    const handleDelete = (id) => {
        console.log(id)

        if(window.confirm("Er du sikker på at slette?")) {

            deleteData( "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable/" + id,
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY } )
        }
        

      
    }

    return (

        <div className="Todos container">

            <div>
                <Title headline="Admin todois" />

                {/* Eroor */ }
                { (error || errordelete) && <h4>Ingen Todos</h4> }

                {/* Loading */ }
                { (loading || loadingdelete) && <Loader /> }


                <div className="row row-cols-1 row-cols-md-4 g-2">

                    { data &&
                    
                    data.records.map( ( t ) => 
                        <div className="card" key={ t.id }>
                            <div className="card-body">
                                <h2>{t.fields.todos}</h2>
                                <p> {new Date( t.createdTime ).toLocaleDateString("da-dk")}</p>

                                <p>{t.fields.Notes}</p>
                            </div>
                            <div className='card-footer'>
                            <button className='btn btn-secondary btn-danger me-2' onClick={ () => handleDelete(t.id) }>SLET</button>
                            <button className="btn btn-warning">RET</button>

                            </div>
                        </div>
                     )}

                </div>
            </div>
        </div>
    )
}

export default TodosAdmin
