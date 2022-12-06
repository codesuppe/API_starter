import React, { useState, useEffect } from 'react'
import Title from '../../components/Title';
import usePostData, { } from "../../hooks/usePostData"
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const TodoCreate = () => {

    //hook opener til postdata
    const { error, loading, data, postData } = usePostData()

    //state til det nye todo
    const [ newtodo, setNewtodo ] = useState("");

    useEffect( () => {
        if(data) setNewtodo("")
        }, [data] )

    //handlesubmit funktion - send data til api
    const handleSubmit = ( e ) => {
        e.preventDefault() //vigtig!

        let nyPost = {
            "fields": {
                "todos": newtodo,
                "Notes": "To do",
                "Deadline": "2023-12-02"
            }
        }

        postData( "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/TodoTable", nyPost,
        { 
            "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEKEY, 
            "Content-Type": "application/json"
    } )

    }

    return (
        <div className='TodoCreate container'>

            <Title />

            { error && <Error /> }
            { loading && <Loader /> }

            { data && <h2>Din todo er nu oprettet med id: {data.id}</h2> }

            <div className='row'>

                <div className='col'>

                    <form onSubmit={ handleSubmit }>
                        <label className='form-label me-3'>Indtast en todo: 
                            <input type="text" onInput={ ( e ) => setNewtodo( e.target.value ) } id="input" value={newtodo} className='form-control' />
                        </label>
                        <button type="submit" className='btn btn-primary'>Opret ny todo</button>
                    </form>

                </div>


            </div>
            
        </div>
    )
}

export default TodoCreate
