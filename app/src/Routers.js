import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Home_movie from "./component/Home_movie";
import Home_graph from "./component/Home_graph";

const Routers = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Home_movie/:ans" element={<Home_movie/>}/>
        <Route path="/Home_graph" element={<Home_graph/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default Routers;