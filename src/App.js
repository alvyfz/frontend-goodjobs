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
import DetailBuilding from "./pages/building/DetailBuilding";
import AddUnit from "./pages/unit/AddUnit";
import EditUnit from "./pages/unit/EditUnit";
import DetailUnit from "./pages/unit/DetailUnit";
import DetailReview from "./pages/review/DetailReview";
import Account from "./pages/account/Account";
import AdminEdit from "./pages/admin/AdminEdit";
import AdminManagementUser from "./pages/admin/AdminManagementUser";
import AdminManagementReview from "./pages/admin/AdminManagementReview";
import AdminManagementBuilding from "./pages/admin/AdminManagementBuilding";
import Chats from "./pages/chat/Chats";
import EditComplex from "./pages/complex/EditComplex";
import AdminManagementComplex from "./pages/admin/AdminManagementComplex";
import AdminManagementUnit from "./pages/admin/AdminManagementUnit";
export default function App() {
  // let path = useLocation();

  return (
    <>
      {/* {path.pathname === "/login" || "*" ? null : <NavBar />} */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/building/detail" element={<DetailBuilding />} />
        <Route path="/building/add" element={<AddBuilding />} />
        <Route path="/search" element={<Search />} />
        <Route path="/complex" element={<Complex />} />
        <Route path="/complex/detail" element={<BuildingComplex />} />
        <Route path="/building/edit" element={<EditBuilding />} />
        <Route path="/complex/add" element={<AddComplex />} />
        <Route path="/complex/edit" element={<EditComplex />} />
        <Route path="/buildings" element={<AllBuilding />} />
        <Route path="/unit/add" element={<AddUnit />} />
        <Route path="/unit/edit" element={<EditUnit />} />
        <Route path="/unit/detail" element={<DetailUnit />} />
        <Route path="/review" element={<DetailReview />} />
        <Route path="/myaccount" element={<Account />} />
        <Route path="/chat" element={<Chats />} />
        <Route path="/management/user/edit" element={<AdminEdit />} />
        <Route
          path="/management/user"
          element={<AdminManagementUser />}
        />
        <Route
          path="/management/review"
          element={<AdminManagementReview />}
        />
        <Route
          path="/management/building"
          element={<AdminManagementBuilding />}
        />{" "}
        <Route
          path="/management/complex"
          element={<AdminManagementComplex />}
        />
        <Route
          path="/management/unit"
          element={<AdminManagementUnit />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {path.pathname === "/login" || "*" ? null : <Footer />} */}
    </>
  );
}
