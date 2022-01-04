import { Routes, Route } from "react-router-dom";
//pages
import Home from "./pages/home/Home";
import Complex from "./pages/complex/Complex";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/login/Login";
import AddComplex from "./pages/complex/AddComplex";
import AddBuilding from "./pages/building/AddBuilding";
import AllBuilding from "./pages/building/AllBuilding";
import BuildingComplex from "./pages/building/BuildingComplex";
import Search from "./pages/search/Search";
import EditBuilding from "./pages/building/EditBuilding";
import Chat from "./pages/chat/Chat";

export default function App() {
  // let path = useLocation();

  return (
    <>
      {/* {path.pathname === "/login" || "*" ? null : <NavBar />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/building/detail" element={<Home />} />
        <Route path="/building/add" element={<AddBuilding />} />
        <Route path="/search" element={<Search />} />
        <Route path="/complex" element={<Complex />} />
        <Route path="/complex/detail" element={<BuildingComplex />} />
        <Route path="/building/edit" element={<EditBuilding />} />
        <Route path="/complex/add" element={<AddComplex />} />
        <Route path="/buildings" element={<AllBuilding />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {path.pathname === "/login" || "*" ? null : <Footer />} */}
    </>
  );
}
