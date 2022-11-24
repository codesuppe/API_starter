import React, { useEffect, useState} from "react";
import Loader from "../../components/Loader";

import useGetData from "../../hooks/useGetData";
import Title from "../../components/Title";

const Species = () => {

    const {error, loading, data, getData} = useGetData()

    const [speciesID, setSpeciesID] = useState(1)

    useEffect( () => {
        if (speciesID !== ""){

            getData("https://swapi.dev/api/species/" + speciesID)

        }
    }, [speciesID])

    return (

        <div className="species container">
            
            <div>
                <Title headline="Species"/>

                {/* Eroor */}
                {error && <h4>Ingen species med det ID</h4>}

                {/* Loading */}
                {loading && <Loader/>}

                <form className="my-3">
                    <label htmlFor="inputSpeciesId">Tast et species-ID</label>
                    <input type="number" id="inputSpeciesId" onInput={e => setSpeciesID(e.target.value)} min="1" className="form-control" placeholder="Indtast species-ID" />

                </form>

                <div>
                    {/* data - species */}
                    {data && (
                        <div className="card">
                            <div className="card-body">
                                <h2>Name: {data.name}</h2>
                                <p>Classification: {data.classification}</p>
                                <p>Designation: {data.designation}</p>
                                <p>Average height: {data.average_height} cm</p>
                                <p>Skin color: {data.skin_colors}</p>
                                <p>Language: {data.language}</p>

                            </div>

                        
                        <h2>Appear in following movies:</h2>
                            {
                                Object.entries(data.films).map(([k, v]) =>
                                <p key={v}>{v}</p>
                                )

                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    )


}

export default Species;
