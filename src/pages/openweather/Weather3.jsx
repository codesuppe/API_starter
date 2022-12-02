import React, { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Title from "../../components/Title";

//hook import
import useGetData from "../../hooks/useGetData";

//map import
import { initMap, changeMapView, removeMap } from "../../helpers/leaflet";

const Weather3 = () => {
  //request-hook
  const { error, loading, data, getData } = useGetData();
  const {
    error: errorDAWA,
    leading: loadingDAWA,
    data: dataDAWA,
    getData: getDataDAWA,
  } = useGetData();

  //state til zip ID
  const [zip, setZip] = useState("9000");

  useEffect(() => {
    if (zip.length === 4 && !isNaN(zip)) {
      getData(
        "https://api.openweathermap.org/data/2.5/weather?zip=" +
          zip +
          ",dk&units=metric&lang=da&appid=" +
          process.env.REACT_APP_OPENWEATHERKEY
      );
    } else {
      getDataDAWA(
        "https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip
      );
    }
  }, [zip]);


  useEffect(() => {

    if(data) changeMapView( [data.coord.lat, data.coord.lon] )
    

  }, [data])
  

  useEffect(() => {
    initMap( [56, 10])
    return () => {
        removeMap(); // fjern kortet når component unmountes

    };
  }, [] );

  return (
    <div className="Weather1 container">
      <Title headline="Vejret - indtast postnummer" />

      {/* Eroor */}
      {error && <Error />}

      {/* Loading */}
      {loading && <Loader />}

      <div className="row">
        <div className="card bg-dark text-light cap-first col-12 col-md-6 py-4 px-1 offset-md-3 text-center">
          <div className="col-12 mb-5 text-center">
            <input
              type="text"
              list="addresssuggestion"
              placeholder="indtast et postnummer"
              onInput={(e) => setZip(e.target.value.substring(0, 4))}
              defaultValue={zip}
            />
            <datalist id="addresssuggestion">
              {dataDAWA &&
                dataDAWA.map((a) => (
                  <option value={a.tekst} key={a.postnummer.nr} />
                ))}
            </datalist>
          </div>

          {data && (
            <div className="card-body">
              <div className="card-title">
                <h3 className="display-6 p-2 font-weight-bold">
                  Vejret i {data.name}
                </h3>
              </div>

              <div className="container card-body p-3">
                <p className="cap-first display-4">
                  {data.weather[0].description}
                </p>
                <p className="cap-first">
                  Temperatur: {Math.round(data.main.temp)}&#8451;
                </p>
                <p className="cap-first">Vind: {data.wind.speed} m/s</p>
                <img
                  className="logo img-fluid"
                  src={
                    "http://openweathermap.org/img/wn/" +
                    data.weather[0].icon +
                    ".png"
                  }
                />
              </div>
            </div>
          )}

          <div
            id="mapcontainer"
            style={{
              width: "300px",
              height: "300px",
              backgroundColor: "whitesmoke",
            }}>
            <Loader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather3;
