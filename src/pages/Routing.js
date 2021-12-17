import { Routes, Route, useLocation } from "react-router-dom";
//pages
import NavBar from "../components/navbar/NavBar";
import Footer from "../components/footer/Footer";
import Home from "./home/Home";
export default function Routing() {
  let path = useLocation();

  return (
    <>
      {path.pathname === "/login" ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {path.pathname === "/login" ? null : <Footer />}
    </>
  );
}
