import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './component/Home';
import Home_movie from "./component/Home_movie";
import Home_movie_temp from "./component/Home_movie_temp";
import Home_graph from "./component/Home_graph";
import Home_graph_temp from "./component/Home_graph_temp";

const Routers = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Home_movie/:ans" element={<Home_movie/>}/>
        <Route path="/Home_movie_temp/:ans" element={<Home_movie_temp/>}/>
        <Route path="/Home_graph" element={<Home_graph/>}/>
        <Route path="/Home_graph_temp" element={<Home_graph_temp/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default Routers;