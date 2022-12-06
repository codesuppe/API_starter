import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";

import useGetData from "../../hooks/useGetData";
import Title from "../../components/Title";
import ToDoCard from "./ToDoCard";

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
                    <div className="col" key={ t.id }>

                        <ToDoCard t={t} />

                    </div>
                     )}

                </div>
            </div>
        </div>
    )


}

export default Todos;