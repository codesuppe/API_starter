import React, { useState, useEffect } from 'react'
import Title from '../../components/Title';
import usePostData, { } from "../../hooks/usePostData"
import useGetData from '../../hooks/useGetData';
import Error from '../../components/Error';
import Loader from '../../components/Loader';

const TodoCreate = () => {

    //hook opener til postdata
    const { error, loading, data, postData } = usePostData()
    const { error: errorCategory, loading: loadingCategory, data: dataCategory, getData } = useGetData();

    //state til det nye todo
    const [ newtodo, setNewtodo ] = useState( "" );
    const [ category, setCategory ] = useState();


    useEffect( () => {
        getData( "https://api.airtable.com/v0/apphV6YZoJVKEG2Xu/Categories",
            {
                Authorization: "Bearer " + process.env.REACT_APP_AIRTABLEKEY,
            } );
    }, [] );

    useEffect( () => {
        if ( data ) setNewtodo( "" )
    }, [ data ] )




    //handlesubmit funktion - send data til api
    const handleSubmit = ( e ) => {
        e.preventDefault() //vigtig!

        let nyPost = {
            "fields": {
                "todos": newtodo,
                "Categories": [ category ]
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

            { data && <h2>Din todo er nu oprettet med id: { data.id }</h2> }

            <div className='row'>

                <div className='col'>

                    <form onSubmit={ handleSubmit }>
                        <div className='mb-3 mt-3'>
                            <label className='form-label me-3'>Indtast en todo:
                                <input type="text" onInput={ ( e ) => setNewtodo( e.target.value ) } id="input" value={ newtodo } className='form-control' />
                            </label>
                        </div>

                        <div className='mb-3 mt-3'> {/* Loop categories */ }
                            <label className='form-label me-3'>
                                V??lg en kategori

                                <select defaultValue="DEFAULT" onChange={ e => setCategory( e.target.value ) } className='form-select'>
                                    <option value="DEFAULT" disabled>V??lg en kategori</option>

                                    { dataCategory &&

                                        dataCategory.records.map( c =>

                                            <option value={ c.id } key={ c.id }>{ c.fields.Name }</option>

                                        )

                                    }

                                </select>

                            </label>

                        </div>

                        <button type="submit" className='btn btn-primary'>Opret ny todo</button>
                    </form>

                </div>


            </div>

        </div>
    )
}

export default TodoCreate
