import { Routes, Route, useLocation } from "react-router-dom";
//pages
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import App from "../App";
export default function Routing() {
  let path = useLocation();

  return (
    <>
      {path.pathname === "/login" ? null : <NavBar />}
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
      {path.pathname === "/login" ? null : <Footer />}
    </>
  );
}
