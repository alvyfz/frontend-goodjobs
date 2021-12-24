import { Routes, Route } from "react-router-dom";
//pages
// import NavBar from "../components/navbar/NavBar";
// import Footer from "../components/footer/Footer";
import Home from "./home/Home";
import App from "../App";
import Complex from "./complex/Complex";
import NotFound from "./error/NotFound";
import Login from "./login/Login";
import AddComplex from "./complex/AddComplex";

import AllBuilding from "./building/AllBuilding";
import BuildingComplex from "./building/BuildingComplex";


export default function Routing() {
  // let path = useLocation();

  return (
    <>
      {/* {path.pathname === "/login" || "*" ? null : <NavBar />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/building/detail" element={<Home />} />

        <Route path="/complex" element={<Complex />} />
        <Route path="/complex/detail" element={<BuildingComplex />} />
        <Route path="/complex/add" element={<AddComplex />} />
        <Route path="/buildings" element={<AllBuilding />} />
 


        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {path.pathname === "/login" || "*" ? null : <Footer />} */}
    </>
  );
}
