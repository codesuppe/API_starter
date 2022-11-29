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


          <Route path="*" element={<NoMatch />} />


        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
      
    </div>
  );
}

export default App;
