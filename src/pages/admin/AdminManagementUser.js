import {
 Container,
 Row,
 Col,
 Spinner,
 Form,
 Table,
} from "react-bootstrap";
import Paginations from "../../components/pagination/Paginations";
import "./Admin.css";
import NotFound from "../error/NotFound";
import NavBar from "../../components/navbar/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";
import Footer from "../../components/footer/Footer";
import Error500 from "../../components/error/Error500";
import LeftMenu from "../../components/menu/LeftMenu";
import base64 from "base-64";

const AdminManagementUser = () => {
 const Navigate = useNavigate();
 const auth = parseCookies("auth").auth;
 const jwtDefault =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwicm9sZV9pZCI6MCwiZXhwIjoxNjQwNTIzODE1fQ.RTtmDJ2fXyxY4N9GXWJnH-beaFIuHsgUSF3hJHHRXqU";
 const jwt = jwt_decode(
  auth ? base64.decode(auth) : null || jwtDefault,
 );
 const role_id = jwt.Role_ID;
 const [user, setUser] = useState();
 const [isLoading, setIsLoading] = useState(false);
 const [text, settext] = useState();
 const [filtered, setFiltered] = useState([]);
 const [isError, setIsError] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const [cardsPerPage] = useState(10);

 useEffect(() => {
  setIsLoading(true);
  var option = {
   method: "GET",
   url: "http://13.213.57.122:8080/users",
  };

  axios
   .request(option)
   .then(function (response) {
    setUser(response.data.data);
    setIsLoading(false);
   })
   .catch(function (error) {
    setIsError(true);
    setIsLoading(false);
   });
 }, []);

 useEffect(() => {
  if (text) {
   var filter = user?.filter((v) => {
    if (
     v?.name.toLowerCase().includes(text?.toLowerCase()) ||
     v?.email.toLowerCase().includes(text?.toLowerCase()) ||
     v?.phone.toLowerCase().includes(text?.toLowerCase()) ||
     String(v?.id).includes(text?.toLowerCase())
    ) {
     return true;
    } else {
     return false;
    }
   });
   setFiltered(filter);
  } else {
   setFiltered(user);
  }
 }, [text, user]);
 if (!role_id) {
  Navigate("/");
 }
 if (!role_id === 1) {
  <NotFound />;
 }
 if (isError) {
  <Error500 />;
 }

 const funcRole = (id) => {
  if (id === 1) {
   return "Super admin";
  } else if (id === 2) {
   return "Supervisor";
  } else if (id === 3) {
   return "Consultant";
  } else if (id === 4) {
   return "User";
  }
 };
 const indexOfLastPost = currentPage * cardsPerPage;
 const indexOfFirstPost = indexOfLastPost - cardsPerPage;
 const currentCards = filtered?.slice(
  indexOfFirstPost,
  indexOfLastPost,
 );
 const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
 };
 return (
  <>
   {" "}
   <NavBar />
   <Container fluid className="conheader">
    <div className="textheader">
     <h1 style={{ fontWeight: "700" }}>MANAGEMENT USER</h1>
     <h3>
      <Link className="spanhome" to="/">
       <span>HOME / </span>
      </Link>{" "}
      <span className="spancon">MANAGEMENT USER</span>
     </h3>
    </div>
   </Container>
   {isLoading ? (
    <div id="spinner">
     <Spinner animation="border" />
    </div>
   ) : (
    <>
     <Container fluid className="complexcon conmanUser">
      <Row>
       <Col lg={2}></Col>
       <Col lg={8}>
        <Row>
         {" "}
         <Col lg={4}>
          <LeftMenu />
         </Col>
         <Col lg={8}>
          {" "}
          <Container className="con-fitur height400px">
           {" "}
           <Row className="row-fitur listrowacc ">
            <Form onSubmit={""}>
             <Row>
              <Form.Control
               value={text}
               type="text"
               placeholder="Seach user by id, name , email or phone number"
               variant="light"
               onChange={(e) => settext(e.target.value)}
               required
               className="inputSearch"
              />
             </Row>{" "}
            </Form>
            <br />
            {currentCards.length !== 0 ? (
             <>
              <div className="tablesUser">
               <Table responsive bordered size="sm">
                <thead>
                 <tr>
                  <th>ID</th>
                  <th>EMAIL</th>
                  <th>NAME</th>
                  <th>PHONE</th>
                  <th>ROLE</th>
                 </tr>
                </thead>
                <tbody>
                 {currentCards?.map((v) => {
                  return (
                   <>
                    <tr>
                     <td>{v?.id}</td>
                     <td>{v?.email}</td>
                     <td>{v?.name}</td>
                     <td>{v?.phone}</td>
                     <td>{funcRole(v?.role_id)}</td>
                    </tr>
                   </>
                  );
                 })}
                </tbody>
               </Table>
              </div>
              <Row className="justify-content-center">
               <Col md={1}>
                <Paginations
                 className="paginationStyle"
                 totalCards={filtered?.length}
                 cardsPerPage={cardsPerPage}
                 paginate={paginate}
                 active={currentPage}
                />
               </Col>
              </Row>
             </>
            ) : (
             <>
              <h3 className="userNotFound">User not found :(</h3>
             </>
            )}
           </Row>
          </Container>
         </Col>
        </Row>
       </Col>
       <Col lg={2}></Col>
      </Row>
     </Container>
     <Footer />
    </>
   )}
  </>
 );
};
export default AdminManagementUser;
