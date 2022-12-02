import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';


import Navbar from './layout/Navbar';
/* import Footer from './layout/Footer';
import Header from './layout/Header'; */
import Home from './pages/Home';
import Users from './pages/jsonplaceholder/Users';
import Species from './pages/jsonplaceholder/Species';
import Starships from './pages/jsonplaceholder/Starships';
import News from './pages/news/News';
import NoMatch from './pages/NoMatch';
import Hobbies from './pages/rapidapi/Hobbies';
import Facts from './pages/rapidapi/Facts';
import Love from './pages/rapidapi/Love';
import Weather1 from './pages/openweather/Weather1';
import Weather2 from './pages/openweather/Weather2';
import Todos from './pages/airtable/Todos';
import TodoCreate from './pages/airtable/TodoCreate';
import TodosAdmin from './pages/airtable/TodosAdmin';

function App() {
  return (
    <div className="App">

      <BrowserRouter>

        <Navbar />
        {/* <Header /> */}

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/user" element={<Users />} />
          <Route path="/species" element={<Species />} />
          <Route path="/starships" element={<Starships />} />
          <Route path="/news" element={<News />} />
          <Route path="/hobby" element= { <Hobbies />} />
          <Route path="/facts" element= { <Facts />} />
          <Route path="/love" element= { <Love />} />
          <Route path="/weather1" element= { <Weather1 />} />
          <Route path="/weather2" element= { <Weather2 />} />
          <Route path="/todos" element= { <Todos />} />
          <Route path="/todocreate" element= { <TodoCreate/>} />
          <Route path="/admintodo" element= { <TodosAdmin/>} />


          


          <Route path="*" element={<NoMatch />} />


        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
