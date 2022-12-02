import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";

import useGetData from "../../hooks/useGetData";
import Title from "../../components/Title";

const Todos = () => {

    const { error, loading, data, getData } = useGetData()

    useEffect( () => {
        getData( "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY } )

    }, [] )

    return (

        <div className="Todos container">

            <div>
                <Title headline="Todos" />

                {/* Eroor */ }
                { error && <h4>Ingen Todos</h4> }

                {/* Loading */ }
                { loading && <Loader /> }


                <div className="row row-cols-1 row-cols-md-4 g-2">

                    { data &&
                    
                    data.records.map( ( t ) => 
                        <div className="card" key={ t.id }>
                            <div className="card-body">
                                <h2>{t.fields.todos}</h2>
                                <p> {new Date( t.createdTime ).toLocaleDateString("da-dk")}</p>

                                <p>{t.fields.Notes}</p>
                            </div>
                        </div>
                     )}

                </div>
            </div>
        </div>
    )


}

export default Todos;