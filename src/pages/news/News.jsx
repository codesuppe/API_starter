import React from "react";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import Error from "../../components/Error";
import {formatDistanceToNow} from 'date-fns'
import {da} from 'date-fns/locale'



import { useEffect, useState } from "react";
import useGetData from "../../hooks/useGetData";

const News = () => {
  const { error, loading, data, getData } = useGetData();

  //states
  const [search, setSearch] = useState("FIFA");
  const [category, setCategory] = useState("sports");
  const [country, setCountry] = useState("de");

  //søgning
  useEffect(() => {
    callAPI();
  }, []);

  // søg - kald api
  const handleSubmit = (e) => {
    e.preventDefault(); //forhindrer reload
    callAPI();
  };

  //api-url
  const callAPI = () => {
    getData(
      "https://newsapi.org/v2/top-headlines?language=en&category=" +
        category +
        "&q=" +
        search +
        "&apiKey=" +
        process.env.REACT_APP_NEWSAPIKEY
    );
  };

  return (
    <div className="news container">
      <Title headline="News - search" />

      {loading && <Loader />}
      {error && <Error />}

      <div className="row mb-5">
        <form onSubmit={handleSubmit}>
          {/* SØGNING - SØGEORD */}
          <div className="col-6 mb-3 mt-3">
            <input className="form-control"
              type="text"
              defaultValue={search}
              onInput={(e) => setSearch(e.target.value)}
            />
          </div>

          <div
            className="col-6 mb-3 mt-3"
            onChange={(e) => setCategory(e.target.value)}
          >
            <select defaultValue={category} className="form-select">
              <option>Business</option>
              <option>Entertainment</option>
              <option>General</option>
              <option>Health</option>
              <option>Science</option>
              <option>Sports</option>
            </select>
          </div>

          {/* Country - vælg et land */}

          <div className="col-6 mb-3 mt-3">
            <input className="form-control"
              list="countryList"
              defaultValue={country}
              onInput={(e) => setCountry(e.target.value)}
            />
            <datalist id="countryList">
              <option value="ae" />
              <option value="ar" />
              <option value="at" />
              <option value="au" />
              <option value="be" />
              <option value="bg" />
              <option value="br" />
              <option value="ca" />
              <option value="ch" />
              <option value="cn" />
              <option value="co" />
              <option value="cu" />
              <option value="cz" />
              <option value="de" />
              <option value="eg" />
              <option value="fr" />
              <option value="gb" />
              <option value="gr" />
              <option value="hk" />
              <option value="hu" />
              <option value="id" />
              <option value="ie" />
              <option value="il" />
              <option value="in" />
              <option value="it" />
              <option value="jp" />
              <option value="kr" />
              <option value="lt" />
              <option value="lv" />
              <option value="ma" />
              <option value="mx" />
              <option value="my" />
              <option value="ng" />
              <option value="nl" />
              <option value="no" />
              <option value="nz" />
              <option value="ph" />
              <option value="pl" />
              <option value="pt" />
              <option value="ro" />
              <option value="rs" />
              <option value="ru" />
              <option value="sa" />
              <option value="se" />
              <option value="sg" />
              <option value="si" />
              <option value="sk" />
              <option value="th" />
              <option value="tr" />
              <option value="tw" />
              <option value="ua" />
              <option value="us" />
              <option value="ve" />
              <option value="za" />
            </datalist>
          </div>
          <button>Søg</button>

          <div className="mt-3">
          
          {
          /* data && <p>Matches: {data.totalResults}</p> */
          
          data?.articles.length ? <p>Antal matches: {data.totalResults}</p> : <p>Desværre ingen matches</p>

        
          }


          </div>
          
        </form>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-2">

        

        {data &&
          data.articles.map((a, i) => (
            <div className="col" key={"news" + i}>
              <div className="card h-100">

                
                {
                  a.urlToImage ? <img src={a.urlToImage} alt={a.title} className="card-img-top"/> 
                  : <img src ="https://via.placeholder.com/200x100" alt="placeholder" className="card-img-top" />
                }


                <div className="card-body">
                  <div className="title">
                    <h4>{a.title}</h4>
                    <p><small className="text-muted">{new Date(a.publishedAt).toLocaleString("da-dk", {year: "numeric", month:"long", day: "numeric", hour: "2-digit", minute: "2-digit"})}</small></p>
                    <p><small className="text-muted">{formatDistanceToNow(new Date(a.publishedAt),{locale: da, addSuffix: true} ) }</small></p>
                  </div>
                  <div className="card-text">
                    <p>{a.description}</p>
                    <p>
                      <a href={a.url} target="_blank" rel="noreferrer">
                        Læs mere
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default News;
